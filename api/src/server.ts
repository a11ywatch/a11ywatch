/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/

import type { Server as HttpServer } from "http";
import type { AddressInfo } from "net";
import express from "express";
import http from "http";
import cors from "cors";
import bodyParser from "body-parser";

import { CronJob } from "cron";
import { corsOptions, config, logServerInit } from "./config";
import { forkProcess } from "./core/utils";
import { websiteWatch } from "./core/controllers/websites";
import {
  CRAWL_WEBSITE,
  CONFIRM_EMAIL,
  IMAGE_CHECK,
  SCAN_WEBSITE_ASYNC,
  ROOT,
  WEBSITE_CRAWL,
  WEBSITE_CHECK,
  UNSUBSCRIBE_EMAILS,
  GET_WEBSITES_DAILY,
} from "./core/routes";
import { initDbConnection, closeDbConnection } from "./database";
import { Server } from "./apollo-server";
import {
  confirmEmail,
  crawlWebsite,
  detectImage,
  root,
  unSubEmails,
  scanWebsite,
  websiteCrawl,
  websiteCrawlAuthed,
  getWebsite,
  getDailyWebsites,
} from "./rest/routes";
import { setConfig as setLogConfig } from "@a11ywatch/log";
import rateLimit from "express-rate-limit";

setLogConfig({ container: "api" });

const { GRAPHQL_PORT } = config;

const limiter = rateLimit({
  windowMs: 1 * 60 * 1000,
  max: 100,
});

function initServer(): HttpServer {
  initDbConnection();
  const server = new Server();
  const app = express();

  app.use(cors(corsOptions));
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json({ type: "application/*+json", limit: "300mb" }));
  app.use(limiter);
  app.options(CONFIRM_EMAIL, cors());
  app.options(WEBSITE_CHECK, cors());

  app.get(ROOT, root);
  app.get("/api/get-website", cors(), getWebsite);
  app.get(GET_WEBSITES_DAILY, getDailyWebsites);
  app.get(UNSUBSCRIBE_EMAILS, cors(), unSubEmails);
  app.post(WEBSITE_CRAWL, websiteCrawl);
  app.post(`${WEBSITE_CRAWL}-background`, async (req, res) => {
    if (
      typeof process.env.BACKGROUND_CRAWL !== "undefined" &&
      process.env.BACKGROUND_CRAWL === "enabled"
    ) {
      forkProcess({ req: { body: req.body, pubsub: true } }, "crawl-website");
      res.json(true);
    } else {
      await websiteCrawl(req, res);
    }
  });
  app.post(CRAWL_WEBSITE, crawlWebsite);
  app.post(SCAN_WEBSITE_ASYNC, scanWebsite);
  app.post(IMAGE_CHECK, cors(), detectImage);
  app.post(
    "/admin/website-watch-scan",
    cors({ origin: process.env.ADMIN_ORIGIN }),
    websiteWatch
  );

  app.route(WEBSITE_CHECK).get(websiteCrawlAuthed).post(websiteCrawlAuthed);
  app.route(CONFIRM_EMAIL).get(cors(), confirmEmail).post(cors(), confirmEmail);

  server.applyMiddleware({ app, cors: false });

  const httpServer = http.createServer(app);

  server.installSubscriptionHandlers(httpServer);

  const listener = httpServer.listen(GRAPHQL_PORT);

  logServerInit((listener.address() as AddressInfo).port, {
    subscriptionsPath: server.subscriptionsPath,
    graphqlPath: server.graphqlPath,
  });

  if (process.env.DYNO === "web.1" || !process.env.DYNO) {
    new CronJob("00 00 00 * * *", websiteWatch).start();
  }

  return listener;
}

const coreServer = initServer();

const killServer = async () => {
  try {
    await Promise.all([closeDbConnection(), coreServer?.close()]);
  } catch (e) {
    console.error("failed to kill server", e);
  }
};

export { initServer, killServer };
export default coreServer;

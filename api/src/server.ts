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
} from "./rest/routes";

const { GRAPHQL_PORT } = config;

function initServer(): HttpServer {
  const server = new Server();
  const app = express();
  initDbConnection();

  app.use(cors(corsOptions));
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json({ type: "application/*+json" }));
  app.options(CONFIRM_EMAIL, cors());
  app.options(WEBSITE_CHECK, cors());

  app.get(ROOT, root);
  app.get(UNSUBSCRIBE_EMAILS, cors(), unSubEmails);
  app.post(WEBSITE_CRAWL, websiteCrawl);
  app.post(CRAWL_WEBSITE, crawlWebsite);
  app.post(SCAN_WEBSITE_ASYNC, scanWebsite);
  app.post(IMAGE_CHECK, cors(), detectImage);
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

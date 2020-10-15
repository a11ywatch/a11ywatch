/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/

import express from "express";
import http from "http";
import cors from "cors";
import { CronJob } from "cron";
import bodyParser from "body-parser";

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
import { initDbConnection } from "./database";
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

const server = new Server();

const { GRAPHQL_PORT } = config;
const app = express();

// OPTIONS
app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ type: "application/*+json" }));
app.options(CONFIRM_EMAIL, cors());
app.options(WEBSITE_CHECK, cors());

// GET
app.get(ROOT, root);
app.get(UNSUBSCRIBE_EMAILS, cors(), unSubEmails);

// POST
app.post(WEBSITE_CRAWL, websiteCrawl);
app.post(CRAWL_WEBSITE, crawlWebsite);
app.post(SCAN_WEBSITE_ASYNC, scanWebsite);
app.post(IMAGE_CHECK, cors(), detectImage);

// GET/POST
app.route(WEBSITE_CHECK).get(websiteCrawlAuthed).post(websiteCrawlAuthed);
app.route(CONFIRM_EMAIL).get(cors(), confirmEmail).post(cors(), confirmEmail);

server.applyMiddleware({ app, cors: false });
const httpServer = http.createServer(app);
server.installSubscriptionHandlers(httpServer);

httpServer.listen(GRAPHQL_PORT, async () => {
  await initDbConnection(null);
  logServerInit(GRAPHQL_PORT, {
    subscriptionsPath: server.subscriptionsPath,
    graphqlPath: server.graphqlPath,
  });
  if (process.env.DYNO === "web.1" || !process.env.DYNO) {
    const job = new CronJob("00 00 00 * * *", websiteWatch);
    job.start();
  }
});

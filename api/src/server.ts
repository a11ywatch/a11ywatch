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

import { imageDetect } from "./core/external";
import { getUser } from "./core/utils";
import {
  // AUTH_ERROR,
  TOKEN_EXPIRED_ERROR,
  RATE_EXCEEDED_ERROR,
} from "./core/strings";

import { SubDomainController } from "./core/controllers/subdomains";
import { websiteWatch } from "./core/controllers/websites";
import { UsersController } from "./core/controllers/users";
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

const server = new Server();

const { GRAPHQL_PORT } = config;
const app = express();

app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ type: "application/*+json" }));

// TODO: MOVE API ROUTES FROM THIS FILE
app.get(ROOT, (req, res) => {
  res.json({
    server_status: "online",
  });
});

app.get(UNSUBSCRIBE_EMAILS, cors(), async (req, res) => {
  try {
    const email = req?.query?.email;
    const id = req?.query?.id;

    await UsersController().unsubscribeEmails({
      id: Number(id),
      email: String(email),
    });
    res.json({
      sucess: "unsubscribed from email alerts",
    });
  } catch (e) {
    console.error(e);
    res.json({
      failed: "failed to unsubscribed from email alerts",
    });
  }
});

app.post(WEBSITE_CRAWL, async (req, res) => {
  try {
    const { data } = req.body;

    if (data) {
      const { user_id, pages, domain } = JSON.parse(data);

      if (pages?.length === 0) {
        console.log("page offline", domain);
        await UsersController().sendWebsiteOffline({ id: user_id, domain });
        res.send(false);
      } else {
        for (
          let websiteIterator = 0;
          websiteIterator < pages.length;
          websiteIterator++
        ) {
          await SubDomainController().crawlWebsite({
            url: pages[websiteIterator],
            userId: user_id,
          });
        }
        res.send(true);
      }
    }
  } catch (e) {
    console.error(e);
    res.send(false);
  }
});

app.post(CRAWL_WEBSITE, (req, res) => {
  const url = req.query?.websiteUrl;
  const userId = req.query?.userId;

  try {
    SubDomainController().crawlWebsite({
      url,
      userId,
    });
  } catch (e) {
    console.error(e);
  }

  res.send(true);
});

app.post(SCAN_WEBSITE_ASYNC, async (req, res) => {
  const url = req.query?.websiteUrl || req.body?.websiteUrl;
  const userId = req.query?.userId || req.body?.userId;

  try {
    const data = await SubDomainController().scanWebsite({
      url,
      userId,
    });

    res.json(data);
  } catch (e) {
    console.error(e);
    res.json({ message: "Error: Page not found", status: 404, success: false });
  }
});

const websiteCheck = async (req, res) => {
  const url = req.query?.url || req.body?.url;

  if (!url) {
    res.json({
      status: 400,
      message: "URL NOT FOUND",
      success: false,
    });
    return;
  }

  const user = getUser(req.headers?.authorization);

  if (!user) {
    res.json({
      status: 400,
      message: req.headers?.authorization
        ? TOKEN_EXPIRED_ERROR
        : "USER NOT FOUND",
      success: false,
    });
    return;
  }

  const { keyid, audience } = user?.payload;

  const [userData] = await UsersController({
    user,
  }).updateApiUsage({ id: keyid }, true);

  const usage = userData?.apiUsage?.usage;

  if (
    (audience === 0 && usage >= 3) ||
    (audience === 1 && usage >= 100) ||
    (audience === 2 && usage >= 500)
  ) {
    res.json({
      data: null,
      status: 17,
      message: RATE_EXCEEDED_ERROR,
      success: false,
    });
    return;
  }

  let data = {};

  try {
    data = await SubDomainController().crawlWebsite({
      url: url?.includes("http") ? url : `http://${url}`,
      userId: keyid,
      apiData: true,
    });
  } catch (e) {
    console.error(e);
  }

  res.json(data);
};

app.get(WEBSITE_CHECK, websiteCheck);
app.post(WEBSITE_CHECK, websiteCheck);

app.post(IMAGE_CHECK, cors(), async (req, res) => {
  const img = req.body?.imageBase64;

  if (!img) {
    res.json({
      data: null,
      status: 400,
      message: "IMAGE NOT FOUND",
      success: false,
    });
    return;
  }

  const user = getUser(req.headers?.authorization);

  if (!user) {
    res.json({
      data: null,
      status: 400,
      message: req.headers?.authorization
        ? TOKEN_EXPIRED_ERROR
        : "USER NOT FOUND",
      success: false,
    });
    return;
  }

  const { keyid, audience } = user?.payload;
  const [userData] = await UsersController({
    user: user,
  }).updateApiUsage({ id: keyid }, true);

  const usage = userData?.apiUsage?.usage;

  if (
    (audience === 0 && usage >= 3) ||
    (audience === 1 && usage >= 100) ||
    (audience === 2 && usage >= 500)
  ) {
    res.json({
      data: null,
      status: 17,
      message: RATE_EXCEEDED_ERROR,
      success: false,
    });
    return;
  }

  let data = { status: false };

  try {
    data = await imageDetect({ img });
  } catch (e) {
    console.error(e);
  }

  res.json(data);
});

app.get(CONFIRM_EMAIL, cors(), async (req, res) => {
  const code = req.query?.code + "";
  console.log("CONFRIMING EMAIL:", code);
  const response = await UsersController().validateEmail(
    {
      code,
    },
    false
  );

  res.send(
    response
      ? "Success, email verified"
      : "Link expired, please get a new link and try again."
  );
});

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

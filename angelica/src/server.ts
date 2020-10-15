/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/

import type { AddressInfo } from "net";
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { adjustScript, crawlWebsite, editScript } from "./core/controllers";
import { detectImageModel } from "./ai";
import { corsOptions, logServerInit } from "./config";
import { root } from "./rest/routes";

const app = express();

app.use(cors(corsOptions));
app.use(bodyParser.json({ limit: "100mb", extended: true }));

app.get("/", root);

app.post("/api/getPageIssues", async (req, res, next) => {
  try {
    const data = await crawlWebsite({
      url: decodeURIComponent(req.body.url + ""),
      userId: req.body.userId,
      pageHeaders: req.body.pageHeaders,
      authed: req.body.authed,
    });

    res.send(JSON.stringify(data));
  } catch (dataIssue) {
    console.log(`top level: `, dataIssue);
    next();
  }
});

app.post("/api/detectImage", async (req, res, next) => {
  try {
    const data = await detectImageModel({
      img: req.body.img,
    });

    res.json(data);
  } catch (e) {
    console.log(`top level: `, e);
    next();
  }
});

app.post("/api/updateScript", async (req, res, next) => {
  try {
    const { editScript: edit, url, userId, script, newScript } = req.body;
    const executeMethod = edit ? editScript : adjustScript;

    const data = await executeMethod(
      Object.assign(
        {},
        {
          url: decodeURIComponent(url + ""),
          userId,
          script,
          newScript,
        },
        edit ? {} : { newScript }
      )
    );

    res.send(JSON.stringify(data));
  } catch (e) {
    console.log(`top level: `, e);
    next();
  }
});

const coreServer = app.listen(process.env.PORT || 0, () => {
  logServerInit((coreServer.address() as AddressInfo).port);
});

export default coreServer;

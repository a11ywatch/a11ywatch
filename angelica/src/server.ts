/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/

const express = require("express");
const http = require("http");
const cors = require("cors");
const bodyParser = require("body-parser");
const {
  adjustScript,
  crawlWebsite,
  editScript,
} = require("./core/controllers");
const { detectImageModel } = require("./ai");
const { corsOptions, logServerInit } = require("./config");

const app = express();

app.use(cors(corsOptions));

app.get("/", (req, res) => {
  res.json({
    server_status: "online",
  });
});

app.use(bodyParser.json({ limit: "100mb", extended: true }));

app.post("/api/getPageIssues", async (req, res, next) => {
  try {
    if (req.body) {
      const data = await crawlWebsite({
        url: req.body.url && decodeURIComponent(req.body.url),
        userId: req.body.userId,
        pageHeaders: req.body.pageHeaders,
        authed: req.body.authed,
      });

      res.send(JSON.stringify(data));
    } else {
      next();
    }
  } catch (dataIssue) {
    console.log(`top level: `, dataIssue);
    next();
  }
});

app.post("/api/detectImage", async (req, res, next) => {
  try {
    if (req.body) {
      const data = await detectImageModel({
        img: req.body.img,
      });

      res.json(data);
    } else {
      next();
    }
  } catch (dataIssue) {
    console.log(`top level: `, dataIssue);
    next();
  }
});

app.post("/api/updateScript", async (req, res, next) => {
  try {
    const executeMethod = req.body?.editScript ? editScript : adjustScript;

    const data = await executeMethod({
      url: req.body?.url && decodeURIComponent(req.body.url),
      userId: req.body?.userId,
      script: req.body?.script,
      newScript: req.body?.newScript,
    });

    res.send(JSON.stringify(data));
  } catch (dataIssue) {
    console.log(`top level: `, dataIssue);
    next();
  }
});

const port = process.env.PORT || 0;

app.listen(port, () => {
  logServerInit(port);
});

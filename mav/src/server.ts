/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/

import "@tensorflow/tfjs-node-gpu";
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { log, setConfig as setLogConfig } from "@a11ywatch/log";
import { config, corsOptions, logServerInit } from "./config";
import { aiModels, detectImageModel } from "./ai";

setLogConfig({ container: "mav" });

const app = express();

app.use(cors(corsOptions));
app.use(bodyParser.json({ limit: "100mb", extended: true }));

app
  .get("/", (req, res) => {
    res.json({
      server_status: "online",
    });
  })
  .post("/api/clear", (req, res, next) => {
    try {
      aiModels.clearModels();
      res.send(true);
    } catch (e) {
      log(e, { type: "error" });
      next();
    }
  })
  .post("/api/init", async (req, res, next) => {
    try {
      await aiModels.initModels();
      res.send(true);
    } catch (e) {
      log(e, { type: "error" });
      next();
    }
  })
  .post("/api/parseImg", async (req, res, next) => {
    try {
      if (req.body?.img) {
        const data = await detectImageModel(req.body.img, {
          width: Number(req.body.width),
          height: Number(req.body.height),
        });
        res.send(JSON.stringify(data));
      } else {
        next();
      }
    } catch (e) {
      log(e, { type: "error" });
      next();
    }
  });

const { PORT } = config;

app.listen(PORT, () => {
  logServerInit(PORT);
});

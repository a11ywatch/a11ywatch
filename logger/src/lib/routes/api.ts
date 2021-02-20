/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/
import { join } from "path";
import { Router } from "express";
import fs from "fs";
import type { LogModel } from "../../types";

const apiRouter = Router();

const LOG_PATH = join(__dirname, "..", "..", `/logs/`);

apiRouter.get("/log", (req, res) => {
  try {
    const { type } = req.query;
    const datePath = new Date().toISOString().split("T")[0];

    res.sendFile(`/${LOG_PATH}/${datePath}/${type ?? "info"}/log.md`);
  } catch (e) {
    console.error(e);
    res.send(e);
  }
});

apiRouter.post("/log", (req, res) => {
  const { message, platform, type, container }: LogModel = req.body;
  const today = new Date();
  const logPath = `/${LOG_PATH}/${today.toISOString().split("T")[0]}/${type}/`;

  try {
    if (!fs.existsSync(logPath)) {
      fs.mkdirSync(logPath, {
        recursive: true,
      });
    }

    const log = fs.createWriteStream(`${logPath}log.md`, {
      flags: "a",
    });

    const logOutput = `${today.toLocaleString()}\ntype: ${type}\ncontainer: ${container}\nplatform: ${platform}\n${message}\n\n`;

    console.info(logOutput);

    log.write(logOutput);
    log.end();
    res.send({ status: 200 });
  } catch (e) {
    console.error(e);
    res.send(e);
  }
});

export { apiRouter };

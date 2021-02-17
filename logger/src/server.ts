/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/

import path from "path";
import fs from "fs";
import { app, init } from "./lib";
import { LogModel } from "./types";

const LOG_PATH = path.join(__dirname + `/logs/`);

app.get("/", (req, res) => {
  res.json({
    server_status: "online",
  });
});

app.get("/api/log", (req, res) => {
  try {
    const { type } = req.query;
    res.sendFile(`/${LOG_PATH}/${type}/log.md`);
  } catch (e) {
    console.error(e);
    res.send(e);
  }
});

/*
 * @body(message: String, type: String, platform: String)
 */
app.post("/api/log", (req, res) => {
  try {
    const { message, platform, type, container }: LogModel = req.body;
    const logPath = `/${LOG_PATH}/${type}/`;

    if (!fs.existsSync(logPath)) {
      fs.mkdirSync(logPath, {
        recursive: true,
      });
    }

    const log = fs.createWriteStream(`${logPath}log.md`, {
      flags: "a",
    });

    const logOutput = `\n## ${new Date().toLocaleString()}\ntype: ${type}\ncontainer: ${container}\nplatform: ${platform}\n${message}\n`;

    console.info(logOutput);

    log.write(logOutput);
    log.end();
    res.send({ status: 200 });
  } catch (e) {
    console.error(e);
    res.send(e);
  }
});

init();

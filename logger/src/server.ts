/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/

import path from "path";
import fs from "fs";
import { app, init } from "./lib";
import { LogModel } from "./types";

// TODO: SCHEDULE UPPER PATH BY 1 HOUR ZONES FOR QUICKER READS ALSO SEND LOGS TO DB INSTEAD OF USING SERVER RESOURCES
const LOG_PATH = path.join(__dirname + `/logs/`);

app.get("/", (req, res) => {
  // TODO: REPLACE with clientside html to get data from /api/log
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
    const { message, platform, type }: LogModel = req.body;
    const logPath = `/${LOG_PATH}/${type}/`;

    if (!fs.existsSync(logPath)) {
      fs.mkdirSync(logPath, {
        recursive: true,
      });
    }

    const log = fs.createWriteStream(`${logPath}log.md`, {
      flags: "a",
    });

    log.write(
      `\n## ${new Date().toString()}: ${platform} - ${type}\n${message}\n`
    );

    log.end();
    res.end();
  } catch (e) {
    console.error(e);
    res.send(e);
  }
});

init();

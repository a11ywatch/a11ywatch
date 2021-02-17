/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/

import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { rmdirSync } from "fs";
import { join } from "path";
import { CronJob } from "cron";
import { PORT } from "./config";

const app = express();

app.use(cors());
app.use(bodyParser.json());

const init = () => {
  app.listen(PORT, () => {
    console.log(`server listening on port ${PORT}!`);
    if (process.env.DYNO === "web.1" || !process.env.DYNO) {
      const job = new CronJob("0 0 * * 0", function () {
        try {
          rmdirSync(join(__dirname + `/logs/`), {
            recursive: true,
          });
        } catch (e) {
          console.error("failed to clear log dir");
        }
      });
      job.start();
    }
  });
};
export { app, init };

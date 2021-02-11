/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/

import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { PORT, corsOptions } from "./config";

const app = express();

app.use(cors(corsOptions));
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

function initApp() {
  const server = app.listen(PORT, function () {
    console.log(`server listening on port ${this.address().port}!`);
  });

  return server;
}

export { app, initApp };

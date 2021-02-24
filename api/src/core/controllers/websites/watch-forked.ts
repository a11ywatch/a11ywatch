/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/

import { log, setConfig as setLogConfig } from "@a11ywatch/log";
import { initDbConnection } from "@app/database";
import { websiteWatch } from "./watch-pages";

setLogConfig({ container: "api" });

process.on("message", async () => {
  try {
    await initDbConnection();
    await websiteWatch();
  } catch (e) {
    log(e, { type: "error" });
  } finally {
    process.send("close");
  }
});

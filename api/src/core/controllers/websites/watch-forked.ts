/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/

import { websiteWatch } from "./watch-pages";
import { log } from "@a11ywatch/log";

process.on("message", async () => {
  try {
    await websiteWatch();
  } catch (e) {
    log(e, { type: "error" });
  }
});

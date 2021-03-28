/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/
const { initDbConnection } = require("../../database");
const { websiteCrawl } = require("../../rest/routes/crawl");

process.on("message", async (props) => {
  try {
    Promise.all([await initDbConnection(), await websiteCrawl(props?.req)]);
  } catch (e) {
    console.error(e);
  } finally {
    process.send("close");
  }
});

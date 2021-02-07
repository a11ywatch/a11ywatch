/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/

const fetch = require("node-fetch");
const { initUrl } = require("@a11ywatch/website-source-builder");

process.on("message", ({ urlMap, userId }) => {
  console.log("REQUESTING SPIDER DOMAIN SCAN:", urlMap);
  const url = String(initUrl(urlMap, true));
  const body = JSON.stringify({
    url,
    id: Number(userId),
  });
  try {
    fetch(`${process.env.WATCHER_CLIENT_URL}/crawl`, {
      method: "POST",
      body,
      headers: { "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error(e);
  }
});

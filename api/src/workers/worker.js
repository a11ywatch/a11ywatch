/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/

const fetch = require("node-fetch");

function initUrl(url, filter) {
  if (!url) {
    return;
  }
  if (process.env.DOCKER_ENV) {
    if (filter && url.includes("http://localhost:8050")) {
      return url.replace("localhost:8050", "example-site:8050");
    } else if (url && url.includes("example-site")) {
      return url.replace("example-site:8050", "localhost:8050");
    }
  }
  return url.toLowerCase();
}

process.on("message", ({ urlMap, userId }) => {
  const url = initUrl(urlMap, true);
  console.log("REQUESTING SPIDER DOMAIN SCAN:", url);
  const body = JSON.stringify({
    url: String(url),
    id: Number(userId),
  });
  try {
    fetch(`${process.env.WATCHER_CLIENT_URL}/crawl`, {
      method: "POST",
      body,
      headers: { "Content-Type": "application/json" },
    });
  } catch (e) {
    console.log(e);
  }
});

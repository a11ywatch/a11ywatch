/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/

const fetch = require("node-fetch");

const DEV = process.env.NODE_ENV !== "production";
const proxyDockerUrls = ["mav", "localhost", "angelica", "cdn-server", "api"];

const replaceDockerNetwork = (url) => {
  if (!DEV && process.env.DOCKER_ENV) {
    const includesElement = (element) => url.includes(element);
    const hasIndex = proxyDockerUrls.findIndex(includesElement);

    if (hasIndex !== -1) {
      return url.replace(proxyDockerUrls[hasIndex], "127.0.0.1");
    }
  }
  return url;
};

process.on(
  "message",
  async ({
    scriptBody: scriptBuffer,
    cdnSourceStripped,
    domain,
    screenshot,
    screenshotStill,
  }) => {
    const body = JSON.stringify({
      scriptBuffer,
      cdnSourceStripped,
      domain,
      screenshot,
      screenshotStill,
    });

    const apiEndpoint =
      typeof screenshot !== "undefined" ? "add-screenshot" : "add-script";

    try {
      await fetch(
        `${replaceDockerNetwork(process.env.SCRIPTS_CDN_URL)}/${apiEndpoint}`,
        {
          method: "POST",
          body,
          headers: { "Content-Type": "application/json" },
        }
      );
    } catch (e) {
      console.error(e);
    }
  }
);

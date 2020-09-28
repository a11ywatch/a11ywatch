/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/

const fetch = require("node-fetch");

process.on("message", ({ scriptBody, cdnSourceStripped, domain }) => {
  if (scriptBody) {
    try {
      fetch(`${process.env.SCRIPTS_CDN_URL}/add-script`, {
        method: "POST",
        body: JSON.stringify({
          scriptBuffer: scriptBody,
          cdnSourceStripped,
          domain,
        }),
        headers: { "Content-Type": "application/json" },
      });
    } catch (e) {
      console.error(e);
    }
  }
});

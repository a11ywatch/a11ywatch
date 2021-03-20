/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/

import fetch from "node-fetch"
import { SCRIPTS_CDN_URL } from "@app/config"
import { log, setConfig as setLogConfig } from "@a11ywatch/log"

setLogConfig({ container: "angelica" })

process.on(
  "message",
  async ({
    scriptBody: scriptBuffer,
    cdnSourceStripped,
    domain,
    screenshot,
    screenshotStill,
    authed
  }) => {
    const headers = { "Content-Type": "application/json" }
    try {
      await Promise.all([
        fetch(`${SCRIPTS_CDN_URL}/add-screenshot`, {
          method: "POST",
          body: JSON.stringify({
            cdnSourceStripped,
            domain,
            screenshot,
            screenshotStill
          }),
          headers
        }),
        fetch(`${SCRIPTS_CDN_URL}/add-script`, {
          method: "POST",
          body: JSON.stringify({
            scriptBuffer,
            cdnSourceStripped,
            domain
          }),
          headers
        })
      ])
    } catch (e) {
      log(e)
    } finally {
      process.send("close")
    }
  }
)

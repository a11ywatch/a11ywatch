/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/

import { createPuppeteerPool } from "./create-puppeteer-pool";

// ONLY POOL ONCE PER MACHINE ATM
const puppeteerPool = createPuppeteerPool();

const puppetPool = {
  acquire: async () => {
    try {
      return await puppeteerPool.acquire();
    } catch (e) {
      console.error(e);
      return null;
    }
  },
  close: async (browser) => {
    try {
      await browser.close();
    } catch (e) {
      console.error(e);
    }
  },
  clean: async (browser, page) => {
    try {
      await page?.close();
      if (browser) {
        console.log(
          `SHUTDOWN: browser: pool size:${puppeteerPool?.size}: unused: ${puppeteerPool?.available} spare: ${puppeteerPool.spareResourceCapacity}`
        );
        await puppeteerPool.release(browser);
      }
    } catch (e) {
      console.error(e);
    }
  },
};

export { puppetPool };

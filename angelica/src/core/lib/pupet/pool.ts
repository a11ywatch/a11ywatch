/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/

import { createPuppeteerPool } from "./create-puppeteer-pool";
import { log } from "@a11ywatch/log";
import util from "util";
import v8 from "v8";

const setImmediatePromise = util.promisify(setImmediate);

const puppeteerPool = createPuppeteerPool();

const puppetPool = {
  acquire: async () => {
    try {
      const stream = v8.getHeapStatistics();
      if (
        stream.total_heap_size * 0.4 <
        stream.total_heap_size - stream.used_heap_size
      ) {
        log("os heap to low to grab puppet pool", { type: "error" });
        return await setImmediatePromise(puppeteerPool.acquire);
      }

      return await puppeteerPool.acquire();
    } catch (e) {
      log(e, { type: "error" });
      return null;
    }
  },
  close: async (browser) => {
    try {
      await browser?.close();
    } catch (e) {
      log(e, { type: "error" });
    }
  },
  clean: async (browser, page) => {
    try {
      await page?.close();
      if (browser) {
        await puppeteerPool.release(browser);
      }
    } catch (e) {
      log(e, { type: "error" });
    }
  },
};

export { puppetPool };

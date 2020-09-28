/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/

import genericPool from "generic-pool";
import puppeteer from "puppeteer";

const puppeteerConfig = {
  executablePath: process.env.CHROME_BIN || null,
  ignoreHTTPSErrors: true,
  args: [
    "--no-sandbox",
    "--disable-setuid-sandbox",
    "--disable-gpu",
    "--disable-dev-shm-usage",
    '--proxy-server="direct://"',
    "--proxy-bypass-list=*",
  ],
  headless: true,
  dumpio: process.env.NODE_ENV !== "production",
  // TODO: CHANGE TIMEOUT TO ENV VAR OR OS ALGRYTHM
  timeout: 15000,
};

const POOL_DEFAULTS = {
  min: 0,
  max: 5,
  testOnBorrow: true,
  puppeteerArgs: [puppeteerConfig],
  validate: () => Promise.resolve(true),
};

const createPuppeteerFactory = ({ puppeteerArgs, validate }) => ({
  async create() {
    try {
      return await puppeteer.launch(...puppeteerArgs);
    } catch (e) {
      console.error(e);
    }
  },
  async destroy(browser) {
    try {
      await browser?.close();
    } catch (e) {
      console.error(e);
    }
  },
  validate,
});

export async function launchPuppeter() {
  try {
    return await puppeteer.launch(puppeteerConfig);
  } catch (err) {
    console.error(err);
    return null;
  }
}

export function createPuppeteerPool(poolConfig?) {
  const config = Object.assign({}, POOL_DEFAULTS, poolConfig);
  const factory = createPuppeteerFactory(config);
  const { validate, puppeteerArgs, ...extractedPoolConfig } = config;

  return genericPool.createPool(factory, extractedPoolConfig);
}

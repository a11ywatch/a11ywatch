/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/

import { config as envConf } from "dotenv";
import { replaceDockerNetwork } from "@a11ywatch/website-source-builder";
import fs from "fs";

envConf();

const DEV = process.env.NODE_ENV !== "production";
const TEST_ENV = process.env.NODE_ENV === "test";

let PUBLIC_KEY =
  process.env.PUBLIC_KEY &&
  String(process.env.PUBLIC_KEY).replace(/\\n/gm, "\n");
let PRIVATE_KEY =
  process.env.PRIVATE_KEY &&
  String(process.env.PRIVATE_KEY).replace(/\\n/gm, "\n");
let EMAIL_CLIENT_KEY =
  process.env.EMAIL_CLIENT_KEY &&
  String(process.env.EMAIL_CLIENT_KEY).replace(/\\n/gm, "\n");

if (!PRIVATE_KEY) {
  try {
    PRIVATE_KEY = fs.readFileSync("./private.key", "utf8");
  } catch (e) {
    console.error(e);
  }
}

if (!PUBLIC_KEY) {
  try {
    PUBLIC_KEY = fs.readFileSync("./public.key", "utf8");
  } catch (e) {
    console.error(e);
  }
}

if (!EMAIL_CLIENT_KEY && PRIVATE_KEY) {
  EMAIL_CLIENT_KEY = PRIVATE_KEY;
}

const SCRIPTS_CDN_URL = String(
  replaceDockerNetwork(process.env.SCRIPTS_CDN_URL)
);
const SCRIPTS_CDN = SCRIPTS_CDN_URL.replace("api", "");

export const config = {
  DEV,
  DB_URL: process.env.MONGO_URL || process.env.DB_URL,
  DB_NAME: process.env.DB_NAME || "a11ywatch",
  CLIENT_URL: replaceDockerNetwork(process.env.CLIENT_URL),
  CRAWL_URL: replaceDockerNetwork(process.env.CRAWL_URL),
  SCRIPTS_CDN_URL,
  GRAPHQL_PORT: Number(
    process.env.NODE_ENV === "test"
      ? 0
      : process.env.PORT || process.env.GRAPHQL_PORT || 0
  ),
  EMAIL_SERVICE_PASSWORD: process.env.EMAIL_SERVICE_PASSWORD,
  STRIPE_KEY: process.env.STRIPE_KEY,
  SUBSCRIPTION_TIMOUT: process.env.SUBSCRIPTION_TIMOUT,
  STRIPE_BASIC_PLAN: process.env.STRIPE_BASIC_PLAN,
  STRIPE_PREMIUM_PLAN: process.env.STRIPE_PREMIUM_PLAN,
  ROOT_URL: process.env.ROOT_URL,
  DOCKER_ENV: process.env.DOCKER_ENV,
  EMAIL_SERVICE_URL: process.env.EMAIL_SERVICE_URL,
  EMAIL_CLIENT_ID: process.env.EMAIL_CLIENT_ID,
  EMAIL_CLIENT_KEY,
  PUBLIC_KEY,
  PRIVATE_KEY,
};

export { DEV, TEST_ENV, PRIVATE_KEY, SCRIPTS_CDN_URL, SCRIPTS_CDN, PUBLIC_KEY };

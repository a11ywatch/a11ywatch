/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/

import dotenv from "dotenv";

dotenv.config();

export const DEV = process.env.NODE_ENV !== "production";

const replaceDockerNetwork = (url: string): string => {
  const proxyDockerUrls = ["mav", "localhost", "angelica", "cdn-server", "api"];
  if (!DEV && process.env.DOCKER_ENV) {
    const hasIndex = proxyDockerUrls.findIndex((urls) => url.includes(urls));

    if (hasIndex !== -1) {
      return url.replace(proxyDockerUrls[hasIndex], process.env.DOCKER_SERVICE);
    }
  }
  return url;
};

export const config = {
  DEV,
  DB_URL: process.env.DB_URL,
  DB_NAME: process.env.DB_NAME,
  CLIENT_URL: replaceDockerNetwork(process.env.CLIENT_URL),
  WATCHER_CLIENT_URL: replaceDockerNetwork(process.env.WATCHER_CLIENT_URL),
  CRAWL_URL: replaceDockerNetwork(process.env.CRAWL_URL),
  SCRIPTS_CDN_URL: replaceDockerNetwork(process.env.SCRIPTS_CDN_URL),
  GRAPHQL_PORT: Number(process.env.PORT || process.env.GRAPHQL_PORT || 0),
  EMAIL_SERVICE_PASSWORD: process.env.EMAIL_SERVICE_PASSWORD,
  STRIPE_KEY: process.env.STRIPE_KEY,
  SUBSCRIPTION_TIMOUT: process.env.SUBSCRIPTION_TIMOUT,
  STRIPE_BASIC_PLAN: process.env.STRIPE_BASIC_PLAN,
  STRIPE_PREMIUM_PLAN: process.env.STRIPE_PREMIUM_PLAN,
  ROOT_URL: process.env.ROOT_URL,
  DOCKER_ENV: process.env.DOCKER_ENV,
  EMAIL_SERVICE_URL: process.env.EMAIL_SERVICE_URL,
  EMAIL_CLIENT_ID: process.env.EMAIL_CLIENT_ID,
  EMAIL_CLIENT_KEY: process.env.EMAIL_CLIENT_KEY,
  PUBLIC_KEY: String(process.env.PUBLIC_KEY).replace(/\\n/gm, "\n"),
  PRIVATE_KEY: String(process.env.PRIVATE_KEY).replace(/\\n/gm, "\n"),
};

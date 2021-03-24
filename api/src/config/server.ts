/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/
import { log } from "@a11ywatch/log";
import { config, TEST_ENV } from "./config";

const { CLIENT_URL, CRAWL_URL, ROOT_URL, DEV } = config;

const apiUrls = String(CLIENT_URL).split(",");

export const whitelist = [
  ...apiUrls,
  ...apiUrls.map((url) => url.replace("http", "https")),
  CRAWL_URL,
].filter((url) => url);

if (DEV || TEST_ENV) {
  whitelist.push("127.0.0.1", "0.0.0.0", "http://localhost:3000", "::1");
}

export const corsOptions = {
  origin: whitelist,
  credentials: true,
};

export const BYPASS_AUTH = [
  "Register",
  "Login",
  "ForgotPassword",
  "Testout",
  "ResetPassword",
  "ScanWebsite",
  "CrawlWebsite",
  "Payments",
  "IntrospectionQuery",
  "getWebsites",
  "getIssue",
  "getScript",
  "getUser",
];

export const cronTimer = DEV ? "0 1 * * *" : "0 16 * * *";

const source = DEV ? "localhost" : ROOT_URL;

export const logServerInit = (port, { graphqlPath, subscriptionsPath }) => {
  log([
    `Server ready at ${source}:${port}${graphqlPath}`,
    `Subscriptions ready at ws://${source}:${port}${subscriptionsPath}`,
  ]);
};

/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/
import { log } from "@a11ywatch/log";
import { config } from "./config";

const { CLIENT_URL, CRAWL_URL, ROOT_URL, DEV } = config;

const apiUrls = String(CLIENT_URL).split(",");

export const whitelist = [
  ...apiUrls,
  ...apiUrls.map((url) => url.replace("http", "https")),
  CRAWL_URL,
].filter((url) => url);

if (DEV) {
  whitelist.push("http://127.0.0.1", "http://0.0.0.0", "http://localhost:3000");
}

// pages that will take a long time to crawl: EVENTUALLY REMOVE
export const TEMP_WATCHER_BLACKLIST = [
  `twitter.com`,
  `etsy.com`,
  "gmail.com",
  "etsy.com",
  `google.com`,
  `dropbox.com`,
  `github.com`,
  `nytimes.com`,
  `squareup.com`,
  `gamestop.com`,
  `facebook.com`,
  `amazon.com`,
  `netflix.com`,
  "myspace.com",
  "alibaba.com",
  "producthunt.com",
];

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
    `🚀 Server ready at ${source}:${port}${graphqlPath}`,
    `🚀 Subscriptions ready at ws://${source}:${port}${subscriptionsPath}`,
  ]);
};

/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/

import validUrl from "valid-url";

import {
  WEBSITE_EXIST_ERROR,
  ADD_FREE_MAX_ERROR,
  SUCCESS,
  WEBSITE_URL_ERROR,
} from "@app/core/strings";
import { forkProcess } from "@app/core/utils";

import { getHostName, initUrl } from "@a11ywatch/website-source-builder";

import { TEMP_WATCHER_BLACKLIST } from "@app/config/server";
import { getWebsite } from "../find";

export const addWebsite = async ({
  userId,
  url: urlMap,
  customHeaders,
  audience,
}) => {
  if (!urlMap || !validUrl.isUri(urlMap)) {
    throw new Error(WEBSITE_URL_ERROR);
  }
  const url = initUrl(urlMap);

  const [siteExist, collection, collectionLength] = await getWebsite(
    { userId, url },
    true
  );

  if (siteExist) {
    throw new Error(WEBSITE_EXIST_ERROR);
  }

  const collectionCount = await collection.countDocuments({ userId });

  const blockWebsiteAdd =
    (!audience && collectionCount === 1) ||
    (audience === 1 && collectionCount === 4) ||
    (audience === 2 && collectionCount === 10);

  if (blockWebsiteAdd) {
    throw new Error(ADD_FREE_MAX_ERROR);
  }

  const website = {
    userId,
    id: collectionLength ? collectionLength + 1 : 0,
    url,
    domain: getHostName(url),
    adaScore: null,
    cdnConnected: false,
    html: "",
    htmlIncluded: false,
    pageLoadTime: {
      duration: 0,
      durationFormated: "",
      color: "",
    },
    issuesInfo: {
      issuesFixedByCdn: 0,
      possibleIssuesFixedByCdn: 0,
      totalIssues: 0,
    },
    pageHeaders: null,
    online: null,
  };

  if (customHeaders) {
    website.pageHeaders = customHeaders;
  }

  await collection.insertOne(website);

  if (!TEMP_WATCHER_BLACKLIST.includes(url)) {
    let cleanUrlParse = url;

    if (url[url.length - 1] === "/") {
      cleanUrlParse = cleanUrlParse.slice(0, -1);
    }
    forkProcess({ urlMap: cleanUrlParse, userId });
  }

  return {
    website,
    code: 200,
    success: true,
    message: SUCCESS,
  };
};

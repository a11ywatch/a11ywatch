/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/

import { fork } from "child_process";
import validUrl from "valid-url";

import { connect } from "@app/database";
import {
  WEBSITE_EXIST_ERROR,
  ADD_FREE_MAX_ERROR,
  WEBSITE_NOT_FOUND,
  SUCCESS,
  SUCCESS_DELETED_ALL,
  WEBSITE_URL_ERROR,
} from "@app/core/strings";
import {
  getHostName,
  websiteSearchParams,
  initUrl,
  getCollectionLength,
} from "@app/core/utils";
import { TEMP_WATCHER_BLACKLIST } from "@app/config/server";
import { getWebsitesCrawler } from "./find";
import { HistoryController } from "../history";

const forked = fork("./src/workers/worker.js", [], { detached: true });

interface Params {
  userId: number;
  url?: string;
  domain?: string;
}

export const getWebsite = async (
  { userId, url, domain }: Params,
  chain: boolean
) => {
  try {
    const [collection] = await connect("Websites");
    const website = await collection.findOne(
      websiteSearchParams({
        userId,
        url,
        domain,
      })
    );
    const collectionLength = await getCollectionLength(collection, url);

    return chain ? [website, collection, collectionLength?.length] : website;
  } catch (e) {
    console.error(e);
  }
};

export const WebsitesController = ({ user } = { user: null }) => ({
  getWebsite,
  getWebsites: async ({ userId }, chain?: boolean) => {
    try {
      const [collection] = await connect("Websites");
      const websites = await collection
        .find({ userId: Number(userId) })
        .limit(20)
        .toArray();

      return chain ? [websites, collection] : websites;
    } catch (e) {
      console.error(e);
    }
  },
  getWebsitesCrawler,
  getWebsitesScan: async ({ userId, url, domain }, chain) => {
    try {
      const [collection] = await connect("Websites");
      const searchProps = websiteSearchParams({ userId, url, domain });
      const websites = await collection.find(searchProps).limit(100).toArray();

      return chain ? [websites, collection] : websites;
    } catch (e) {
      console.error(e);
    }
  },
  getAllWebsites: async () => {
    try {
      const [collection] = await connect("Websites");
      const websites = await collection
        .find({ userId: { $gt: -1 } })
        .project({ url: 1, userId: 1 })
        .limit(10000)
        .toArray();

      return websites || [];
    } catch (e) {
      console.error(e);
      return [];
    }
  },
  addWebsite: async ({ userId, url: urlMap, customHeaders, audience }) => {
    if (!urlMap || !validUrl.isUri(urlMap)) {
      throw new Error(WEBSITE_URL_ERROR);
    }
    const url = initUrl(urlMap);
    const [siteExist, collection, collectionLength] = await WebsitesController({
      user,
    }).getWebsite({ userId, url }, true);

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

      forked.send({ urlMap: cleanUrlParse, userId });
    }

    return {
      website,
      code: 200,
      success: true,
      message: SUCCESS,
    };
  },
  removeWebsite: async ({ userId, url, deleteMany = false }) => {
    if (typeof userId === "undefined") {
      throw new Error(WEBSITE_NOT_FOUND);
    }
    const [scriptsCollection] = await connect("Scripts");
    const [analyticsCollection] = await connect("Analytics");
    const [subdomainsCollection] = await connect("SubDomains");
    const [issuesCollection] = await connect("Issues");

    if (deleteMany) {
      const [webcollection] = await connect("Websites");
      await webcollection.deleteMany({ userId });
      await scriptsCollection.deleteMany({ userId });
      await analyticsCollection.deleteMany({ userId });
      await subdomainsCollection.deleteMany({ userId });
      await issuesCollection.deleteMany({ userId });

      return { code: 200, success: true, message: SUCCESS_DELETED_ALL };
    }

    const [siteExist, collection] = await WebsitesController({
      user,
    }).getWebsite({ userId, url }, true);

    if (!siteExist) {
      throw new Error(WEBSITE_NOT_FOUND);
    }

    if (typeof userId !== "undefined") {
      const deleteQuery = { domain: siteExist?.domain, userId };

      const [
        history,
        historyCollection,
      ] = await HistoryController().getHistoryItem(deleteQuery, true);

      await scriptsCollection.deleteMany(deleteQuery);
      await analyticsCollection.deleteMany(deleteQuery);
      await subdomainsCollection.deleteMany(deleteQuery);
      await issuesCollection.deleteMany(deleteQuery);
      await collection.findOneAndDelete(deleteQuery);

      if (!history) {
        historyCollection.insertOne({
          ...siteExist,
          deletedDate: new Date(),
        });
      }

      return { website: siteExist, code: 200, success: true, message: SUCCESS };
    }

    throw new Error(WEBSITE_NOT_FOUND);
  },
  updateWebsite: async ({ userId, url, pageHeaders }) => {
    try {
      const [website, collection] = await WebsitesController({
        user,
      }).getWebsite({ userId, url }, true);

      if (!website) {
        throw new Error(WEBSITE_NOT_FOUND);
      }

      let pageHeaderSrc =
        pageHeaders && pageHeaders?.length === 1 && !pageHeaders[0].key
          ? null
          : pageHeaders;

      const pageParams = pageHeaders ? { pageHeaders: pageHeaderSrc } : {};

      await collection.updateOne({ url, userId }, { $set: pageParams });

      return { website, code: 200, success: true, message: SUCCESS };
    } catch (e) {
      console.error(e);
    }
  },
});

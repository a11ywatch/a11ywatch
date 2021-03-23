/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/

import getPageSpeed from "get-page-speed";
import { arrayAverage } from "@app/core/utils";
import { getWebsitesCrawler } from "../../websites/find";
import { getDomains } from "../find";

export const generateWebsiteAverage = async (
  {
    url,
    domain,
    perfectScore,
    userId,
  }: { url?: string; domain?: string; perfectScore?: boolean; userId?: number },
  [allWebSites, websiteCollection] = [undefined, undefined]
) => {
  try {
    if (typeof allWebSites === "undefined") {
      [allWebSites, websiteCollection] = await getWebsitesCrawler(
        {
          domain,
          userId,
        },
        true
      );
    }

    const allDomains = await getDomains({
      domain,
      userId,
    });
    const getAvgAdaScore = allDomains
      .filter((subd) => subd?.adaScore)
      .map((fDomain) => fDomain?.adaScore);
    const averageItems = arrayAverage(getAvgAdaScore);
    const avgScore = isNaN(averageItems) || perfectScore ? 100 : averageItems;
    const getAVGSpeed = allDomains
      .filter((subd) => subd?.pageLoadTime?.duration)
      .map((fDomain) => fDomain?.pageLoadTime?.duration);
    const averageDuration = arrayAverage(getAVGSpeed);
    const pageLoadTime = {
      duration: averageDuration,
      durationFormated: getPageSpeed(averageDuration),
      color:
        averageDuration <= 1500
          ? "#A5D6A7"
          : averageDuration <= 3000
          ? "#E6EE9C"
          : "#EF9A9A",
    };

    if (allWebSites?.length) {
      await websiteCollection.updateOne(
        { domain, userId },
        {
          $set: {
            adaScore: avgScore,
            pageLoadTimeAverage: pageLoadTime,
            online: true,
          },
        }
      );
    }

    return avgScore;
  } catch (e) {
    console.error(e);
  }
};

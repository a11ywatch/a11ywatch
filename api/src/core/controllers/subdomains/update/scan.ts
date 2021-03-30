/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/

import validUrl from "valid-url";
import { sourceBuild } from "@a11ywatch/website-source-builder";
import { log } from "@a11ywatch/log";
import { ApiResponse, responseModel, makeWebsite } from "@app/core/models";
import { getWebsite } from "../../websites";
import { fetchPuppet, extractPageData, limitIssue } from "./utils";
import { createReport } from "../../reports";

export const scanWebsite = async ({ userId: userIdMap, url: urlMap }: any) => {
  const userId = Number(!userIdMap && userIdMap !== 0 ? -1 : userIdMap);

  if (!validUrl.isUri(urlMap)) {
    return responseModel({ msgType: ApiResponse.NotFound });
  }

  const { url, domain, pageUrl } = sourceBuild(urlMap, userId);

  if (
    process.env.NODE_ENV === "production" &&
    pageUrl.includes("http://localhost:")
  ) {
    throw new Error("Cannot use localhost, please use a valid web url.");
  }

  let [website] = await getWebsite(
    {
      domain,
      userId,
    },
    true
  );

  if (!website) {
    website = makeWebsite({ url, domain });
  }

  return await new Promise(async (resolve, reject) => {
    try {
      const dataSource = await fetchPuppet({
        pageHeaders: website?.pageHeaders,
        url: urlMap,
        userId,
        authed: false,
      });

      if (dataSource) {
        if (!dataSource?.webPage) {
          resolve({
            website: null,
            code: 300,
            success: false,
            message:
              "Website timeout exceeded threshhold for free scan, website rendered to slow under 15000 ms",
          });
        }
        let { issues, webPage, pageHasCdn } = extractPageData(dataSource);

        const updateWebsiteProps = {
          ...website,
          ...webPage,
          cdnConnected: pageHasCdn,
          timestamp: new Date().getTime(),
        };

        const slicedIssue = limitIssue(issues);

        if (updateWebsiteProps.issuesInfo) {
          updateWebsiteProps.issuesInfo.limitedCount = slicedIssue.length;
        }

        await createReport(updateWebsiteProps, slicedIssue ?? issues);

        resolve(
          responseModel({
            website: {
              ...website,
              issue: slicedIssue,
              ...updateWebsiteProps,
              script: null,
            },
          })
        );
      } else {
        resolve(responseModel());
      }
    } catch (e) {
      log(e);
      reject(e);
    }
  });
};

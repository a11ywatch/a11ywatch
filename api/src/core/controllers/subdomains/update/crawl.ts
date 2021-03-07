/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/

import validUrl from "valid-url";
import { emailMessager } from "@app/core/messagers";
import { sourceBuild } from "@a11ywatch/website-source-builder";
import { log } from "@a11ywatch/log";
import { pubsub } from "@app/core/graph/subscriptions";
import { SUBDOMAIN_ADDED, ISSUE_ADDED, WEBSITE_ADDED } from "@app/core/static";
import { ApiResponse, responseModel } from "@app/core/models";
import { collectionUpsert } from "@app/core/utils";
import { IssuesController } from "../../issues";
import { ScriptsController } from "../../scripts";
import { getWebsite } from "../../websites";
import { AnalyticsController } from "../../analytics";
import { getDomain } from "../find";
import { generateWebsiteAverage } from "./domain";
import { fetchPuppet, extractPageData, limitResponse } from "./utils";

export const crawlWebsite = async ({
  userId,
  url: urlMap,
  apiData = false,
}) => {
  if (
    !validUrl.isUri(urlMap) ||
    (process.env.NODE_ENV === "production" && urlMap?.includes("localhost:"))
  ) {
    return responseModel({ msgType: ApiResponse.NotFound });
  }
  const { domain, pageUrl } = sourceBuild(urlMap);
  const authenticated = typeof userId !== "undefined";

  return await new Promise(async (resolve) => {
    try {
      const [website, websiteCollection] = await getWebsite(
        {
          domain,
          userId,
        },
        true
      );

      const dataSource = await fetchPuppet({
        pageHeaders: website?.pageHeaders,
        url: urlMap,
        userId,
        authed: authenticated,
      });

      if (!dataSource) {
        return resolve(responseModel());
      }
      if (!dataSource?.webPage) {
        return resolve({
          website: null,
          code: 300,
          success: false,
          message: `Website timeout exceeded threshhold ${
            authenticated ? "" : "for free scan"
          }, website rendered to slow or does not exist, please check your url and try again`,
        });
      }

      let {
        script,
        issues,
        webPage,
        pageHasCdn,
        errorCount,
        noticeCount,
        warningCount,
        adaScore,
      } = extractPageData(dataSource);

      const [newSite, subDomainCollection] = await getDomain(
        {
          userId,
          url: pageUrl,
        },
        true
      );

      const [issueExist, issuesCollection] = await IssuesController().getIssue(
        { pageUrl, userId, noRetries: true },
        true
      );
      const [
        analytics,
        analyticsCollection,
      ] = await AnalyticsController().getWebsite({ pageUrl, userId }, true);
      const [scripts, scriptsCollection] = await ScriptsController().getScript(
        { pageUrl, userId, noRetries: true },
        true
      );

      const newIssue = Object.assign({}, issues, {
        domain,
        userId,
        pageUrl,
      });

      if (issues?.issues?.length) {
        pubsub.publish(ISSUE_ADDED, { issueAdded: newIssue });
        await emailMessager.sendMail({
          userId,
          data: issues,
          confirmedOnly: true,
        });
      }

      const avgScore = await generateWebsiteAverage(
        {
          domain,
          // cdnConnected: pageHasCdn,
          userId,
        },
        [website, websiteCollection]
      );

      const updateWebsiteProps = Object.assign(
        {},
        {
          issuesInfo: webPage?.issuesInfo || {},
          screenshot: webPage?.screenshot,
          screenshotStill: webPage?.screenshotStill,
          html: webPage.html,
          lastScanDate: webPage?.lastScanDate,
          adaScore: avgScore,
          pageLoadTime: webPage?.pageLoadTime,
          cdnConnected: website?.cdnConnected,
          online: !!website?.online || null,
          domain,
          userId,
          pageUrl,
        }
      );

      if (website?.url === pageUrl) {
        updateWebsiteProps.cdnConnected = pageHasCdn;
        updateWebsiteProps.pageLoadTime = webPage?.pageLoadTime;
        updateWebsiteProps.online = true;
      }

      await collectionUpsert(
        {
          pageUrl,
          domain,
          errorCount,
          warningCount,
          noticeCount,
          userId,
          adaScore,
        },
        [analyticsCollection, analytics, "ANALYTICS"]
      );

      await collectionUpsert(newIssue, [
        issuesCollection,
        issueExist,
        "ISSUES",
      ]);
      await collectionUpsert(updateWebsiteProps, [
        websiteCollection,
        website,
        "WEBSITE",
      ]);
      if (script) {
        if (!scripts?.scriptMeta) {
          script.scriptMeta = {
            skipContentEnabled: true,
          };
          await collectionUpsert(script, [
            scriptsCollection,
            scripts,
            "SCRIPTS",
          ]);
        }
      }
      if (webPage) {
        await collectionUpsert(
          webPage,
          [subDomainCollection, newSite, "SUBDOMAIN"],
          { searchProps: { pageUrl, userId } }
        );

        if (!newSite) {
          pubsub.publish(SUBDOMAIN_ADDED, {
            subDomainAdded: webPage,
          });
        }
      }

      const websiteAdded = Object.assign({}, website, updateWebsiteProps);

      if (authenticated) {
        pubsub.publish(WEBSITE_ADDED, { websiteAdded });
      }

      const limitedResponse = limitResponse({
        issues,
        pageUrl,
        script,
        websiteAdded,
        authenticated,
      });

      resolve(
        responseModel(
          limitedResponse ?? { data: apiData ? dataSource : websiteAdded }
        )
      );
    } catch (e) {
      log(e, { type: "error" });
      return responseModel();
    }
  });
};

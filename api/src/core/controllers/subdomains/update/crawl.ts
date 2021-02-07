/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/

import validUrl from "valid-url";
import { emailMessager } from "@app/core/messagers";
import { sourceBuild } from "@a11ywatch/website-source-builder";
import { pubsub } from "@app/core/subscriptions";
import { SUBDOMAIN_ADDED, ISSUE_ADDED, WEBSITE_ADDED } from "@app/core/static";
import { ApiResponse, responseModel } from "@app/core/models";
import { IssuesController } from "../../issues";
import { ScriptsController } from "../../scripts";
import { getWebsite } from "../../websites";
import { AnalyticsController } from "../../analytics";
import { getDomain } from "../find";
import { generateWebsiteAverage } from "./domain";
import { collectionUpdate, fetchPuppet, extractPageData } from "./utils";

export const crawlWebsite = async ({
  userId: userIdMap,
  url: urlMap,
  apiData = false,
}) => {
  const userId = Number(userIdMap);
  console.log(`CRAWLING:`, urlMap, `user_id:${userId}`);

  if (
    !urlMap ||
    !validUrl.isUri(urlMap) ||
    (process.env.NODE_ENV === "production" && urlMap?.includes("localhost:"))
  ) {
    return responseModel({ msgType: ApiResponse.NotFound });
  }

  let { domain, pageUrl } = sourceBuild(urlMap);

  let [website, websiteCollection] = await getWebsite(
    {
      domain,
      userId,
    },
    true
  );

  return await new Promise(async (resolve) => {
    try {
      const dataSource = await fetchPuppet({
        pageHeaders: website?.pageHeaders,
        url: urlMap,
        userId: userId,
      });

      if (dataSource) {
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
        const [
          issueExist,
          issuesCollection,
        ] = await IssuesController().getIssue(
          { pageUrl, userId, noRetries: true },
          true
        );
        const [
          analytics,
          analyticsCollection,
        ] = await AnalyticsController().getWebsite({ pageUrl, userId }, true);
        const [
          scripts,
          scriptsCollection,
        ] = await ScriptsController().getScript(
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
            lastScanDate: webPage?.lastScanDate,
            avgScore,
            adaScore: avgScore,
            cdnConnected: website?.cdnConnected,
            pageLoadTime: null,
            online: !!website?.online || null,
          }
        );

        // BIND ALL PROPS FROM WEBPAGE
        if (website?.url === pageUrl) {
          updateWebsiteProps.cdnConnected = pageHasCdn;
          updateWebsiteProps.pageLoadTime = webPage?.pageLoadTime;
          updateWebsiteProps.online = true;
        }

        if (!apiData) {
          await collectionUpdate(
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
          await collectionUpdate(newIssue, [
            issuesCollection,
            issueExist,
            "ISSUES",
          ]);
          await collectionUpdate(
            updateWebsiteProps,
            [websiteCollection, true, "WEBSITE"],
            { searchProps: { domain, userId } }
          );
          if (script) {
            if (!scripts?.scriptMeta) {
              script.scriptMeta = {
                skipContentEnabled: true,
              };
              await collectionUpdate(script, [
                scriptsCollection,
                scripts,
                "SCRIPTS",
              ]);
            }
          }
          if (webPage) {
            await collectionUpdate(
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
        }

        const websiteAdded = Object.assign({}, website, updateWebsiteProps);

        pubsub.publish(WEBSITE_ADDED, { websiteAdded });

        resolve(responseModel({ data: apiData ? dataSource : websiteAdded }));
      } else {
        resolve(responseModel());
      }
    } catch (e) {
      console.error(e);
      return responseModel();
    }
  });
};

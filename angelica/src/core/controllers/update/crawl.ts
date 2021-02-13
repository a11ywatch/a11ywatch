/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/

import { fork } from "child_process";
import validUrl from "valid-url";
import getPageSpeed from "get-page-speed";
import { format } from "prettier";

import {
  puppetPool,
  checkCdn,
  grabHtmlSource,
  scriptBuild,
} from "@app/core/lib";
import { sourceBuild } from "@a11ywatch/website-source-builder";

import { loopIssues, getPageIssues, goToPage } from "./utils";

interface IssueMeta {
  skipContentIncluded: boolean;
}
interface IssueData {
  possibleIssuesFixedByCdn: number;
  totalIssues: number;
  issuesFixedByCdn: number;
  errorCount: number;
  warningCount: number;
  noticeCount: number;
  adaScore: number;
  issueMeta: IssueMeta;
}

const forked = fork("./src/workers/cdn_worker.js", [], { detached: true });

const EMPTY_RESPONSE = {
  webPage: null,
  issues: null,
  script: null,
};

export const crawlWebsite = async ({
  userId,
  url: urlMap,
  pageHeaders,
  authed,
}) => {
  if (!validUrl.isUri(urlMap)) {
    return EMPTY_RESPONSE;
  }

  const browser = await puppetPool.acquire();
  const page = await browser?.newPage();

  const {
    domain,
    pageUrl,
    cdnSourceStripped,
    cdnJsPath,
    cdnMinJsPath,
  } = sourceBuild(urlMap);
  let resolver = {
    webPage: null,
    issues: null,
    script: null,
  };

  try {
    const [validPage] = await goToPage(page, pageUrl, browser);

    if (!validPage) {
      return EMPTY_RESPONSE;
    }

    const [issues, issueMeta] = await getPageIssues({
      urlPage: pageUrl,
      page,
      browser,
      pageHeaders,
    });

    const screenshot = await page?.screenshot();

    const pageHasCdn = await checkCdn({ page, cdnMinJsPath, cdnJsPath });
    const [html, duration] = await grabHtmlSource({
      page,
    });

    let {
      errorCount,
      warningCount,
      noticeCount,
      adaScore,
      scriptChildren,
      possibleIssuesFixedByCdn,
    } = await loopIssues({ page, issues });

    const scriptProps = {
      scriptChildren,
      domain,
      cdnSrc: cdnSourceStripped,
    };

    if (authed) {
      forked.send({
        cdnSourceStripped,
        scriptBody: scriptBuild(scriptProps, true),
        domain,
      });
    }

    forked.send({
      cdnSourceStripped,
      domain,
      screenshot,
    });

    resolver = {
      webPage: {
        domain,
        url: pageUrl,
        adaScore,
        cdnConnected: pageHasCdn,
        screenshot: "screenshots/" + cdnJsPath.replace(".js", ".png"),
        pageLoadTime: {
          duration,
          durationFormated: getPageSpeed(duration),
          color:
            duration <= 1500
              ? "#A5D6A7"
              : duration <= 3000
              ? "#E6EE9C"
              : "#EF9A9A",
        },
        html,
        htmlIncluded: !!html,
        issuesInfo: {
          possibleIssuesFixedByCdn: possibleIssuesFixedByCdn,
          totalIssues: issues?.issues?.length || 0,
          issuesFixedByCdn: pageHasCdn ? possibleIssuesFixedByCdn : 0,
          errorCount,
          warningCount,
          noticeCount,
          adaScore,
          issueMeta,
        } as IssueData,
        lastScanDate: new Date().toUTCString(),
        userId,
      },
      issues: Object.assign({}, issues, {
        domain,
        pageUrl,
        userId,
      }),
      script: {
        pageUrl,
        domain,
        script: format(scriptBuild(scriptProps, false), {
          semi: true,
          parser: "html",
        }),
        cdnUrlMinified: cdnMinJsPath,
        cdnUrl: cdnJsPath,
        cdnConnected: pageHasCdn,
        userId,
        issueMeta,
      },
    };
  } catch (e) {
    console.error(e);
  } finally {
    if (browser?.isConnected()) {
      puppetPool.clean(browser, page);
    }
  }
  return resolver;
};

/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/

import { fork } from "child_process";
import validUrl from "valid-url";
import getPageSpeed from "get-page-speed";
import { format } from "prettier";
import { log } from "@a11ywatch/log";
import { CDN_URL } from "@app/config";

import {
  puppetPool,
  checkCdn,
  grabHtmlSource,
  scriptBuild,
} from "@app/core/lib";
import type { IssueData } from "@app/types";
import { sourceBuild } from "@a11ywatch/website-source-builder";
import { loopIssues, getPageIssues, goToPage } from "./utils";

const EMPTY_RESPONSE = {
  webPage: null,
  issues: null,
  script: null,
};

export const crawlWebsite = async ({ userId, url: urlMap, pageHeaders }) => {
  console.time(`PageCrawl ${urlMap}`);

  if (!validUrl.isUri(urlMap)) {
    return EMPTY_RESPONSE;
  }

  let browser = null;

  try {
    browser = await puppetPool.acquire();
  } catch (e) {
    log(e?.message, { type: "error" });
  }

  let page = null;

  try {
    page = await browser?.newPage();
  } catch (e) {
    log(e?.message, { type: "error" });
  }

  const {
    domain,
    pageUrl,
    cdnSourceStripped,
    cdnJsPath,
    cdnMinJsPath,
  } = sourceBuild(urlMap);

  let resolver = Object.assign({}, EMPTY_RESPONSE);

  try {
    log(`Crawling: ${urlMap} user: ${userId}`);

    console.time(`GoToPage ${urlMap}`);
    const [validPage] = await goToPage(page, urlMap, browser);
    console.timeEnd(`GoToPage ${urlMap}`);

    if (!validPage) {
      return EMPTY_RESPONSE;
    }

    console.time(`GetPageIssues ${urlMap}`);
    const [issues, issueMeta] = await getPageIssues({
      urlPage: pageUrl,
      page,
      browser,
      pageHeaders,
    });
    console.timeEnd(`GetPageIssues ${urlMap}`);

    console.time(`Screenshot ${urlMap}`);
    const [screenshot, screenshotStill] = await Promise.all([
      page.screenshot({ fullPage: true }),
      process.env.BACKUP_IMAGES
        ? page.screenshot({ fullPage: false })
        : Promise.resolve(undefined),
    ]);
    console.timeEnd(`Screenshot ${urlMap}`);

    console.time(`CheckCdn ${urlMap}`);
    const pageHasCdn = await checkCdn({ page, cdnMinJsPath, cdnJsPath });
    console.timeEnd(`CheckCdn ${urlMap}`);

    console.time(`GrabHtml ${urlMap}`);
    const [html, duration] = await grabHtmlSource({
      page,
    });
    console.timeEnd(`GrabHtml ${urlMap}`);

    console.time(`LoopIssues ${urlMap}`);
    const {
      errorCount,
      warningCount,
      noticeCount,
      adaScore,
      scriptChildren,
      possibleIssuesFixedByCdn,
    } = await loopIssues({ page, issues });
    console.timeEnd(`LoopIssues ${urlMap}`);

    const scriptProps = {
      scriptChildren,
      domain,
      cdnSrc: cdnSourceStripped,
    };

    const forked = fork(`${__dirname}/cdn_worker`, [], {
      detached: true,
    });

    forked.send({
      cdnSourceStripped,
      domain,
      screenshot,
      screenshotStill,
      scriptBody: scriptBuild(scriptProps, true),
    });
    forked.unref();

    forked.on("message", (message: string) => {
      if (message === "close") {
        forked.kill("SIGINT");
      }
    });

    const cdn_url = CDN_URL.replace("/api", "");
    const cdn_base = cdn_url + "/screenshots/";

    resolver = {
      webPage: {
        domain,
        url: pageUrl,
        adaScore,
        cdnConnected: pageHasCdn,
        screenshot: cdn_base + cdnJsPath.replace(".js", ".png"),
        screenshotStill: screenshotStill
          ? cdn_base + cdnJsPath.replace(".js", "-still.png")
          : "",
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
    log(e?.message, { type: "error" });
  } finally {
    if (browser?.isConnected()) {
      puppetPool.clean(browser, page);
    }
    console.timeEnd(`PageCrawl ${urlMap}`);
  }
  return resolver;
};

/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/

import fetch from "node-fetch";
import v8 from "v8";
import { initUrl } from "@a11ywatch/website-source-builder";
import { realUser } from "@app/core/utils";
import { emailMessager } from "@app/core/messagers";
import { crawlWebsite } from "@app/core/controllers/subdomains/update";
import { log } from "@a11ywatch/log";
import { getWebsitesWithUsers } from "../websites";
import { getPageItem } from "./utils";

export async function websiteWatch(): Promise<void> {
  const stats = v8.getHeapStatistics();
  try {
    if (
      stats.total_heap_size * 0.4 <
      stats.total_heap_size - stats.used_heap_size
    ) {
      log("Server memory near peak, failed to run all website crawl", {
        type: "error",
      });
      return Promise.resolve(undefined);
    }

    await fetch(`${process.env.MAV_CLIENT_URL}/api/init`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    });

    const allWebPages = await getWebsitesWithUsers();

    for (
      let websiteIterator = 0;
      websiteIterator < allWebPages.length;
      websiteIterator++
    ) {
      const { domain, userId, url, role } = getPageItem(
        allWebPages[websiteIterator]
      );

      if (!realUser(userId) || !domain) {
        log(`request did not run for - user id: ${userId} - domain: ${domain}`);
      } else {
        if (role === 0) {
          await crawlWebsite({
            url,
            userId,
          });
        } else {
          await fetch(`${process.env.WATCHER_CLIENT_URL}/crawl`, {
            method: "POST",
            body: JSON.stringify({
              url: new String(initUrl(url, true)),
              userId: new Number(userId),
            }),
            headers: { "Content-Type": "application/json" },
          });
        }
      }

      if (websiteIterator === allWebPages.length - 1) {
        await emailMessager.sendFollowupEmail({
          emailConfirmed: true,
          email: process.env.EMAIL_MAIN_LEAD,
          subject: `CRAWLER FINISHED ENV:${process.env.NODE_ENV}`,
          html: `<h1>All ${allWebPages.length} pages crawled </h1>`,
        });
        await fetch(`${process.env.MAV_CLIENT_URL}/api/clear`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
        });
        log("WEBSITE WATCHER FINISHED ALL WEBSITES");
      }
    }
  } catch (e) {
    log(e, { type: "error" });
  }
}

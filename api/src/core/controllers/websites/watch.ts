/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/

import fetch from "node-fetch";
import { TEMP_WATCHER_BLACKLIST } from "@app/config/server";
import { realUser, sourceBuild, initUrl } from "@app/core/utils";
import { emailMessager } from "@app/core/messagers";

import { WebsitesController } from "../websites";
import { SubDomainController } from "../subdomains";

export async function websiteWatch() {
  console.log("WATCHER SCANNING:");
  try {
    const allWebPages = (await WebsitesController().getAllWebsites()) || [];
    await fetch(`${process.env.MAV_CLIENT_URL}/api/init`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    });

    if (allWebPages?.length) {
      for (
        let websiteIterator = 0;
        websiteIterator < allWebPages.length;
        websiteIterator++
      ) {
        const item = allWebPages[websiteIterator];
        const userId = item?.userId;
        const url = item?.url;
        const role = item?.role || 0;
        if (url) {
          const { domain } = sourceBuild(url);
          if (!realUser(userId) || TEMP_WATCHER_BLACKLIST.includes(domain)) {
            !realUser(userId)
              ? console.log("NO USER:", url)
              : console.log("BLACKLISTED:", url);
          } else {
            if (role === 0) {
              console.log(`URL started: ${url}`);
              await SubDomainController().crawlWebsite({
                url,
                userId,
              });
              console.log(`URL finished: ${url}`);
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
        }

        if (websiteIterator === allWebPages.length - 1) {
          console.log("WEBSITE WATCHER FINISHED ALL WEBSITES");
          if (process.env.EMAIL_MAIN_LEAD) {
            await emailMessager.sendFollowupEmail({
              emailConfirmed: true,
              email: process.env.EMAIL_MAIN_LEAD,
              subject: `CRAWLER FINISHED ENV:${process.env.NODE_ENV}`,
              html: `<h1>All ${allWebPages.length} pages crawled </h1>`,
            });
          }
          await fetch(`${process.env.MAV_CLIENT_URL}/api/clear`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
          });
        }
      }
    }
  } catch (watch_error) {
    console.log(watch_error);
  }
}

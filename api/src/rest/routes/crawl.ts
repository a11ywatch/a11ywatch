/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/

import { UsersController } from "@app/core/controllers";
import {
  crawlWebsite as crawl,
  scanWebsite as scan,
} from "@app/core/controllers/subdomains/update";
import { log } from "@a11ywatch/log";
import { getUser, usageExceededThreshold } from "@app/core/utils";
import { TOKEN_EXPIRED_ERROR, RATE_EXCEEDED_ERROR } from "@app/core/strings";

const websiteCrawl = async (req, res) => {
  try {
    const { data } = req.body;
    const parentSub = !!req?.pubsub;

    if (data) {
      const { user_id, pages, domain } =
        typeof data === "string" ? JSON.parse(data) : data;

      if (pages?.length === 0) {
        if (domain) {
          await crawl({
            url: domain,
            userId: user_id,
            parentSub,
          });
        } else {
          await UsersController().sendWebsiteOffline({ id: user_id, domain });
          res && res.send(false);
        }
        return;
      }

      for await (const url of pages) {
        await crawl({
          url,
          userId: user_id,
          parentSub,
        });
      }

      res && res.send(true);
    }
  } catch (e) {
    log(e);
    res && res.send(false);
  }
};

const crawlWebsite = async (req, res) => {
  const url = req.query?.websiteUrl;
  const userId = req.query?.userId;

  try {
    await crawl({
      url,
      userId,
    });
  } catch (e) {
    console.error(e);
  }

  res.send(true);
};

const scanWebsite = async (req, res) => {
  const url = req.query?.websiteUrl || req.body?.websiteUrl;
  const userId = req.query?.userId || req.body?.userId;

  try {
    const data = await scan({
      url,
      userId,
    });

    res.json(data);
  } catch (e) {
    log(e);
    res.json({ message: "Error: Page not found", status: 404, success: false });
  }
};

const websiteCrawlAuthed = async (req, res) => {
  const url = req.query?.url || req.body?.url;

  if (!url) {
    res.json({
      status: 400,
      message: "URL NOT FOUND",
      success: false,
    });
    return;
  }

  const user = getUser(req.headers?.authorization);

  if (!user) {
    res.json({
      status: 400,
      message: req.headers?.authorization
        ? TOKEN_EXPIRED_ERROR
        : "USER NOT FOUND",
      success: false,
    });
    return;
  }

  const { keyid, audience } = user?.payload;

  const [userData] = await UsersController({
    user,
  }).updateApiUsage({ id: keyid }, true);

  if (
    usageExceededThreshold({ audience, usage: userData?.apiUsage?.usage || 0 })
  ) {
    res.json({
      data: null,
      status: 17,
      message: RATE_EXCEEDED_ERROR,
      success: false,
    });
    return;
  }

  let data = {};

  try {
    data = await crawl({
      url: url?.includes("http") ? url : `http://${url}`,
      userId: keyid,
      apiData: true,
    });
  } catch (e) {
    log(e);
  }

  res.json(data);
};

export { scanWebsite, crawlWebsite, websiteCrawl, websiteCrawlAuthed };

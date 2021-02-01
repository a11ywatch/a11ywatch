/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/

import { UsersController, SubDomainController } from "@app/core/controllers";
import { getUser } from "@app/core/utils";
import { TOKEN_EXPIRED_ERROR, RATE_EXCEEDED_ERROR } from "@app/core/strings";

// RESPONSE FROM WATCHER SERVICE
const websiteCrawl = async (req, res) => {
  try {
    const { data } = req.body;

    if (data) {
      const { user_id, pages, domain } = JSON.parse(data);

      if (pages?.length === 0) {
        console.log("Offline: ", domain);
        await UsersController().sendWebsiteOffline({ id: user_id, domain });
        res.send(false);
      } else {
        for (
          let websiteIterator = 0;
          websiteIterator < pages.length;
          websiteIterator++
        ) {
          await SubDomainController().crawlWebsite({
            url: pages[websiteIterator],
            userId: user_id,
          });
        }
        res.send(true);
      }
    }
  } catch (e) {
    console.error(e);
    res.send(false);
  }
};

// START WATCHER WEBSITE SCAN
const crawlWebsite = (req, res) => {
  const url = req.query?.websiteUrl;
  const userId = req.query?.userId;

  try {
    SubDomainController().crawlWebsite({
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
    const data = await SubDomainController().scanWebsite({
      url,
      userId,
    });

    res.json(data);
  } catch (e) {
    console.error(e);
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

  const usage = userData?.apiUsage?.usage;

  if (
    (audience === 0 && usage >= 3) ||
    (audience === 1 && usage >= 100) ||
    (audience === 2 && usage >= 500)
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
    data = await SubDomainController().crawlWebsite({
      url: url?.includes("http") ? url : `http://${url}`,
      userId: keyid,
      apiData: true,
    });
  } catch (e) {
    console.error(e);
  }

  res.json(data);
};

export { scanWebsite, crawlWebsite, websiteCrawl, websiteCrawlAuthed };

/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/
import { getWebsitesDaily } from "@app/core/controllers/websites/find";

const getDailyWebsites = async (req?: any, res?: any) => {
  let data = [];

  try {
    data = await getWebsitesDaily(req.query?.page ?? 0);
  } catch (e) {
    console.error(e);
  }

  res.send(data);
};

export { getDailyWebsites };

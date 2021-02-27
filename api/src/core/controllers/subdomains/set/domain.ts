/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/

import { WEBSITE_EXIST_ERROR, SUCCESS } from "@app/core/strings";
import { getLastItemInCollection } from "@app/core/utils";
import { getDomain } from "../find";

export const addDomain = async ({ userId, url, audience }) => {
  const [siteExist, collection] = await getDomain({ userId, url }, true);

  if (siteExist) {
    throw new Error(WEBSITE_EXIST_ERROR);
  }

  const lastItem = await getLastItemInCollection(collection, userId);

  const website = {
    userId,
    id: lastItem?.length && lastItem[0] ? lastItem[0].id + 1 : 0,
    url,
    adaScore: 100,
  };

  await collection.insertOne(website);

  return { website, code: 200, success: true, message: SUCCESS };
};

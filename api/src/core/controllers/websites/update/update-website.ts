/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/

import { WEBSITE_NOT_FOUND, SUCCESS } from "@app/core/strings";
import { getWebsite } from "../find";

export const updateWebsite = async ({ userId, url, pageHeaders }) => {
  try {
    const [website, collection] = await getWebsite({ userId, url }, true);

    if (!website) {
      throw new Error(WEBSITE_NOT_FOUND);
    }

    const pageHeaderSrc =
      pageHeaders?.length === 1 && !pageHeaders[0].key ? null : pageHeaders;

    const pageParams = pageHeaders ? { pageHeaders: pageHeaderSrc } : {};

    await collection.updateOne({ url, userId }, { $set: pageParams });

    return { website, code: 200, success: true, message: SUCCESS };
  } catch (e) {
    console.error(e);
  }
};

/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/

import { connect } from "@app/database";

export const getWebsitesCrawler = async (
  { userId, domain }: { userId?: any; domain?: string },
  chain?: boolean
) => {
  try {
    const [collection] = await connect("Websites");
    const searchProps = {
      domain,
      userId: typeof userId !== "undefined" ? userId : { $gt: 0 },
    };

    const websites = await collection.find(searchProps).limit(100).toArray();

    return chain ? [websites, collection] : websites;
  } catch (e) {
    console.error(e);
  }
};

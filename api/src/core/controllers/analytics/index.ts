/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/

import { connect } from "@app/database";
import { websiteSearchParams } from "@app/core/utils";

export const AnalyticsController = ({ user } = { user: null }) => ({
  getWebsite: async (
    { pageUrl, userId }: { pageUrl?: string; userId?: number },
    chain: boolean
  ) => {
    const [collection] = await connect("Analytics");
    const searchProps = websiteSearchParams({ pageUrl, userId });
    const analytics = await collection.findOne(searchProps);

    return chain ? [analytics, collection] : analytics;
  },
  getAnalytics: async ({
    userId,
    pageUrl,
    url,
  }: {
    userId?: number;
    pageUrl?: string;
    url?: string;
  }) => {
    const [collection] = await connect("Analytics");
    const searchProps = websiteSearchParams({ pageUrl, userId });
    return await collection.find(searchProps).limit(20).toArray();
  },
});

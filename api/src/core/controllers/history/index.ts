/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/
import { connect } from "@app/database";
import { websiteSearchParams } from "@app/core/utils";

export const HistoryController = ({ user } = { user: null }) => ({
  getHistoryItem: async (
    { userId, url, domain }: { userId: number; url?: string; domain?: string },
    chain
  ) => {
    try {
      const [collection] = await connect("History");
      const searchProps = websiteSearchParams({ userId, url, domain });
      const history = await collection.findOne(searchProps);

      return chain ? [history, collection] : history;
    } catch (e) {
      console.error(e);
    }
  },
  getHistory: async ({ userId }) => {
    try {
      const [collection] = await connect("History");
      return await collection.find({ userId }).limit(100).toArray();
    } catch (e) {
      console.error(e);
    }
  },
});

/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/

import {
  AnalyticsController,
  WebsitesController,
  HistoryController,
  ScriptsController,
} from "../controllers";

export const User = {
  history: async ({ id, filter, keyid }) => {
    const history = await HistoryController().getHistory({
      userId: id || keyid,
    });

    return history;
  },
  analytics: async ({ id, filter, keyid }) => {
    const analytics = await AnalyticsController().getAnalytics({
      userId: id || keyid,
    });

    return analytics;
  },
  script: async ({ id, filter, keyid }, { url, pageUrl }) => {
    const script = await ScriptsController().getScript(
      {
        userId: id || keyid,
        pageUrl: url || pageUrl,
        filter,
        noRetries: false,
      },
      false
    );
    return script;
  },
  scripts: async ({ id, filter, keyid }, { url, pageUrl }) => {
    return await ScriptsController().getScripts({
      userId: id || keyid,
      pageUrl: url || pageUrl,
    });
  },
  websites: async ({ id, filter, keyid }, extra) => {
    const websites = await WebsitesController().getWebsites({
      userId: id || keyid,
    });
    return websites;
  },
};

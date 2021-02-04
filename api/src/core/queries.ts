/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/

import { getPayLoad } from "./utils/query-payload";

export const Query = {
  website: async (_, { url }, context) => {
    return await context.models.Website.getWebsite({
      userId: context?.user?.payload?.keyid,
      url,
    });
  },
  issue: async (_, { url: pageUrl }, context) => {
    return await context.models.Issue.getIssue({
      userId: context?.user?.payload?.keyid,
      pageUrl,
    });
  },
  issues: async (_, { url: pageUrl }, context) => {
    return await context.models.Issue.getIssues({
      userId: context?.user?.payload?.keyid,
      pageUrl,
    });
  },
  websites: async (_, props, context) => {
    return await context.models.Website.getWebsites({
      userId: getPayLoad(context, props),
    });
  },
  scripts: async (_, { url: pageUrl }, context) => {
    return await context.models.Scripts.getScripts({
      userId: context?.user?.payload?.keyid,
      pageUrl,
    });
  },
  subDomains: async (_, { domain, ...props }, context) => {
    return await context.models.SubDomain.getDomains({
      userId: getPayLoad(context, props),
      domain,
    });
  },
  history: async (_, { url }, context) => {
    return await context.models.History.getHistory({
      userId: context?.user?.payload?.keyid,
      url,
    });
  },
  features: async (_, { url }, context) => {
    return await context.models.Features.getFeatures({
      userId: context?.user?.payload?.keyid,
      url,
    });
  },
  user: async (_, { id, filter, password }, context) => {
    const { userId, audience } = getPayLoad(context, {
      id,
      password,
    });
    const user = await context.models.User.getUser({
      id: userId,
    });

    return {
      ...user,
      keyid: userId,
      activeSubscription: user?.paymentSubscription?.status === "active",
      loggedIn: !!context.user,
      accountType: audience || "",
    };
  },
};

/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/

const defaultPayload = {
  keyid: null,
  audience: null,
};

export const Query = {
  website: async (_, { id, url, password }, context) => {
    const { keyid } = context.user?.payload || defaultPayload;
    const page = await context.models.Website.getWebsite({
      userId: typeof id !== "undefined" && password ? id : keyid,
      url,
    });

    return page;
  },
  issue: async (_, { id, url, password }, context) => {
    const { keyid } = context.user?.payload || defaultPayload;

    const data = await context.models.Issue.getIssue({
      userId: typeof id !== "undefined" && password ? id : keyid,
      pageUrl: url,
    });
    return data;
  },
  issues: async (_, { id, url, filter, password }, context) => {
    const { keyid } = context.user?.payload || defaultPayload;

    return await context.models.Issue.getIssues({
      userId: typeof id !== "undefined" && password ? id : keyid,
      pageUrl: url,
    });
  },
  websites: async (_, { id, url, filter, password }, context) => {
    const { keyid } = context.user?.payload || defaultPayload;
    const data = await context.models.Website.getWebsites({
      userId: typeof id !== "undefined" && password ? id : keyid,
    });

    return data;
  },
  scripts: async (_, { id, url, filter, password }, context) => {
    const { keyid } = context.user?.payload || defaultPayload;
    return await context.models.Scripts.getScripts({
      userId: typeof id !== "undefined" && password ? id : keyid,
      pageUrl: url,
    });
  },
  subDomains: async (_, { id, domain, url, password }, context) => {
    const { keyid } = context.user?.payload || defaultPayload;

    return await context.models.SubDomain.getDomains({
      userId: typeof id !== "undefined" && password ? id : keyid,
      domain,
    });
  },
  history: async (_, { id, url, password }, context) => {
    const { keyid } = context.user?.payload || defaultPayload;

    return await context.models.History.getHistory({
      userId: typeof id !== "undefined" && password ? id : keyid,
      url,
    });
  },
  features: async (_, { id, url, password }, context) => {
    const { keyid } = context.user?.payload || defaultPayload;

    return await context.models.Features.getFeatures({
      userId: typeof id !== "undefined" && password ? id : keyid,
      url,
    });
  },
  user: async (_, { id, filter, password }, context) => {
    const { keyid, audience } = context.user?.payload || defaultPayload;
    const useID =
      typeof password !== "undefined" && password === process.env.ADMIN_PASS;

    const user = await context.models.User.getUser({
      id: typeof id !== "undefined" && useID ? id : keyid,
    });

    return {
      ...user,
      keyid,
      activeSubscription: user?.paymentSubscription?.status === "active",
      loggedIn: !!context.user,
      accountType: audience || "",
    };
  },
};

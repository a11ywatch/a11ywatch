/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/

import { IssuesController } from "../controllers/issues";
import { SubDomainController } from "../controllers/subdomains";

export const History = {
  issues: async ({ userId, url }, { filter }) => {
    const issues = await IssuesController().getIssues({
      userId,
      url,
      filter,
    });
    if (["error", "notice", "warning"].includes(filter) && issues?.length) {
      const newIssues = issues.filter((item) => {
        item.issues = item.issues.filter((issue) => issue.type === filter);
        if (item.issues.length) {
          return item;
        }
        return null;
      });
      return newIssues;
    }
    return issues;
  },
  subDomains: async ({ userId, url, domain }) => {
    return await SubDomainController().getDomains({
      userId,
      url,
      domain,
    });
  },
};

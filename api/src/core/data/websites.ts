/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/
import { UsersController } from "../controllers/users";
import { IssuesController } from "../controllers/issues";
import { SubDomainController } from "../controllers/subdomains";

export const Website = {
  user: async ({ userId }) => {
    return await UsersController().getUser({ id: userId }, false);
  },
  issues: async ({ userId, url, pageUrl }, { filter }) => {
    let issues = await IssuesController().getIssues({
      userId,
      pageUrl,
      url,
      filter,
    });

    if (issues && ["error", "notice", "warning"].includes(filter)) {
      issues = issues.filter((item) => {
        if (item.issues) {
          item.issues = item.issues.filter((issue) => issue.type === filter);
        }

        return item?.issues?.length ? item : null;
      });
    }

    return issues;
  },
  subDomains: async ({ userId, url, domain }, { filter }) => {
    return await SubDomainController().getDomains({
      userId,
      url,
      domain,
    });
  },
};

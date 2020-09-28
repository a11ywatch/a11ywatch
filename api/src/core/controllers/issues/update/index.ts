/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/

// import { isSameDay } from "date-fns";
import { getIssue } from "../find";

export const updateIssues = async ({ userId, url, issuesCount, issues }) => {
  const [siteExist, collection] = await getIssue({ userId, url }, true);

  const issue = {
    ...siteExist,
    issuesCount: issuesCount || issues.count,
    issues,
  };

  await collection.updateOne({ url }, { $set: { issuesCount, issues } });

  return issue;
};

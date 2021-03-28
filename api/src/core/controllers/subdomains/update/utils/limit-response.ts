/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/
import { limitIssue } from "./limit-issue";

export const limitResponse = ({
  authenticated,
  websiteAdded,
  issues,
  pageUrl,
  script,
}: {
  authenticated: boolean;
  websiteAdded: any;
  issues: any;
  pageUrl: string;
  script: any;
}): any => {
  if (!authenticated) {
    const slicedIssue = limitIssue(issues);

    if (websiteAdded.issuesInfo) {
      websiteAdded.issuesInfo.limitedCount = slicedIssue.length;
    }

    return {
      website: {
        ...websiteAdded,
        url: pageUrl,
        issue: slicedIssue,
        script,
      },
    };
  }
};

/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/

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
}) => {
  if (!authenticated) {
    const slicedIssue =
      issues?.issues?.slice(
        issues?.issues.length -
          Math.max(Math.round(issues?.issues.length / 4), 2)
      ) || [];

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

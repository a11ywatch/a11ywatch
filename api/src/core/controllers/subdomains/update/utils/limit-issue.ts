/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/
import type { Issue } from "@app/types";
import { issueSort } from "@app/core/utils";

export const limitIssue = (issues: Issue) => {
  return (
    issues?.issues
      ?.slice(
        issues?.issues.length -
          Math.max(Math.round(issues?.issues.length / 4), 2)
      )
      .sort(issueSort) || []
  );
};

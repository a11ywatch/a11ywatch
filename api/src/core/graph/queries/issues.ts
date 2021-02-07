/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/
import { getPayLoad } from "../../utils/query-payload";

export const issue = async (_, { url: pageUrl, ...props }, context) => {
  return await context.models.Issue.getIssue({
    userId: getPayLoad(context, props),
    pageUrl,
  });
};
export const issues = async (_, { url: pageUrl, ...props }, context) => {
  return await context.models.Issue.getIssues({
    userId: getPayLoad(context, props),
    pageUrl,
  });
};

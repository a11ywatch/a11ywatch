/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/

import { withFilter } from "apollo-server";
import { ISSUE_ADDED } from "../../static";
import { pubsub } from "./pubsub";

export const issueAdded = {
  subscribe: withFilter(
    () => pubsub.asyncIterator(ISSUE_ADDED),
    (payload: any, variables: any) => {
      return payload.issueAdded.userId === variables?.userId;
    }
  ),
};

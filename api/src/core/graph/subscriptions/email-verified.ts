/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/

import { withFilter } from "apollo-server";
import { EMAIL_VERIFIED } from "../../static";
import { pubsub } from "./pubsub";

export const emailVerified = {
  subscribe: withFilter(
    () => pubsub.asyncIterator(EMAIL_VERIFIED),
    (payload: any, variables: any) => {
      return payload.emailVerified.userId === variables?.userId;
    }
  ),
};

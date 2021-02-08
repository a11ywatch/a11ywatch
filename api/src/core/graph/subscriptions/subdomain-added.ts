/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/

import { withFilter } from "apollo-server";
import { SUBDOMAIN_ADDED } from "../../static";
import { pubsub } from "./pubsub";

export const subDomainAdded = {
  subscribe: withFilter(
    () => pubsub.asyncIterator(SUBDOMAIN_ADDED),
    (payload: any, variables: any) => {
      return payload.subDomainAdded.userId === variables?.userId;
    }
  ),
};

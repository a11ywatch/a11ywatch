/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/

import { PubSub, withFilter } from "apollo-server";
import {
  WEBSITE_REMOVED,
  WEBSITE_ADDED,
  // SUBDOMAIN_REMOVED,
  SUBDOMAIN_ADDED,
  ISSUE_ADDED,
  // ISSUE_REMOVED,
  EMAIL_VERIFIED,
} from "./static";

export const pubsub = new PubSub();

const Subscription: any = {
  emailVerified: {
    subscribe: withFilter(
      () => pubsub.asyncIterator(EMAIL_VERIFIED),
      (payload: any, variables: any) => {
        return payload.emailVerified.userId === variables?.userId;
      }
    ),
  },
  issueAdded: {
    subscribe: withFilter(
      () => pubsub.asyncIterator(ISSUE_ADDED),
      (payload: any, variables: any) => {
        return payload.issueAdded.userId === variables?.userId;
      }
    ),
  },
  subDomainAdded: {
    subscribe: withFilter(
      () => pubsub.asyncIterator(SUBDOMAIN_ADDED),
      (payload: any, variables: any) => {
        return payload.subDomainAdded.userId === variables?.userId;
      }
    ),
  },
  websiteAdded: {
    subscribe: withFilter(
      () => pubsub.asyncIterator(WEBSITE_ADDED),
      (payload: any, variables: any) => {
        return payload.websiteAdded.userId === variables?.userId;
      }
    ),
  },
  websiteRemoved: {
    subscribe: withFilter(
      () => pubsub.asyncIterator(WEBSITE_REMOVED),
      (payload: any, variables: any) => {
        return payload.websiteAdded.userId === variables?.userId;
      }
    ),
  },
};

export { Subscription };

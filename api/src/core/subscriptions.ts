/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/
import {
  emailVerified,
  issueAdded,
  websiteAdded,
  pubsub,
  subDomainAdded,
  websiteRemoved,
} from "./graph/subscriptions";

const Subscription = {
  emailVerified,
  issueAdded,
  subDomainAdded,
  websiteAdded,
  websiteRemoved,
};

export { pubsub, Subscription };

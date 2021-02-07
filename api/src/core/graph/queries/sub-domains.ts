/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/
import { getPayLoad } from "../../utils/query-payload";

export const subDomains = async (_, { domain, ...props }, context) => {
  return await context.models.SubDomain.getDomains({
    userId: getPayLoad(context, props),
    domain,
  });
};

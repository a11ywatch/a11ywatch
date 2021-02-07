/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/

import { getPayLoad } from "../../utils/query-payload";

export const addWebsite = async (
  _,
  { url, customHeaders, ...props },
  context
) => {
  const { audience, userId } = getPayLoad(context, props);

  return await context.models.Website.addWebsite({
    userId,
    url,
    audience,
    customHeaders,
  });
};

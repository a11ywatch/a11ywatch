/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/

import { getPayLoad } from "../../utils/query-payload";

export const user = async (_, { id, filter, password }, context) => {
  const { models, ...ctx } = context;
  const { userId, audience } = getPayLoad(ctx, {
    id,
    password,
  });
  const user = await models.User.getUser({
    id: userId,
  });

  return {
    ...user,
    keyid: userId,
    activeSubscription: user?.paymentSubscription?.status === "active",
    loggedIn: !!ctx.user,
    accountType: audience || "",
  };
};

/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/

import { EMAIL_ERROR } from "../../strings";
import { getPayLoad } from "../../utils/query-payload";

export const updateUser = async (
  _,
  { email, password, newPassword, stripeToken },
  context
) => {
  const { subject } = getPayLoad(context);
  const loginUser = await context.models.User.updateUser({
    email: subject || email,
    password,
    newPassword,
    stripeToken,
  });

  if (!loginUser) {
    throw new Error(EMAIL_ERROR);
  }

  return loginUser;
};

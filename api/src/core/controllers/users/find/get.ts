/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/

import { userParams } from "@app/core/utils/controller-filter";
import { connect } from "@app/database";

export const getUsers = async (chain?: boolean) => {
  try {
    const [collection] = await connect("Users");
    const users = await collection.find().limit(20).toArray();
    return chain ? [users, collection] : users;
  } catch (e) {
    console.error(e);
  }
};

export const getAllUsers = async (chain?: boolean) => {
  try {
    const [collection] = await connect("Users");
    const users = await collection.find().limit(1000).toArray();
    return chain ? [users, collection] : users;
  } catch (e) {
    console.error(e);
  }
};

type GetUserParams = {
  email?: string;
  id?: number;
  emailConfirmCode?: string;
};

export const getUser = async (
  { email, id, emailConfirmCode }: GetUserParams,
  chain?: boolean
) => {
  try {
    const searchProps = userParams({ email, id, emailConfirmCode });
    const [collection] = await connect("Users");
    const user = await collection.findOne(searchProps);

    return chain ? [user, collection] : user;
  } catch (e) {
    console.error(e);
  }
};

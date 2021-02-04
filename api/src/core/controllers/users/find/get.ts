/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/

import { userParams } from "@app/core/utils/controller-filter";
import { connect } from "@app/database";

export const getUsers = async (chain?: boolean, count: number = 20) => {
  try {
    const [collection] = await connect("Users");
    const users = await collection.find().limit(count).toArray();
    return chain ? [users, collection] : users;
  } catch (e) {
    console.error(e);
  }
};

export const getAllUsers = async (chain?: boolean) => {
  try {
    return await getUsers(chain, 10000);
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
    const [collection] = await connect("Users");
    const user = await collection.findOne(
      userParams({ email, id, emailConfirmCode })
    );

    return chain ? [user, collection] : user;
  } catch (e) {
    console.error(e);
  }
};

/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/
import { getUser } from "../find";

export const unsubscribeEmails = async ({ id, email }) => {
  try {
    const [user, collection] = await getUser({ id, email }, true);
    console.log(`user ${user.id} unsubscribed`);

    await collection.findOneAndUpdate(
      { id },
      {
        $set: {
          emailAlerts: false,
          alertEnabled: false,
        },
      }
    );
  } catch (e) {
    console.error(e);
  }

  return true;
};

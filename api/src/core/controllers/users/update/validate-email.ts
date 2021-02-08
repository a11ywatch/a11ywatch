/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/
import { isBefore } from "date-fns";
import { pubsub } from "@app/core/graph/subscriptions";
import { EMAIL_VERIFIED } from "../../../static";
import { getUser } from "../find";

export const validateEmail = async ({ code }) => {
  if (code) {
    const [user, collection] = await getUser({ emailConfirmCode: code }, true);

    if (user && isBefore(new Date(), new Date(user?.emailExpDate))) {
      await collection.findOneAndUpdate(
        { id: user.id },
        {
          $set: {
            emailConfirmed: true,
            emailExpDate: undefined,
            emailConfirmCode: undefined,
          },
        }
      );

      pubsub.publish(EMAIL_VERIFIED, { emailVerified: true });

      return true;
    }
    return false;
  } else {
    return false;
  }
};

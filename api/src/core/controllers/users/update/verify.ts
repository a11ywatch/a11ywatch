/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/

import { EMAIL_ERROR } from "../../../strings";
import { saltHashPassword, signJwt } from "../../../utils";
import { getNextSequenceValue } from "../../counters";
import { getUser } from "../find";

const verifyUser = async ({ password, email, googleId }) => {
  const [user, collection] = await getUser({ email }, true);

  if (!user) {
    throw new Error(EMAIL_ERROR);
  }

  const salthash = user && !googleId && saltHashPassword(password, user?.salt);

  if (user?.password === salthash?.passwordHash || googleId) {
    let id = user?.id;
    let updateCollectionProps = {};

    if (user?.id === null) {
      id = await getNextSequenceValue("Users");
      updateCollectionProps = { id };
    }
    const jwt = signJwt({
      email: email || user?.email,
      role: user?.role,
      keyid: id,
    });

    updateCollectionProps = { ...updateCollectionProps, jwt };

    if (googleId) {
      updateCollectionProps = { ...updateCollectionProps, googleId };
    }

    await collection.updateOne({ email }, { $set: updateCollectionProps });
    return {
      ...user,
      jwt,
    };
  }

  throw new Error(EMAIL_ERROR);
};

export { verifyUser };

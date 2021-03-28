/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/

import { EMAIL_ERROR } from "../../../strings";
import { saltHashPassword, signJwt } from "../../../utils";
import { getNextSequenceValue } from "../../counters";
import { getUser } from "../find";
import { confirmEmail } from "../update/confirm-email";

export const createUser = async ({ email, password, googleId, role = 0 }) => {
  if (!email) {
    throw new Error(EMAIL_ERROR);
  }
  const [user, collection] = await getUser({ email }, true);
  const googleAuthed = user && (user.googleId || googleId);
  const salthash = (password && saltHashPassword(password, user?.salt)) || {};

  if (user?.salt || googleAuthed) {
    if (user?.password === salthash?.passwordHash || googleId) {
      let keyid = user?.id;
      let updateCollectionProps = {};

      if (typeof user?.id === "undefined" || user?.id === null) {
        keyid = await getNextSequenceValue("Users");
        updateCollectionProps = { id: keyid };
      }

      const jwt = signJwt({
        email: user?.email,
        role: user?.role || 0,
        keyid,
      });

      updateCollectionProps = { ...updateCollectionProps, jwt };

      if (googleId) {
        updateCollectionProps = { ...updateCollectionProps, googleId };
      }

      await collection.updateOne(
        { email },
        {
          $set: updateCollectionProps,
        }
      );

      return user;
    } else {
      throw new Error(EMAIL_ERROR);
    }
  } else {
    const id = await getNextSequenceValue("Users");
    const userObject = {
      email,
      password: salthash?.passwordHash,
      salt: salthash?.salt,
      id,
      jwt: signJwt({ email, role, keyid: id }),
      role,
      alertEnabled: true,
      emailConfirmed: false,
      googleId,
      profileVisible: false,
    };

    await collection.insertOne(userObject);
    await confirmEmail({ keyid: id });

    return userObject;
  }
};

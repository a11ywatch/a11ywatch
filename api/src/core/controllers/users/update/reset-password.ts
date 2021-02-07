/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/

import { randomBytes } from "crypto";

import { EMAIL_ERROR, GENERAL_ERROR } from "../../../strings";
import {
  transporter,
  mailOptions,
  saltHashPassword,
  signJwt,
  sendMailCallback,
} from "../../../utils";
import { getUser } from "../find";

export const resetPassword = async ({ email, resetCode }) => {
  if (!email) {
    throw new Error(EMAIL_ERROR);
  }
  const [user, collection] = await getUser({ email }, true);

  if (user?.resetCode === resetCode) {
    try {
      const resetCode = randomBytes(4).toString("hex");
      const salthash = saltHashPassword(resetCode);

      const signedToken = signJwt({
        email,
        keyid: user.id,
        role: user.role || 0,
      });

      await collection.findOneAndUpdate(
        { id: user.id },
        {
          $set: {
            password: salthash.passwordHash,
            salt: salthash.salt,
            jwt: signedToken,
          },
        }
      );

      await transporter.verify();
      await transporter.sendMail(
        {
          ...mailOptions,
          to: user.email,
          subject: `A11yWatch - Temporary Password.`,
          html: `<h1>${resetCode} is your temp password. Login and go to profile to reset now.</h1>`,
        },
        sendMailCallback
      );

      return { jwt: signedToken };
    } catch (e) {
      console.error(e);
    }
  } else {
    throw new Error(GENERAL_ERROR);
  }
};

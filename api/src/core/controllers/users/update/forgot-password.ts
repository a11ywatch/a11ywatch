/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/

import { randomBytes } from "crypto";
import { logoSvg } from "@app/html";

import { EMAIL_ERROR, GENERAL_ERROR } from "../../../strings";
import { transporter, mailOptions, sendMailCallback } from "../../../utils";
import { getUser } from "../find";

export const forgotPassword = async ({ email }) => {
  if (!email) {
    throw new Error(EMAIL_ERROR);
  }
  const [user, collection] = await getUser({ email }, true);

  if (user) {
    try {
      const resetCode = randomBytes(4).toString("hex");
      await collection.findOneAndUpdate(
        { id: user.id },
        { $set: { resetCode } }
      );
      await transporter.verify();
      await transporter.sendMail(
        {
          ...mailOptions,
          to: user.email,
          subject: `A11yWatch - Password reset.`,
          html: `${logoSvg}<br /><h1>${resetCode} is your password reset code.</h1>`,
        },
        sendMailCallback
      );

      return { email: "true" };
    } catch (e) {
      console.error(e);
    }
  } else {
    throw new Error(GENERAL_ERROR);
  }
};

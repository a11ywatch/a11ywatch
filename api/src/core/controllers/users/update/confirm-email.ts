/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/

import { addMinutes } from "date-fns";
import { randomBytes } from "crypto";
import { config } from "@app/config";
import { logoSvg } from "@app/html";
import { EMAIL_ERROR, GENERAL_ERROR, SUCCESS } from "../../../strings";
import { transporter, mailOptions } from "../../../utils";
import { getUser } from "../find";

const { ROOT_URL } = config;

export const confirmEmail = async ({ keyid }) => {
  if (typeof keyid === "undefined") {
    throw new Error(EMAIL_ERROR);
  }
  const [user, collection] = await getUser({ id: keyid }, true);

  if (user) {
    const emailConfirmCode = randomBytes(4).toString("hex");
    const resetLink = `${ROOT_URL}/api/confirmEmail?code=${emailConfirmCode}`;
    const emailExpDate = addMinutes(Date.now(), 30);
    try {
      await transporter.verify();
      await transporter.sendMail(
        {
          ...mailOptions,
          to: user.email,
          subject: `A11yWatch - Email Confirmation.`,
          html: `
            ${logoSvg}
            <br />
            <h1>Click on this link to confirm your email for A11yWatch.</h1>
            <p>Confirmation code will expire in 30 minutes or you have to get a new link.</p>
            <a href="${resetLink}" aria-label="Confirm your email for a11ywatch">CONFIRM EMAIL</a>
            <p>Please do not reply back to this email, it will not be read</p>
            `,
        },
        async (error, info) => {
          if (error) {
            console.log(error);
          } else {
            console.log("Email sent: " + info.response);
            await collection.findOneAndUpdate(
              { id: user.id },
              { $set: { emailConfirmCode, emailExpDate } }
            );
          }
        }
      );
    } catch (e) {
      console.error(e);
      throw new Error(GENERAL_ERROR);
    }
  } else {
    throw new Error(GENERAL_ERROR);
  }
  return { code: 200, success: true, message: SUCCESS };
};

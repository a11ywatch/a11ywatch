/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/

import { isBefore } from "date-fns";
import { footer } from "@app/html";
import { GENERAL_ERROR, PASSWORD_ERROR, SUCCESS } from "../../strings";
import {
  transporter,
  mailOptions,
  saltHashPassword,
  signJwt,
  sendMailCallback,
} from "../../utils";
import { getWebsite } from "../websites";
import { getUsers, getUser, getAllUsers } from "./find";
import {
  updateApiUsage,
  updateScanAttempt,
  toggleAlert,
  toggleProfile,
  verifyUser,
  forgotPassword,
  confirmEmail,
  unsubscribeEmails,
  resetPassword,
  validateEmail,
  addPaymentSubscription,
  cancelSubscription,
} from "./update";
import { createUser } from "./set";
import type { UserControllerType } from "./types";

export const UsersController: UserControllerType = (
  { user: _user } = { user: null }
) => ({
  getUsers,
  getAllUsers,
  getUser,
  updateApiUsage,
  verifyUser,
  createUser,
  addPaymentSubscription,
  cancelSubscription,
  updateUser: async ({ password, email, newPassword, stripeToken }) => {
    const [user, collection] = await getUser({ email }, true);

    const salthash = saltHashPassword(password, user?.salt);

    if (user?.password === salthash?.passwordHash) {
      const jwt = await signJwt({
        email,
        role: user.role,
        keyid: user.id,
      });
      const newSaltHash = saltHashPassword(newPassword);

      await collection.updateOne(
        { email },
        {
          $set: {
            jwt,
            password: newPassword,
            salt: newSaltHash.salt,
            stripeToken,
          },
        }
      );

      return {
        user,
        jwt,
        code: 200,
        success: true,
        message: SUCCESS,
      };
    }

    if (user?.password !== salthash?.passwordHash) {
      throw new Error(PASSWORD_ERROR);
    }

    throw new Error(GENERAL_ERROR);
  },
  forgotPassword,
  resetPassword,
  toggleAlert,
  toggleProfile,
  confirmEmail,
  updateScanAttempt,
  validateEmail,
  unsubscribeEmails,
  sendWebsiteOffline: async ({ id, domain }) => {
    try {
      const [user, collection] = await getUser({ id }, true);

      if (user?.emailAlerts === false || !domain) {
        return false;
      }

      const [website, websiteCollection] = await getWebsite(
        { userId: id, domain },
        true
      );

      if (website) {
        await websiteCollection.findOneAndUpdate(
          { userId: id, domain: domain },
          {
            $set: {
              online: false,
            },
          }
        );
      }

      let shouldEmail = false;

      if (user?.downAlerts?.length) {
        const newAlerts = user?.downAlerts?.map((item: any) => {
          if (
            item.domain === domain &&
            isBefore(new Date(), new Date(item?.date))
          ) {
            shouldEmail = true;
            item.date = new Date().toUTCString();
          }
          return item;
        });
        if (shouldEmail) {
          await collection.findOneAndUpdate(
            { id: id },
            {
              $set: {
                downAlerts: newAlerts,
              },
            }
          );
        }
      } else {
        const downAlerts = [{ domain, date: new Date().toUTCString() }];
        shouldEmail = true;
        await collection.findOneAndUpdate(
          { id: id },
          {
            $set: {
              downAlerts,
            },
          }
        );
      }
      if (shouldEmail) {
        await transporter.verify();
        await transporter.sendMail(
          {
            ...mailOptions,
            to: user.email,
            subject: `${domain} is Offline.`,
            html: `<h1>${domain} is currently offline.</h1><br /><p>Please check your server logs to see what happened if issues are difficult to figure out.</p><br />${footer.marketing(
              { userId: id, domain }
            )}`,
          },
          sendMailCallback
        );
      }
    } catch (e) {
      console.error(e);
      return false;
    }
  },
});

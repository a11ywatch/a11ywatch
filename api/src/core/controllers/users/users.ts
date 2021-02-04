/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/

import { addMinutes, isBefore } from "date-fns";
import { randomBytes } from "crypto";

import { config } from "@app/config";
import { footer, logoSvg } from "@app/html";

import {
  EMAIL_ERROR,
  GENERAL_ERROR,
  PASSWORD_ERROR,
  SUCCESS,
} from "../../strings";
import {
  transporter,
  mailOptions,
  saltHashPassword,
  signJwt,
} from "../../utils";
import { pubsub } from "../../subscriptions";
import { EMAIL_VERIFIED } from "../../static";
import { getNextSequenceValue } from "../counters";
import { WebsitesController } from "../websites";
import { getUsers, getUser, getAllUsers } from "./find";
import {
  updateApiUsage,
  updateScanAttempt,
  toggleAlert,
  verifyUser,
  forgotPassword,
} from "./update";
import type { UserControllerType } from "./types";

const { STRIPE_KEY, STRIPE_PREMIUM_PLAN, STRIPE_BASIC_PLAN, ROOT_URL } = config;

const stripe = require("stripe")(STRIPE_KEY);

export const UsersController: UserControllerType = (
  { user: _user } = { user: null }
) => ({
  getUsers,
  getAllUsers,
  getUser,
  updateApiUsage,
  verifyUser,
  createUser: async ({ email, password, googleId, role = 0 }) => {
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
        alertEnabled: false,
        emailConfirmed: false,
        googleId,
      };

      await collection.insertOne(userObject);
      await UsersController({ user: _user }).confirmEmail({ keyid: id });

      return userObject;
    }
  },
  addPaymentSubscription: async ({ email, userId, stripeToken }) => {
    const [user, collection] = await getUser({ email }, true);

    if (user && stripeToken) {
      const parsedToken = JSON.parse(stripeToken);

      let customer = !user.stripeID
        ? await stripe.customers.create({
            email,
          })
        : { id: user.stripeID };

      if (user.stripeID) {
        customer = await stripe.customers.retrieve(user.stripeID);
        if (customer.deleted) {
          customer = await stripe.customers.create({
            email,
          });
        }
      }

      if (customer) {
        const stripeCustomer = await stripe.customers.createSource(
          customer.id,
          {
            source: parsedToken.id,
          }
        );

        let plan = STRIPE_BASIC_PLAN;

        if (parsedToken.plan === 1) {
          plan = STRIPE_PREMIUM_PLAN;
        }

        const charge = await stripe.subscriptions.create({
          customer: stripeCustomer.customer,
          items: [
            {
              plan: `plan_${plan}`,
            },
          ],
        });

        if (charge) {
          console.log("charge stripe account", charge);
          const role =
            charge.plan.amount === 1000
              ? 1
              : charge.plan.amount === 2000
              ? 2
              : user.role;

          const jwt = signJwt({ email, role, keyid: user.id });
          user.jwt = jwt;

          await collection.updateOne(
            { email },
            {
              $set: {
                stripeToken,
                jwt,
                role,
                stripeID: customer.id,
                paymentSubscription: charge,
              },
            }
          );
        }
      }

      return {
        user,
        code: 200,
        success: true,
        message: SUCCESS,
      };
    }

    return { code: 404, success: false, message: EMAIL_ERROR };
  },
  cancelSubscription: async ({ email }) => {
    const [user, collection] = await getUser({ email }, true);

    if (!user) {
      throw new Error(EMAIL_ERROR);
    }

    if (user && user.stripeID) {
      const customer = await stripe.customers.retrieve(user.stripeID);
      if (
        customer &&
        customer.subscriptions &&
        customer.subscriptions.data.length
      ) {
        const deletedSubscription = customer.subscriptions.data.every(
          (item) => {
            return stripe.subscriptions.del(item.id);
          }
        );

        if (deletedSubscription) {
          const jwt = signJwt({
            email: user?.email,
            role: 0,
            keyid: user.id,
          });

          user.jwt = jwt;
          user.role = 0;

          await collection.updateOne(
            { email },
            {
              $set: {
                jwt,
                role: 0,
                lastRole: user.role,
              },
            }
          );
        }
      }
    }

    return {
      user,
      code: 200,
      success: true,
      message: SUCCESS,
    };
  },
  updateUser: async ({ password, email, newPassword, stripeToken }) => {
    const [user, collection] = await getUser({ email }, true);

    const salthash = password && saltHashPassword(password, user.salt);

    if (password && salthash && user.password === salthash.passwordHash) {
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

    if (password && salthash && user.password !== salthash.passwordHash) {
      throw new Error(PASSWORD_ERROR);
    }

    throw new Error(GENERAL_ERROR);
  },
  forgotPassword,
  resetPassword: async ({ email, resetCode }) => {
    if (!email) {
      throw new Error(EMAIL_ERROR);
    }
    const [user, collection] = await getUser({ email }, true);

    if (user && user.resetCode === resetCode) {
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
          (em_error, info) => {
            if (em_error) {
              console.log(em_error);
            } else {
              console.log("Email sent: " + info.response);
            }
          }
        );

        return { jwt: signedToken };
      } catch (e) {
        console.error(e);
      }
    } else {
      throw new Error(GENERAL_ERROR);
    }
  },
  toggleAlert,
  confirmEmail: async ({ keyid }) => {
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
          (error, info) => {
            if (error) {
              console.log(error);
            } else {
              console.log("Email sent: " + info.response);
              collection.findOneAndUpdate(
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
  },
  updateScanAttempt,
  validateEmail: async ({ code }) => {
    if (code) {
      const [user, collection] = await getUser(
        { emailConfirmCode: code },
        true
      );

      if (user && isBefore(new Date(), new Date(user?.emailExpDate))) {
        collection.findOneAndUpdate(
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
  },
  unsubscribeEmails: async ({ id, email }) => {
    try {
      const [user, collection] = await getUser({ id: id, email }, true);

      console.log(`unsubscribed emails`, user);
      // email alerts disabled
      collection.findOneAndUpdate(
        { id: id },
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
  },
  sendWebsiteOffline: async ({ id, domain }) => {
    try {
      const [user, collection] = await getUser({ id }, true);

      // email alerts disabled
      if (user?.emailAlerts === false || !domain) {
        return false;
      }

      const [website, websiteCollection] = await WebsitesController({
        user: _user,
      }).getWebsite({ userId: id, domain }, true);

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
          (er, info) => {
            if (er) {
              console.error(er);
            } else {
              console.log("Email sent: " + info.response);
            }
          }
        );
      }
    } catch (e) {
      console.error(e);
      return false;
    }
  },
});

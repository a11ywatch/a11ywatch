/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/

import { fork } from "child_process";
import { EMAIL_ERROR, CRAWLER_FINISHED } from "./strings";

const defaultPayload = {
  keyid: null,
  audience: null,
};

const forked = fork("./src/workers/worker.js", [], { detached: true });

export const Mutation = {
  updateUser: async (
    _,
    { email, password, newPassword, stripeToken },
    context
  ) => {
    const { subject } = context.user?.payload;
    const loginUser = await context.models.User.updateUser({
      email: subject || email,
      password,
      newPassword,
      stripeToken,
    });

    if (!loginUser) {
      throw new Error(EMAIL_ERROR);
    }

    return loginUser;
  },
  register: async (_, { email, password, googleId }, context) => {
    const userExist = await context.models.User.createUser({
      email,
      password,
      googleId,
    });
    return userExist;
  },
  login: async (_, { email, password, googleId }, context) => {
    const loginUser = await context.models.User.verifyUser({
      email,
      password,
      googleId,
    });

    if (!loginUser) {
      throw new Error(EMAIL_ERROR);
    }

    return loginUser;
  },
  addWebsite: async (_, { userId, url, customHeaders, password }, context) => {
    const { keyid, audience } = context.user?.payload || defaultPayload;
    const useID =
      typeof password !== "undefined" && password === process.env.ADMIN_PASS;

    const websiteAdded = await context.models.Website.addWebsite({
      userId: useID ? userId : keyid,
      url,
      audience,
      customHeaders,
    });

    return websiteAdded;
  },
  // TODO: RENAME CRAWLWEBSITE TO CRAWL_ALL_PAGES
  crawlWebsite: async (_, { userId, url, password }, context) => {
    const { keyid } = context.user?.payload || defaultPayload;
    const useID =
      typeof password !== "undefined" && password === process.env.ADMIN_PASS;

    const canScan = await context.models.User.updateScanAttempt({
      userId: useID ? userId : keyid,
    });

    if (url && canScan) {
      forked.send({ urlMap: url, userId: keyid });
      return {
        website: null,
        code: url ? 200 : 404,
        success: true,
        message: CRAWLER_FINISHED,
      };
    } else {
      throw new Error(
        "You hit your scan limit for the day, please try again tomorrow"
      );
    }
  },
  scanWebsite: async (_, { userId, url, password }, context) => {
    const { keyid, audience } = context.user?.payload || defaultPayload;
    const useID =
      typeof password !== "undefined" && password === process.env.ADMIN_PASS;

    const websiteAdded = await context.models.SubDomain.scanWebsite({
      userId: useID ? userId : keyid,
      url,
      audience,
    });
    return websiteAdded;
  },
  removeWebsite: async (
    _,
    { userId, url, deleteMany = false, password },
    context
  ) => {
    const { keyid, audience } = context.user?.payload || defaultPayload;
    const useID =
      typeof password !== "undefined" && password === process.env.ADMIN_PASS;
    const websiteRemoved = await context.models.Website.removeWebsite({
      userId: useID ? userId : keyid,
      url,
      deleteMany,
      audience,
    });

    if (websiteRemoved) {
      if (deleteMany) {
        return {
          ...websiteRemoved,
          url: `Success ${websiteRemoved.count} items deleted`,
          id: 0,
        };
      }

      // pubsub.publish(WEBSITE_REMOVED, {
      //   websiteRemoved
      // });
    }

    return websiteRemoved;
  },
  updateWebsite: async (_, { userId, url, customHeaders }, context) => {
    const { keyid } = context.user?.payload || defaultPayload;

    const website = await context.models.Website.updateWebsite({
      userId: userId || keyid,
      url,
      pageHeaders: customHeaders,
    });

    return website;
  },
  forgotPassword: async (_, { email }, context) => {
    const response = await context.models.User.forgotPassword({
      email,
    });

    return response;
  },
  confirmEmail: async (_, { email }, context) => {
    const { keyid } = context.user?.payload || defaultPayload;

    const response = await context.models.User.confirmEmail({
      email,
      keyid,
    });

    return response;
  },
  resetPassword: async (_, { email, resetCode }, context) => {
    const response = await context.models.User.resetPassword({
      email,
      resetCode,
    });

    return response;
  },
  toggleAlert: async (_, { alertEnabled }, context) => {
    const { keyid, audience } = context.user?.payload || defaultPayload;
    const user = await context.models.User.toggleAlert({
      keyid,
      audience,
      alertEnabled,
    });

    return user;
  },
  updateScript: async (
    _,
    { url, scriptMeta, editScript, newScript },
    context
  ) => {
    const { keyid, audience } = context.user?.payload || defaultPayload;

    const script = await context.models.Scripts.updateScript({
      userId: Number(keyid),
      audience,
      scriptMeta,
      pageUrl: url,
      editScript,
      newScript,
    });

    return script;
  },
  addPaymentSubscription: async (_, { email, stripeToken }, context) => {
    const { keyid, audience } = context.user?.payload || defaultPayload;
    const user = await context.models.User.addPaymentSubscription({
      keyid,
      audience,
      email,
      stripeToken,
    });

    return user;
  },
  cancelSubscription: async (_, { email }, context) => {
    const { keyid, audience } = context.user?.payload || defaultPayload;
    const user = await context.models.User.cancelSubscription({
      keyid,
      audience,
      email,
    });

    return user;
  },
};

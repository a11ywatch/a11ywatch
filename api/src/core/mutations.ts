/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/

import { EMAIL_ERROR, CRAWLER_FINISHED } from "./strings"
import {
  updateUser,
  addWebsite,
  addPaymentSubscription,
  cancelSubscription
} from "./graph/mutations"
import { forkProcess } from "./utils"

const defaultPayload = {
  keyid: null,
  audience: null
}

export const Mutation = {
  updateUser,
  login: async (_, { email, password, googleId }, context) => {
    const loginUser = await context.models.User.verifyUser({
      email,
      password,
      googleId
    })

    if (!loginUser) {
      throw new Error(EMAIL_ERROR)
    }

    return loginUser
  },
  register: async (_, { email, password, googleId }, context) => {
    return await context.models.User.createUser({
      email,
      password,
      googleId
    })
  },
  addWebsite,
  crawlWebsite: async (_, { userId, url }, context) => {
    const { keyid } = context.user?.payload || defaultPayload

    const canScan = await context.models.User.updateScanAttempt({
      userId: keyid
    })

    if (url && canScan) {
      forkProcess({ urlMap: url, userId: keyid })

      return {
        website: null,
        code: url ? 200 : 404,
        success: true,
        message: CRAWLER_FINISHED
      }
    } else {
      throw new Error(
        "You hit your scan limit for the day, please try again tomorrow"
      )
    }
  },
  scanWebsite: async (_, { url }, context) => {
    return await context.models.SubDomain.crawlWebsite({
      url
    })
  },
  removeWebsite: async (
    _,
    { userId, url, deleteMany = false, password },
    context
  ) => {
    const { keyid, audience } = context.user?.payload || defaultPayload
    const useID =
      typeof password !== "undefined" && password === process.env.ADMIN_PASS
    const websiteRemoved = await context.models.Website.removeWebsite({
      userId: useID ? userId : keyid,
      url,
      deleteMany,
      audience
    })

    if (websiteRemoved) {
      if (deleteMany) {
        return {
          ...websiteRemoved,
          url: `Success ${websiteRemoved.count} items deleted`,
          id: 0
        }
      }
      // pubsub.publish(WEBSITE_REMOVED, {
      //   websiteRemoved
      // });
    }

    return websiteRemoved
  },
  updateWebsite: async (_, { userId, url, customHeaders }, context) => {
    const { keyid } = context.user?.payload || defaultPayload

    return await context.models.Website.updateWebsite({
      userId: userId || keyid,
      url,
      pageHeaders: customHeaders
    })
  },
  forgotPassword: async (_, { email }, context) => {
    return await context.models.User.forgotPassword({
      email
    })
  },
  confirmEmail: async (_, { email }, context) => {
    const { keyid } = context.user?.payload || defaultPayload

    return await context.models.User.confirmEmail({
      email,
      keyid
    })
  },
  resetPassword: async (_, { email, resetCode }, context) => {
    return await context.models.User.resetPassword({
      email,
      resetCode
    })
  },
  toggleAlert: async (_, { alertEnabled }, context) => {
    const { keyid, audience } = context.user?.payload || defaultPayload

    return await context.models.User.toggleAlert({
      keyid,
      audience,
      alertEnabled
    })
  },
  toggleProfile: async (_, { profileVisible }, context) => {
    return await context.models.User.toggleProfile({
      keyid: context.user?.payload?.keyid,
      profileVisible
    })
  },
  updateScript: async (
    _,
    { url, scriptMeta, editScript, newScript },
    context
  ) => {
    const { keyid, audience } = context.user?.payload || defaultPayload

    return await context.models.Scripts.updateScript({
      userId: Number(keyid),
      audience,
      scriptMeta,
      pageUrl: url,
      editScript,
      newScript
    })
  },
  addPaymentSubscription,
  cancelSubscription
}

/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/

import { connect } from "@app/database"
import type { Params } from "../types"
import { websiteSearchParams, getLastItemInCollection } from "@app/core/utils"

export const getWebsite = async (
  { userId, url, domain }: Params,
  chain?: boolean
) => {
  try {
    const [collection] = await connect("Websites")
    const params = websiteSearchParams({
      userId,
      url,
      domain
    })
    const website = await collection.findOne(params)
    const lastItem = await getLastItemInCollection(collection, url)
    return chain
      ? [website, collection, lastItem?.length ? lastItem[0].id : 0]
      : website
  } catch (e) {
    console.error(e)
  }
}

export const getWebsitesCrawler = async (
  { userId, domain }: { userId?: any; domain?: string },
  chain?: boolean
) => {
  try {
    const [collection] = await connect("Websites")
    const websites = await collection
      .find({
        domain,
        userId: typeof userId !== "undefined" ? userId : { $gt: 0 }
      })
      .limit(100)
      .toArray()

    return chain ? [websites, collection] : websites
  } catch (e) {
    console.error(e)
  }
}

export const getWebsitesWithUsers = async (userLimit = 10000) => {
  try {
    const [collection] = await connect("Websites")
    return await collection
      .find({ userId: { $gt: -1 } })
      .project({ url: 1, userId: 1 })
      .limit(userLimit)
      .toArray()
  } catch (e) {
    console.error(e)
    return []
  }
}

export const getWebsites = async ({ userId }, chain?: boolean) => {
  try {
    const [collection] = await connect("Websites")
    const websites = await collection
      .find({ userId: Number(userId) })
      .limit(20)
      .toArray()

    return chain ? [websites, collection] : websites
  } catch (e) {
    console.error(e)
  }
}

export const getWebsitesDaily = async (page?: number, chain?: boolean) => {
  try {
    const [collection] = await connect("Websites")
    const websites = await collection
      .find({
        screenshotStill: { $exists: true, $ne: undefined },
        adaScore: { $gte: 40 }
      })
      .skip(page * 8)
      .project({ screenshotStill: 1, url: 1, _id: 0 })
      .limit(8)
      .toArray()

    return chain ? [websites, collection] : websites
  } catch (e) {
    console.error(e)
  }
}

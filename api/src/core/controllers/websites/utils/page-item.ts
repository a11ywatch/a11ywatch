/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/

import { sourceBuild } from "@a11ywatch/website-source-builder"

export const getPageItem = (item: any): any => {
  const userId = item?.userId
  const url = item?.url
  const role = item?.role ?? 0
  const { domain } = sourceBuild(url, userId)

  return {
    item,
    userId,
    url,
    role,
    domain
  }
}

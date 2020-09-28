/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/

import atob from 'atob'

function parseJwt(token?: string): any {
  const defaultToken = { email: '', audience: null }

  if (!token) {
    return defaultToken
  }

  try {
    // const base64HeaderUrl = token.split('.')[0]
    // const base64Header = base64HeaderUrl.replace('-', '+').replace('_', '/')
    // const headerData = JSON.parse(atob(base64Header))
    const base64Url = token.split('.')[1]
    const base64 = base64Url.replace('-', '+').replace('_', '/')

    return JSON.parse(atob(base64))
  } catch (e) {
    console.error(e)
    return defaultToken
  }
}

export { parseJwt }

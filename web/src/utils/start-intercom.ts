/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/

import { loadIntercom } from 'intercom-next'
import { userModel } from '@app/data'
import { INTERCOM_APPID } from '@app/configs'
import { domInteractive } from './dom-load-time'

let BLOCK = 0

export function startIntercom() {
  // Prevent intercom from injecting twice
  if (BLOCK) {
    return
  }
  const email = userModel?.email
  const dtime = userModel.isMobile ? 8000 : 5000

  window.onload = () => {
    setTimeout(() => {
      loadIntercom({
        appId: INTERCOM_APPID,
        email,
        name: email,
        scriptType: 'defer',
      })
      BLOCK = 1
    }, domInteractive() + dtime)
  }
}

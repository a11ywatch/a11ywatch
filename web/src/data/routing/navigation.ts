/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/

import { useEffect } from 'react'
import { UserManager } from '@app/managers'

export const useAuthedRedirect = () => {
  useEffect(() => {
    process.nextTick(() => {
      if (UserManager.loggedIn) {
        window.location.href = '/dashboard'
      }
    })
  }, [])
}

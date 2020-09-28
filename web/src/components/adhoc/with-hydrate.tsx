/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/

import { useEffect } from 'react'
import { userModel } from '@app/data'

// MOVE OUTSIDE THIS FOLDER TO CONTAINER DIR
export function WithHydrate({ children }: { children?: any }): any {
  useEffect(() => {
    userModel.initModel({
      originalUrl: '',
      // deviceType:
      //   (window.innerWidth <= 600 && 'mobile') ||
      //   new UAParser().getResult()?.device?.type ||
      //   'desktop',
      deviceType: '',
      cookie: document.cookie,
    })
  }, [])
  return children
}

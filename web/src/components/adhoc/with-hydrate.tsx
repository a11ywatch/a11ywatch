/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/

import { useEffect } from 'react'
import { userModel } from '@app/data'

export function WithHydrate({ children }: { children?: any }): any {
  useEffect(() => {
    userModel.initModel({
      originalUrl: '',
      deviceType: '',
      cookie: document.cookie,
    })
  }, [])
  return children
}

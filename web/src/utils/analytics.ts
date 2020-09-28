/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/

import ReactGA from 'react-ga'
import { GOOGLE_ANALYTIC_ID, AppConfig } from '@app/configs'

const prod = !AppConfig.dev

let initedGA = false

export const initGA = () => {
  if (prod) {
    ReactGA.initialize(GOOGLE_ANALYTIC_ID as string)
    initedGA = true
  }
}

export const logPageView = (route?: string) => {
  if (!initedGA) {
    initGA()
  }
  const url =
    route || (typeof window !== 'undefined' && window.location.pathname)

  if (prod && url) {
    ReactGA.set({ page: url })
    ReactGA.pageview(url)
  }
}

export const logEvent = (category: string = '', action: string = '') => {
  if (prod && category && action) {
    ReactGA.event({ category, action })
  }
}

// export const logException = (
//   description?: string = '',
//   fatal?: boolean = false
// ) => {
//   if (prod && description) {
//     ReactGA.exception({ description, fatal })
//   }
// }

/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/

import { Routes } from '@app/configs'

const MainRoutes = Routes.filter(({ nav }: any) => nav)
const MobileRoutes = Routes.filter(
  ({ href }: any) =>
    ![
      ...MainRoutes,
      '/register',
      '/login',
      '/testout',
      'https://a11ywatch.blog',
      'https://a11ywatch.github.io/a11ywatch-docs/',
    ].includes(href)
)

export { MainRoutes, MobileRoutes }

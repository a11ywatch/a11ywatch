/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/

import { Routes } from '@app/configs'

const baseRoutes = [
  '/contact',
  '/terms-of-service',
  '/privacy',
  '/web-accessibility',
  '/website-accessibility-checker',
  '/careers',
  '/consulting',
  '/about',
  '/roadmap',
  '/api-info',
  'https://www.miniprograms.xyz',
]
const MainRoutes = Routes.filter(({ href }: any) => !baseRoutes.includes(href))
const MobileRoutes = Routes.filter(
  ({ href }: any) =>
    ![
      ...baseRoutes,
      '/register',
      '/login',
      '/testout',
      'https://a11ywatch.blog',
      'https://a11ywatch.github.io/a11ywatch-docs/',
    ].includes(href)
)

export { MainRoutes, MobileRoutes }

/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/

import dynamic from 'next/dynamic'

const WithSkipContent = dynamic(
  () => import('../general/skip-content').then((mod) => mod.SkipContent) as any,
  {
    ssr: false,
  }
)

export { WithSkipContent }

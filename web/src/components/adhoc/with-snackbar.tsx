/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/

import dynamic from 'next/dynamic'

const WithSnackBar = dynamic(
  () => import('../general/snack-bar').then((mod) => mod.SnackBar) as any,
  {
    ssr: false,
  }
)

export { WithSnackBar }

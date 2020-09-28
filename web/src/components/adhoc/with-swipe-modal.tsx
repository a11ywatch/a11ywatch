/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/

import dynamic from 'next/dynamic'

const WithSwipeModal = dynamic(
  () => import('../modal').then((mod) => mod.SwipeableTemporaryDrawer) as any
)

export { WithSwipeModal }

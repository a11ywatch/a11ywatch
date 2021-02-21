/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/

import React from 'react'
import { ListItemSkeleton } from './list-item'

export function ListSkeleton({
  count = 3,
  subTitle = true,
  smallCircle = false,
  avatar = true,
}: any): any {
  return Array.from(Array(count).keys()).map((item: string | number) => (
    <ListItemSkeleton
      key={item}
      subTitle={subTitle}
      smallCircle={smallCircle}
      avatar={avatar}
    />
  ))
}

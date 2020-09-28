/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/

import React from 'react'
import { ListItem, ListItemText } from '@material-ui/core'
import { Skeleton } from '@material-ui/lab'

export function SimpleListItemSkeleton() {
  return (
    <ListItem>
      <ListItemText
        disableTypography
        primary={<Skeleton height={14} width='30%' />}
        secondary={
          <Skeleton height={14} width='40%' style={{ marginTop: 8 }} />
        }
      />
    </ListItem>
  )
}

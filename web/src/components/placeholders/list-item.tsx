/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/

import React from 'react'
import { ListItem, ListItemAvatar, ListItemText } from '@material-ui/core'
import { Skeleton } from '@material-ui/lab'

export function ListItemSkeleton({ subTitle, smallCircle }: any) {
  return (
    <ListItem style={{ height: subTitle ? 72 : 49 }}>
      <ListItemAvatar>
        <Skeleton
          variant='circle'
          width={smallCircle ? 20 : 40}
          height={smallCircle ? 20 : 40}
        />
      </ListItemAvatar>
      <ListItemText
        disableTypography
        primary={<Skeleton height={9.5} width='30%' />}
        secondary={
          !subTitle ? null : (
            <Skeleton height={9} width='20%' style={{ marginTop: 6 }} />
          )
        }
      />
    </ListItem>
  )
}

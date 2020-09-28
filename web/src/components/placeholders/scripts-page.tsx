/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/

import React from 'react'
import { Typography, List } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { Skeleton } from '@material-ui/lab'

const useStyles = makeStyles(() => ({
  box: { marginTop: 30 },
}))

export function ScriptsPageSkeleton({
  loading,
  dataLength,
  children,
  emptyTitle,
}: any) {
  const classes = useStyles()

  if (loading && !dataLength) {
    return (
      <List>
        <div className={`${classes.box}`}>
          <Skeleton variant='rect' width={'100%'} height={400} />
        </div>
      </List>
    )
  }
  if (!loading && !dataLength) {
    return (
      <div>
        <Typography variant='h5' component='h2'>
          {emptyTitle || 'No scripts generated yet.'}
        </Typography>
        <Typography variant='subtitle1' component='p'>
          Please wait for the watcher service to finish to get your updates.
        </Typography>
      </div>
    )
  }
  return children || null
}

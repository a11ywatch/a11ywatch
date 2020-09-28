/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/

import React from 'react'
import { Skeleton } from '@material-ui/lab'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  card: {
    marginTop: '-16.1vh',
    width: '100%',
    borderRadius: 4,
    minHeight: '50vh',
    paddingBottom: '44.818182%',
    backgroundColor: theme.palette.background.paper,
    [theme.breakpoints.down('sm')]: {
      minHeight: '45vh',
      marginTop: '-9vh',
    },
  },
}))

export function VideoSkeleton() {
  const classes = useStyles()

  return <Skeleton className={classes.card} />
}

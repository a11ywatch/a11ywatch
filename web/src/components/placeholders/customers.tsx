/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/

import React from 'react'
import { Skeleton } from '@material-ui/lab'
import { Grid } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  root: {
    paddingBottom: '12%',
    width: 'calc(100% - 3px)',
    display: 'block',
  },
  card: {
    border: `3px solid ${theme.palette.background.paper}`,
    borderRadius: 8,
    width: '100%',
    minHeight: '25vh',
    marginTop: '-5vh',
  },
}))

export function CustomersSkeleton() {
  const classes = useStyles()

  return (
    <Grid className={classes.root} component={'section'} container>
      <Skeleton height={33} width='35%' />
      <Skeleton height={22} width='40%' style={{ marginBottom: 12 }} />
      <Skeleton className={classes.card} />
    </Grid>
  )
}

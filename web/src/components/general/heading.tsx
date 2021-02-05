/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/
import React from 'react'
import { Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((t) => ({
  title: {
    [t.breakpoints.down('sm')]: {
      marginTop: 3,
    },
  },
}))

export function Heading({ children }: { children: any }) {
  const { title } = useStyles()

  return (
    <Typography
      variant='h5'
      component='h3'
      gutterBottom
      className={title}
      style={{ fontWeight: 600 }}
    >
      {children}
    </Typography>
  )
}

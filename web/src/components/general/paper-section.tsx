/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/
import React from 'react'
import { Paper } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((t) => ({
  paper: {
    display: 'flex',
    flex: 1,
    padding: 12,
    marginTop: 12,
    [t.breakpoints.down('sm')]: {
      flexDirection: 'column',
    },
  },
}))

export const PaperSection = ({
  children,
  rightMargin = 'right',
  style = {},
  row = false,
}: {
  children: any
  rightMargin?: any
  style?: any
  row?: boolean
}) => {
  const classes = useStyles()
  const { paper } = classes
  const display = row ? 'flex' : 'block'
  let margin = 'marginLeft'
  let textAlign: any = 'left'

  if (rightMargin) {
    margin = 'marginRight'
    textAlign = 'right'
  }

  return (
    <Paper className={paper} style={style}>
      <div style={{ textAlign, [margin]: 12, display }}>{children}</div>
    </Paper>
  )
}

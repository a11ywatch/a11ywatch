/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/

import React from 'react'
import { Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  sticky: {
    alignSelf: 'center',
    fontSize: '13px',
    color: theme.palette.text.primary,
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
    [theme.breakpoints.down('md')]: {
      fontSize: '10px',
    },
  },
  stickContainer: {
    alignSelf: 'center',
    fontSize: '13px',
    color: theme.palette.text.primary,
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
  },
  stick: {
    position: 'fixed',
    bottom: 0,
    width: '250px',
    paddingBottom: '8px',
    paddingTop: '8px',
    backgroundColor: theme.palette.background.default,
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  },
  text: {
    [theme.breakpoints.down('md')]: {
      fontSize: '11px',
    },
  },
}))

interface Props {
  sticky?: boolean
}

function FixedCopyRight({ sticky }: Props) {
  const classes = useStyles()

  return (
    <div className={`${classes.stickContainer} ${sticky ? classes.stick : ''}`}>
      <div className={classes.sticky}>
        <Typography
          variant={'caption'}
          className={classes.text}
          gutterBottom={!sticky}
        >
          © 2020 A11yWatch, LLC
        </Typography>
      </div>
    </div>
  )
}

export { FixedCopyRight }

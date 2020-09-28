/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/

import React from 'react'
import { Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { Logo } from './logo'
import { Link } from '../link'

const useStyles = makeStyles((theme) => ({
  title: {
    color: theme.palette.text.primary,
    letterSpacing: '.12rem',
  },
  logo: {
    width: '50px',
    minHeight: 'auto',
  },
  flex: {
    flex: 1,
  },
}))

function NavBarTitle({
  title,
  children,
  flex,
  marketing,
  ismobile,
  notitle,
  ...props
}: any) {
  const classes = useStyles()
  const flexStyle = flex ? classes.flex : ''

  if (marketing && !notitle) {
    return (
      <>
        <Link href='/' className={classes.logo}>
          <Logo />
        </Link>
        <div className={flexStyle} />
      </>
    )
  }

  return (
    <Typography
      variant='h6'
      noWrap
      className={`${classes.title} ${flexStyle}`}
      {...props}
    >
      {children || title}
    </Typography>
  )
}

export { NavBarTitle }

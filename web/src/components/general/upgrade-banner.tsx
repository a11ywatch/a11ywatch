/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/
import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Typography } from '@material-ui/core'
import { UserManager } from '@app/managers'
import { Link } from './link'

// !UserManager.firstDay
const useStyles = makeStyles((theme) => ({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    display: 'flex',
    padding: 6,
    backgroundColor: theme.palette.background.default,
    position: 'fixed',
    bottom: 0,
    width: '100%',
    paddingRight: '28vw',
    zIndex: 1,
  },
}))

const UpgradeBanner = (): any => {
  const classes = useStyles()

  return UserManager.freeAccount ? (
    <div className={classes.container}>
      <Typography variant={'subtitle2'}>
        Upgrade your account to add multiple websites, edit scripts, and more{' '}
        <Link href={'/payments'} style={{ fontWeight: 600 }}>
          UPGRADE
        </Link>
      </Typography>
    </div>
  ) : null
}

export { UpgradeBanner }

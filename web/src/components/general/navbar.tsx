/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/

import React from 'react'
import { useRouter } from 'next/router'
import dynamic from 'next/dynamic'

import { AppBar, Toolbar, IconButton } from '@material-ui/core'
import { Public as AppIcon, ArrowBack as BackIcon } from '@material-ui/icons'
import { makeStyles } from '@material-ui/core/styles'
import { strings } from '@app-strings'
import { NavBarTitle } from './navigation'
import { Link } from './link'
import { AuthMenu } from './auth-menu'
import { TranslateBadge } from '../badges'

const WrapShadow = dynamic(
  () => import('./wrap-shadow').then((mod) => mod.WrapShadow) as any,
  {
    ssr: false,
  }
)

const useStyles = makeStyles((theme) => ({
  flex: {
    flex: 1,
  },
  container: {
    backgroundColor: theme.palette.background.default,
    overflow: 'hidden',
    ...theme.mixins.toolbar,
  },
  menu: {
    display: 'flex',
    marginRight: theme.spacing(2),
    [theme.breakpoints.down('sm')]: {
      marginRight: theme.spacing(1),
    },
  },
  iconButton: {
    background: 'transparent',
    boxShadow: 'none',
    marginLeft: theme.spacing(2),
    overflow: 'hidden',
    fontSize: 13,
    [theme.breakpoints.down('sm')]: {
      fontSize: 12,
    },
  },
  transparent: {
    background: 'transparent',
    boxShadow: 'none',
  },
  register: {
    minWidth: 90.6562,
    [theme.breakpoints.down('sm')]: {
      minWidth: 'auto',
    },
  },
  login: {
    minWidth: 90.6562,
    [theme.breakpoints.down('sm')]: {
      minWidth: 'auto',
      marginLeft: 0,
    },
  },
  menuBar: {
    display: 'flex',
    marginRight: 6,
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  },
  hideShadow: {
    boxShadow: 'none',
  },
  ghIcon: {
    marginLeft: 18,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  },
}))

const NavBar = ({
  title = strings.appName,
  backButton,
  marketing,
  toolbar,
  className,
  position = 'static',
  children,
  component = 'nav',
  marketingLinks,
  notitle,
}: any) => {
  const classes = useStyles()
  const router = useRouter()

  return (
    <>
      <AppBar
        position={position}
        className={`${className} ${classes.container} ${classes.hideShadow}`}
        component={component}
      >
        <Toolbar>
          {toolbar || children ? (
            toolbar || children
          ) : (
            <>
              <IconButton
                href='/'
                onClick={(e: any) => {
                  e?.preventDefault()
                  if (backButton) {
                    router.back()
                  } else {
                    router.push('/')
                  }
                }}
                component={Link}
                className={classes.menu}
              >
                {backButton ? <BackIcon /> : !marketing ? <AppIcon /> : null}
              </IconButton>
              <NavBarTitle
                title={title}
                flex
                marketing={marketing}
                notitle={notitle}
              />
            </>
          )}
          {marketingLinks}
          {marketingLinks ? null : (
            <AuthMenu
              className={classes.iconButton}
              registerClassName={classes.register}
              loginClassName={classes.login}
            />
          )}
          {marketing ? (
            <div className={classes.ghIcon}>
              <TranslateBadge />
            </div>
          ) : null}
        </Toolbar>
      </AppBar>
      {position === 'fixed' ? <WrapShadow /> : null}
    </>
  )
}

export { NavBar }

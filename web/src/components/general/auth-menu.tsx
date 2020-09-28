/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/
import React, { useState } from 'react'
import { useRouter } from 'next/router'

import { IconButton, MenuItem, Menu, Tooltip } from '@material-ui/core'
import { AccountCircle } from '@material-ui/icons'

import { Link } from './link'

import { UserManager } from '@app/managers'
import { LOGGIN_ROUTES } from '@app/configs'
import { NavLinks } from './nav-links'

interface Props {
  loginClassName?: string
  className?: string
  registerClassName?: string
}

function AuthMenu({
  loginClassName,
  className,
  registerClassName,
}: Props): any {
  const router = useRouter()
  const [anchorEl, setAnchorEl] = useState(null)
  // const transformProps = {
  //   vertical: 'top',
  //   horizontal: 'right',
  // }
  const handleMenu = (event?: any) => {
    setAnchorEl(event?.currentTarget)
  }

  if (LOGGIN_ROUTES.includes(router?.pathname)) {
    return (
      <>
        <Tooltip title={'More options'}>
          <IconButton
            aria-label='account of current user'
            aria-controls='menu-appbar'
            aria-haspopup='true'
            onClick={handleMenu}
          >
            <AccountCircle />
          </IconButton>
        </Tooltip>
        <Menu
          id='menu-appbar'
          open={!!anchorEl}
          onClose={() => handleMenu()}
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
        >
          {router?.pathname !== '/profile' ? (
            <MenuItem component={Link} href={'/profile'} color={'inherit'}>
              Profile
            </MenuItem>
          ) : null}
          {router?.pathname !== '/dashboard' ? (
            <MenuItem component={Link} href={'/dashboard'} color={'inherit'}>
              Dashboard
            </MenuItem>
          ) : null}
          {router?.pathname !== '/api-info' ? (
            <MenuItem component={Link} href={'/api-info'} color={'inherit'}>
              API
            </MenuItem>
          ) : null}
          {router?.pathname !== '/payments' ? (
            <MenuItem component={Link} href={'/payments'} color={'inherit'}>
              Payments
            </MenuItem>
          ) : null}
          <MenuItem
            onClick={(e) => {
              e?.preventDefault()
              UserManager.clearUser()
            }}
          >
            Logout
          </MenuItem>
        </Menu>
      </>
    )
  }
  return (
    <NavLinks
      className={className}
      registerClassName={registerClassName}
      loginClassName={loginClassName}
      route={router?.pathname}
    />
  )
}

export { AuthMenu }

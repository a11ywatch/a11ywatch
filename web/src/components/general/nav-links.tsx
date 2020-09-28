/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/

import React from 'react'
// import { Routes, LoggedInRoutes } from '@app/configs'
import { NavItem } from './nav-item'

// todo add mutliple links
const NavLinks = ({
  route,
  as,
  className,
  registerClassName,
  loginClassName,
}: any) => {
  return (
    <NavItem
      href={'register'}
      key={'register'}
      as={as}
      route={route}
      name={'Register'}
      registerClassName={registerClassName}
      loginClassName={loginClassName}
      className={className}
    />
  )
}

export { NavLinks }

/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/

import React from 'react'
import { Button } from '@material-ui/core'
import { Link } from './link'

// TODO REFACTOR TO ONE CLASSNAME BINDING
export const NavItem = ({
  href,
  name,
  className,
  as,
  route,
  registerClassName = '',
  loginClassName = '',
}: any) => {
  const home = `/${href}` === route
  return (
    <Button
      href={home ? '/' : href}
      as={as}
      component={Link}
      variant={name === 'Register' ? 'outlined' : 'text'}
      className={`${className} ${registerClassName} ${loginClassName}`}
    >
      {home ? 'Home' : name}
    </Button>
  )
}

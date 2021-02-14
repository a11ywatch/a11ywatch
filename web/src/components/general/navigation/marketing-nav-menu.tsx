/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/

import React, { useMemo } from 'react'
import { List, ListItem } from '@material-ui/core'
import { Link } from '../link'
import { MainRoutes, MobileRoutes } from './routes'

interface Props {
  home?: string
  className?: string
  mobileRender?: boolean
  classNameSpacing?: string
  classHiddenMobile?: string
  registerClassName?: string
}

function MarketingNavMenu({
  home = '',
  className = '',
  registerClassName = '',
  mobileRender,
  classNameSpacing = '',
  classHiddenMobile = '',
}: Props) {
  return (
    <List
      className={`${className}${
        classNameSpacing ? ` ${classNameSpacing}` : ''
      }`}
    >
      {useMemo(() => (mobileRender ? MobileRoutes : MainRoutes), [
        mobileRender,
      ]).map(({ name, href }: { name: string; href: string }) => {
        const firstClassName = href === '/register' ? registerClassName : ''
        const itemClassName =
          !mobileRender && href !== '/register' && href !== '/login'
            ? `${firstClassName ? ' ' : ''}${classHiddenMobile}`
            : ''
        const classMinor =
          firstClassName || itemClassName
            ? `${firstClassName}${itemClassName}`
            : undefined

        const homeRoute = href.indexOf(home) !== -1

        return (
          <li key={name} className={classMinor}>
            <ListItem
              button
              component={Link}
              href={homeRoute ? '/' : href}
              color={'inherit'}
              variant={'h6'}
            >
              {homeRoute ? 'Home' : name}
            </ListItem>
          </li>
        )
      })}
    </List>
  )
}

export { MarketingNavMenu }

/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/

import React from 'react'
import { List, ListItem } from '@material-ui/core'
import { drawerStyles } from '@app/styles/drawer'

import { Routes } from '@app/configs'
import { Link } from '../link'

interface Props {
  home?: string
}

function MarketingMenu({ home = '' }: Props) {
  const classes = drawerStyles()

  return (
    <List>
      {Routes.map(({ name, href }: any, index: number) => (
        <li key={name}>
          <ListItem
            button
            divider={index === 1}
            component={Link}
            // @ts-ignore
            className={classes.drawerItem}
            href={home === `${href}` ? '/' : href}
            color={'inherit'}
          >
            {home === `${href}` ? 'Home' : name}
          </ListItem>
        </li>
      ))}
    </List>
  )
}

export { MarketingMenu }

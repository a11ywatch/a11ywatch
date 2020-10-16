/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/

import React from 'react'
import { navigationStyles } from '@app/styles/navigation'
import { strings } from '@app-strings'
import { NavBarTitle, MarketingNavMenu } from './navigation'
import { SearchBar } from './searchbar'
import { Link } from './link'
import { NavBar } from './navbar'

export function MarketingDrawer({
  children,
  initClosed,
  renderCtaSearch,
  title,
  navPosition,
}: any) {
  const classes = navigationStyles()

  return (
    <>
      <NavBar
        position={navPosition}
        marketing
        className={classes.appBar}
        marketingLinks={
          <MarketingNavMenu
            home={String(title).toLowerCase()}
            className={classes.horizontal}
            registerClassName={classes.register}
            classHiddenMobile={classes.classHiddenMobile}
          />
        }
      >
        <span className={classes.navContainer}>
          <NavBarTitle
            title={strings.appName}
            href='/'
            component={Link}
            marketing
          />
          {renderCtaSearch ? (
            <>
              <div style={{ flex: 1 }} />
              <SearchBar placeholder={'Enter website url...'} noWidth cta />
            </>
          ) : null}
        </span>
      </NavBar>
      <main className={initClosed ? classes.contentSmall : classes.content}>
        {children}
      </main>
    </>
  )
}

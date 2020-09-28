/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/
import React from 'react'
import { userData } from '@app/data'
import { drawerStyles } from '@app/styles/drawer'
import { NavBarTitle, AuthedMenu } from './navigation'
import { SearchBar } from './searchbar'
import { NavBar } from './navbar'
import { FixedCopyRight } from './fixed-copy-right'
import { ConfirmEmail } from '../alerts'

function MainDrawerContainer({ route, dataSourceMap, classes }: any) {
  return (
    <div className={`${classes.drawer} hide-print ${classes.drawerPaper}`}>
      <AuthedMenu dataSourceMap={dataSourceMap} route={route} />
      <div className={classes.flex} />
      <FixedCopyRight sticky />
    </div>
  )
}

export function DrawerWrapper({ route, title = '', classes }: any) {
  const { data: dataSourceMap } = userData()

  return (
    <>
      <NavBar
        title={title}
        position='fixed'
        className={classes.appBar}
        toolbar={
          <span className={classes.drawerIconContainer}>
            <NavBarTitle title={title} flex />
            <SearchBar />
          </span>
        }
      />
      <MainDrawerContainer
        route={route}
        dataSourceMap={dataSourceMap}
        classes={classes}
      />
    </>
  )
}

export function Drawer({ children, route, title, initClosed }: any) {
  const classes = drawerStyles() as any
  const { data: dataSourceMap, sendConfirmEmail } = userData()
  const user = dataSourceMap?.user as any

  return (
    <div className={classes.root}>
      <DrawerWrapper
        initClosed={initClosed}
        classes={classes}
        route={route}
        title={title}
      />
      <main className={classes.content}>
        {user?.loggedIn && !user?.emailConfirmed ? (
          <ConfirmEmail sendEmail={sendConfirmEmail} />
        ) : null}
        {children}
      </main>
    </div>
  )
}

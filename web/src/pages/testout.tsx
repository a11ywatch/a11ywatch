/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/
import React from 'react'
import { MarketingDrawer } from '@app/components/general'
import { TestView } from '@app/components/general/test-view'
import { strings } from '@app-strings'
import { WithSwipeModal as SwipeableTemporaryDrawer } from '@app/components/adhoc'
import { withApollo } from '@app/apollo'

function TestOut() {
  return (
    <>
      <MarketingDrawer initClosed={true} renderCtaSearch homeMenu={'testout'}>
        <TestView marketing />
      </MarketingDrawer>
      <SwipeableTemporaryDrawer />
    </>
  )
}

TestOut.meta = {
  title: `Try out free accessibility fixer - ${strings.appName}`,
}

export default withApollo(TestOut)

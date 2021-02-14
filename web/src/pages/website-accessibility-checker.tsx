/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/
import React from 'react'
import { MarketingDrawer, SignOnForm } from '@app/components/general'
import { CtaIntro } from '@app/components/cta'
import { WithSwipeModal as SwipeableTemporaryDrawer } from '@app/components/adhoc'
import { withApollo } from '@app/apollo'
import { strings } from '@app-strings'
import { metaSetter } from '@app/utils'
import type { PageProps } from '@app/types'

function WebsiteAccessibilityChecker({ name }: PageProps) {
  return (
    <>
      <MarketingDrawer title={name}>
        <CtaIntro checker />
        <SignOnForm home />
      </MarketingDrawer>
      <SwipeableTemporaryDrawer />
    </>
  )
}

export default withApollo(
  metaSetter(
    { WebsiteAccessibilityChecker },
    {
      description: `Increase user experience and brand reputation with ${strings.appName}. Check the accessibility of your webpage today. Key Features: Providing Automated Testing, Providing The Accessibility Tools, And Almost Instant Accessibility Fixes.`,
    }
  )
)

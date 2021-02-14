/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/
import React from 'react'
import { Container } from '@material-ui/core'
import {
  Footer,
  MarketingDrawer,
  Spacer,
  SignOnForm,
} from '@app/components/general'
import { CtaIntro, CtaProfessionalSupportButton } from '@app/components/cta'
import { WithSwipeModal as SwipeableTemporaryDrawer } from '@app/components/adhoc'
import { withApollo } from '@app/apollo'
import { strings } from '@app-strings'
import { metaSetter } from '@app/utils'

function WebsiteAccessibilityChecker() {
  return (
    <>
      <MarketingDrawer title={WebsiteAccessibilityChecker.name}>
        <Container maxWidth='xl'>
          <CtaProfessionalSupportButton />
          <CtaIntro checker />
          <SignOnForm home />
        </Container>
        <Spacer height={'13vh'} />
        <Footer />
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

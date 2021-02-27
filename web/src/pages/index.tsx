/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/
import React from 'react'
import { MarketingDrawer, SignOnForm, Price } from '@app/components/general'
import {
  CtaFeatures,
  CtaIntro,
  CtaVideo,
  CtaCustomers,
} from '@app/components/cta'
import { WithSwipeModal as SwipeableTemporaryDrawer } from '@app/components/adhoc'
import { withApollo } from '@app/apollo'
import {
  MarketingWebsites,
  MarketingTestimonial,
} from '@app/components/marketing'
import { API_ENDPOINT } from '@app/configs'

function Index({ websites }: any) {
  return (
    <>
      <MarketingDrawer navPosition={'relative'}>
        <CtaIntro />
        <CtaVideo />
        <CtaFeatures />
        <CtaCustomers />
        <MarketingWebsites websites={websites} />
        <MarketingTestimonial />
        <Price blockFree />
        <SignOnForm home />
      </MarketingDrawer>
      <SwipeableTemporaryDrawer />
    </>
  )
}

export async function getStaticProps() {
  const res = await fetch(`${API_ENDPOINT}/getWebsitesDaily`)
  const websites = await res.json()

  return {
    props: {
      websites,
    },
  }
}

export default withApollo(Index)

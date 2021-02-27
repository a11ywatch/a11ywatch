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
import { dev, API_ENDPOINT, API_URI_DOCKER } from '@app/configs'
import { replaceDockerNetwork } from '@a11ywatch/website-source-builder'

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
  let websites: any = []
  try {
    const res = await fetch(
      `${
        !process.browser && dev ? API_URI_DOCKER : API_ENDPOINT
      }/getWebsitesDaily`
    )
    websites = await res.json()
  } catch (e) {
    console.error(e)
  }

  return {
    props: {
      websites,
    },
  }
}

export default withApollo(Index)

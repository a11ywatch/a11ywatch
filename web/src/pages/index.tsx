/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/
import React, { Fragment } from 'react'
import { MarketingDrawer, Price } from '@app/components/general'
import {
  CtaFeatures,
  CtaIntro,
  CtaVideo,
  CtaCustomers,
  CtaSearch,
  CtaSignonForm,
} from '@app/components/cta'
import { WithSwipeModal as SwipeableTemporaryDrawer } from '@app/components/adhoc'
import { withApollo } from '@app/apollo'
import {
  MarketingWebsites,
  MarketingTestimonial,
  MarketingShapesTop,
} from '@app/components/marketing'
import { dev, DOCKER_ENV, API_ENDPOINT, API_URI_DOCKER } from '@app/configs'

function Index({ websites }: any) {
  return (
    <Fragment>
      <MarketingDrawer navPosition={'relative'}>
        <MarketingShapesTop />
        <CtaIntro />
        <CtaVideo />
        <CtaFeatures />
        <CtaCustomers />
        <CtaSearch />
        <MarketingWebsites websites={websites} />
        <MarketingTestimonial />
        <Price blockFree />
        <CtaSignonForm />
      </MarketingDrawer>
      <SwipeableTemporaryDrawer />
    </Fragment>
  )
}

export async function getStaticProps() {
  let websites: any = []
  try {
    const res = await fetch(
      `${
        !process.browser && dev && DOCKER_ENV
          ? String(API_URI_DOCKER).replace('graphql', 'api')
          : API_ENDPOINT
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

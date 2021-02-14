/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/
import React from 'react'
import { Container, Typography, Box } from '@material-ui/core'
import { MarketingDrawer, Spacer, Footer } from '@app/components/general'
import { metaSetter } from '@app/utils'

function Privacy() {
  return (
    <MarketingDrawer title={Privacy.name}>
      <Container maxWidth='xl'>
        <Box>
          <Typography variant='h2' component='h1' gutterBottom>
            Privacy Policy
          </Typography>
          <Typography variant='body1' component='p' gutterBottom>
            We do not do anything with your data in any fashion that is not to
            return back to you. All data is secure and safe coming from our
            service. None of the data collected from a11ywatch is being shared
            with any 3rd party services.
          </Typography>
          <Spacer height={'33px'} />
          <Typography variant='h3' component='h2' gutterBottom>
            Analytics
          </Typography>
          <Spacer height={'18px'} />
          <Typography variant='body1' component='p' gutterBottom>
            We use google analytics to monitor our website usage.
          </Typography>
        </Box>
        <Spacer height={'50vh'} />
      </Container>
      <Footer />
    </MarketingDrawer>
  )
}

export default metaSetter({ Privacy })

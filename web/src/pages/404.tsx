/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/
import React from 'react'
import { Container, Typography } from '@material-ui/core'
import { MarketingDrawer, Footer, Box, Spacer } from '@app/components/general'
import { strings } from '@app-strings'

function PageNotFound() {
  return (
    <MarketingDrawer homeMenu={'pagenotfound'}>
      <Container>
        <Box>
          <Typography variant='h1' component='h1' gutterBottom>
            404
          </Typography>
          <Typography variant='body1' component='p' gutterBottom>
            Page not found.
          </Typography>
          <Typography variant='subtitle1' component='p' gutterBottom>
            If issue persist please try again later or contact support.
          </Typography>
        </Box>
      </Container>
      <Spacer height={'20vh'} />
      <Footer />
    </MarketingDrawer>
  )
}

PageNotFound.meta = {
  title: `404 - ${strings.appName}`,
}

export default PageNotFound

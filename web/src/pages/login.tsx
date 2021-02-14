/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/
import React from 'react'
import { Container } from '@material-ui/core'
import {
  Box,
  Footer,
  Spacer,
  MarketingDrawer,
  SignOnForm,
} from '@app/components/general'
import { withApollo } from '@app/apollo'
import { metaSetter } from '@app/utils'

function Login() {
  return (
    <MarketingDrawer title={Login.name}>
      <Container maxWidth='sm'>
        <Box>
          <SignOnForm loginView />
        </Box>
        <Spacer height={'20vh'} />
      </Container>
      <Footer />
    </MarketingDrawer>
  )
}

export default withApollo(metaSetter({ Login }))

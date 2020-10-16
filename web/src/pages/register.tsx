/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/
import React from 'react'
import { Container } from '@material-ui/core'
import {
  Footer,
  Box,
  Spacer,
  SignOnForm,
  MarketingDrawer,
} from '@app/components/general'
import { strings } from '@app-strings'
import { withApollo } from '@app/apollo'

function Register() {
  return (
    <MarketingDrawer
      title={Register.name}
      homeMenu={Register.name.toLowerCase()}
    >
      <Container maxWidth='sm'>
        <Box>
          <SignOnForm />
        </Box>
        <Spacer height={'20vh'} />
      </Container>
      <Footer />
    </MarketingDrawer>
  )
}

Register.meta = {
  title: `${strings.appName} - ${Register.name}`,
}

export default withApollo(Register)

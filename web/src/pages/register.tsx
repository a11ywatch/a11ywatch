/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/
import React from 'react'
import { SignOnForm, MarketingDrawer } from '@app/components/general'
import { withApollo } from '@app/apollo'
import { metaSetter } from '@app/utils'
import type { PageProps } from '@app/types'

function Register({ name }: PageProps) {
  return (
    <MarketingDrawer title={name} maxWidth='sm' footerSpacing>
      <SignOnForm />
    </MarketingDrawer>
  )
}

export default withApollo(metaSetter({ Register }))

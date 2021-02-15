/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/
import React from 'react'
import { MarketingDrawer, PageTitle } from '@app/components/general'
import { withApollo } from '@app/apollo'
import { metaSetter } from '@app/utils'
import type { PageProps } from '@app/types'
import { DONORBOX_URL } from '@app/configs'

function Donate({ name }: PageProps) {
  return (
    <MarketingDrawer title={name} maxWidth='lg' footerSpacing>
      <PageTitle>{name}</PageTitle>
      <script src='https://donorbox.org/widget.js'></script>
      <iframe
        frameBorder='0'
        name='donorbox'
        scrolling='no'
        seamless
        src={
          DONORBOX_URL ??
          'https://donorbox.org/embed/a11ywatch?default_interval=o&amount=5&show_content=true'
        }
        style={{
          minWidth: '100%',
          minHeight: '550px',
        }}
      ></iframe>
    </MarketingDrawer>
  )
}

export default withApollo(metaSetter({ Donate }))

/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/
import React from 'react'
import { Typography } from '@material-ui/core'
import { MarketingDrawer, PageTitle } from '@app/components/general'
import { metaSetter } from '@app/utils'
import type { PageProps } from '@app/types'

const PageNotFound = ({ name }: PageProps) => {
  return (
    <MarketingDrawer title={name} footerSpacing>
      <PageTitle>404</PageTitle>
      <Typography variant='body1' component='p' gutterBottom>
        Page not found.
      </Typography>
      <Typography variant='subtitle1' component='p' gutterBottom>
        If the issue continues please try again later or contact support.
      </Typography>
    </MarketingDrawer>
  )
}

export default metaSetter({ PageNotFound })

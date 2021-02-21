/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/

import React from 'react'
import { Typography } from '@material-ui/core'
import { Box } from '@app/components/general'

export function Failure({
  title = 'Website failed to load',
  subTitle = 'Please check your url and try again',
}: {
  title?: string
  subTitle?: string
}) {
  return (
    <Box>
      <Typography variant='h5' component='h2'>
        {title}
      </Typography>
      <Typography variant='subtitle1' component='p'>
        {subTitle}
      </Typography>
    </Box>
  )
}

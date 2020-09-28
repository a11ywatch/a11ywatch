/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/

import React from 'react'
import { Typography } from '@material-ui/core'
import { Box } from '@app/components/general'

export function NoWebsites() {
  return (
    <Box>
      <Typography variant='h5' component='h2'>
        No websites added yet.
      </Typography>
      <Typography variant='subtitle1' component='p'>
        Go to the dashboard and add a website to get started.
      </Typography>
    </Box>
  )
}

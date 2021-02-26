/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/

import React from 'react'
import { Typography } from '@material-ui/core'

export const SectionHeading = ({ children }: any) => (
  <Typography variant='h4' component='h3' style={{ fontWeight: 'bold' }}>
    {children}
  </Typography>
)

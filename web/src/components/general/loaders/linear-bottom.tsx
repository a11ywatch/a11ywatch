/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/

import React from 'react'
import { LinearProgress } from '@material-ui/core'

export const LinearBottom = ({ loading }: { loading: boolean }) => {
  return loading ? (
    <LinearProgress
      color='secondary'
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
      }}
    />
  ) : null
}

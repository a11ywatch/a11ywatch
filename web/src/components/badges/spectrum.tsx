/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/

import React from 'react'
import { IconButton, SvgIcon, Tooltip } from '@material-ui/core'

export const SpectrumBadge = () => {
  return (
    <Tooltip title='Join A11yWatch on Spectrum'>
      <IconButton
        component={'a'}
        href='https://spectrum.chat/a11ywatch'
        aria-label='A11yWatch on Spectrum'
        rel='noopener noreferrer'
        target='_blank'
        style={{ background: 'none' }}
      >
        <SvgIcon viewBox='0 0 16 16' fontSize={'small'}>
          <g>
            <path d='M0,1.067A1.067,1.067,0,0,1,1.067,0H2A14,14,0,0,1,16,14v.933A1.067,1.067,0,0,1,14.933,16H9.067A1.067,1.067,0,0,1,8,14.933V14A6,6,0,0,0,2,8H1.067A1.067,1.067,0,0,1,0,6.933Z'></path>
          </g>
        </SvgIcon>
      </IconButton>
    </Tooltip>
  )
}

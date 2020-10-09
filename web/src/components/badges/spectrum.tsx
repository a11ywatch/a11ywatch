/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/

import React from 'react'
import { Typography, Tooltip } from '@material-ui/core'
import { strings } from '@app-strings'
import { styleSpace } from './style'

export const SpectrumBadge = ({
  style = styleSpace,
  href = 'https://spectrum.chat/a11ywatch',
  inline,
  size = 'small',
}: any) => {
  const title = 'Spectrum'
  const label = `${strings.appName} on ${title}`
  const src = `static/img/${title.toLowerCase()}.svg`
  const height = size === 'small' ? 20 : 36
  const width = size === 'small' ? 20 : 36
  const imageStyle = { width, height }

  if (inline) {
    return (
      <a
        href={href}
        style={!inline ? style : {}}
        target='_blank'
        aria-label={label}
      >
        <div style={{ display: 'flex' }}>
          <img src={src} alt={label} style={imageStyle} />
          <Typography variant={'subtitle2'} style={{ marginLeft: 12 }}>
            {title}
          </Typography>
        </div>
      </a>
    )
  }

  return (
    <Tooltip title={label}>
      <a
        href={href}
        style={!inline ? style : {}}
        target='_blank'
        aria-label={label}
      >
        <img src={src} alt={label} style={imageStyle} />
      </a>
    </Tooltip>
  )
}

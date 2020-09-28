/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/

import React from 'react'
import { Typography, Tooltip } from '@material-ui/core'
import { styleSpace } from './style'
import { strings } from '@app-strings'

export const GithubBadge = ({
  style = styleSpace,
  href = 'https://github.com/a11ywatch',
  inline,
  size = 'small',
}: any) => {
  const title = 'GitHub'
  const height = size === 'small' ? 20 : 36
  const width = size === 'small' ? 20 : 36
  const label = `${strings.appName} ${title}'s organization`
  const src = `static/img/${title.toLowerCase()}.svg`

  if (inline) {
    return (
      <a
        href={href}
        style={!inline ? style : {}}
        target='_blank'
        aria-label={label}
      >
        <div style={{ display: 'flex' }}>
          <img src={src} style={{ height, width }} alt={title} />
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
        <img src={src} style={{ height, width }} alt={title} />
      </a>
    </Tooltip>
  )
}

/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/

import React from 'react'
import { Typography, Tooltip } from '@material-ui/core'
import { defaultProps } from './defaultProps'
import type { BadgeProps } from './badge-types'

export const Badge = ({
  style,
  inline,
  size,
  src,
  href,
  label,
  title,
}: BadgeProps) => {
  const height = size === 'small' ? 20 : 36
  const width = size === 'small' ? 20 : 36

  function Anchor({ children }: { children: any }) {
    return (
      <a
        href={href}
        style={!inline ? style : {}}
        target={'_blank'}
        aria-label={label}
      >
        {children}
      </a>
    )
  }

  const img = <img src={src} style={{ height, width }} alt={title} />

  if (inline) {
    return (
      <Anchor>
        <div style={{ display: 'flex' }}>
          {img}
          <Typography variant={'subtitle2'} style={{ marginLeft: 12 }}>
            {title}
          </Typography>
        </div>
      </Anchor>
    )
  }

  return (
    <Tooltip title={String(label)}>
      <Anchor>{img}</Anchor>
    </Tooltip>
  )
}

Badge.defaultProps = defaultProps

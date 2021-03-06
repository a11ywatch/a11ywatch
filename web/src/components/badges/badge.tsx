/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/

import React, { Fragment } from 'react'
import { Typography, Tooltip } from '@material-ui/core'
import { defaultProps } from './defaultProps'
import type { BadgeProps } from './badge-types'

export const Badge = ({
  style,
  inline,
  size: badgeSize,
  src,
  href,
  label,
  title,
}: BadgeProps) => {
  const size = badgeSize === 'small' ? 24 : 32

  const Anchor = ({
    children,
    style: aStyle,
  }: {
    style: any
    children: any
  }) => {
    return (
      <a href={href} style={aStyle} target={'_blank'} aria-label={label}>
        {children}
      </a>
    )
  }

  const Img = () => <img src={src} height={size} width={size} alt={title} />

  if (inline) {
    return (
      <Anchor
        style={Object.assign({}, style, {
          display: 'flex',
          paddingRight: 6,
          alignItems: 'center',
        })}
      >
        <Fragment>
          <Img />
          <Typography
            variant={'subtitle1'}
            component={'p'}
            style={{ marginLeft: '0.3em', fontSize: '1.02rem' }}
          >
            {title}
          </Typography>
        </Fragment>
      </Anchor>
    )
  }

  return (
    <Tooltip title={String(label)}>
      <Anchor style={style}>
        <Img />
      </Anchor>
    </Tooltip>
  )
}

Badge.defaultProps = defaultProps

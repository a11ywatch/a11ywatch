/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/

import React from 'react'
import { strings } from '@app-strings'
import { Badge } from './badge'
import { defaultProps } from './defaultProps'
import type { BadgeProps } from './badge-types'

export const SpectrumBadge = (props: BadgeProps) => <Badge {...props} />

SpectrumBadge.defaultProps = {
  ...defaultProps,
  title: 'Spectrum',
  label: `${strings.appName} on Spectrum`,
  src: `/static/img/spectrum.svg`,
  href: 'https://spectrum.chat/a11ywatch',
}

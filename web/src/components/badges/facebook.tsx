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

export const FacebookBadge = (props: BadgeProps) => <Badge {...props} />

FacebookBadge.defaultProps = Object.assign({}, defaultProps, {
  title: 'Facebook',
  label: `${strings.appName} on Facebook`,
  src: `/static/img/facebook.svg`,
  href: 'https://www.facebook.com/A11ywatch-114828426730553',
})

/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/

import React from 'react'
import { strings } from '@app-strings'
import { defaultProps } from './defaultProps'
import type { BadgeProps } from './badge-types'
import { Badge } from './badge'

export const TwitterBadge = (props: BadgeProps) => <Badge {...props} />

TwitterBadge.defaultProps = {
  ...defaultProps,
  title: 'Twitter',
  label: `${strings.appName} on Twitter`,
  src: `/static/img/twitter.svg`,
  href: 'https://twitter.com/A11yWatcher',
}

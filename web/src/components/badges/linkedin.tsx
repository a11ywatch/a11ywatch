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

export const LinkedinBadge = (props: BadgeProps) => <Badge {...props} />

LinkedinBadge.defaultProps = Object.assign({}, defaultProps, {
  title: 'Linkedin',
  label: `${strings.appName} on Linkedin`,
  src: `/static/img/linkedin.svg`,
  href: 'https://www.linkedin.com/company/a11ywatch',
})

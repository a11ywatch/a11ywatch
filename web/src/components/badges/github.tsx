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

export const GithubBadge = (props: BadgeProps) => <Badge {...props} />

GithubBadge.defaultProps = Object.assign({}, defaultProps, {
  title: 'GitHub',
  label: `${strings.appName} GitHub's organization`,
  src: `/static/img/github.svg`,
  href: 'https://github.com/a11ywatch',
})

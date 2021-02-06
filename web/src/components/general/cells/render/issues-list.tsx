/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/

import React from 'react'
import { issueSort } from '@app/lib'
import { RenderIssue } from './issues'

export function RenderIssuesList({ pageIssues = [], item, ...props }: any) {
  return props?.error ? (
    <RenderIssue {...item} {...props} />
  ) : (
    pageIssues.sort(issueSort).map((pages: any, i: number) => {
      return (
        <RenderIssue {...pages} {...props} key={`${i} ${pages?.selector}`} />
      )
    })
  )
}

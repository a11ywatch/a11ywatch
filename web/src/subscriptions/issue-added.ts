/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/

import gql from 'graphql-tag'

export const ISSUE_SUBSCRIPTION = gql`
  subscription issueAdded($userId: Int) {
    issueAdded(userId: $userId) {
      domain
      pageUrl
      issues {
        code
        type
        selector
        message
        context
        pageUrl
      }
    }
  }
`

/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/

import gql from 'graphql-tag'

const GET_ISSUE = gql`
  query getIssue($url: String) {
    issue(url: $url) {
      pageUrl
      issues {
        code
        type
        url
        selector
        message
        context
        pageUrl
      }
    }
  }
`

export { GET_ISSUE }

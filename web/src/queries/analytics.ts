/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/

import gql from 'graphql-tag'

const GET_ANALYTICS = gql`
  query getAnalytics($filter: String) {
    user {
      id
      analytics(filter: $filter) {
        pageUrl
        domain
        warningCount
        noticeCount
        errorCount
        adaScore
      }
    }
  }
`

export { GET_ANALYTICS }

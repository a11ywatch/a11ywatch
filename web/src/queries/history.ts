/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/

import gql from 'graphql-tag'

const GET_HISTORY = gql`
  query getHistory($filter: String) {
    user {
      id
      history {
        id
        url
        domain
        cdnConnected
        html
        htmlIncluded
        pageLoadTime {
          duration
          durationFormated
          color
        }
        subDomains {
          domain
          url
          adaScore
          pageLoadTime {
            duration
            durationFormated
            color
          }
          issues(filter: $filter) {
            code
            type
            selector
            message
            context
            pageUrl
          }
        }
        issues(filter: $filter) {
          pageUrl
          issues {
            url
            code
            type
            selector
            message
            context
            pageUrl
          }
        }
      }
    }
  }
`

export { GET_HISTORY }

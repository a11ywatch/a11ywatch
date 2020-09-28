/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/

import gql from 'graphql-tag'

export const WEBSITE_SUBSCRIPTION = gql`
  subscription websiteAdded($userId: Int) {
    websiteAdded(userId: $userId) {
      domain
      adaScore
      cdnConnected
      html
      htmlIncluded
      lastScanDate
      pageLoadTime {
        duration
        durationFormated
        color
      }
      pageHeaders {
        key
        value
      }
      issuesInfo {
        issuesFixedByCdn
        possibleIssuesFixedByCdn
        totalIssues
      }
    }
  }
`

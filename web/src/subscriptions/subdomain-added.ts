/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/

import gql from 'graphql-tag'

export const SUBDOMAIN_SUBSCRIPTION = gql`
  subscription subDomainAdded($userId: Int) {
    subDomainAdded(userId: $userId) {
      url
      domain
      adaScore
      cdnConnected
      html
      htmlIncluded
      pageLoadTime {
        duration
        durationFormated
        color
      }
      issuesInfo {
        issuesFixedByCdn
        possibleIssuesFixedByCdn
        totalIssues
      }
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

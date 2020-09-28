/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/

import gql from 'graphql-tag'
import { UserManager, AppManager } from '@app/managers'

const GET_WEBSITES = gql`
  query getWebsites($filter: String) {
    user {
      id
      websites {
        id
        url
        domain
        adaScore
        cdnConnected
        htmlIncluded
        lastScanDate
        issuesInfo {
          issuesFixedByCdn
          possibleIssuesFixedByCdn
          totalIssues
        }
        pageHeaders {
          key
          value
        }
        pageLoadTime {
          duration
          durationFormated
          color
        }
        subDomains {
          domain
          url
          adaScore
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
export const updateCache = {
  update(cache: any, { data: { addWebsite, removeWebsite } }: any) {
    const variables = { userId: UserManager.getID, filter: '' }

    const { user } = cache.readQuery({
      query: GET_WEBSITES,
      variables,
    })

    const { websites } = user

    let newWebSites = websites

    if (addWebsite || removeWebsite) {
      if (addWebsite) {
        newWebSites = newWebSites.concat([addWebsite?.website])
      }
      if (removeWebsite) {
        const site = removeWebsite.website

        if (removeWebsite.success) {
          if (site) {
            newWebSites = websites.filter((data: any) => data.id !== site.id)
          } else {
            newWebSites = []
            AppManager.toggleSnack(true, removeWebsite.message, 'success')
          }
        }
      }
      cache.writeQuery({
        query: GET_WEBSITES,
        variables,
        data: {
          user: {
            ...user,
            websites: newWebSites,
          },
        },
      })
    }
  },
}

export { GET_WEBSITES }

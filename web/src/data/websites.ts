/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/

import { useMemo, useEffect } from 'react'
import { useQuery, useMutation, useSubscription } from '@apollo/react-hooks'
import {
  ADD_WEBSITE,
  REMOVE_WEBSITE,
  UPDATE_WEBSITE,
  CRAWL_WEBSITE,
} from '@app/mutations'
import { GET_WEBSITES, updateCache } from '@app/queries'
import {
  SUBDOMAIN_SUBSCRIPTION,
  ISSUE_SUBSCRIPTION,
  WEBSITE_SUBSCRIPTION,
} from '@app/subscriptions'
import { UserManager, AppManager } from '@app/managers'
import { useIssueFeed } from './local'
import { checkNotification } from '@app/lib'

// TODO: general filter added, needs to be replaced with per view
export const websitesData = (
  query: boolean = true,
  filter: string = '',
  url: string = '',
  customHeaders: any = null
) => {
  const variables = {
    filter,
    customHeaders,
    url,
  }
  const { setIssueFeedContent } = useIssueFeed()
  const { data, loading, refetch, error } = query
    ? useQuery(GET_WEBSITES, {
        variables,
      })
    : { data: null, loading: null, refetch: null, error: null }

  const websites = data?.user?.websites || []

  const [removeWebsite, { loading: removeLoading }] = useMutation(
    REMOVE_WEBSITE,
    updateCache as any
  )

  const [addWebsite, { loading: addLoading }] = useMutation(
    ADD_WEBSITE,
    updateCache as any
  )

  const [updateWebsite, { data: updateData }] = useMutation(UPDATE_WEBSITE, {
    variables,
  })

  const [
    crawlWebsite,
    { data: crawlData, loading: crawlLoading },
  ] = useMutation(CRAWL_WEBSITE)

  const { data: subDomainSubData } = useSubscription(SUBDOMAIN_SUBSCRIPTION, {
    variables: { userId: UserManager.getID },
  })
  const { data: issueSubData } = useSubscription(ISSUE_SUBSCRIPTION, {
    variables: { userId: UserManager.getID },
  })
  const { data: websiteUpdated } = useSubscription(WEBSITE_SUBSCRIPTION, {
    variables: { userId: UserManager.getID },
  })

  useEffect(() => {
    if (addLoading) {
      AppManager.toggleSnack(
        true,
        'Checking all pages for issues, please wait...',
        'success'
      )
    }
  }, [addLoading])

  useEffect(() => {
    if (updateData?.updateWebsite?.website) {
      const { pageHeaders, domain } = updateData?.updateWebsite?.website
      const dataSource = websites.find(
        (source: any) => source.domain === domain
      )

      if (dataSource) {
        dataSource.pageHeaders = pageHeaders
      }

      AppManager.toggleSnack(true, 'Success: updated website', 'success')
    }
  }, [updateData])

  useMemo(() => {
    if (websiteUpdated && websites?.length) {
      const {
        adaScore,
        cdnConnected,
        domain,
        htmlIncluded,
        html,
        pageLoadTime,
        lastScanDate,
        issuesInfo,
      } = websiteUpdated?.websiteAdded
      const dataSource = websites.find(
        (source: any) => source.domain === domain
      )

      if (dataSource) {
        if (dataSource.lastScanDate !== lastScanDate) {
          setTimeout(() => {
            AppManager.toggleSnack(true, 'Finalizing Scan', 'success')
          }, 100)
        }

        if (adaScore) {
          dataSource.adaScore = adaScore
        }
        if (lastScanDate) {
          dataSource.lastScanDate = lastScanDate
        }
        if (pageLoadTime) {
          dataSource.pageLoadTime = pageLoadTime
        }
        if (issuesInfo) {
          dataSource.issuesInfo = issuesInfo
        }
        if (html) {
          dataSource.html = html
        }
        dataSource.cdnConnected = cdnConnected
        dataSource.htmlIncluded = htmlIncluded
      }

      console.log('SCANNER FINISHED', dataSource)
    }
  }, [websiteUpdated])

  useMemo(() => {
    if (crawlData && websites?.length) {
      const crawledWebsite = crawlData?.crawlWebsite?.website
      const dataSource = websites.find(
        (source: any) => source.domain === crawledWebsite?.domain
      )

      if (dataSource) {
        dataSource.adaScore = crawledWebsite.adaScore
        dataSource.cdnConnected = crawledWebsite.cdnConnected
      }

      console.log('CRAWL FINISHED', crawlData?.crawlWebsite?.website)
    }
  }, [crawlData])

  useMemo(() => {
    if (subDomainSubData && websites?.length) {
      const newSubDomain = subDomainSubData?.subDomainAdded
      const dataSource = websites.find(
        (source: any) => source.domain === newSubDomain?.domain
      )

      if (dataSource) {
        if (dataSource?.subDomains.length) {
          dataSource.subDomains.push(newSubDomain)
        } else {
          dataSource.subDomains = [newSubDomain]
        }
      }

      console.log('SUBDOMAIN ADDED', newSubDomain)
    }
  }, [subDomainSubData])

  useMemo(() => {
    if (issueSubData) {
      const newIssue = issueSubData?.issueAdded
      const dataSource = websites.find(
        (source: any) => source.domain === newIssue.domain
      )
      if (dataSource) {
        if (dataSource?.issues?.length) {
          const ids = new Set(dataSource.issues.map((d: any) => d.pageUrl))
          const merged = [
            ...dataSource.issues,
            ...[newIssue].filter((d: any) => !ids.has(d.pageUrl)),
          ]

          dataSource.issues = merged
        } else {
          dataSource.issues = [newIssue]
        }
        setIssueFeedContent(newIssue, true)()

        if (checkNotification()) {
          const isS = newIssue.issues?.length === 1 ? '' : 's'
          const body = `${newIssue.issues?.length} new issue${isS} occured for ${newIssue.pageUrl}`
          const notification = new Notification(`New issue${isS} arised`, {
            body,
            icon: '/static/img/favicon.png',
          })

          setTimeout(notification.close.bind(notification), 4000)
        }
      }

      console.log('NEW ISSUE ADDED', newIssue)
    }
  }, [issueSubData])

  return {
    subscriptionData: {
      issueSubData,
    },
    data: websites,
    loading,
    mutatationLoading: removeLoading || addLoading || crawlLoading,
    error,
    removeWebsite,
    addWebsite,
    refetch,
    crawlWebsite,
    updateWebsite,
  }
}

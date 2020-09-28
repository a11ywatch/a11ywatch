/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/

import { useEffect } from 'react'
import { useApolloClient, useQuery, useMutation } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import isUrl from 'is-url'

import { SCAN_WEBSITE } from '@app/mutations'
import { AppManager } from '@app/managers'

const GET_SEARCH_STATE = gql`
  query getCtaSearchState {
    ctaSearch @client {
      search
      hideWebsite
      bottomModal
      website
    }
  }
`

const defaultState = {
  search: '',
  hideWebsite: false,
  bottomModal: false,
  website: null,
}

export function useSearch() {
  const client = useApolloClient()
  const [scanWebsite, { data: crawlData, loading }] = useMutation(SCAN_WEBSITE)
  const { data } = useQuery(GET_SEARCH_STATE)
  const { search, hideWebsite, bottomModal, website } =
    data?.ctaSearch || defaultState

  const setSearch = (event: any) => {
    client.writeData({
      data: {
        ctaSearch: {
          search: event?.search || '',
          hideWebsite: false,
          bottomModal: false,
          website: null,
          __typename: 'SearchWebsites',
        },
      },
    })
  }

  const scanPage = (event: any, text: string) => {
    if (event?.preventDefault) {
      event?.preventDefault()
    }
    let tpt = ''
    // let www = ''
    // let blockExt = false
    let squery = text || search

    if (!squery.includes('http')) {
      tpt = 'http://'
    }

    if (squery?.includes('localhost:')) {
      if (!squery.includes('http')) {
        tpt = 'http'
      }
      // blockExt = true
    }

    const hasExt = squery.split('.').pop()

    const querySearch = `${tpt}${squery}${hasExt ? `` : '.com'}`

    scanWebsite({
      variables: {
        url: querySearch,
      },
    }).catch((res: any) => {
      const errors = res?.graphQLErrors?.map((error: any) => {
        return error?.message
      })
      console.log(errors)
    })
  }

  const closeFeed = () => {
    client.writeData({
      data: {
        ctaSearch: {
          search: '',
          hideWebsite: true,
          bottomModal: false,
          website: null,
          __typename: 'SearchWebsites',
        },
      },
    })
    if (crawlData.scanWebsite) {
      crawlData.scanWebsite.website = null
    }
  }

  const toggleModal = (bottom: boolean, text: string) => {
    const hasPriorCom = text?.includes('www') && text?.includes('.')

    if (text && !isUrl(text) && !hasPriorCom) {
      AppManager.toggleSnack(
        true,
        'Please enter a valid website url starting with http:// or https://',
        'error'
      )
    } else {
      if (bottom && text) {
        scanPage(null, text)
      }
      client.writeData({
        data: {
          ctaSearch: {
            hideWebsite: true,
            search: '',
            bottomModal: bottom,
            website: null,
            __typename: 'SearchWebsites',
          },
        },
      })
    }
  }

  useEffect(() => {
    if (crawlData?.scanWebsite) {
      if (!crawlData?.scanWebsite?.success) {
        AppManager.toggleSnack(true, crawlData?.scanWebsite?.message, 'error')
        closeFeed()
      } else {
        const page = crawlData?.scanWebsite?.website
        client.writeData({
          data: {
            ctaSearch: {
              hideWebsite,
              search,
              bottomModal,
              website: JSON.stringify(page),
              __typename: 'SearchWebsites',
            },
          },
        })
      }
    }
  }, [crawlData])

  return {
    search: search?.toLowerCase(),
    setSearch,
    scanPage,
    loading,
    website:
      crawlData?.scanWebsite?.website || (website && JSON.parse(website)),
    hideWebsite,
    crawlData,
    closeFeed,
    bottomModal,
    toggleModal,
  }
}

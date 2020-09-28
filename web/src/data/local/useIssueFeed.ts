/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/

import { useApolloClient, useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'

const GET_ISSUE_FEED_STATE = gql`
  query getIssueFeedState {
    issueFeed @client {
      open
      data {
        pageUrl
        domain
        issues {
          context
          message
          type
          typeCode
          selector
          code
        }
      }
    }
  }
`

const defaultState = {
  data: [],
  open: true,
}

export function useIssueFeed() {
  const client = useApolloClient()
  const { data } = useQuery(GET_ISSUE_FEED_STATE)
  const issueFeed = data?.issueFeed || defaultState

  const setIssueFeedContent = (item: any, open: any) => () => {
    if (!open) {
      issueFeed.data = []
    } else if (item) {
      issueFeed.data.push(item)
    }
    if (item || !open) {
      client.writeData({
        data: {
          issueFeed: {
            open,
            data: issueFeed.data,
            __typename: 'IssueFeed',
          },
        },
      })
    }
  }

  return {
    issueFeed,
    setIssueFeedContent,
  }
}

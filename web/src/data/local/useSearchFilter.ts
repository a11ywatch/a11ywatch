/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/

import { useApolloClient, useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'

const GET_SEARCH_FILTER_STATE = gql`
  query getSearchFilterState {
    searchFilter @client {
      search
    }
  }
`

export function useSearchFilter() {
  const client = useApolloClient()
  const { data } = useQuery(GET_SEARCH_FILTER_STATE, {
    fetchPolicy: 'cache-only',
  })
  const search = data?.searchFilter?.search || ''

  const setSearchFilter = (event: any) => {
    client.writeData({
      data: {
        searchFilter: {
          search: event?.target?.value,
          __typename: 'SearchFilter',
        },
      },
    })
  }

  return {
    search: search.toLowerCase(),
    setSearchFilter,
  }
}

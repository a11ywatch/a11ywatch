/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/

import { useEffect } from 'react'
import { useApolloClient, useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'

const GET_EVENTS_STATE = gql`
  query getEventsState {
    events @client {
      firstAdd
    }
  }
`

const defaultState = {
  firstAdd: null,
}

export function useEvents() {
  const client = useApolloClient()
  const { data } = useQuery(GET_EVENTS_STATE)
  const events = data?.events || defaultState

  const setEvents = ({ firstAdd }: any) => {
    if (typeof localStorage !== 'undefined' && firstAdd && firstAdd !== 'set') {
      localStorage.setItem('firstWebsiteAdded', '1')
    }
    client.writeData({
      data: {
        events: {
          ...events,
          firstAdd,
          __typename: 'LocalEvents',
        },
      },
    })
  }

  useEffect(() => {
    const firstWebsiteAdded = localStorage.getItem('firstWebsiteAdded')

    if (firstWebsiteAdded) {
      setEvents({ firstAdd: 'set' })
    }
  }, [])

  return {
    events,
    setEvents,
  }
}

/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/

import { useApolloClient, useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'

const GET_HTML_VIEW_STATE = gql`
  query getHtmlViewState {
    htmlView @client {
      visible
      display
    }
  }
`

const defaultProps = {
  visible: false,
  display: false,
}

export function useHtmlView() {
  const htmlView = useQuery(GET_HTML_VIEW_STATE).data?.htmlView || defaultProps
  const client = useApolloClient()

  const setHtmlViewContent = (A11YDATA_ELEMENTS: any[] = []) => {
    if (A11YDATA_ELEMENTS?.length) {
      client.writeData({
        data: {
          htmlView: {
            display: true,
            visible: false,
            __typename: 'HtmlView',
          },
        },
      })
    }
  }

  const toggleHtmlModal = (visible: boolean) => {
    client.writeData({
      data: {
        htmlView: {
          display: true,
          visible,
          __typename: 'HtmlView',
        },
      },
    })
  }

  return {
    htmlView,
    setHtmlViewContent,
    toggleHtmlModal,
  }
}

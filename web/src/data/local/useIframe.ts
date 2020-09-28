/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/

import { useApolloClient, useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import { frameDom } from '@app/managers'
import { toggleHighLight } from './iframe'

const GET_FIXFRAME_STATE = gql`
  query getIframeState {
    displayHighlight @client {
      visible
      display
    }
  }
`

export function useIframe() {
  const highLight = useQuery(GET_FIXFRAME_STATE).data?.displayHighlight || null
  const client = useApolloClient()

  const setFrameContent = (callBack: any) => {
    if (frameDom?.dom?.querySelectorAll) {
      const A11YDATA_ELEMENTS = frameDom?.dom?.querySelectorAll('[data-a11y]')

      if (A11YDATA_ELEMENTS?.length) {
        // for sequence mounting fabs
        if (typeof callBack === 'function') {
          callBack(A11YDATA_ELEMENTS)
        }
        client.writeData({
          data: {
            displayHighlight: {
              display: true,
              visible: false,
              __typename: 'FixFrame',
            },
          },
        })
      }
    }
  }

  return {
    highLight,
    setFrameContent,
    toggleHighLight,
  }
}

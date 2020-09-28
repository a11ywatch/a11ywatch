/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/

import { useQuery } from '@apollo/react-hooks'
import { GET_WEBSITE } from '@app/queries'

const websiteData = (url: string, query: boolean = true) => {
  const { data, loading, refetch } = query
    ? useQuery(GET_WEBSITE, {
        variables: { url },
      })
    : { data: null, loading: null, refetch: null }

  const model = Object.freeze({
    data,
    loading: loading,
    refetch,
  })

  return model
}

export { websiteData }

/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/

import { useQuery, useMutation } from '@apollo/react-hooks'
import { GET_HISTORY } from '@app/queries'
import { CRAWL_WEBSITE } from '@app/mutations'

export const historyData = (query: boolean = true) => {
  const { data, loading, refetch } = query
    ? useQuery(GET_HISTORY, {
        variables: {},
      })
    : { data: [], loading: null, refetch: null }

  const [crawlWebsite, { loading: crawlLoading }] = useMutation(CRAWL_WEBSITE)

  const model = Object.freeze({
    crawlWebsite,
    data: data?.user?.history || [],
    loading: loading || crawlLoading,
    refetch,
  })
  return model
}

/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/

import { useQuery } from '@apollo/react-hooks'
import { GET_ANALYTICS } from '@app/queries'
// import { UserManager } from '@app/managers'

export const analyticsData = (query: boolean = true) => {
  const { data, loading, refetch } = query
    ? useQuery(GET_ANALYTICS, {
        variables: { filter: '' },
      })
    : { data: null, loading: null, refetch: null }

  return {
    data: data?.user?.analytics || [],
    loading: loading,
    refetch,
  }
}

/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/

import { useQuery } from '@apollo/react-hooks'
import { GET_WEBSITE_HTML } from '@app/queries'

const websiteHtmlData = (url: string, query: boolean = true) => {
  const { data, loading } = query
    ? useQuery(GET_WEBSITE_HTML, {
        variables: { url },
      })
    : { data: null, loading: null }

  const model = Object.freeze({
    data,
    loading: loading,
  })

  return model
}

export { websiteHtmlData }

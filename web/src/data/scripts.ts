/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/

import { useQuery, useMutation } from '@apollo/react-hooks'
import { GET_SCRIPTS, GET_SCRIPT } from '@app/queries'
import { UPDATE_SCRIPT } from '@app/mutations'
import { SCRIPTS_CDN_URL_HOST } from '@app/configs'

export const scriptData = (url?: string | string[], query: boolean = true) => {
  const { data, loading, refetch } = query
    ? useQuery(GET_SCRIPT, {
        variables: { filter: '', url },
      })
    : { data: null, loading: null, refetch: null }

  const scriptIncluded = !!data?.user?.script
  const cdnUrl =
    scriptIncluded && `${SCRIPTS_CDN_URL_HOST}/${data?.user?.script?.cdnUrl}`
  const cdnUrlMinified =
    scriptIncluded &&
    `${SCRIPTS_CDN_URL_HOST}/${data?.user?.script?.cdnUrlMinified}`

  const script = scriptIncluded
    ? Object.assign({}, data?.user?.script || {}, cdnUrl, cdnUrlMinified)
    : null

  const [
    updateScript,
    { data: updateScriptData, loading: scriptLoading },
  ] = useMutation(UPDATE_SCRIPT)

  return {
    script,
    loading: loading,
    refetch,
    updateScript,
    updateScriptData,
    scriptLoading,
  }
}

export const scriptsData = (query = true) => {
  const { data, loading, refetch } = query
    ? useQuery(GET_SCRIPTS, {
        variables: { filter: '' },
      })
    : { data: null, loading: null, refetch: null }

  return {
    data: data?.user?.scripts || [],
    loading: loading,
    refetch,
  }
}

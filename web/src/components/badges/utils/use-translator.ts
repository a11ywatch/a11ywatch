/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/

import { useEffect } from 'react'
import { loadTranslate } from '@app/lib'

const useTranslator = (): any => {
  const readyChange = (event: any) => {
    if (event.target.readyState === 'complete') {
      loadTranslate()
      document.removeEventListener('readystatechange', readyChange)
    }
  }

  const receiveMessage = (event: any) => {
    if (
      event.data === 'TRX_FINISHED' &&
      event.origin !== window?.location?.origin
    ) {
      document.addEventListener('readystatechange', readyChange)
      window.removeEventListener('message', receiveMessage)
    }
  }

  const setMessageListener = (_: any, cb?: () => any) => {
    if (typeof document !== 'undefined') {
      const translateLoaded = document.querySelector(
        `script[src="/static/load-google.min.js"]`
      )

      if (translateLoaded) {
        loadTranslate()
        return
      }

      const script = document.createElement('script')
      script.src = '/static/load-google.min.js'
      script.defer = true
      document.body.appendChild(script)
      window?.addEventListener('message', receiveMessage, false)
      script.onload = () => {
        setTimeout(() => {
          loadTranslate(cb)
        }, 250)
      }
    }
  }

  useEffect(() => {
    return () => {
      window?.removeEventListener('message', receiveMessage)
      document?.removeEventListener('readystatechange', readyChange)
    }
  }, [])

  return {
    setMessageListener,
  }
}

export { useTranslator }

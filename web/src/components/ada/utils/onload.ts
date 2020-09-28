/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/

import { frameDom } from '@app/managers'

// IFRAME LOADER
export const onLoad = (
  event: any,
  { setFrameContent, iframeRef, setHtmlViewContent }: any
) => {
  try {
    const dom =
      (typeof iframeRef !== 'undefined' &&
        iframeRef?.current?.contentDocument) ||
      event?.target?.contentDocument

    if (dom) {
      frameDom.setFrameDom(dom)
      if (typeof setFrameContent === 'function') {
        setFrameContent(setHtmlViewContent)
      }
      // issue && IframeManager.initIssueFix(issue)
    }
  } catch (e) {
    console.error(e)
  }
}

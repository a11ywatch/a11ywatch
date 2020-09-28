/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/

import { AppManager } from './app'

// TODO: Fix
export const frameDom: any = {
  dom: null,
  html: '',
  clearDom: () => {
    frameDom.dom = null
  },
  setFrameDom: (dom: Document) => {
    if (dom) {
      if (!frameDom?.dom) {
        if (
          dom?.documentElement?.outerHTML &&
          dom?.documentElement?.outerHTML !==
            '<html><head></head><body></body></html>'
        ) {
          frameDom.html = dom.documentElement.outerHTML
        }
      }
      frameDom.dom = dom
    }
  },
  injectAutoFix: ({ callBack, cdn, autoFixEnabled, setAutoFix }: any) => {
    const message = autoFixEnabled
      ? 'Removed auto fix cdn'
      : `Applied auto fix cdn ${cdn}`
    const { dom } = frameDom

    if (!dom && typeof alert === 'function') {
      return alert('issue with dom')
    }

    const body = dom?.querySelector('body')

    if (!autoFixEnabled) {
      const script_fix = dom?.createElement('script')
      script_fix.setAttribute('src', cdn)
      script_fix.setAttribute('data-a11y-cdn', true)
      script_fix && body?.appendChild(script_fix)
    } else {
      let script_fix = dom?.querySelector('[data-a11y-cdn]')

      if (!script_fix) {
        script_fix = dom?.querySelector(`script[src="${cdn}"]`)
      }

      if (script_fix) {
        body?.removeChild(script_fix)
      }
    }

    setAutoFix(!autoFixEnabled)
    AppManager.toggleSnack(true, message, 'message')
    if (typeof callBack === 'function') {
      if (typeof window !== 'undefined') {
        window.requestAnimationFrame(callBack)
      }
    }
  },
}

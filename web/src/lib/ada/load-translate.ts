/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/

declare global {
  interface Window {
    google: any
  }
}

function loadTranslate(save = false) {
  let translateEle

  if (typeof window !== 'undefined' && 'google' in window) {
    const layoutType = window.innerWidth >= 800 ? 'SIMPLE' : 'vk'
    if (window.google.translate && window.google.translate.TranslateElement) {
      const translator = document.querySelector('#google_translate_element')

      if (!translator) {
        const dataTemp = new window.google.translate.TranslateElement(
          {
            pageLanguage: 'en',
            layout:
              window.google.translate.TranslateElement.InlineLayout[layoutType],
          },
          'google_translate_element'
        )
        if (save) {
          translateEle = dataTemp.ca
        }
      }

      if (translator && translateEle && save) {
        translateEle.setAttribute(
          'style',
          'width:1px; height: 1px; opacity: 0; padding: 0px; position: absolute; clip: rect(1px 1px 1px 1px); overflow:hidden;'
        )

        translator.replaceWith(translateEle)
      }
    }
  }
}

export { loadTranslate }

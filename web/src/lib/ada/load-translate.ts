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

const loadTranslate = () => {
  if (typeof window !== 'undefined' && 'google' in window) {
    const layoutType = window.innerWidth >= 800 ? 'SIMPLE' : 'vk'
    if (window.google.translate && window.google.translate.TranslateElement) {
      new window.google.translate.TranslateElement(
        {
          pageLanguage: 'en',
          layout:
            window.google.translate.TranslateElement.InlineLayout[layoutType],
        },
        'google_translate_element'
      )
    }
  }
}

export { loadTranslate }

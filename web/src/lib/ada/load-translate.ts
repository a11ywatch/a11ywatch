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

export function loadTranslate(cb?: () => any) {
  try {
    Promise.resolve().then(() => {
      if (window?.google) {
        const layoutType = window?.innerWidth >= 800 ? 'SIMPLE' : 'vk'

        if (window?.google?.translate?.TranslateElement) {
          const mainElement = new window.google.translate.TranslateElement(
            {
              pageLanguage: 'en',
              layout:
                window.google.translate.TranslateElement.InlineLayout[
                  layoutType
                ],
            },
            'google_translate_element'
          )
          if (mainElement?.V) {
            const glang = document.getElementById('google_translate_element')

            if (glang) {
              glang.replaceWith(mainElement.V)
            }
          }
          document.querySelectorAll('.goog-te-spinner-pos').forEach((el) => {
            el.remove()
          })
        }
      }
    })
  } catch (e) {
    console.error(e)
  } finally {
    if (typeof cb === 'function') {
      cb()
    }
  }
}

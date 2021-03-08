/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/

const clickTranslate = (event: any) => {
  if (event && typeof event.preventDefault === 'function') {
    event.preventDefault()
  }
  const translator = document.querySelector('#google_translate_element')
  if (translator && !translator?.children?.length) {
    const observer = new MutationObserver(clickTranslate)
    observer.observe(translator, {
      childList: true,
    })
    return
  }

  const translate =
    document?.querySelector('.goog-te-combo') ||
    document?.querySelector('.goog-te-gadget-simple .goog-te-menu-value span')

  const evt = document.createEvent('MouseEvent')
  evt.initEvent('click', { bubbles: true } as any)
  translate?.dispatchEvent(evt)
}

export { clickTranslate }

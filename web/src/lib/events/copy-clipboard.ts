/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/

import { AppManager } from '@app/managers'

const fallbackCopyTextToClipboard = (text: string) => {
  let textArea = document.createElement('textarea')
  textArea.value = text
  textArea.style.top = '0'
  textArea.style.left = '0'
  textArea.style.position = 'fixed'

  document.body.appendChild(textArea)
  textArea.focus()
  textArea.select()

  try {
    document.execCommand('copy')
  } catch (e) {
    console.error('Copy Issue', e)
  }
  AppManager.toggleSnack(true, `Copied ${textArea}`, 'message')
  document.body.removeChild(textArea)
}

const copyClipboard = (event: any) => {
  if (event) {
    event?.preventDefault()
  }
  const text = event?.currentTarget?.innerText

  if (!navigator.clipboard) {
    fallbackCopyTextToClipboard(text)
    return
  }
  navigator.clipboard.writeText(text).then(
    () => {
      AppManager.toggleSnack(true, `Copied ${text}`, 'message')
    },
    () => {
      AppManager.toggleSnack(
        true,
        `Issue copying ${text} to clipboard. Try to manually copy it by highlighting.`,
        'error'
      )
    }
  )
}

export { copyClipboard }

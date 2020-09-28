/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/

const printElement = (searchElement?: any, website?: any) => {
  if (typeof window === 'undefined') {
    return false
  }

  if (typeof document !== 'undefined') {
    const divContents = document?.getElementById(searchElement)?.innerHTML
    const printWindow = window.open('', '', 'height=500, width=600')

    if (!divContents) {
      return null
    }
    if (printWindow && 'document' in printWindow) {
      printWindow.document.write(
        `<html><body><h1 style="margin-left:10px;">${website?.url} WCAG and ADA issues</h1>`
      )
      printWindow.document.write(divContents)
      printWindow.document.write('</body></html>')
      printWindow.document?.close()
      printWindow?.print()
    } else {
      if (typeof window !== 'undefined' && window?.alert) {
        window.alert('Device not capable of printing')
      }
    }
  }
}

export { printElement }

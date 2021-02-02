/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/

import React from 'react'
import { createPortal } from 'react-dom'
import { Overlay } from '@app/components/general'
import { Annotations } from '@app/components/ada'
import { IframeManager, AppManager } from '@app/managers'
import { getAccessibleColors } from './get-colors'
import { bindItemClick } from './ada/bind'
import { getFontContrastErrors } from './get-font-contrast-errors'

// TODO: DEPRECATE THIS FILE
export const highlightErrors = (iframeDOM: Document, url: string) => {
  const a11yElements = iframeDOM?.querySelectorAll(
    'button, input, select, textarea'
  )

  const linksElements = iframeDOM?.querySelectorAll('a')

  if (linksElements?.length) {
    linksElements.forEach((item: any) => {
      bindItemClick(item, iframeDOM, url)
    })
  }

  if (a11yElements?.length) {
    const overlayElement = iframeDOM.createElement('div')

    iframeDOM.body.appendChild(overlayElement)
    AppManager.setPortals(
      createPortal(React.createElement(Overlay, {}), overlayElement)
    )

    a11yElements.forEach((item: any) => {
      const elementParent = item?.parentNode

      const parentBackgroundColor = getComputedStyle(
        elementParent,
        null
      ).getPropertyValue('background-color')

      const elementColor = getComputedStyle(item, null).getPropertyValue(
        'color'
      )
      const elementFontSize = getComputedStyle(item, null).getPropertyValue(
        'font-size'
      )

      if (parentBackgroundColor && elementColor) {
        const { contrastRatio } = getAccessibleColors({
          parentBackgroundColor,
          elementColor,
        })

        const {
          errorAALarge,
          errorAASmall,
          warningAALarge,
          warningAASmall,
          contrastFontError,
        } = getFontContrastErrors({ elementFontSize, contrastRatio })

        try {
          if (contrastFontError) {
            const newElement = iframeDOM.createElement('div')

            elementParent?.insertBefore(newElement, item.nextSibling)
            IframeManager.setAdaElements({
              source: item,
              parent: elementParent,
            })

            IframeManager.setPortals(
              createPortal(
                React.createElement(Annotations, {
                  contrastRatio: contrastRatio.toFixed(2),
                  source: item,
                  elementParent: elementParent,
                  portalID: IframeManager.portals.length,
                  errorType: {
                    errorAALarge,
                    errorAASmall,
                    warningAALarge,
                    warningAASmall,
                    smallFont: parseInt(elementFontSize, 10) < 8,
                    major: contrastRatio === Infinity,
                  },
                }),
                newElement
              )
            )
          }
        } catch (e) {
          console.error('highlight a11y errors issue', e)
        }
      }
    })
  }
}

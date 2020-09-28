/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/

import React from 'react'
import { createPortal } from 'react-dom'
import Color from 'color'
import { Overlay } from '@app/components/general'
import { Annotations } from '@app/components/ada'

import { IframeManager, AppManager } from '@app/managers'
import { bindItemClick } from './ada/bind'

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
        const background = Color(parentBackgroundColor)
        const foreground = Color(elementColor)
        const l1 = background.luminosity()
        const l2 = foreground.luminosity()
        const elumRatio = Number(
          l1 >= l2 ? l1 + 0.05 / l2 + 0.05 : l2 + 0.05 / l1 + 0.05
        )

        const addLuminosity = !Number.isFinite(elumRatio) ? elumRatio : 0
        const contrastRatio = background.contrast(foreground) + addLuminosity

        const errorAALarge =
          contrastRatio < 2.5 && parseInt(elementFontSize, 10) >= 24
        const errorAASmall =
          contrastRatio < 2.5 && parseInt(elementFontSize, 10) <= 16
        const warningAALarge =
          contrastRatio < 2.9 && parseInt(elementFontSize, 10) >= 24
        const warningAASmall =
          contrastRatio < 2.9 && parseInt(elementFontSize, 10) <= 16

        const error_state =
          errorAALarge ||
          errorAASmall ||
          warningAALarge ||
          warningAASmall ||
          parseInt(elementFontSize, 10) < 8
        try {
          if (error_state) {
            const newElement = iframeDOM.createElement('div')

            elementParent?.insertBefore(newElement, item.nextSibling)

            IframeManager.setAdaElements({
              source: item,
              parent: elementParent,
            })

            const annotationProps = {
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
            }

            IframeManager.setPortals(
              createPortal(
                React.createElement(Annotations, annotationProps),
                newElement
              )
            )
          }
        } catch (e) {
          console.error(e)
        }
      }
    })
  }
}

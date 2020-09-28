/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/

import { createElement } from 'react'
import { createPortal } from 'react-dom'
import { Overlay } from '@app/components/general'
import { Annotations } from '@app/components/ada'

import { IframeManager, AppManager, frameDom } from '@app/managers'
import { bindItemClick } from './ada/bind'

export const createAnnotations = (issueMap: any, url: string) => {
  const dom = frameDom?.dom

  const linksElements = dom.querySelectorAll('a')

  if (linksElements?.length) {
    linksElements.forEach((item: any) => {
      bindItemClick(item, dom, url)
    })
  }

  if (issueMap?.length) {
    const overlayElement = dom.createElement('div')

    dom.body.appendChild(overlayElement)
    AppManager.setPortals(
      createPortal(createElement(Overlay, {}), overlayElement)
    )

    issueMap?.forEach((item: any) => {
      const el = item?.element

      if (el) {
        try {
          const elementParent = el?.parentNode
          const newElement = dom.createElement('div')
          elementParent?.insertBefore(newElement, el?.nextSibling)
          IframeManager.setAdaElements({
            source: el,
            parent: elementParent,
          })
          const annotationProps = {
            source: el,
            elementParent: elementParent,
            portalID: IframeManager.portals.length,
            errorType: item?.type,
            context: item?.context,
            message: item?.message,
            code: item?.code,
            //   contrastRatio: [0],
          }
          IframeManager.setPortals(
            createPortal(
              createElement(Annotations, annotationProps),
              newElement
            )
          )
        } catch (e) {
          console.error(
            `error: ${e}, element: ${item?.element?.parentNode?.name}`
          )
        }
      }
    })
  }
}

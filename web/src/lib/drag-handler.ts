/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/

export class DragHandler {
  x: number = 0
  y: number = 0
  newX: number = 0
  newY: number = 0
  element?: any

  constructor(element?: any) {
    this.element = element
  }

  getEvent = (event?: any) => {
    if (event && event.preventDefault) {
      event.preventDefault()
    }
    return event || window.event
  }

  closeDragElement = () => {
    document.onmouseup = null
    document.onmousemove = null
  }

  dragMouseDown = (e: any, element: any) => {
    this.element = element
    const { clientX, clientY } = this.getEvent(e)
    this.newX = clientX
    this.newY = clientY
    document.onmouseup = this.closeDragElement
    document.onmouseout = this.closeDragElement
    document.onmousemove = this.elementDrag
  }

  elementDrag = (e: any) => {
    const { clientX, clientY } = this.getEvent(e)
    this.x = this.newX - clientX
    this.y = this.newY - clientY
    this.newX = clientX
    this.newY = clientY
    this.element.style.top = `${this.element.offsetTop - this.y}px`
    this.element.style.left = `${this.element.offsetLeft - this.x}px`
  }
}

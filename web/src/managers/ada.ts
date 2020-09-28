/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/

import { observable, action, toJS } from 'mobx'
import { IframeManager } from './iframe'

class AdaManager {
  @observable
  scriptFixOpen: boolean = false

  @observable
  scriptFix: any[] = []

  @action toggleScriptFix = () => {
    if (!this.scriptFixOpen) {
      const dataFix = toJS(IframeManager.scriptFix).map((fix: any) => {
        const { className } = fix.autoFixSource
        const getFixStyle = fix.autoFixType.replace(
          /([A-Z])/g,
          (matches: any) => `-${matches[0].toLowerCase()}`
        )
        const colorToHex = fix.item.hex()
        let classNameSplit = className.split(' ')
        classNameSplit = classNameSplit ? `.${classNameSplit}` : ''

        fix.css = `
        ${String(classNameSplit).replace(',', ' .')} {
          ${getFixStyle}: ${colorToHex}
        }`

        fix.className = String(classNameSplit).replace(',', ' .')
        fix.getFixStyle = getFixStyle
        fix.color = colorToHex
        return fix
      })

      this.scriptFix = dataFix
    } else {
      this.scriptFix = []
    }
    this.scriptFixOpen = !this.scriptFixOpen
  }
}

const manager = new AdaManager()

export { manager as AdaManager }

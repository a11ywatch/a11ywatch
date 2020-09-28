/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/

import { observable, action, computed } from 'mobx'
import Router from 'next/router'
import { IframeManager } from './iframe'
import { AppManager } from './app'

class HomeManager {
  @observable
  searchHidden: boolean = false

  @observable
  iframeSrc: string = ''

  @observable
  url: string = ''

  preventDefault(event?: any) {
    event?.preventDefault()
  }

  getIframeSource = (url: string = '', rp: boolean): string => {
    const src = this.iframeSrc ? this.iframeSrc : `/iframe/?url=${url}`

    if (rp && src) {
      return src.replace('/iframe/?url=', '')
    }
    return src
  }

  @computed get getTestFrameUrl() {
    return (
      (this.iframeSrc && this.iframeSrc.replace('/iframe/?url=', '')) ||
      'https://www.drake.com'
    )
  }

  @action
  submit = (event: any, url: string) => {
    this.preventDefault(event)
    IframeManager.clearPortals()
    AppManager.clearPortals()
    this.iframeSrc = `/iframe/?url=${url || this.url}`
    this.searchHidden = true
  }

  @action
  link = (iframeDOM: any, source: any) => {
    if (iframeDOM) {
      Router.push({
        pathname: window?.location?.pathname,
        query: { websiteUrl: source },
      })
      IframeManager.clearPortals()
      // TODO: update iframeDOm location and just update urlParam source
      iframeDOM.location = `/iframe/?url=${source}`
    }
  }

  @action
  displaySearch = (event?: any) => {
    this.preventDefault(event)
    if (this.searchHidden) {
      this.searchHidden = false
    }
  }

  @action
  hideSearch = (event: any) => {
    this.preventDefault(event)
    if (!this.searchHidden) {
      this.searchHidden = true
    }
  }

  @action
  onChange = (event: any) => {
    this.preventDefault(event)
    this.url = event.target.value
  }

  @action
  clearSearch = (event: any) => {
    this.preventDefault(event)
    this.url = ''
    this.displaySearch()
  }
}

const manager = new HomeManager()

export { manager as HomeManager }

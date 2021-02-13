/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/

import React, { forwardRef, useRef, useEffect } from 'react'
import {
  fixedFrame,
  mainFrame,
  mainFixed,
} from '@app/stylesheets/index.module.css'
import { IframeManager, HomeManager, frameDom } from '@app/managers'
import { observer } from 'mobx-react'
import { toJS } from 'mobx'
import { useIframe, useHtmlView } from '@app/data'
import { sboxType } from './config'
import { ResetCss } from './styles'
import { HtmlView } from './html-view'
import { onLoad } from './utils'
import { AnnotationContainer } from './annotation-container'

const IFrameComponent = forwardRef((props: any, ref: any) => (
  <iframe {...props} ref={ref} />
))

const urlReplacer = (url: string, homeStore: any) => {
  if (url) {
    if (url.includes('http://localhost')) {
      return url
    }
    return `/iframe/?url=${url}`
  } else {
    return homeStore.getIframeSource(url)
  }
}

const MainFrame = observer(
  ({
    homeStore,
    iframeStore,
    url,
    miniPlayer,
    // viewMode = iframeStore?.viewMode,
    issue,
  }: any) => {
    const iframeRef = useRef()
    const { setFrameContent } = useIframe()
    const { setHtmlViewContent } = useHtmlView()

    useEffect(() => {
      try {
        onLoad(null, { iframeRef })
      } catch (e) {
        console.log(e)
      }
      return () => {
        iframeStore.clearPortals()
        frameDom?.clearDom()
      }
    }, [])

    useEffect(() => {
      if (issue && frameDom?.dom && !iframeStore.issueInited) {
        iframeStore.initIssueFix(issue)
      }
    }, [issue])

    const ariaL = `ada view for ${url}`

    const loadFrame = (event: any) => {
      try {
        onLoad(event, { setFrameContent, iframeRef, setHtmlViewContent })
        if (issue) {
          iframeStore.initIssueFix(issue)
        }
      } catch (e) {
        console.log(e)
      }
    }

    const src = iframeStore?.viewMode ? url : urlReplacer(url, homeStore)

    const frameProps = {
      src,
      title: ariaL,
      name: ariaL,
      onLoad: loadFrame,
      className: mainFrame,
      sandbox: `${sboxType} allow-scripts`,
      ref: iframeRef,
      allowFullScreen: true,
    }

    if (miniPlayer) {
      return (
        <div className={fixedFrame}>
          <IFrameComponent {...frameProps} />
        </div>
      )
    }
    return (
      <div className={mainFixed}>
        <ResetCss />
        <IFrameComponent {...frameProps} />
      </div>
    )
  }
)

const FixPortals = observer(({ store }: { store: any }) => toJS(store.Portals))
const Container = observer(({ store }: { store: any }) => (
  <AnnotationContainer store={store} {...store.selectedAnnotation} />
))

export const AdaIframe = ({ url, miniPlayer, issue }: any) => {
  return (
    <>
      <MainFrame
        homeStore={HomeManager}
        iframeStore={IframeManager}
        url={url}
        miniPlayer={miniPlayer}
        issue={issue}
      />
      <FixPortals store={IframeManager} />
      <Container store={IframeManager} />
      <HtmlView />
    </>
  )
}

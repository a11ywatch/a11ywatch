/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/

import React, { useRef, useEffect } from 'react'
import { observer } from 'mobx-react'
import { toJS } from 'mobx'
import { mainFixed, mainFrame } from '@app/stylesheets/index.module.css'
import { IframeManager, HomeManager, frameDom } from '@app/managers'
import { AnnotationContainer } from './annotation-container'
import { ResetCss } from './styles'
import { sboxType } from './config'
import { onLoad } from './utils'

const MainFrame = observer(({ homeStore, iframeStore, url, issue }: any) => {
  const iframeRef = useRef(null)

  useEffect(() => {
    onLoad(null, { iframeRef })

    return () => {
      iframeStore?.clearPortals()
      frameDom?.clearDom()
    }
  }, [])

  useEffect(() => {
    if (issue && frameDom?.dom && !iframeStore.issueInited) {
      iframeStore.initIssueFix(issue)
    }
  }, [issue])

  const loadFrame = (event: any) => {
    onLoad(event, { iframeRef })
    if (issue) {
      iframeStore.initIssueFix(issue)
    }
  }

  return (
    <div className={mainFixed}>
      <ResetCss />
      <iframe
        src={homeStore.getIframeSource(url)}
        id='ada-frame'
        className={mainFrame}
        title='ada fix example view'
        name='ada iframe'
        sandbox={`${sboxType} allow-scripts`}
        onLoad={loadFrame}
        ref={iframeRef}
      />
    </div>
  )
})

const Portals = observer(({ store }: any) => toJS(store.Portals))
const Container = observer(({ store }: any) => (
  <AnnotationContainer store={store} {...store.selectedAnnotation} />
))

export const TestOutIframe = ({ url, issue }: any) => {
  return (
    <>
      <MainFrame
        homeStore={HomeManager}
        iframeStore={IframeManager}
        issue={issue}
        url={url}
      />
      <Container store={IframeManager} />
      <Portals store={IframeManager} />
    </>
  )
}

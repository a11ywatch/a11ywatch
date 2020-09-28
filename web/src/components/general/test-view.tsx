/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/
import React from 'react'
import { observer } from 'mobx-react'

import { TestOutIframe } from '../ada/testout-iframe'
import { Fab } from './fab'
import { IssueModal } from './issue-modal'
import { OverlayPortalContainer } from './overlay'
import { issueData, scriptData } from '@app/data'
import { HomeManager } from '@app/managers'

const TestViewContainer = observer(({ store, marketing }: any) => {
  const url = store?.getTestFrameUrl
  const { issue } = issueData(url)
  const { script } = scriptData(url)

  return (
    <>
      <TestOutIframe url={url} issue={issue} />
      <Fab
        direction='left'
        autoFix
        issue={issue}
        script={script}
        marketing={marketing}
      />
      <OverlayPortalContainer />
      <IssueModal issue={issue} />
    </>
  )
})

export function TestView({ marketing }: any) {
  return <TestViewContainer store={HomeManager} marketing={marketing} />
}

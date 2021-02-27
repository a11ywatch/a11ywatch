/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/
import React from 'react'
import { NavBar, Fab, IssueModal, Pulse } from '@app/components/general'
import { AdaIframe } from '@app/components/ada'
import { useRouter } from 'next/router'
import { issueData, scriptData } from '@app/data'
import { withApollo } from '@app/apollo'
import { WithHydrate } from '@app/components/adhoc'
import { metaSetter } from '@app/utils'

function WebsiteDetails() {
  const router = useRouter()
  const { websiteUrl } = router?.query
  const { issue } = issueData(websiteUrl)
  const { script } = scriptData(websiteUrl)

  return (
    <WithHydrate>
      <NavBar title={websiteUrl} backButton notitle />
      {websiteUrl ? (
        <AdaIframe url={websiteUrl} issue={issue} />
      ) : (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flex: 1,
          }}
        >
          <Pulse />
        </div>
      )}
      <Fab autoFix issue={issue} script={script} />
      <IssueModal issue={issue} />
    </WithHydrate>
  )
}

export default withApollo(metaSetter({ WebsiteDetails }))

/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/
import React from 'react'

import dynamic from 'next/dynamic'
import { Container } from '@material-ui/core'
import { PageTitle, Drawer, CollaspeList, Box } from '@app/components/general'
import { ScriptsPageSkeleton } from '@app/components/placeholders'
import { scriptsData, useSearchFilter } from '@app/data'
import { filterSort } from '@app/lib'
import { groupBy } from '@app/utils'
import { strings } from '@app-strings'
import { withApollo } from '@app/apollo'
import { WithHydrate } from '@app/components/adhoc'

const TITLE = 'Scripts'

const UpgradeBanner = dynamic(
  () =>
    import('@app/components/general/upgrade-banner').then(
      (mod) => mod.UpgradeBanner
    ) as any,
  {
    ssr: false,
  }
)

function Scripts() {
  const { data, loading } = scriptsData(true)
  const { search } = useSearchFilter()
  const dataSource = groupBy('domain')(filterSort(data, search))

  return (
    <WithHydrate>
      <Drawer route={TITLE} title={TITLE}>
        <Container maxWidth={'xl'}>
          <Box>
            <PageTitle title={`All ${TITLE}`} />
            <ScriptsPageSkeleton
              dataLength={Object.keys(dataSource)?.length}
              loading={loading}
            >
              <CollaspeList dataSource={dataSource} />
            </ScriptsPageSkeleton>
          </Box>
        </Container>
        <UpgradeBanner />
      </Drawer>
    </WithHydrate>
  )
}

Scripts.meta = {
  title: `${strings.appName} - Scripts`,
}
export default withApollo(Scripts)

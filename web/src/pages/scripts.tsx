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
import { groupBy, metaSetter } from '@app/utils'
import { withApollo } from '@app/apollo'
import { WithHydrate } from '@app/components/adhoc'
import type { PageProps } from '@app/types'

const UpgradeBanner = dynamic(
  () =>
    import('@app/components/general/upgrade-banner').then(
      (mod) => mod.UpgradeBanner
    ) as any,
  {
    ssr: false,
  }
)

function Scripts({ name }: PageProps) {
  const { data, loading } = scriptsData(true)
  const { search } = useSearchFilter()
  const dataSource = groupBy('domain')(filterSort(data, search))

  return (
    <WithHydrate>
      <Drawer title={name}>
        <Container maxWidth={'xl'}>
          <Box>
            <PageTitle title={`All ${name}`} />
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

export default withApollo(metaSetter({ Scripts }))

/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/
import React from 'react'

import { Container } from '@material-ui/core'

import {
  PageTitle,
  Drawer,
  Box,
  CollaspeListCdn,
} from '@app/components/general'
import { ScriptsPageSkeleton } from '@app/components/placeholders'
import { groupBy } from '@app/utils'

import { scriptsData, useSearchFilter } from '@app/data'
import { filterSort } from '@app/lib'
import { withApollo } from '@app/apollo'
import { strings } from '@app-strings'
import { WithHydrate } from '@app/components/adhoc'

const route_title = 'CDN'

function CDNFix() {
  const { data, loading } = scriptsData(true)
  const { search } = useSearchFilter()
  const dataSource = groupBy('domain')(filterSort(data, search))

  return (
    <WithHydrate>
      <Drawer route={route_title} title={route_title}>
        <Container maxWidth={'xl'}>
          <Box>
            <PageTitle title={`All ${route_title} Scripts`} />
            <ScriptsPageSkeleton
              dataLength={Object.keys(dataSource)?.length}
              loading={loading}
              emptyTitle={'No cdn scripts yet'}
            >
              <CollaspeListCdn dataSource={dataSource} />
            </ScriptsPageSkeleton>
          </Box>
        </Container>
      </Drawer>
    </WithHydrate>
  )
}

CDNFix.meta = {
  title: `${strings.appName} - All website CDNS`,
}

export default withApollo(CDNFix)

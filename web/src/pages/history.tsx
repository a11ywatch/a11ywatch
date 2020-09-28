/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/
import React from 'react'

import { Container } from '@material-ui/core'

import {
  Box,
  List,
  FormDialog,
  MiniPlayer,
  PageTitle,
  LinearBottom,
  Drawer,
} from '@app/components/general'
import { historyData, useSearchFilter } from '@app/data'
import { filterSort } from '@app/lib'
import { strings } from '@app-strings'
import { withApollo } from '@app/apollo'
import { WithHydrate } from '@app/components/adhoc'

const TITLE = 'History'

const HistoryPage = () => {
  const { data, loading, refetch, crawlWebsite } = historyData(true)
  const { search } = useSearchFilter()
  const listData = filterSort(data, search)

  return (
    <WithHydrate>
      <Drawer route={TITLE} title={TITLE}>
        <Container maxWidth='xl'>
          <Box>
            <PageTitle title={'All Past Websites'} />
            <List
              data={listData}
              loading={loading}
              refetch={refetch}
              crawlWebsite={crawlWebsite}
              BottomButton={FormDialog}
              history
              emptyHeaderTitle='No websites found'
              emptyHeaderSubTitle='Websites will appear here once you remove them from the dashboard'
            />
          </Box>
        </Container>
        <MiniPlayer />
      </Drawer>
      <LinearBottom loading={loading} />
    </WithHydrate>
  )
}

HistoryPage.meta = {
  title: `${strings.appName} - History`,
}

export default withApollo(HistoryPage)

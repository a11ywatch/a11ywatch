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
import { websitesData, useSearchFilter } from '@app/data'
import { filterSort } from '@app/lib'
import { withApollo } from '@app/apollo'
import { metaSetter } from '@app/utils'
import type { PageProps } from '@app/types'

function Urgent({ name }: PageProps) {
  const { data, loading, refetch } = websitesData(true, 'error')
  const { search } = useSearchFilter()
  const MAINDATASOURCE = filterSort(data, search)

  return (
    <>
      <Drawer title={name}>
        <Container maxWidth='xl'>
          <Box>
            <PageTitle title={name} />
            <List
              data={MAINDATASOURCE}
              loading={loading}
              refetch={refetch}
              BottomButton={FormDialog}
              emptyHeaderTitle='No issues found'
              emptyHeaderSubTitle='Issues will appear here when they arise'
              errorPage
            />
          </Box>
        </Container>
        <MiniPlayer />
      </Drawer>
      <LinearBottom loading={!!loading} />
    </>
  )
}

export default withApollo(metaSetter({ Urgent }))

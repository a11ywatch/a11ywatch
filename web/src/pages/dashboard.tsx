/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/
import React, { memo, useEffect } from 'react'
import dynamic from 'next/dynamic'

import { Button, Container, Fade } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

import {
  Box,
  List,
  MiniPlayer,
  IssueFeed,
  PageTitle,
  LinearBottom,
  Drawer,
} from '@app/components/general'

import { UserManager } from '@app/managers'
import {
  websitesData,
  useIssueFeed,
  useDynamicModal,
  useSearchFilter,
  useEvents,
} from '@app/data'
import { filterSort } from '@app/lib'
import { strings } from '@app-strings'
import { withApollo } from '@app/apollo'
import { WithHydrate } from '@app/components/adhoc'

const noSSR = {
  ssr: false,
}

const DynamicModal = dynamic(
  () => import('@app/components/modal').then((mod) => mod.DynamicModal) as any,
  noSSR
)

const UpgradeBanner = dynamic(
  () =>
    import('@app/components/general/upgrade-banner').then(
      (mod) => mod.UpgradeBanner
    ) as any,
  noSSR
)

const FormDialog = dynamic(
  () =>
    import('@app/components/general/form-dialog').then(
      (mod) => mod.FormDialog
    ) as any,
  noSSR
)

const useStyles = makeStyles((theme) => ({
  clear: {
    background: 'transparent',
    boxShadow: 'none',
  },
  sidePanelPadding: {
    paddingRight: '20vw',
    [theme.breakpoints.down('md')]: {
      paddingRight: 0,
    },
  },
}))

const MiniPlayerMemo = memo(MiniPlayer)

const removePress = (url?: string, deleteMany: boolean = false, cb?: any) => {
  cb({
    variables: {
      url,
      userId: UserManager?.getID,
      deleteMany,
    },
  })?.catch((res: any) => {
    const errors = res?.graphQLErrors?.map((error: any) => {
      return error?.message
    })
    console.log(errors)
  })
}

const addPress = (url: string, cb: any, headers?: any) => {
  cb({
    variables: {
      url,
      userId: UserManager?.getID,
      customHeaders: headers,
    },
  })?.catch((res: any) => {
    const errors = res?.graphQLErrors?.map((error: any) => {
      return error?.message
    })
    console.log(errors)
  })
}

function Dashboard() {
  const classes = useStyles()
  const {
    data,
    error,
    loading,
    mutatationLoading,
    removeWebsite,
    addWebsite,
    refetch,
    crawlWebsite,
    subscriptionData,
  } = websitesData()
  const { search } = useSearchFilter()
  const { issueFeed } = useIssueFeed()
  const { events, setEvents } = useEvents()
  const { setModal } = useDynamicModal()
  const { issueSubData } = subscriptionData
  const MAINDATASOURCE = filterSort(data, search)

  useEffect(() => {
    if (issueSubData && events && !events?.firstAdd) {
      setEvents({
        firstAdd: true,
      })
    }
  }, [issueSubData])

  const blocked =
    typeof UserManager.getID === 'number' && isNaN(UserManager.getID)

  return (
    <WithHydrate>
      <Drawer title={'Dashboard'}>
        <Container maxWidth={'xl'}>
          <Box
            className={
              issueFeed?.data?.length && issueFeed.open
                ? classes.sidePanelPadding
                : ''
            }
          >
            <PageTitle
              title={'Websites'}
              rightButton={
                <Fade in={!!data.length}>
                  <Button
                    className={classes.clear}
                    onClick={() => removePress('', true, removeWebsite)}
                  >
                    Remove All
                  </Button>
                </Fade>
              }
            />
            <List
              data={MAINDATASOURCE}
              error={error}
              loading={loading}
              mutatationLoading={mutatationLoading}
              removePress={(url: string, deleteMany?: boolean) =>
                removePress(url, deleteMany, removeWebsite)
              }
              addPress={(url: string, headers: any) =>
                addPress(url, addWebsite, headers)
              }
              crawlWebsite={crawlWebsite}
              refetch={refetch}
              BottomButton={FormDialog}
              setModal={setModal}
              blocked={blocked}
              emptyHeaderTitle={
                !blocked ? 'No websites set' : 'Please sign in to continue'
              }
              emptyHeaderSubTitle={
                !blocked
                  ? 'Add a website to monitor below'
                  : 'go the the login page to continue'
              }
            />
          </Box>
        </Container>
        <MiniPlayerMemo />
        <IssueFeed />
        <DynamicModal />
        <UpgradeBanner />
      </Drawer>
      <LinearBottom loading={mutatationLoading} />
    </WithHydrate>
  )
}

Dashboard.meta = {
  title: `${strings.appName} - Dashboard`,
}

export default withApollo(Dashboard)

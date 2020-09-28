/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/
import React, { useState, useEffect } from 'react'
import { List as MUList, Grid, Card, CardHeader } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

import { useMiniPlayer } from '@app/data'
import { ListSkeleton } from '../placeholders'
import { FullScreenModal } from './fullscreen-modal'
import { WebsiteCell as RenderWebsite, IssuesCell } from './cells'

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
    overflow: 'visible',
  },
  empty: {
    minHeight: 88,
  },
}))

function WebSites({
  data,
  removePress,
  handleClickOpen,
  refetch,
  handleClickOpenPlayer,
  errorPage,
  crawlWebsite,
  setModal,
  mutatationLoading,
  loading,
}: any) {
  const source = errorPage ? data?.issues : data
  const WebComponent = errorPage ? IssuesCell : RenderWebsite
  return source?.map(
    ({ url, id, pageHeaders, pageUrl, ...domainProps }: any, index: number) => (
      <WebComponent
        handleClickOpen={handleClickOpen}
        url={url || pageUrl}
        key={`${id} ${url} ${pageUrl} ${index}`}
        removePress={removePress}
        refetch={refetch}
        handleClickOpenPlayer={handleClickOpenPlayer}
        crawlWebsite={crawlWebsite}
        setModal={setModal}
        loading={loading}
        mutatationLoading={mutatationLoading}
        pageHeaders={pageHeaders}
        {...domainProps}
      />
    )
  )
}

const defaultModalState = {
  open: false,
  data: null,
  title: '',
  url: '',
  error: '',
}

export function List({
  data,
  error,
  loading,
  addPress,
  removePress,
  BottomButton,
  emptyHeaderTitle = 'Empty',
  emptyHeaderSubTitle = 'Add your website below',
  refetch,
  errorPage,
  history,
  crawlWebsite,
  setModal,
  mutatationLoading,
  blocked,
}: any) {
  const classes = useStyles()
  const [modal, setOpen] = useState(defaultModalState)
  const { miniPlayer, setMiniPlayerContent } = useMiniPlayer()

  const findIssues = data?.some((source: any) => source?.issues?.length)

  const handleClickOpen = (data: any, title: any, url: any, error: any) => {
    setOpen({ open: true, data, title, url, error })
  }

  const handleClose = () => {
    setOpen({ ...modal, open: false })
  }

  useEffect(() => {
    if (miniPlayer.open) {
      handleClose()
    }
  }, [miniPlayer])

  const renderInner = () => {
    if (!data.length && loading) {
      // @ts-ignore
      return <ListSkeleton />
    }
    if (!data.length && !loading && error) {
      return (
        <CardHeader
          title='Error'
          subheader='An Issue occured. Please try again. If issue persist please contact support.'
          className={classes.empty}
        />
      )
    }

    const generalProps = {
      handleClickOpen,
      handleClickOpenPlayer: setMiniPlayerContent,
      removePress,
      refetch,
      errorPage,
      history,
      crawlWebsite,
      setModal,
      mutatationLoading: mutatationLoading,
    }

    if (
      (errorPage && data?.length && findIssues) ||
      (data?.length && !errorPage)
    ) {
      return (
        <MUList>
          {!errorPage ? (
            <WebSites data={data} {...generalProps} />
          ) : (
            data.map((page: any, i: number) => (
              <WebSites
                data={page}
                key={`${page.pageUrl} ${i}`}
                {...generalProps}
              />
            ))
          )}
        </MUList>
      )
    }

    return (
      <CardHeader
        title={emptyHeaderTitle}
        subheader={emptyHeaderSubTitle}
        className={classes.empty}
      />
    )
  }

  return (
    <div className={classes.root}>
      <Grid container spacing={2} justify='center'>
        <Grid item xs={12} md={12}>
          <Card>{renderInner()}</Card>
        </Grid>
        {errorPage || history || blocked ? null : (
          <BottomButton
            buttonTitle={'Add Website'}
            okPress={addPress}
            removePress={removePress}
          />
        )}
      </Grid>
      <FullScreenModal
        {...modal}
        handleClose={handleClose}
        handleClickOpen={handleClickOpen}
        refetch={refetch}
        handleClickOpenPlayer={setMiniPlayerContent}
      />
    </div>
  )
}

/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/
import React from 'react'
import {
  AppBar,
  Button,
  Dialog,
  List,
  Toolbar,
  IconButton,
  Typography,
  Container,
  Slide,
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

import { Close as CloseIcon } from '@material-ui/icons'

import { issueSort } from '@app/lib'
import { NavBarTitle } from './navigation'
import { useInputHeader } from './hooks'

import { Link } from './link'
import { WebsitePrimaryCell } from './cells'
import { InputHeaders } from './input-headers'
import { websitesData } from '@app/data'

const useStyles = makeStyles((theme) => ({
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
  overflowY: {
    overflowY: 'hidden',
  },
  row: {
    display: 'flex',
    alignItems: 'center',
    flex: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.down('sm')]: {
      marginRight: theme.spacing(1),
    },
  },
  subTitle: {
    maxWidth: '75vw',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    color: theme.palette.text.primary,
    [theme.breakpoints.down('sm')]: {
      maxWidth: '50vw',
    },
  },
  list: {
    paddingTop: 70,
    [theme.breakpoints.down('sm')]: {
      paddingTop: 56,
    },
  },
  submit: {
    margin: theme.spacing(1),
  },
  navbar: {
    backgroundColor: theme.palette.background.default,
  },
  warning: {
    padding: theme.spacing(1),
    backgroundColor: theme.palette.background.default,
    borderRadius: theme.shape?.borderRadius || 4,
    margin: theme.spacing(1),
  },
}))

const Transition = React.forwardRef(function Transition(props: any, ref: any) {
  return <Slide direction='up' ref={ref} {...props} />
})

function UpperInput({ data, url }: any) {
  const classes = useStyles()

  const {
    // customHeader,
    customFields,
    removeFormField,
    addFormField,
    updateFormField,
  } = useInputHeader(data)

  const { updateWebsite } = websitesData(
    false,
    '',
    url,
    customFields?.map((item: any) => {
      return {
        key: item.key,
        value: item.value,
      }
    })
  )

  const inputProps = {
    customHeader: true,
    customFields,
    removeFormField,
    addFormField,
    updateFormField,
  }

  return (
    <>
      <div className={classes.list}>
        <InputHeaders {...inputProps} noFlex viewMode />
      </div>
      <Button
        className={classes.submit}
        onClick={() =>
          updateWebsite({
            variables: { url, customHeaders: customFields, filter: '' },
          })
        }
      >
        Update
      </Button>
    </>
  )
}

export function FullScreenModal({
  handleClickOpen,
  handleClose,
  open,
  data = [],
  title = 'Issues',
  // onPress,
  refetch,
  url,
  handleClickOpenPlayer,
  error,
}: any) {
  const classes = useStyles()
  const issuesModal = title === 'Issues'
  const headerModal = title === 'Custom Headers'

  return (
    <Dialog
      fullScreen
      open={open}
      onClose={handleClose}
      TransitionComponent={Transition as any}
    >
      <AppBar position={'fixed'} className={classes.navbar}>
        <Toolbar>
          <IconButton
            edge='start'
            onClick={handleClose}
            aria-label='close'
            className={classes.menuButton}
          >
            <CloseIcon />
          </IconButton>
          <div className={classes.row}>
            <NavBarTitle title={title} flex />
            {url ? (
              <div>
                <Typography
                  variant='subtitle1'
                  className={classes.subTitle}
                  component={Link}
                  href={`/website-details?websiteUrl=${url}`}
                >
                  {url}
                </Typography>
                {data?.length ? (
                  <Typography
                    variant='subtitle2'
                    className={classes.subTitle}
                    style={{ textAlign: 'right' }}
                  >
                    {data?.length} page{data?.length === 1 ? '' : 's'}
                  </Typography>
                ) : null}
              </div>
            ) : null}
          </div>
        </Toolbar>
      </AppBar>
      {headerModal ? (
        <UpperInput data={data} url={url} />
      ) : (
        <List className={classes.list}>
          {Array.isArray(data) && data?.length ? (
            data.sort(issueSort)?.map((item: any, listIndex: number) => {
              return (
                <WebsitePrimaryCell
                  handleClickOpenPlayer={handleClickOpenPlayer}
                  handleClickOpen={handleClickOpen}
                  handleClose={handleClose}
                  key={`${listIndex} ${item?.selector} ${item?.code}`}
                  refetch={refetch}
                  openError
                  issuesModal={issuesModal}
                  noMaxHeight={data?.length === 1}
                  error={error}
                  item={item}
                  url={url}
                />
              )
            })
          ) : (
            <Container>
              <Typography variant='subtitle1' component='p'>
                No data found yet, please try again later or reload the page.
              </Typography>
              <Button
                aria-label='refetch data'
                aria-haspopup='true'
                onClick={() => refetch()}
                color='inherit'
              >
                Reload Data
              </Button>
            </Container>
          )}
        </List>
      )}
    </Dialog>
  )
}

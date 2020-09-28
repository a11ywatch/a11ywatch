/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/
import React, { useRef } from 'react'
import {
  AppBar,
  Dialog,
  Toolbar,
  IconButton,
  Typography,
  Grow,
  List,
} from '@material-ui/core'
import { makeStyles, Theme } from '@material-ui/core/styles'
import CloseIcon from '@material-ui/icons/Close'
import { DragHandler, issueSort } from '@app/lib'
import { useMiniPlayer } from '@app/data'
import { NavBarTitle } from './navigation'
import { WebsitePrimaryCell } from './cells'

interface MergedTheme extends Theme {
  color: any
}
const useStyles = makeStyles((theme: MergedTheme) => ({
  root: {
    overflowX: 'hidden',
  },
  appBar: {
    position: 'sticky',
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
  miniPlayer: {
    overflowX: 'hidden',
    right: 'auto !important',
    left: 'auto',
    [theme.breakpoints.down('sm')]: {
      maxWidth: 350,
    },
  },
  list: {
    maxHeight: '50vh',
    overflowY: 'scroll',
    overflowX: 'hidden',
    display: 'block',
    zIndex: 2,
  },
  noMaxHeight: {
    maxHeight: 'none',
  },
  transparent: {
    background: 'inherit',
  },
  row: {
    display: 'flex',
    alignItems: 'center',
    flex: 1,
    overflow: 'hidden',
  },
  subTitle: {
    maxWidth: '75vw',
    textOverflow: 'ellipsis',
    color: theme.color.indigo,
    [theme.breakpoints.down('sm')]: {
      maxWidth: '20vw',
      marginLeft: 2,
    },
  },
}))

const GrowTransition = React.forwardRef(function GrowTransition(
  props: any,
  ref: any
) {
  return <Grow ref={ref} {...props} />
})

export function IssueModal({ issue }: any) {
  const { miniPlayer, setMiniPlayerContent } = useMiniPlayer()
  const classes = useStyles()
  const appBarRef = useRef(null)
  const { open, title } = miniPlayer
  const handler = new DragHandler(appBarRef?.current)

  return (
    <Dialog
      ref={appBarRef}
      className={classes.miniPlayer}
      open={open}
      onClose={setMiniPlayerContent(false)}
      TransitionComponent={GrowTransition as any}
      disableBackdropClick={true}
      hideBackdrop={true}
      disablePortal={true}
      disableEnforceFocus={true}
      disableAutoFocus={true}
      scroll={'body'}
      BackdropProps={{
        classes: {
          root: classes.transparent,
        },
      }}
    >
      <AppBar
        className={classes.appBar}
        position='fixed'
        onMouseDown={(e) => handler.dragMouseDown(e, appBarRef?.current)}
      >
        <Toolbar>
          <IconButton
            edge='start'
            color='inherit'
            onClick={setMiniPlayerContent(false)}
            aria-label='close'
          >
            <CloseIcon />
          </IconButton>
          <div className={classes.row}>
            <NavBarTitle title={title} flex />
            {issue?.pageUrl ? (
              <Typography
                variant='subtitle1'
                className={classes.subTitle}
                color={'primary'}
              >
                {issue?.pageUrl}
              </Typography>
            ) : null}
          </div>
        </Toolbar>
      </AppBar>
      {issue?.issues?.length ? (
        <List
          className={`${classes.list} ${
            issue?.issues?.length === 1 ? classes.noMaxHeight : ''
          }`}
        >
          {issue?.issues
            ?.sort(issueSort)
            .map((item: any, listIndex: number) => {
              return (
                <li key={`${listIndex} ${item?.selector} ${item?.code}`}>
                  <WebsitePrimaryCell
                    issuesModal
                    error
                    item={item}
                    url={issue?.pageUrl}
                  />
                </li>
              )
            })}
        </List>
      ) : null}
    </Dialog>
  )
}

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
} from '@material-ui/core'
import { makeStyles, Theme } from '@material-ui/core/styles'
import CloseIcon from '@material-ui/icons/Close'
import { DragHandler } from '@app/lib'
import { useMiniPlayer } from '@app/data'
import { Fab } from './fab'
import { AdaIframe } from '../ada/ada-iframe'
import { Link } from './link'

interface MergedTheme extends Theme {
  color: any
}

const useStyles = makeStyles((theme: MergedTheme) => ({
  root: {
    overflow: 'hidden',
  },
  appBar: {
    position: 'relative',
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
  miniPlayer: {
    overflow: 'hidden',
    right: 'auto !important',
    left: 'auto',
    minWidth: '40vw',
    maxHeight: '50vh',
    margin: '0px !important',
  },
  overflowY: {
    overflowY: 'hidden',
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
    maxWidth: '25vw',
    color: theme.color.indigo,
  },
}))

const GrowTransition = React.forwardRef(function GrowTransition(
  props: any,
  ref: any
) {
  const classes = useStyles()
  return <Grow ref={ref} {...props} className={classes.overflowY} />
})

export function MiniPlayer() {
  const { miniPlayer, setMiniPlayerContent } = useMiniPlayer()
  const classes = useStyles()
  const appBarRef = useRef(null)
  const { open, data, title } = miniPlayer
  const handler = new DragHandler(appBarRef?.current)
  const href = `/website-details?websiteUrl=${encodeURIComponent(data)}`

  return (
    <Dialog
      fullScreen={false}
      onMouseDown={(e: any) => handler.dragMouseDown(e, appBarRef?.current)}
      ref={appBarRef}
      className={classes.miniPlayer}
      fullWidth
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
      <AppBar className={classes.appBar}>
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
            <Typography variant='h6' className={classes.title}>
              {title}
            </Typography>
            <Typography
              variant='subtitle1'
              className={classes.subTitle}
              component={Link}
              color={'primary'}
              href={href}
            >
              {data}
            </Typography>
          </div>
        </Toolbar>
      </AppBar>
      <div>
        <AdaIframe url={data} miniPlayer />
        <Fab autoFix />
      </div>
    </Dialog>
  )
}

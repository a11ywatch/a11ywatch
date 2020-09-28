/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/

import React from 'react'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  root: {
    paddingBottom: '12%',
    overflow: 'hidden',
  },
  card: {
    overflow: 'hidden',
    width: '100%',
    borderRadius: '4px',
    paddingBottom: '44.818182%',
    position: 'relative',
    backgroundColor: theme.palette.background.paper,
    [theme.breakpoints.down('sm')]: {
      height: '23vh',
      minHeight: 'auto',
    },
  },
  float: {
    position: 'absolute',
    top: 0,
    left: 0,
  },
  video: {
    width: '100%',
    height: '100%',
  },
  frame: {
    border: 0,
    willChange: 'transform',
  },
}))

export function CtaVideo() {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <div className={classes.card}>
        <div className={`${classes.float} ${classes.video}`}>
          <div className={classes.video}>
            <iframe
              src={`https://player.vimeo.com/video/389034032?title=0&byline=0&portrait=0&muted=1&autoplay=${1}&controls=0&loop=1&texttrack=en`}
              allowFullScreen
              title='A11yWatch demo video'
              className={`${classes.video} ${classes.frame}`}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

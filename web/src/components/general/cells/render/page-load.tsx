/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/

import React from 'react'
import { Chip, Tooltip } from '@material-ui/core'
import { Speed as SpeedIcon } from '@material-ui/icons'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  toolTip: {
    background: theme.palette.secondary.main,
    color: '#fff',
    fontWeight: 600,
    fontSize: '0.85em',
  },
  icon: {
    marginRight: '8px',
  },
  red: {
    background: '#ff3d00',
  },
  yellow: {
    background: '#ffea00',
    color: '#000',
  },
  green: {
    background: '#00a152',
  },
}))

export function PageLoad({
  pageLoadTime = {
    duration: 0,
  },
  mobile,
}: any) {
  const classes = useStyles()
  const durationToSeconds = pageLoadTime?.duration / 1000
  const fixedLength =
    String(durationToSeconds).length === 1 ? 1 : durationToSeconds < 1 ? 3 : 2

  return pageLoadTime?.duration ? (
    <Tooltip
      title={`Page load time is ${
        pageLoadTime?.durationFormated
      } at ${durationToSeconds.toFixed(fixedLength)} seconds`}
      placement={'right'}
      classes={{
        tooltip: `${classes.toolTip} ${
          pageLoadTime?.duration > 5000
            ? classes.red
            : pageLoadTime?.duration > 1500
            ? classes.yellow
            : classes.green
        }`,
      }}
    >
      <Chip
        className={classes.icon}
        variant='outlined'
        size='small'
        avatar={<SpeedIcon style={{ color: pageLoadTime.color }} />}
        label={mobile ? 'spd' : 'Speed'}
      />
    </Tooltip>
  ) : null
}

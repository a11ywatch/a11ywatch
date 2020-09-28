/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/

import React from 'react'
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'
import {
  Card,
  CardActions,
  CardContent,
  Button,
  Typography,
} from '@material-ui/core'
import { Notifications as NotificationsIcon } from '@material-ui/icons'
import { strings } from '@app-strings'
import { useDynamicModal } from '@app/data'
import { enableNotifications } from '@app/lib'
import { ringKeyFrames } from '@app/styles'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    card: {
      minWidth: '275px',
      position: 'relative',
      width: '100%',
      height: '100%',
      maxWidth: '50vw',
      maxHeight: '50vh',
      [theme.breakpoints.down('sm')]: {
        maxWidth: '70vw',
        maxHeight: '70vh',
      },
    },
    title: {
      fontSize: '14px',
    },
    learn: {
      background: 'transparent',
      boxShadow: 'none',
    },
    see: {
      background: 'none',
      boxShadow: 'none',
      color: '#fff',
      textTransform: 'none',
    },
    normal: {
      textTransform: 'none',
      minWidth: '150px',
      color: '#fff',
      ['&:hover']: {
        textDecoration: 'none',
      },
      [theme.breakpoints.down('sm')]: {
        minWidth: 80,
      },
    },
    iconContainer: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: '12px',
      marginBottom: '12px',
    },
    ringAnimate: {
      '-webkit-animation': 'ring 7.5s linear 1',
      '-webkit-transform-origin': '50% 4px',
      '-moz-animation': 'ring 7.5s linear 1',
      '-moz-transform-origin': '50% 4px',
      animation: 'ring 7.5s linear 1',
      'transform-origin': '50% 4px',
    },
    about: {
      [theme.breakpoints.down('sm')]: {
        fontSize: '12px',
      },
    },
  })
)

export function EnableNotifications() {
  const classes = useStyles()
  const { setModal } = useDynamicModal()

  return (
    <Card className={classes.card}>
      <CardContent>
        <div className={classes.iconContainer}>
          <style>{ringKeyFrames}</style>
          <NotificationsIcon fontSize='large' className={classes.ringAnimate} />
        </div>
        <Typography variant='h6' component='h3'>
          {strings.alerts.enableNotificationsTitle}
        </Typography>
        <Typography
          variant='subtitle1'
          component='p'
          className={classes.about}
          gutterBottom
        >
          {strings.alerts.enableNotificationsDetail}
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          onClick={() => {
            setModal({ open: false })
            enableNotifications()
          }}
          variant='contained'
          className={classes.normal}
        >
          {strings.alerts.okay}
        </Button>
        <Button
          className={classes.see}
          onClick={() => setModal({ open: false })}
        >
          {strings.alerts.notNow}
        </Button>
      </CardActions>
    </Card>
  )
}

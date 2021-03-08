/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/

import React, { Fragment } from 'react'
import { Typography, Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { CtaInput } from './searchbar'
import Image from 'next/image'
import { Link } from '../general'
import ExpandMore from '@material-ui/icons/ExpandMore'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: '6%',
    paddingBottom: '6%',
    [theme.breakpoints.down('sm')]: {
      paddingTop: '18%',
      display: 'block',
    },
  },
  mobileHidden: {
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  },
  detailedContainer: {
    paddingTop: '6%',
  },
  block: {
    flex: 1,
  },
  intro: {
    lineHeight: '1.15em',
  },
  submit: {
    marginTop: 10,
    width: 200,
    marginBottom: 20,
    '&::after': {
      display: 'block',
      position: 'absolute',
      left: '100%',
      content: '"FREE forever."',
      font: '700 12px/17px Axiforma,Arial,serif',
      textAlign: 'left',
      letterSpacing: 1,
      textTransform: 'uppercase',
      marginLeft: 20,
      maxWidth: 130,
      width: '100%',
      color: '#b9bec7',
      pointerEvents: 'none',
      top: 'auto',
    },
  },
  join: {
    marginBottom: '12%',
    textAlign: 'center',
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
    color: '#7c828d',
  },
  bottomAnchor: {
    display: 'block',
  },
}))

function CtaIntro({ checker }: any) {
  const classes = useStyles()

  return (
    <Fragment>
      <section
        className={`${classes.root}${
          checker ? ` ${classes.detailedContainer}` : ''
        }`}
      >
        <div className={classes.block}>
          <Typography variant='h2' component={'h1'} className={classes.intro}>
            {checker
              ? 'Check Your Web Accessibility'
              : 'Web Accessibility Watcher'}
          </Typography>
          <Typography variant='subtitle1' component={'p'} gutterBottom>
            {checker
              ? 'Test your website metrics'
              : 'Safeguard to a pleasant web experience'}
          </Typography>
          <Button
            component={Link}
            className={classes.submit}
            href={'/register'}
          >
            {'Sign up'}
          </Button>
          <CtaInput />
        </div>
        <div className={`${classes.block} ${classes.mobileHidden}`}>
          <Image
            src={`/static/img/${checker ? 'browser-stats' : 'intro'}.svg`}
            height={500}
            width={500}
            alt='image of content being controlled'
          />
        </div>
      </section>
      {checker ? null : (
        <div className={classes.join}>
          <Typography variant='subtitle2' component={'p'} gutterBottom>
            JOIN THOUSANDS OF HIGHLY PRODUCTIVE TEAMS
          </Typography>
          <img
            src={'/static/img/wave.svg'}
            height={8}
            width={120}
            role='presentation'
            alt=''
          />
          <a className={classes.bottomAnchor} href='#video-section'>
            <ExpandMore />
          </a>
        </div>
      )}
    </Fragment>
  )
}

export { CtaIntro }

/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/

import React from 'react'
import { Typography, Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { CtaInput } from './searchbar'
import Image from 'next/image'
import { Link } from '../general'

const useStyles = makeStyles((theme) => ({
  root: {
    paddingBottom: '12%',
    display: 'flex',
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
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
  },
}))

function CtaIntro({ checker }: any) {
  const classes = useStyles()

  return (
    <section
      className={`${classes.root}${
        checker ? ` ${classes.detailedContainer}` : ''
      }`}
    >
      <div className={classes.block}>
        <Typography variant='h2' component={'h1'} className={classes.intro}>
          Monitor Web Accessibility
        </Typography>
        <Typography variant='subtitle1' component={'p'} gutterBottom>
          Safeguard to a pleasant web experience
        </Typography>
        <Button component={Link} className={classes.submit} href={'/register'}>
          {'Sign up free'}
        </Button>
        <CtaInput />
      </div>
      <div className={`${classes.block} ${classes.mobileHidden}`}>
        <Image
          src={'/static/img/intro.svg'}
          height={500}
          width={500}
          alt='image of content being controlled'
        />
      </div>
    </section>
  )
}

export { CtaIntro }

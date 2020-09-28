/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/
import React from 'react'
import { Avatar, Grid, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { strings } from '@app-strings'

const useStyles = makeStyles((theme) => ({
  root: {
    paddingBottom: '12%',
  },
  container: {
    alignItems: 'center',
    display: 'flex',
  },
  bigAvatar: {
    width: '310px',
    height: '310px',
    display: 'block',
    objectFit: 'contain',
    margin: '0 auto',
    border: '4px solid white',
    minWidth: '160px',
    minHeight: '160px',
    [theme.breakpoints.down('sm')]: {
      width: '270px',
      height: '270px',
    },
  },
  title: {
    fontWeight: 'normal',
    [theme.breakpoints.down('sm')]: {
      fontSize: '1.7em',
      textAlign: 'center',
    },
  },
  subtitle: {
    [theme.breakpoints.down('sm')]: {
      textAlign: 'center',
      flex: 1,
    },
  },
}))

export function CtaTestimonial() {
  const classes = useStyles()

  return (
    <section className={classes.root}>
      <Grid
        container
        spacing={3}
        justify='center'
        className={classes.container}
      >
        <Grid item xs={12} sm={6}>
          <Avatar
            alt={strings.testimonials[0].who}
            src='https://images.unsplash.com/photo-1567473433986-94c54e951026?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80'
            className={classes.bigAvatar}
          />
        </Grid>
        <Grid item xs={12} sm={6} container>
          <>
            <Typography
              variant='h4'
              component='h5'
              gutterBottom
              className={classes.title}
            >
              {strings.testimonials[0].title}
            </Typography>
            <Typography
              variant='subtitle1'
              component='p'
              gutterBottom
              className={classes.subtitle}
            >
              {strings.testimonials[0].who}
            </Typography>
          </>
        </Grid>
      </Grid>
    </section>
  )
}

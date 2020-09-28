/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/
import React from 'react'

import { Typography, Grid, Paper } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import {
  Mood as PaidIcon,
  WhatshotOutlined as WhatsHot,
  SentimentSatisfied as FreeIcon,
} from '@material-ui/icons'
import { Ribbon } from '@app/components/general'

const TRUSTED_CDN = 'Secure custom autofix CDN'
const VISUAL_PLAYGROUND = 'Visual website playground'

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
  },
  icon: {
    fontSize: '40px',
  },
  center: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  paper: {
    flexGrow: 1,
    minHeight: '25vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    margin: 4,
    padding: 20,
    border: 0,
    overflow: 'hidden',
    position: 'relative',
    whiteSpace: 'pre-wrap',
  },
  highLight: {
    boxShadow: 'inset 0px 0px 0px 5px rgba(130,130,130,0.4)',
  },
  large: {
    minHeight: '40vh',
  },
}))

export function Price({
  basic = false,
  premium = false,
  onClick,
  blockFree,
}: any) {
  const classes = useStyles()
  const highLight = (
    name: any = '',
    highLightStyles: any,
    { basic, premium }: any
  ) =>
    (name === 'Basic' && basic) || (name === 'Premium' && premium)
      ? highLightStyles
      : ''

  const PLANS = [
    {
      title: 'Free',
      details: [
        'Monitor 1 website',
        '2 daily manual page scans',
        'Root domain scanned daily',
        TRUSTED_CDN,
        VISUAL_PLAYGROUND,
        'Custom scripts',
        '3 Private API request per day',
      ],
      Icon: FreeIcon,
      cost: '0$',
    },
    {
      title: 'Basic',
      details: [
        'Monitor up to 4 websites',
        '10 daily manual page scans',
        'All pages scanned daily',
        TRUSTED_CDN,
        VISUAL_PLAYGROUND,
        'Custom editable scripts',
        '100 Private API request per day',
      ],
      Icon: PaidIcon,
      cost: '10$/month',
    },
    {
      title: 'Premium',
      details: [
        'Monitor up to 10 websites',
        'Unlimited daily manual page scans',
        'All pages scanned multiple times daily',
        TRUSTED_CDN,
        VISUAL_PLAYGROUND,
        'Custom editable scripts',
        '500 Private API request per day',
      ],
      Icon: WhatsHot,
      cost: '20$/month',
    },
  ]

  return (
    <>
      <Grid container spacing={1} className={!onClick ? classes.root : ''}>
        {PLANS.filter((item: any) => {
          if (!blockFree) {
            return item.title !== 'Free'
          }
          return true
        }).map(({ title, details, cost, Icon }: any) => (
          <Paper
            key={title}
            className={`${classes.paper} ${highLight(
              title,
              classes?.highLight,
              {
                premium,
                basic,
              }
            )}`}
            onClick={onClick ? onClick(title) : undefined}
            component={onClick ? 'button' : 'div'}
          >
            {title === 'Premium' ? <Ribbon /> : null}
            <Icon fontSize='large' />
            <Typography
              variant='h4'
              component='span'
              gutterBottom
              style={{ fontWeight: 'bold' }}
            >
              {title}
            </Typography>
            <ol>
              {details?.map((item: any) => (
                <Typography variant='subtitle1' component='li' key={item}>
                  - {item}
                </Typography>
              ))}
            </ol>
            {cost ? (
              <Typography
                variant='h5'
                component='span'
                style={{ fontWeight: 600, marginTop: 12 }}
              >
                {cost}
              </Typography>
            ) : null}
          </Paper>
        ))}
      </Grid>
      <div className={classes.center}>
        <Typography
          variant='subtitle1'
          component='p'
          style={{ marginTop: 12, textAlign: 'center' }}
        >
          If you need a higher API limit please send us an email at
          support@a11ywatch.com
        </Typography>
      </div>
    </>
  )
}

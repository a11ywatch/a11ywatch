/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/
import React from 'react'

import { Typography, Grid, Paper } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { Ribbon } from '@app/components/general'
import { priceConfig } from '@app/configs'
import { SectionHeading } from '../text'
import { Spacer } from './spacer'

const useStyles = makeStyles(() => ({
  root: {
    paddingTop: '12%',
    paddingBottom: '12%',
  },
  container: {
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

  const Container = !onClick ? 'section' : 'div'
  return (
    <Container className={!onClick ? classes.root : ''}>
      {typeof onClick === 'undefined' ? (
        <>
          <SectionHeading>Pricing</SectionHeading>
          <Spacer />
        </>
      ) : null}
      <Grid container spacing={1} className={!onClick ? classes.container : ''}>
        {priceConfig.plans
          .filter((item: any) => {
            if (!blockFree) {
              return item.title !== 'Free'
            }
            return true
          })
          .map(({ title, details, cost, Icon }: any) => (
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
    </Container>
  )
}

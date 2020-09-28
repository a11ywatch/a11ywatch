/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/
import React from 'react'

import { Container, Typography, Grid, Paper } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

import {
  Box,
  Footer,
  MarketingDrawer,
  Ribbon,
  Spacer,
  Price,
} from '@app/components/general'
import { strings } from '@app-strings'

import { priceConfig } from '@app/configs'
import { withApollo } from '@app/apollo'

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
  },
  icon: {
    fontSize: 40,
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

const ComponentName = 'Pricing'

function Pricing({
  priceOnly = false,
  basic = false,
  premium = false,
  handleChange,
}: any) {
  const classes = useStyles()

  if (priceOnly) {
    return (
      <Price
        onClick={handleChange}
        priceOnly={priceOnly}
        basic={basic}
        premium={premium}
      />
    )
  }
  // TODO: ADD LOGIN BUTTON
  return (
    <MarketingDrawer homeMenu={ComponentName.toLowerCase()}>
      <Container maxWidth='xl'>
        <Box>
          <Typography variant='h2' component='h1' gutterBottom>
            Plans
          </Typography>
          <Typography variant='h3' component='h2'>
            Choose a plan that fits your needs
          </Typography>
          <Spacer height={'8vh'} />
          <Grid container>
            {priceConfig.plans.map(
              ({ title, details, cost, Icon }: any, i: number) => (
                <Paper className={`${classes.paper} ${classes.large}`} key={i}>
                  {title === 'Premium' ? <Ribbon /> : null}
                  <Icon fontSize='large' />
                  <Typography
                    variant='h4'
                    component='h3'
                    gutterBottom
                    style={{ fontWeight: 600 }}
                  >
                    {title}
                  </Typography>
                  <ol>
                    {details.map((item: any) => (
                      <Typography variant='subtitle1' component='li' key={item}>
                        - {item}
                      </Typography>
                    ))}
                  </ol>
                  {cost ? (
                    <Typography
                      variant='h6'
                      component='p'
                      style={{ fontWeight: 600, marginTop: 12 }}
                    >
                      {cost}
                    </Typography>
                  ) : null}
                </Paper>
              )
            )}
          </Grid>
        </Box>
      </Container>
      <Spacer height={'20vh'} />
      <Footer />
    </MarketingDrawer>
  )
}

Pricing.meta = {
  title: `${strings.appName} - ${ComponentName}`,
}

export default withApollo(Pricing)

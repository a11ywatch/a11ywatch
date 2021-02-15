/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/
import React from 'react'
import { Typography, Grid, Paper } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import {
  Box,
  MarketingDrawer,
  Ribbon,
  Spacer,
  Price,
  SignOnForm,
  PageTitle,
} from '@app/components/general'
import { priceConfig } from '@app/configs'
import { withApollo } from '@app/apollo'
import { metaSetter } from '@app/utils'

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

function Pricing({
  priceOnly = false,
  basic = false,
  premium = false,
  handleChange,
  name,
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

  return (
    <MarketingDrawer title={name}>
      <Box>
        <PageTitle>Plans</PageTitle>
        <Typography variant='body1' component='h2'>
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
        <SignOnForm home />
      </Box>
    </MarketingDrawer>
  )
}

export default withApollo(metaSetter({ Pricing }))

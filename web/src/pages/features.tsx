/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/
import React from 'react'
import { Container, Paper, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { Footer, Spacer, MarketingDrawer, Box } from '@app/components/general'
import { strings } from '@app-strings'

const paperStyles = { display: 'flex', flex: 1, padding: 12, margin: 3 }

const useStyles = makeStyles(({ breakpoints, palette, spacing }) => ({
  paper: Object.assign({}, paperStyles, {
    border: `2px solid ${palette.secondary.main}`,
    [breakpoints.down(1100)]: {
      flexDirection: 'column',
    },
  }),
  bottomSpace: {
    [breakpoints.down(1100)]: {
      marginBottom: spacing(1),
    },
  },
  row: {
    display: 'flex',
    [breakpoints.down('sm')]: {
      display: 'block',
    },
  },
  title: {
    [breakpoints.down('sm')]: {
      marginTop: 3,
    },
  },
}))

const ComponentName = 'Features'

const imgStyles = { maxHeight: '30vh', maxWidth: '20vw' }

function Features() {
  const classes = useStyles()
  const paperStyles = classes.paper

  return (
    <MarketingDrawer homeMenu={ComponentName.toLowerCase()}>
      <Container maxWidth='xl'>
        <Box>
          <Typography variant='h2' component='h1'>
            {`${strings.appName} Features`}
          </Typography>
          <Typography variant='subtitle1' component='h2' gutterBottom>
            Main Features
          </Typography>
          <div className={classes.row}>
            <Paper className={paperStyles}>
              <div
                style={{ textAlign: 'left', marginRight: 12 }}
                className={classes.bottomSpace}
              >
                <Typography
                  variant='h5'
                  component='h3'
                  gutterBottom
                  className={classes.title}
                  style={{ fontWeight: 600 }}
                >
                  Issue Reporter
                </Typography>
                <Typography variant='h6' component='h3' gutterBottom>
                  Our issue reporter scans for problems with recommended
                  solutions. Get notified as they occur with detailed
                  information on what happened. The reporter runs on all your
                  pages and you can run the test multiple times a day.
                </Typography>
              </div>
              <img
                src='static/img/task_list.svg'
                style={imgStyles}
                className='hide-print'
                alt={'women and accessible app'}
              />
            </Paper>
            <Paper className={paperStyles}>
              <img
                src='static/img/cloud_files.svg'
                style={imgStyles}
                className='hide-print'
                alt={'cloud stored'}
              />
              <div
                style={{ textAlign: 'right', marginLeft: 12 }}
                className={classes.bottomSpace}
              >
                <Typography
                  variant='h5'
                  component='h3'
                  gutterBottom
                  className={classes.title}
                  style={{ fontWeight: 600 }}
                >
                  Auto CDN
                </Typography>
                <Typography variant='h6' component='h3' gutterBottom>
                  Include a custom cdn that fixes most of your issues at
                  runtime. Our cdn uses a neural network that is composed of a
                  couple of open nets like GoogleNet, ImageNet, and MobileNet.
                  We also use common learning into the mixture to have a generic
                  model. The networks in layers allow us to learn and declare
                  images with extraordinary precision.
                </Typography>
              </div>
            </Paper>
          </div>
          <div className={classes.row}>
            <Paper className={paperStyles}>
              <img
                src='static/img/heatmap.svg'
                style={imgStyles}
                className='hide-print'
                alt={'website playground to test fixes'}
              />
              <div
                style={{ textAlign: 'right', marginLeft: 12 }}
                className={classes.bottomSpace}
              >
                <Typography
                  variant='h5'
                  component='h3'
                  gutterBottom
                  className={classes.title}
                  style={{ fontWeight: 600 }}
                >
                  Website View
                </Typography>
                <Typography variant='h6' component='h3' gutterBottom>
                  View your website with annotations of the issues on your page.
                  Experiment with recommended fixes before you add in our secure
                  CDN to validate the changes and more.
                </Typography>
              </div>
            </Paper>
            <Paper className={paperStyles}>
              <div
                style={{ textAlign: 'left', marginRight: 12 }}
                className={classes.bottomSpace}
              >
                <Typography
                  variant='h5'
                  component='h3'
                  gutterBottom
                  className={classes.title}
                  style={{ fontWeight: 600 }}
                >
                  Script View
                </Typography>
                <Typography variant='h6' component='h3' gutterBottom>
                  View your scripts that come from the scripts page. Verifiy
                  exactly what goes into production with notes on whats being
                  changed. Editing scripts coming soon...
                </Typography>
              </div>
              <img
                src='static/img/code_snippets.svg'
                style={imgStyles}
                className='hide-print'
                alt={'code snippets'}
              />
            </Paper>
          </div>
          <Spacer height={'20vh'} />
        </Box>
      </Container>
      <Footer />
    </MarketingDrawer>
  )
}

Features.meta = {
  title: `${strings.appName} - ${ComponentName}`,
}

export default Features

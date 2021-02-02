/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/
import React from 'react'
import { Container, Paper, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import {
  Footer,
  Spacer,
  MarketingDrawer,
  Box,
  Section,
} from '@app/components/general'
import { strings } from '@app-strings'
import { metaSetter } from '@app/utils'

const useStyles = makeStyles(({ breakpoints, palette }) => ({
  paper: {
    display: 'flex',
    flex: 1,
    padding: 12,
    margin: 3,
    border: `2px solid ${palette.secondary.main}`,
    [breakpoints.down(1100)]: {
      flexDirection: 'column',
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

function Features() {
  const classes = useStyles()
  const { paper } = classes

  function Image({ src, alt }: { src: string; alt: string }) {
    return (
      <img
        src={src}
        style={{ maxHeight: '30vh', maxWidth: '20vw' }}
        className='hide-print'
        alt={alt}
      />
    )
  }

  function SectionText({ children }: { children: any }) {
    return (
      <Typography
        variant='h5'
        component='h3'
        gutterBottom
        className={classes.title}
        style={{ fontWeight: 600 }}
      >
        {children}
      </Typography>
    )
  }

  return (
    <MarketingDrawer title={Features.name}>
      <Container maxWidth='xl'>
        <Box>
          <Typography variant='h2' component='h1'>
            {`${strings.appName} Features`}
          </Typography>
          <Typography variant='subtitle1' component='h2' gutterBottom>
            Main Features
          </Typography>
          <div className={classes.row}>
            <Paper className={paper}>
              <Section>
                <SectionText>Issue Reporter</SectionText>
                <Typography variant='h6' component='h3' gutterBottom>
                  Our issue reporter scans for problems with recommended
                  solutions. Get notified as they occur with detailed
                  information on what happened. The reporter runs on all your
                  pages and you can run the test multiple times a day.
                </Typography>
              </Section>
              <Image
                src='static/img/task_list.svg'
                alt={'women and accessible app'}
              />
            </Paper>
            <Paper className={paper}>
              <Image src='static/img/cloud_files.svg' alt={'cloud stored'} />
              <Section alignRight>
                <SectionText>Auto CDN</SectionText>
                <Typography variant='h6' component='h3' gutterBottom>
                  Include a custom cdn that fixes most of your issues at
                  runtime. Our cdn uses a neural network that is composed of a
                  couple of open nets like GoogleNet, ImageNet, and MobileNet.
                  We also use common learning into the mixture to have a generic
                  model. The networks in layers allow us to learn and declare
                  images with extraordinary precision.
                </Typography>
              </Section>
            </Paper>
          </div>
          <div className={classes.row}>
            <Paper className={paper}>
              <Image
                src='static/img/heatmap.svg'
                alt={'website playground to test fixes'}
              />
              <Section>
                <SectionText>Website View</SectionText>
                <Typography variant='h6' component='h3' gutterBottom>
                  View your website with annotations of the issues on your page.
                  Experiment with recommended fixes before you add in our secure
                  CDN to validate the changes and more.
                </Typography>
              </Section>
            </Paper>
            <Paper className={paper}>
              <Section alignRight>
                <SectionText>Script View</SectionText>
                <Typography variant='h6' component='h3' gutterBottom>
                  View your scripts that come from the scripts page. Verifiy
                  exactly what goes into production with notes on whats being
                  changed. Editing scripts coming soon...
                </Typography>
              </Section>
              <Image src='static/img/code_snippets.svg' alt={'code snippets'} />
            </Paper>
          </div>
          <Spacer height={'20vh'} />
        </Box>
      </Container>
      <Footer />
    </MarketingDrawer>
  )
}

metaSetter(Features)

export default Features

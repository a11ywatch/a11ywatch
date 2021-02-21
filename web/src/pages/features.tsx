/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/
import React from 'react'
import { Paper, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import {
  MarketingDrawer,
  Section,
  PageTitle,
  Heading,
} from '@app/components/general'
import { strings } from '@app-strings'
import { metaSetter } from '@app/utils'
import type { PageProps } from '@app/types'
import NextImage from 'next/image'

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
}))

function Features({ name }: PageProps) {
  const classes = useStyles()
  const { paper } = classes

  function Image({ src, alt }: { src: string; alt: string }) {
    return (
      <NextImage
        src={src}
        className='hide-print'
        alt={alt}
        height={500}
        width={400}
      />
    )
  }

  return (
    <MarketingDrawer title={name} maxWidth='xl' footerSpacing>
      <PageTitle>{`${strings.appName} Features`}</PageTitle>
      <Typography variant='subtitle1' component='h2' gutterBottom>
        Main Features
      </Typography>
      <div className={classes.row}>
        <Paper className={paper}>
          <Section>
            <Heading>Issue Reporter</Heading>
            <Heading variant='h6' component='h4'>
              Our issue reporter scans for problems with recommended solutions.
              Get notified as they occur with detailed information on what
              happened. The reporter runs on all your pages and you can run the
              test multiple times a day.
            </Heading>
          </Section>
          <Image
            src='/static/img/task_list.svg'
            alt={'women and accessible app'}
          />
        </Paper>
        <Paper className={paper}>
          <Image src='/static/img/cloud_files.svg' alt={'cloud stored'} />
          <Section alignRight>
            <Heading>Auto CDN</Heading>
            <Heading variant='h6' component='h4'>
              Include a custom cdn that fixes most of your issues at runtime.
              Our cdn uses a neural network that is composed of a couple of open
              nets like GoogleNet, ImageNet, and MobileNet. We also use common
              learning into the mixture to have a generic model. The networks in
              layers allow us to learn and declare images with extraordinary
              precision.
            </Heading>
          </Section>
        </Paper>
      </div>
      <div className={classes.row}>
        <Paper className={paper}>
          <Image
            src='/static/img/heatmap.svg'
            alt={'website playground to test fixes'}
          />
          <Section>
            <Heading>Website View</Heading>
            <Heading variant='h6' component='h4'>
              View your website with annotations of the issues on your page.
              Experiment with recommended fixes before you add in our secure CDN
              to validate the changes and more.
            </Heading>
          </Section>
        </Paper>
        <Paper className={paper}>
          <Section>
            <Heading>Script View</Heading>
            <Heading variant='h6' component='h4'>
              View your scripts that come from the scripts page. Verifiy exactly
              what goes into production with notes on whats being changed. If
              you need to make a tweak, edit the script in real time with our
              editor.
            </Heading>
          </Section>
          <Image src='/static/img/code_snippets.svg' alt={'code snippets'} />
        </Paper>
      </div>
    </MarketingDrawer>
  )
}

export default metaSetter({ Features })

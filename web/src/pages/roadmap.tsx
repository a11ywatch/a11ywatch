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
  Circle,
} from '@app/components/general'
import { strings } from '@app-strings'
import { theme } from '@app-theme'
import { metaSetter } from '@app/utils'

const paperStyles = { display: 'flex', flex: 1, padding: 12, marginTop: 12 }

const useStyles = makeStyles((t) => ({
  paper: Object.assign({}, paperStyles, {
    [t.breakpoints.down('sm')]: {
      flexDirection: 'column',
    },
  }),
  title: {
    [t.breakpoints.down('sm')]: {
      marginTop: 3,
    },
  },
  circleRight: {
    right: 20,
  },
  circleLeft: {
    marginLeft: -20,
  },
  circle: {
    position: 'absolute',
    marginTop: -42,
    backgroundColor: t.palette.primary.main,
  },
}))

function RoadMap() {
  const classes = useStyles()
  const paperStyles = classes.paper

  function Image({ src, alt }: { src: string; alt: string }) {
    return (
      <img
        alt={alt}
        src={src}
        style={{ maxHeight: '30vh' }}
        className='hide-print'
      />
    )
  }

  function TypeHeading({ children }: { children: any }) {
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
    <MarketingDrawer title={RoadMap.name}>
      <Container maxWidth='xl'>
        <Box>
          <Typography variant='h2' component='h1'>
            {`${strings.appName} Technical Roadmap`}
          </Typography>
          <Typography variant='subtitle1' component='h2' gutterBottom>
            Outline
          </Typography>
          <div
            className={paperStyles}
            style={{ paddingLeft: 0, paddingRight: 0 }}
          >
            <div style={{ textAlign: 'left', marginRight: 12 }}>
              <TypeHeading>Web Accessibility Progression</TypeHeading>
              <Typography variant='h6' component='h3' gutterBottom>
                It is important to note the steps we are trying to take for the
                ultimate level of compliance with minimal downsides along the
                way. This means we acknowledge that things arent perfect but, we
                are trying our best to provide the best experience to our
                capabilities. The phases we have set are according to difficulty
                and time it will take for the solution. We have rough estimates
                to better our judgement on when we can provide the features to
                come. We are currently on Phase 3
              </Typography>
            </div>
          </div>
          <Circle className={`${classes.circle} ${classes.circleRight}`}>
            1
          </Circle>
          <Paper className={paperStyles}>
            <Image
              src='static/img/server.svg'
              alt={'javascript fixes from a cdn'}
            />
            <div style={{ textAlign: 'right', marginLeft: 12 }}>
              <TypeHeading>JS execution fixes</TypeHeading>
              <Typography variant='h6' component='h3' gutterBottom>
                Our initial and simplest phase to get some level of fixes is to
                provide a CDN to override the issues at runtime using
                javascript. We can manipulate the dom to apply the fixes as soon
                as the page loads. The manipulation of the dom in our context
                can be very minimal and fast since everything is synchronous.
                This means that content can adjust quick enough to prevent
                elements from shifting and flickering.
              </Typography>
            </div>
          </Paper>
          <Circle className={`${classes.circle} ${classes.circleLeft}`}>
            2
          </Circle>
          <Paper className={paperStyles}>
            <div style={{ textAlign: 'left', marginRight: 12 }}>
              <TypeHeading>Editable Scripts</TypeHeading>
              <Typography variant='h6' component='h3' gutterBottom>
                AI and machine learning has a bit to go to have spot on labeling
                for image recognition. This means we need to have a level of
                accuracy for certainty on our fix being correct. If the
                probability is not near 100% we need to allow developers to edit
                the scripts to the proper label. From our script dashboard panel
                you should be able to live edit the script so that the changes
                can be applied on your custom CDN.
              </Typography>
            </div>
            <Image
              src='static/img/type_code.svg'
              alt={'edit your code with accuracy'}
            />
          </Paper>
          <Circle className={`${classes.circle} ${classes.circleRight}`}>
            3
          </Circle>
          <Paper
            className={paperStyles}
            style={{
              border: `2px solid ${theme.palette.secondary.main}`,
            }}
          >
            <Image src='static/img/source_code.svg' alt='source code visual' />
            <div style={{ textAlign: 'right', marginLeft: 12 }}>
              <TypeHeading>Compilation Fixes</TypeHeading>
              <Typography variant='h6' component='h3' gutterBottom>
                With fixes applied at compile time we no longer need to rely on
                javascript to load the solutions initially. This is a huge
                benefit since the speed of scripts varies greatly on the users
                device. This process would be hooked into your deployment or
                build steps so that way it can run seamless.
              </Typography>
            </div>
          </Paper>
          <Circle className={`${classes.circle} ${classes.circleLeft}`}>
            4
          </Circle>
          <Paper className={paperStyles}>
            <div style={{ textAlign: 'left', marginRight: 12 }}>
              <TypeHeading>Development Code Generation</TypeHeading>
              <Typography variant='h6' component='h3' gutterBottom>
                The last step is to provide a way to hook into your development
                process that runs in your own environment. With the dev time
                support we can provide helpful features like injecting visual
                annotations into your actual application so that you can provide
                the remedies automatically to code. At this level we will
                support the most popular front-end frameworks first besides
                basic html support.
              </Typography>
            </div>
            <Image
              src='static/img/js_frameworks.svg'
              alt={'languages supported a variation'}
            />
          </Paper>
          <Spacer height={'20vh'} />
        </Box>
      </Container>
      <Footer />
    </MarketingDrawer>
  )
}

metaSetter(RoadMap)

export default RoadMap

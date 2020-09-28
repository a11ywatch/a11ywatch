/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/
import React from 'react'
import { Container, Typography, Box } from '@material-ui/core'
import { Footer, Spacer, MarketingDrawer } from '@app/components/general'
import { strings } from '@app-strings'

const center = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'column' as 'column',
}

const circleStyle = Object.assign(
  {},
  {
    height: '38vh',
    width: '38vh',
    borderRadius: '19vh',
  },
  center
)

function Contact() {
  return (
    <MarketingDrawer homeMenu={'contact'}>
      <Container maxWidth='xl'>
        <Box my={4}>
          <Typography variant='h2' component='h1' gutterBottom>
            Lets have a Talk
          </Typography>
          <Typography
            variant='subtitle1'
            component='p'
            style={{ marginBottom: 60 }}
          >
            As a consultancy, {strings.appName} offers a lot more than just a
            nice AI tool to help mitigate accessibility errors, our team of
            engineers work seamless with your engineers and designers. We
            provide project leadership and technical expertise. We won’t just be
            an extra set of hands—we’ll help guide your strategy, provide best
            practices to ensure a maintainable and sustainable product, and help
            your team boost up along the way. Let's get started.
          </Typography>
          <div style={center}>
            <a
              href={'mailto:support@a11ywatch.com'}
              style={{
                color: '#ccc',
                textDecoration: 'none',
              }}
            >
              <Box bgcolor='secondary.main' style={circleStyle}>
                <Typography
                  variant='h5'
                  component='span'
                  style={{ fontWeight: 600 }}
                >
                  Drop us an email
                </Typography>
              </Box>
            </a>
            <Spacer height={22} />
            <Typography variant='subtitle2' component='span'>
              or
            </Typography>
            <Spacer height={22} />
            <a
              href={'tel:(863) 225-3695‬'}
              style={{
                color: '#ccc',
                textDecoration: 'none',
              }}
            >
              <Box bgcolor='primary.main' style={circleStyle}>
                <Typography
                  variant='h5'
                  component='span'
                  color={'secondary'}
                  style={{ fontWeight: 600 }}
                >
                  Call Us
                </Typography>
              </Box>
            </a>
          </div>
        </Box>
      </Container>
      <Spacer height={'12vh'} />
      <Footer />
    </MarketingDrawer>
  )
}

Contact.meta = {
  title: `${strings.appName} - Contact us`,
}

export default Contact

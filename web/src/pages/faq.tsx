/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/
import React from 'react'
import { Typography, List, ListItem } from '@material-ui/core'
import { PageTitle, Mailto, MarketingDrawer } from '@app/components/general'
import { strings } from '@app-strings'
import { metaSetter } from '@app/utils'
import { theme } from '@app-theme'
import type { PageProps } from '@app/types'

function Faq({ name }: PageProps) {
  const bold = { fontWeight: 600 }
  const linkStyle = {
    color: theme.palette.primary.main,
    textDecoration: 'underline',
    fontWeight: 600,
  }
  return (
    <MarketingDrawer title={name} footerSpacing>
      <PageTitle>Frequently Asked Questions</PageTitle>
      <Typography variant='body1' component='p' gutterBottom>
        Stuck on a certain problem? Check some of these common gotchas first in
        the FAQ.
      </Typography>
      <Typography variant='body2' component='p' gutterBottom>
        If you still need help go to the support page
      </Typography>
      <Typography variant='h4' component='h2' gutterBottom style={bold}>
        How can I support the project?
      </Typography>
      <Typography variant='body1'>
        {strings.appName} has multiple ways to get support
      </Typography>
      <List aria-label={`support ${strings.appName}`} dense>
        <ListItem>
          <Typography variant='subtitle1' component='p'>
            Spread the word. Evangelize {strings.appName}{' '}
            <Typography
              component={'a'}
              target='_blank'
              style={linkStyle}
              href={'https://www.a11ywatch.com'}
            >
              linking to a11ywatch.com
            </Typography>{' '}
            on your website, every backlink matters. Follow us on{' '}
            <Typography
              component={'a'}
              target='_blank'
              style={linkStyle}
              href={'https://www.twitter.com/a11ywatcher'}
            >
              Twitter
            </Typography>
            , like and retweet the important news. Or just talk about us with
            your friends.
          </Typography>
        </ListItem>
        <ListItem>
          <Typography variant='subtitle1' component='p'>
            <b>Give us feedback.</b> Tell us what we're doing well or where we
            can improve. Please upvote (👍) the issues that you are the most
            interested in seeing solved.
          </Typography>
        </ListItem>
        <ListItem>
          <Typography variant='subtitle1' component='p'>
            Support us financially on{' '}
            <Typography
              component={'a'}
              target='_blank'
              style={linkStyle}
              href={'https://opencollective.com/a11ywatch#backer'}
            >
              OpenCollective
            </Typography>
            . If you use {strings.appName} in a commercial project and would
            like to support its continued development by becoming a Sponsor, or
            in a side or hobby project and would like to become a Backer, you
            can do so through OpenCollective. All funds donated are managed
            transparently, and Sponsors receive recognition in the README and on
            the {strings.appName} home page.
          </Typography>
        </ListItem>
      </List>
      <Typography variant='h4' component='h3' gutterBottom style={bold}>
        Contact Us
      </Typography>
      <Typography>
        If you have any questions, please contact us at{' '}
        <Mailto
          email='support@a11ywatch.com'
          subject='TOS'
          body='Hello, Support Team'
        >
          support@a11ywatch.com
        </Mailto>
        .
      </Typography>
    </MarketingDrawer>
  )
}

export default metaSetter({ Faq })

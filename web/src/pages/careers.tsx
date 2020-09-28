/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/
import React from 'react'
import {
  Button,
  Container,
  Typography,
  List,
  ListItem,
} from '@material-ui/core'
import { Footer, MarketingDrawer, Box } from '@app/components/general'
import { strings } from '@app-strings'

const LanguageSupport = [
  'Javascript',
  'React',
  'Graphql',
  'Node',
  'Skilled at technical problem solving.',
  'Must be able to communicate effectively and work with team members and members of other functional teams to coordinate and meet deliverables.',
  'Rust - nice to have some of our main services are built using this',
  'BS in Technology or Related Field - nice to have but not needed',
]

const ComponentName = 'Careers'

function Careers() {
  return (
    <MarketingDrawer homeMenu={ComponentName.toLowerCase()}>
      <Container maxWidth='xl'>
        <Box>
          <Typography variant='h2' component='h1' gutterBottom>
            Careers
          </Typography>
          <Typography
            variant='h4'
            component='h2'
            gutterBottom
            style={{ fontWeight: 100 }}
          >
            Open Positions
          </Typography>
          <Typography
            variant='h6'
            gutterBottom
            color={'inherit'}
            component={'a'}
            href={'https://forms.gle/SE9vErBoUwNDk91q7'}
          >
            Software Engineer
          </Typography>
          <Typography variant='body1' component='p' gutterBottom>
            Required Skills:
          </Typography>
          <List>
            {LanguageSupport.map((item: any) => {
              return (
                <ListItem key={item}>
                  <Typography variant='subtitle2' component='p' gutterBottom>
                    - {item}
                  </Typography>
                </ListItem>
              )
            })}
          </List>
          <Typography
            variant='body1'
            component='p'
            gutterBottom
            style={{ marginBottom: 20 }}
          >
            To apply for this position, please attach a detailed resume that
            demonstrates your qualifications and skill set pertaining to this
            position. Applications without a resume will have a harder time to
            be considered. We are looking for interns so feel free declare this
            upfront.
          </Typography>
          <Button
            component='a'
            href={'https://forms.gle/SE9vErBoUwNDk91q7'}
            style={{ color: '#ccc' }}
            variant={'outlined'}
          >
            Apply Now
          </Button>
        </Box>
      </Container>
      <Footer />
    </MarketingDrawer>
  )
}

Careers.meta = {
  title: `Careers at ${strings.appName}`,
}

export default Careers

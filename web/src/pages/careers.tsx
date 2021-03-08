/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/
import React from 'react'
import { Button, Typography, List, ListItem } from '@material-ui/core'
import { MarketingDrawer, Box, PageTitle } from '@app/components/general'
import { metaSetter } from '@app/utils'
import type { PageProps } from '@app/types'

function Careers({ name }: PageProps) {
  const Reqs = [
    'React',
    'Web Technology (html,css,js)',
    'Graphql',
    'Node.js',
    'Skilled at technical problem solving.',
    'Care for accessibility or willing to learn more',
    'Must be able to communicate effectively and work with team members and members of other functional teams to coordinate and meet deliverables.',
    'Rust - nice to have some of our main services are built using this',
    'BS in Technology or Related Field - nice to have but not needed',
  ]
  return (
    <MarketingDrawer title={name}>
      <Box>
        <PageTitle>Careers</PageTitle>
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
        <Typography variant='subtitle2' component='p' gutterBottom>
          Required Skills:
        </Typography>
        <List>
          {Reqs.map((item: string) => {
            return (
              <ListItem key={item}>
                <Typography variant='subtitle1' component='p' gutterBottom>
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
          position. Applications without a resume will have a harder time to be
          considered. We are looking for interns so feel free declare this
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
    </MarketingDrawer>
  )
}

export default metaSetter({ Careers })

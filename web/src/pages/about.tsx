/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/

import React from 'react'
import { Typography } from '@material-ui/core'
import { MarketingDrawer, PageTitle } from '@app/components/general'
import { strings } from '@app-strings'
import { metaSetter } from '@app/utils'
import type { PageProps } from '@app/types'

function About({ name }: PageProps) {
  const bold = { fontWeight: 600 }
  return (
    <MarketingDrawer title={name} footerSpacing>
      <PageTitle>{`About ${strings.appName}`}</PageTitle>
      <Typography variant='body1' component='p' gutterBottom>
        Our goal is to make the web easily accessible for everyone.
      </Typography>
      <Typography variant='body1' component='p' gutterBottom>
        Accessibility is crucial to making the web an equal shared experience
        for everyone, especially when it comes to information (www.).
      </Typography>
      <Typography variant='h4' component='h2' gutterBottom style={bold}>
        Universal Web Vision
      </Typography>
      <Typography variant='body1' component='p' gutterBottom>
        Our vision starts with really believing that the web should be a smooth
        universal experience. The web has grown and adopted many assistive
        technologies to try to make this experience feel natural for everyone.
        One thing is that it's up to developers to assure this.
      </Typography>
      <Typography variant='h4' component='h3' gutterBottom style={bold}>
        Goals
      </Typography>
      <Typography variant='body1' component='p' gutterBottom>
        One major goal that we are trying to acheive is the ability to fix a
        website or mobile applications ada errors with a SDK or cdn. This is a
        step into reducing work that can be repetitive and very time consuming.
      </Typography>
      <Typography variant='h4' component='h4' gutterBottom style={bold}>
        Assistive labels powered by AI
      </Typography>
      <Typography variant='body1' component='p' gutterBottom>
        A big step into making a product usable across multiple devices is to
        have the program fully assistive through voice. With a11ywatch we are
        taking a step into providing extreme dedication into machine learning
        and AI to generate assistive props, color contrast, alt tags, and much
        more with accuracy.
      </Typography>
      <Typography variant='h4' component='h3' gutterBottom style={bold}>
        Fast
      </Typography>
      <Typography variant='body1' component='p' gutterBottom>
        Take the process of making a website ada complaint n * pages of your
        product which can lead to a lengthy timeline. With our tech we can
        provide a kit to automatically dive into the native assistive
        technologies to provide an amazing experience for everyone.
      </Typography>
      <Typography variant='h4' component='h2' gutterBottom style={bold}>
        Early stage, Founded late 2019
      </Typography>
      <Typography variant='body1' component='p' gutterBottom>
        {strings.appName} is in the very early stages so bare with us while we
        work out any quirks that might occur. Feel free to email us on any
        issues if they occur or contact us through the intercom chat support at
        the bottom of the screen.
      </Typography>
    </MarketingDrawer>
  )
}

export default metaSetter({ About })

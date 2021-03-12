import React from 'react'
import { Typography, List, ListItem } from '@material-ui/core'
import { MarketingDrawer, PageTitle } from '@app/components/general'
import { strings } from '@app-strings'
import { metaSetter } from '@app/utils'
import type { PageProps } from '@app/types'

function Consulting({ name }: PageProps) {
  const LanguageSupport = [
    'HTML',
    'CSS',
    'Javascript',
    'React',
    'React-native',
    '.NET',
    'Electron',
    'Ionic',
    'Angular',
    'Swift',
    'Java',
    'Kotlin',
    'Obj-C',
    'Vue',
  ]

  const CustomWork = [
    'Give you an estimate of time and price if the work is straightforward.',
    'Give alternative solutions depending on project situation.',
    'Decline the work due to timing/etc.',
  ]

  const bold = { fontWeight: 800 }

  return (
    <MarketingDrawer title={name} footerSpacing>
      <PageTitle>{strings.consulting}</PageTitle>
      <Typography variant='body1' component='p' gutterBottom>
        {strings.appName} has experts when it comes to accessibility who can
        provide a hands on or off consulting. We provide services amongst web,
        mobile, and server side expertise to better your applications
        experience. Although its the law to have your website WCAG compliant the
        majority of websites are not on the internet.
      </Typography>
      <Typography variant='h4' component='h2' gutterBottom style={bold}>
        WCAG Web Compliance Reduces Legal Risk
      </Typography>
      <Typography variant='body1' component='p' gutterBottom>
        {strings.appName} we make sure to bring your product WCAG2.0 & ADA
        compliant without using any overlays, toolbars, and other manual
        processes that do not correct the issues without the user input. When we
        use AI we validate that the probability meets high standards or we make
        sure that the remedies are corrected by a human. This allows us to
        deliver compliance at a high level of accuracy.
      </Typography>
      <Typography variant='h4' component='h3' gutterBottom style={bold}>
        Professional Support
      </Typography>
      <Typography variant='body1' component='p' gutterBottom>
        {strings.appName} can provide expert level support along the following
        technologies for accessibility, UI, and UX. We also can help setup
        A11yWatch for private servers/usage.
      </Typography>
      <List>
        {LanguageSupport.map((item) => {
          return (
            <ListItem key={item}>
              <Typography variant='subtitle1' component='p' gutterBottom>
                - {item}
              </Typography>
            </ListItem>
          )
        })}
      </List>
      <Typography variant='h6' component='h3' gutterBottom style={bold}>
        Custom Work
      </Typography>
      <List>
        {CustomWork.map((item) => {
          return (
            <ListItem key={item}>
              <Typography variant='subtitle1' component='p' gutterBottom>
                - {item}
              </Typography>
            </ListItem>
          )
        })}
      </List>
      <Typography variant='body1' component='p' gutterBottom>
        For more information on consulting please send a email to{' '}
        <a href={'mailto:support@a11ywatch.com'} style={{ color: '#ccc' }}>
          support@a11ywatch.com
        </a>
      </Typography>
    </MarketingDrawer>
  )
}

export default metaSetter({ Consulting })

import React from 'react'
import { Container, Typography, List, ListItem } from '@material-ui/core'
import { MarketingDrawer, Footer, Box } from '@app/components/general'
import { strings } from '@app-strings'

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
  'Obj-C',
  'Vue',
]

const CustomWork = [
  'Give you an estimate of time and price if the work is straightforward.',
  'Give alternative solutions depending on project situation.',
  'Decline the work due to timing/etc.',
]

const bold = { fontWeight: 800 }

function Consulting() {
  return (
    <MarketingDrawer style={{ paddingBottom: 100 }} title={Consulting.name}>
      <Container maxWidth='xl'>
        <Box>
          <Typography variant='h2' component='h1' style={bold}>
            Web Accessibility Consultants
          </Typography>
          <Typography variant='body1' component='p' gutterBottom>
            {strings.appName} has experts when it comes to accessibility who can
            provide a hands on or off consulting. We provide services amongst
            web, mobile, and server side expertise to better your applications
            experience. Although its the law to have your website WCAG compliant
            the majority of websites are not on the internet.
          </Typography>
          <Typography variant='h4' component='h2' gutterBottom style={bold}>
            WCAG Web Compliance Reduces Legal Risk
          </Typography>
          <Typography variant='body1' component='p' gutterBottom>
            {strings.appName} we make sure to bring your product ADA compliant
            without using any overlays, toolbars, and other manual processes
            that do not correct the issues without the user input. When we use
            our AI we make sure that the probability meets high standards or we
            make sure that the remedies are correct by a human. This allows us
            to deliver compliance at a high level of accuracy.
          </Typography>
          <Typography variant='h4' component='h3' gutterBottom style={bold}>
            Professional Support
          </Typography>
          <Typography variant='body1' component='p' gutterBottom>
            {strings.appName} can provide expert level support along the
            following technologies for accessibility, UI, and UX.
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
        </Box>
      </Container>
      <Footer />
    </MarketingDrawer>
  )
}

Consulting.meta = {
  title: `Web accessibility consulting - ${strings.appName}`,
}

export default Consulting

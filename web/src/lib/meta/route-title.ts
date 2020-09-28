/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/

export function routeTitle(route: string = '') {
  let title

  switch (route) {
    case 'About':
      title = 'About'
      break
    case 'AccessibilityTips':
      title = 'Accessibility Tips'
      break
    case 'Checklist':
      title = 'WCAG & ADA Compliance Checklist'
      break
    case 'Analytics':
      title = 'Analytics'
      break
    case 'Careers':
      title = 'Careers'
      break
    case 'CDNFix':
      title = 'CDN'
      break
    case 'Consulting':
      title = 'Accessibility Consulting'
      break
    case 'Contact':
      title = 'Contact'
      break
    case 'Dashboard':
      title = 'Dashboard'
      break
    case 'History':
      title = 'History'
      break
    case 'Scripts':
      title = 'Scripts'
      break
    case 'Login':
      title = 'Login'
      break
    case 'Register':
      title = 'Register'
      break
    case 'Payments':
      title = 'Payments'
      break
    case 'Pricing':
      title = 'Pricing'
      break
    case 'ForgotPassword':
      title = 'Forgot Password'
      break
    case 'ResetPassword':
      title = 'Reset Password'
      break
    case 'TOS':
      title = 'Terms of Service'
      break
    case 'Privacy':
      title = 'Privacy Policy'
      break
    case 'Profile':
      title = 'Profile'
      break
    case 'TestOut':
      title = 'Try for Free'
      break
    case 'UrgentIssues':
      title = 'Urgent Issues'
      break
    case 'AllErrors':
      title = 'All Issues'
      break
    case 'WebsiteDetails':
      title = 'Accessibility detail view'
      break
    case '404':
      title = '404 - A11yWatch'
      break
    case 'Referrals':
      title = 'Referrals'
      break
    default:
      title =
        'A11yWatch - web accessibilty monitor, helper, and fixer to meet WCAG & ada compliance almost instantly'
      break
  }
  return route === 'Index' ? title : `${title} - A11yWatch`
}

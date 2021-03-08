/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/

export const generateStrings = ({
  appName,
  headers,
  meta,
}: {
  appName: string
  headers?: any
  meta: { title?: string; description?: string }
}) => {
  return {
    appName,
    headers,
    meta,
    title: 'Web Accessibility',
    monitoring: 'Monitoring',
    consulting: 'Web Accessibility Consultants',
    fixer: 'Fixer',
    helper: 'Helper',
    watcher: 'Insight',
    ai: 'Monitor',
    productivity: 'Productivity',
    ctaDetails: 'Everything you need to improve your websites accessibility',
    ctaInfo:
      'Improve your accessibility with our a11y monitor, helper and fixer powered by AI.',
    ctaTryOut: 'Try A11yWatch for free',
    ctaSeeHowItWorks: 'See How It Works',
    customers: 'Over 20,000 websites scanned',
    usersUsing: 'Customers',
    customersWhy:
      'See live results on a well known website like twitter, github, and dropbox below.',
    testimonials: [
      {
        title:
          'A11yWatch is lightning fast. Always stay up to date with the latest issues as they arise. Never lose another customer again.',
        who: 'Henry West, Sr. Software Engineer at DesignFit',
      },
    ],
    features: [
      {
        id: 0,
        title: 'On-Demand',
        detail:
          'Target WCAG issues spot on without having to figure out whats wrong',
        reason: 'Stop waisting time with figuring out what your ada issues are',
      },
      {
        id: 1,
        title: 'Alerts',
        detail:
          'Get notified when issues occur so you can take action immediately',
        reason: 'Basic',
      },
      {
        id: 2,
        title: 'Recommendations',
        detail:
          'Get tips on how to improve your app so all users have a great time',
        reason: 'Basic',
      },
      {
        id: 3,
        title: 'Patches',
        detail:
          'Get code scripts that you can include directly in your app pain free',
        reason: 'Basic',
      },
      {
        id: 4,
        title: 'Cloud',
        detail:
          'Add a cdn script that mitigates drastic issues for your users easily',
        reason: 'Basic',
        icon: 'accessibility',
      },
      {
        id: 5,
        title: 'Speed Test',
        detail:
          'See how your site compares against other websites on performance',
        reason: 'Basic',
      },
      {
        id: 6,
        title: 'Secure',
        detail:
          'See your scripts with precision to see exactly whats going on anywhere',
        reason: 'Basic',
      },
      {
        id: 7,
        title: 'Simple',
        detail:
          'Just drop in one line of code and your now all your pages are handled',
        reason: 'Basic',
      },
      {
        id: 8,
        title: 'Browser',
        detail:
          'View the issues in the browser and experiment with fixes before hand',
        reason: 'Basic',
      },
      {
        id: 9,
        title: 'AI',
        detail:
          'With AI and machine learning we tailor custom needs for your website rapidly',
        reason: 'Basic',
      },
    ],
    alerts: {
      enableNotificationsTitle: 'Would you like to enable notifications?',
      enableNotificationsDetail: `Enabling notifications can help you get alerted instantly as new issues occur.
	Save time by doing the things you care about and allow us to notify you when critical errors arise. 
	You can always disable and enable this in your browser settings.`,
      notNow: 'Not Now',
      yes: 'Yes',
      okay: 'Okay',
    },
    getSupport: 'Get Professional Support',
    trySearch: 'Free website accessibility scan',
    tryOutCdn:
      'after sign in. Get your secure custom cdn script and insert it at the end of your html body',
  }
}

/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/
const sitemap = require('nextjs-sitemap-generator-patch')

module.exports = {
  generateSiteMap: function (name) {
    sitemap({
      baseUrl: name || process.env.DOMAIN_NAME,
      ignoredPaths: [
        'dashboard',
        'analytics',
        'issues',
        'cdn-fix',
        'scripts',
        'history',
        'payments',
        'urgent-issues',
        'website-details',
        'profile',
      ],
      pagesDirectory: __dirname + '/src/' + '/pages',
      targetDirectory: 'public/',
      nextConfigPath: __dirname + '/next.config.js',
      ignoredExtensions: ['png', 'jpg'],
      pagesConfig: {
        '': {
          priority: '1',
        },
        '/login': {
          priority: '0.8',
          changefreq: 'daily',
        },
        '/register': {
          priority: '0.8',
        },
        '/pricing': {
          priority: '0.8',
        },
        '/contact': {
          priority: '0.5',
        },
      },
    })
  },
}

/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/

const { resolve } = require('path')
const { parsed } = require('dotenv').config()
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const withPWA = require('next-pwa')
const { replaceDockerNetwork } = require('@a11ywatch/website-source-builder')
const { domainMap } = require('./domain-map')
const { generateSiteMap } = require('./generate-sitemap')
const { getDynamicPaths } = require('./dynamic-paths')

const dev = process.env.NODE_ENV !== 'production'
const DOMAIN_NAME = process.env.DOMAIN_NAME || 'https://www.a11ywatch.com'

const env = Object.assign({}, parsed, {
  dev,
  APP_TYPE: process.env.APP_TYPE || 'main',
  API: replaceDockerNetwork(process.env.API),
  API_URI_DOCKER: replaceDockerNetwork(process.env.API_URI_DOCKER),
  WEB_SOCKET_URL: replaceDockerNetwork(process.env.WEB_SOCKET_URL),
  STRIPE_KEY:
    process.env.STRIPE_KEY_PROD && !dev
      ? process.env.STRIPE_KEY_PROD
      : process.env.STRIPE_KEY,
  SCRIPTS_CDN_URL_HOST:
    process.env.SCRIPTS_CDN_URL_HOST_PROD && !dev
      ? process.env.SCRIPTS_CDN_URL_HOST_PROD
      : process.env.SCRIPTS_CDN_URL_HOST,
  INTERCOM_APPID: process.env.INTERCOM_APPID,
  GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
  GOOGLE_ANALYTIC_ID: process.env.GOOGLE_ANALYTIC_ID,
  DONORBOX_URL: process.env.DONORBOX_URL,
  DOCKER_ENV: process.env.DOCKER_ENV,
  DOMAIN_NAME,
  // # NEXT.JS REQUIRED EXCLUDES
  NODE_ENV: undefined,
  NODE_MODULES_CACHE: undefined,
  INTERCOM_ENABLED: process.env.INTERCOM_ENABLED,
})

let domains = ['images.unsplash.com']

if (dev) {
  domains.push('127.0.0.1', 'localhost')
}

const CDN_HOST = process.env.CDN_URL_HOST

if (CDN_HOST) {
  if (CDN_HOST.includes(',')) {
    const temp = CDN_HOST.split(',')
    domains = domains.concat(temp)
  } else {
    domains.push(CDN_HOST)
  }
}

const { themeType, stringType } = domainMap(process.env.APP_TYPE)
const { uiStylePath, uiComponentPath } = getDynamicPaths({
  themeType,
  dev,
})

const aliases = {
  ['@app-theme']: resolve(__dirname, `./src/theme/${themeType}`),
  ['@app-strings']: resolve(__dirname, `./src/content/strings/${stringType}`),
  ['@app']: resolve(__dirname, './src'),
  ['@app-config']: resolve(__dirname, './web-config.js'),
  ['@app-ui-stylesheet']: uiStylePath,
  ['ui']: uiComponentPath,
}

module.exports = withPWA({
  pwa: {
    dest: 'public',
    mode: process.env.WORKBOX_MODE || 'production',
    disable: dev,
    scope: '/src',
  },
  images: {
    domains: domains,
  },
  compress: true,
  generateBuildId: async () =>
    process.env.SOURCE_VERSION
      ? `cust-next-build-${process.env.SOURCE_VERSION}`
      : null,
  env,
  cssModules: true,
  typescriptLoaderOptions: {
    transpileOnly: true,
  },
  webpack: (
    config,
    { buildId, dev: development, isServer, defaultLoaders, webpack }
  ) => {
    generateSiteMap(DOMAIN_NAME)

    config.plugins.push(new webpack.IgnorePlugin(/tests/))
    config.resolve.alias = Object.assign({}, config.resolve.alias, aliases)

    if (!development) {
      if (!Array.isArray(config.optimization.minimizer)) {
        config.optimization.minimizer = []
      }
      config.optimization.minimize = true
      config.optimization.minimizer.push(new OptimizeCSSAssetsPlugin())
    }

    return config
  },
})

/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/

const { resolve } = require('path')
const { parsed } = require('dotenv').config()
const { domainMap } = require('./domain-map')
const { generateSiteMap } = require('./generate-sitemap')
const { getDynamicPaths } = require('./dynamic-paths')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const withPWA = require('next-pwa')
const runtimeCaching = require('next-pwa/cache')
const { replaceDockerNetwork } = require('@a11ywatch/website-source-builder')

const dev = process.env.NODE_ENV !== 'production'

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
  // # NEXT.JS REQUIRED EXCLUDES
  NODE_ENV: undefined,
  NODE_MODULES_CACHE: undefined,
})

module.exports = withPWA({
  pwa: {
    dest: 'public',
    mode: process.env.WORKBOX_MODE || 'production',
    disable: dev,
    scope: '/src',
    runtimeCaching,
  },
  compress: true,
  generateBuildId: async () =>
    process.env.SOURCE_VERSION
      ? `cust-next-build-${process.env.SOURCE_VERSION}`
      : null,
  env,
  cssModules: true,
  typescriptLoaderOptions: {
    transpileOnly: false,
  },
  webpack: (config, { buildId, dev: development, defaultLoaders, webpack }) => {
    generateSiteMap(process.env.DOMAIN_NAME)
    const { themeType, stringType } = domainMap(process.env.APP_TYPE)
    const { uiStylePath, uiComponentPath } = getDynamicPaths({
      themeType,
      dev,
    })

    config.plugins.push(new webpack.IgnorePlugin(/\/__mocks__\//))

    config.resolve.alias = Object.assign({}, config.resolve.alias, {
      ['@app-theme']: resolve(__dirname, `./src/theme/${themeType}`),
      ['@app-strings']: resolve(
        __dirname,
        `./src/content/strings/${stringType}`
      ),
      ['@app']: resolve(__dirname, './src'),
      ['@app-config']: resolve(__dirname, './web-config.js'),
      ['@app-ui-stylesheet']: uiStylePath,
      ['ui']: uiComponentPath,
    })

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

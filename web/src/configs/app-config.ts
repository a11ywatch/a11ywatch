/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/

const AppConfig = {
  graphQLUrl: process.env.API,
  graphQLUrlDocker: process.env.API_URI_DOCKER,
  webSocketUrl: process.env.WEB_SOCKET_URL,
  dev: process.env.NODE_ENV !== 'production',
  STRIPE_KEY: process.env.STRIPE_KEY,
}

const SCRIPTS_CDN_URL_HOST = process.env.SCRIPTS_CDN_URL_HOST
const INTERCOM_APPID = process.env.INTERCOM_APPID
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID
const APP_TYPE = process.env.APP_TYPE || 'main'
const GOOGLE_ANALYTIC_ID = process.env.GOOGLE_ANALYTIC_ID
const API_ENDPOINT = process.env.API_ENDPOINT || 'http://localhost:8080'

export {
  AppConfig,
  SCRIPTS_CDN_URL_HOST,
  INTERCOM_APPID,
  GOOGLE_CLIENT_ID,
  APP_TYPE,
  GOOGLE_ANALYTIC_ID,
  API_ENDPOINT,
}

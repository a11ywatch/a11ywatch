/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/

const dev = process.env.NODE_ENV !== 'production'
const AppConfig = {
  graphQLUrl: process.env.API,
  graphQLUrlDocker: process.env.API_URI_DOCKER,
  webSocketUrl: process.env.WEB_SOCKET_URL,
  dev,
}

const SCRIPTS_CDN_URL_HOST = process.env.SCRIPTS_CDN_URL_HOST
const INTERCOM_APPID = process.env.INTERCOM_APPID
const APP_TYPE = process.env.APP_TYPE || 'main'
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID
const GOOGLE_ANALYTIC_ID = process.env.GOOGLE_ANALYTIC_ID
const API_ENDPOINT =
  String(process.env.API).replace('/graphql', '/api') ||
  'http://localhost:8080/api'
const STRIPE_KEY = process.env.STRIPE_KEY
const SUPER_MODE = process.env.SUPER_MODE
const DONORBOX_URL = process.env.DONORBOX_URL
const INTERCOM_ENABLED = process.env.INTERCOM_ENABLED
const API_URI_DOCKER = process.env.API_URI_DOCKER
const DOCKER_ENV = process.env.DOCKER_ENV
const DOMAIN_NAME = process.env.DOMAIN_NAME

export {
  DOMAIN_NAME,
  dev,
  API_URI_DOCKER,
  AppConfig,
  SCRIPTS_CDN_URL_HOST,
  INTERCOM_APPID,
  GOOGLE_CLIENT_ID,
  APP_TYPE,
  GOOGLE_ANALYTIC_ID,
  API_ENDPOINT,
  STRIPE_KEY,
  SUPER_MODE,
  DONORBOX_URL,
  INTERCOM_ENABLED,
  DOCKER_ENV,
}

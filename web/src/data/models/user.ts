/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/

import { getCookie, setCookie } from 'with-cookie'
import { parseCookie } from '@app/lib/cookies'
import { _AUTHED, _ALERTS_ENABLED, _JWT } from '@app/lib/cookies/names'
import { parseJwt } from '@app/lib/auth'
import { logPageView } from '@app/utils'
import { shutdownIntercom } from 'intercom-next'

const defaultExp = 365

const userModel = {
  email: '',
  deviceType: '',
  jwt: '',
  originalUrl: '/',
  alertsEnabled: false,
  initModel: function ({
    deviceType = '',
    originalUrl = '',
    cookie = '',
  }: {
    deviceType?: string
    originalUrl?: string
    cookie?: any
  }) {
    try {
      this.handleRoutes(originalUrl)
      if (typeof document !== 'undefined') {
        const jssStyles = document.querySelector('#jss-server-side')

        if (jssStyles?.parentNode) {
          jssStyles.parentNode.removeChild(jssStyles)
        }
      }

      if (deviceType) {
        this.deviceType = deviceType
      }

      if (cookie) {
        const {
          [_AUTHED]: email,
          [_JWT]: jwt,
          [_ALERTS_ENABLED]: alertsEnabled,
        } = parseCookie(cookie)

        this.alertsEnabled = alertsEnabled
        this.email = email
        this.jwt = jwt
      }
    } catch (e) {
      console.error(e)
    }
  },
  logOut: function () {
    try {
      this.jwt = ''
      this.email = ''
      this.originalUrl = '/'

      setCookie(_AUTHED, '', 1)
      setCookie(_JWT, '', 1)

      if (typeof localStorage !== 'undefined') {
        localStorage?.clear()
      }
      shutdownIntercom()
    } catch (e) {
      console.error(e)
    }
  },
  logIn: function ({ email, jwt }: { email: string; jwt: string }): void {
    try {
      setCookie(_AUTHED, email, defaultExp)
      setCookie(_JWT, jwt, defaultExp)

      this.email = email
      this.jwt = jwt
    } catch (e) {
      console.error(e)
    }
  },
  toggleAlert: function (alertsEnabled: boolean) {
    try {
      setCookie(_ALERTS_ENABLED, alertsEnabled, defaultExp)
      this.alertsEnabled = !!alertsEnabled
    } catch (e) {
      console.error(e)
    }
  },
  alertEnabled: function ({
    toggleCombiner,
    networkCombiner,
  }: {
    toggleCombiner?: boolean
    networkCombiner?: boolean
  }) {
    return !!(this.alertsEnabled || toggleCombiner || networkCombiner)
  },
  handleRoutes(route?: string) {
    try {
      if (route) {
        userModel.originalUrl = route
      } else if (typeof window !== 'undefined') {
        userModel.originalUrl = window.location.pathname
      }
      logPageView(userModel.originalUrl)
    } catch (e) {
      console.error(e)
    }
  },
  setJwt: function (jwt: any) {
    try {
      setCookie(_JWT, jwt, defaultExp)
      this.jwt = jwt
    } catch (e) {
      console.error(e)
    }
  },
  get loggedIn() {
    return !!(getCookie(_AUTHED, '') || this.jwt)
  },
  get isMobile() {
    return this.deviceType === 'mobile'
  },
  get parsedToken() {
    return parseJwt(this.jwt)
  },
}

export { userModel }

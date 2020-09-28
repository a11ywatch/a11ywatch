/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/

import { APP_TYPE } from '@app/configs'

export const generateFont = () => {
  const basePath = `./static/fonts/${APP_TYPE}`

  if (APP_TYPE === 'main') {
    return [
      `${basePath}/IBMPlexSans-Regular.ttf`,
      `${basePath}/IBMPlexSans-Bold.ttf`,
      `${basePath}/IBMPlexSans-SemiBold.ttf`,
      `${basePath}/IBMPlexSans-Light.ttf`,
    ].map(
      (href) =>
        `<link ref="preload" as="font href="${href}" crossOrigin="anonymous"></link>`
    )
  }
}

/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/

import { headers } from './headers'
import { metaTitle } from '../../title'
import { generateStrings } from '../../strings'

const appName = 'EnableYourSite'

export const strings = generateStrings({
  appName,
  headers,
  meta: {
    title: metaTitle('Web accessibilty AI software', appName),
    description: `${appName} is the ultimate web accessibility tool`,
  },
})

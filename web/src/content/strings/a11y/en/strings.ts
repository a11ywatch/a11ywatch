/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/

import { headers } from './headers'
import { generateStrings } from '../../strings'

const appName = 'A11yWatch'

export const strings = generateStrings({
  appName,
  headers,
  meta: {
    title: `Web accessibility productivity tool: ${appName}`,
    description: `Build accessible websites with tools that monitor, fix, and guide web accessibility efficiency with ${appName}`,
  },
})

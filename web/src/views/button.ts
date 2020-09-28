/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/

import { createElement } from 'react'
import { Button } from 'ui'

export const button = {
  createElement: (props: any) => createElement(Button, props),
}

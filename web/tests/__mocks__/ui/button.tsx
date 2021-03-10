/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/

import React from 'react'

const mockReact = React

const Button = ({ children, ...rest }) =>
  mockReact.createElement('button', rest, children)

export { Button }

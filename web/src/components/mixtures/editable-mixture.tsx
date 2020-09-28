/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/

import { createElement } from 'react'
import { WithEditor, WithHighlight } from '../adhoc'

type Props = {
  [props: string]: any
  shouldEdit?: boolean
  children?: string
  language?: string
  lineProps?: any
  style?: any
  className: any
  editMode?: boolean
  setScript?(e?: any): any
}

const EditableMixture = ({ editMode, ...props }: Props) =>
  // @ts-ignore
  createElement(editMode ? WithEditor : WithHighlight, props)

export { EditableMixture }

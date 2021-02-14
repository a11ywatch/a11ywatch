/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/
import { strings } from '@app-strings'

interface MetaData {
  title?: string
  description?: string
}

interface MetaFunction extends Function {
  meta?: MetaData
}

interface Meta {
  [name: string]: MetaFunction
}

export const metaSetter = (
  Component: Meta,
  { title, description }: MetaData = {}
): Function => {
  const name = String(Object.keys(Component)[0])
  const value = Component[name]

  value.meta = {
    title: title ?? `${strings.appName} - ${name.replace(/([A-Z])/g, ' $1')}`,
    description,
  }

  return value
}

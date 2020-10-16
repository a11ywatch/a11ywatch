/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/
import { strings } from '@app-strings'

type MetaData = {
  title?: string
}

interface MetaFunction extends Function {
  meta?: MetaData
}

export const metaSetter = (Component: MetaFunction) => {
  Component.meta = {
    title: `${strings.appName} - ${Component.name}`,
  }
}

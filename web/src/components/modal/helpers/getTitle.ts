/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/

import { strings } from '@app-strings'

export function getTitle(issues: any) {
  return issues?.length
    ? issues?.issues?.length
      ? `Issues found with `
      : `Scan complete`
    : strings.trySearch
}

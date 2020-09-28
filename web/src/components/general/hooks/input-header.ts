/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/

import { useState } from 'react'

export function useInputHeader(fields?: any) {
  const [customHeader, setCustomHeader] = useState(false)
  const [customFields, setCustomField] = useState(
    (typeof fields !== 'undefined' && fields) || [{ key: '', value: '' }]
  )

  const addFormField = () => {
    const newFields = customFields.slice()
    newFields.push({ key: '', value: '' })
    setCustomField(newFields)
  }

  const updateFormField = (value: any, index: number, type: string) => {
    const cloneField = customFields?.map((item: any, i: number) => {
      if (i === index) {
        item[type] = value
      }
      return item
    })
    setCustomField(cloneField)
  }

  const removeFormField = (index: number) => {
    const newFields = customFields.slice()
    newFields.splice(index, 1)
    setCustomField(newFields)
  }

  return {
    removeFormField,
    updateFormField,
    addFormField,
    customFields,
    customHeader,
    setCustomHeader,
  }
}

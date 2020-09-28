/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/

import Color from 'color'
import { light, dark } from '@app/stylesheets/main.module.css'

function getValidatedColor({
  colorToChange,
  colorToValidate = Color('white'),
  minimumContrastRatio = 5,
  mixingColor,
  mixingAmount,
  tries = 0,
  maxTries = 8,
}: any): string {
  const newColor = colorToChange.mix(mixingColor, mixingAmount)

  return newColor.contrast(colorToValidate) < minimumContrastRatio &&
    tries < maxTries
    ? getValidatedColor({
        colorToChange: newColor,
        mixingColor,
        mixingAmount: 0.1,
        tries: tries += 1,
      })
    : newColor
}

export function generateFixColors({
  textFix,
  elementParent,
  source,
}: any): any {
  const elementColor = textFix
    ? getComputedStyle(elementParent, null).getPropertyValue('background-color')
    : getComputedStyle(source, null).getPropertyValue('color')

  const primaryColor = Color(elementColor || '#fff')
  const primaryColorLight = getValidatedColor({
    colorToChange: primaryColor,
    mixingColor: Color('white'),
    colorToValidate: Color('black'),
    mixingAmount: 0.5,
  })
  const primaryColorDark = getValidatedColor({
    colorToChange: primaryColor,
    mixingColor: Color('black'),
    mixingAmount: 0.2,
  })
  const primaryColorContrast = primaryColor.isLight()
    ? primaryColorDark
    : primaryColorLight

  const headerStyle = !primaryColor.isLight() ? light : dark

  return {
    elementColor,
    primaryColor,
    primaryColorLight,
    primaryColorDark,
    primaryColorContrast,
    headerStyle,
  }
}

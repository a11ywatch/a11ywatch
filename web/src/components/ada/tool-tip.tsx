/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/
import React from 'react'
import { observable, action } from 'mobx'
import { observer } from 'mobx-react'
import {
  alignCenter,
  tipType,
  row,
  mainButton,
} from '@app/stylesheets/main.module.css'
import { Button } from '@material-ui/core/'
import { ReccomendedFixes } from './reccomended-fixes'
import { generateFixColors } from './utils'

const TooltipContainer = observer(
  ({
    visible,
    source,
    portalID,
    elementParent,
    contrastRatio,
    store,
    message,
  }: any) => {
    const {
      // elementColor,
      // primaryColor,
      // primaryColorLight,
      // primaryColorDark,
      primaryColorContrast,
      // headerStyle,
    } = generateFixColors({ textFix: store.textFix, source, elementParent })

    return (
      <>
        <ReccomendedFixes
          source={!store.textFix ? elementParent : source}
          primaryColorContrast={primaryColorContrast}
          portalID={portalID}
          elementParent={elementParent}
          textFix={store.textFix}
          contrastRatio={contrastRatio}
          visible={visible}
          message={message}
        />
        <span className={`${row} ${alignCenter}`}>
          <Button
            onClick={() => {
              store?.toggle()
            }}
            variant='text'
            className={`${mainButton} ${tipType}`}
          >
            {!store.textFix ? 'Background' : 'Text'}
          </Button>
        </span>
      </>
    )
  }
)

const ToolTip = ({
  visible,
  source,
  portalID,
  elementParent,
  contrastRatio,
  message,
}: any) => {
  const store = observable({
    textFix: contrastRatio >= 3,
    toggle: action(() => {
      store.textFix = !store.textFix
    }),
  })
  return (
    <TooltipContainer
      visible={visible}
      store={store}
      source={source}
      portalID={portalID}
      elementParent={elementParent}
      contrastRatio={contrastRatio}
      message={message}
    />
  )
}

export { ToolTip }

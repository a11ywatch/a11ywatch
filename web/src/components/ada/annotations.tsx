import React from 'react'
import { Button } from '@material-ui/core'
import { IframeManager } from '@app/managers'

const inlineButtonStyle = {
  height: 60,
  width: 60,
  maxWidth: 60,
  maxHeight: 60,
  padding: 0,
  fontFamily: `Roboto, Helvetica Neue, BlinkMacSystemFont, sans-serif`,
  fontSize: 22,
  fontWeight: 800,
  borderRadius: 30,
  boxShadow: '0 3px 5px 2px rgba(30, 30, 30, .4)',
  zIndex: 999999,
  border: 0,
  position: 'absolute',
}

export function Annotations({
  contrastRatio,
  source,
  errorType,
  portalID,
  elementParent,
  message,
  code,
  context,
}: any) {
  return (
    <Button
      variant='text'
      type='button'
      onClick={() => {
        IframeManager.setActiveAnnotation({
          contrastRatio,
          source,
          errorType,
          portalID,
          elementParent,
          message,
          code,
          context,
        })
      }}
      style={Object.assign({}, inlineButtonStyle, {
        background:
          errorType === 'error'
            ? 'linear-gradient(20deg, #EF6C00 10%, #E65100 95%)'
            : 'linear-gradient(20deg, #9E9D24 10%, #827717 95%)',
        color: '#fff',
      })}
    >
      {contrastRatio?.includes('.00') ? contrastRatio[0] : ''}
    </Button>
  )
}

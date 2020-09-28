/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/
import React, { useRef } from 'react'
import { Modal, Paper, Typography, IconButton } from '@material-ui/core'
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'
import { DragHandler } from '@app/lib'
import { ToolTip } from './tool-tip'
import CloseIcon from '@material-ui/icons/Close'

const useStyles = makeStyles(({ palette, spacing, shadows }: Theme) =>
  createStyles({
    paper: {
      position: 'absolute',
      width: '400px',
      backgroundColor: palette.background.paper,
      border: '2px solid #000',
      boxShadow: shadows[5],
      overflow: 'hidden',
    },
    row: {
      display: 'flex',
      alignItems: 'center',
      flex: 1,
      overflow: 'hidden',
    },
    title: {
      flex: 1,
      pointerEvents: 'none',
      marginLeft: spacing(2),
      marginRight: spacing(2),
    },
    maxSize: {
      fontWeight: 300,
      maxWidth: '80%',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
    },
  })
)

// const inlineButtonStyle = {
//   height: 60,
//   width: 60,
//   maxWidth: 60,
//   maxHeight: 60,
//   padding: 0,
//   fontFamily: `Roboto, Helvetica Neue, BlinkMacSystemFont, sans-serif`,
//   fontSize: 22,
//   fontWeight: 800,
//   borderRadius: 30,
//   boxShadow: '0 3px 5px 2px rgba(30, 30, 30, .4)',
//   zIndex: 999999,
//   border: 0,
//   position: 'absolute',
// }

let modalStyle = {
  position: 'sticky' as 'sticky',
  left: 0,
  top: 0,
}

export function AnnotationContainer({
  store,
  contrastRatio,
  source,
  // errorType,
  portalID,
  elementParent,
  message,
  code,
  context,
}: any) {
  const classes = useStyles()
  const annotationRef = useRef()
  const rootRef = useRef(null)
  const handler = new DragHandler()

  const onClick = (event: any) => {
    event?.preventDefault()
    event?.stopPropagation()

    modalStyle = {
      position: 'sticky',
      left: event?.pageX,
      top: event?.pageY,
    }
    store.setActiveAnnotation(null)
  }

  return (
    <>
      <Modal
        aria-labelledby='simple-modal-title'
        aria-describedby='simple-modal-description'
        open={store.activeAnnotation}
        container={() => rootRef.current}
        onClose={onClick}
        keepMounted
      >
        <Paper
          style={modalStyle}
          className={classes.paper}
          ref={annotationRef}
          onMouseDown={(e: any) =>
            handler.dragMouseDown(e, annotationRef.current)
          }
        >
          <div className={classes.row}>
            <Typography variant='h6' component='h3' className={classes.title}>
              RECOMMENDED
            </Typography>
            <IconButton
              edge='start'
              color='inherit'
              aria-label='close modal'
              onClick={onClick}
              style={{ marginRight: 6 }}
            >
              <CloseIcon />
            </IconButton>
          </div>
          <Typography
            variant='body2'
            className={classes.title}
            style={{ fontWeight: 500 }}
            gutterBottom
          >
            {context}
          </Typography>
          <Typography
            variant='subtitle2'
            className={`${classes.title} ${classes.maxSize}`}
            gutterBottom
          >
            {code}
          </Typography>
          <Typography
            variant='subtitle1'
            className={classes.title}
            gutterBottom
          >
            {message}
          </Typography>
          {message?.includes('contrast ratio') ? (
            <ToolTip
              visible={store.activeAnnotation}
              source={source}
              portalID={portalID}
              elementParent={elementParent}
              contrastRatio={contrastRatio}
              message={message}
              code={code}
              context={context}
              close={onClick}
            />
          ) : null}
        </Paper>
      </Modal>
    </>
  )
}

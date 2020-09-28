/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/
import React from 'react'
import { Modal, Backdrop, Fade } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { WithHighlight } from '@app/components/adhoc'

import { useHtmlView } from '@app/data'
import { frameDom } from '@app/managers'

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 0,
  },
  paper: {
    boxShadow: theme.shadows[5],
    border: '2px solid #000',
    padding: 0,
  },
  code: {
    fontSize: 12,
    '&::-webkit-scrollbar': {
      background: '#424242',
      height: 7,
    },
    '&::-webkit-scrollbar-thumb': {
      background: '#1b1b1b',
      borderRadius: 0,
      border: 0,
    },
  },
}))

export function HtmlView() {
  const classes = useStyles()
  const { htmlView, toggleHtmlModal } = useHtmlView()
  const { visible } = htmlView

  const handleClose = () => {
    toggleHtmlModal(false)
  }

  return (
    <Modal
      aria-labelledby='html-modal-title'
      aria-describedby='html-modal-description'
      className={classes.modal}
      open={!!visible}
      onClose={handleClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={!!visible}>
        <div>
          <WithHighlight
            className={`${classes.paper} ${classes.code}`}
            language={'html'}
            showLineNumbers
            lineProps={() => ({
              style: { display: 'block', cursor: 'pointer' },
            })}
          >
            {frameDom?.html}
          </WithHighlight>
        </div>
      </Fade>
    </Modal>
  )
}

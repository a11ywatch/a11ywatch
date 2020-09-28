/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/

import React from 'react'
import { Fade, Backdrop, Modal } from '@material-ui/core'
import { useDynamicModal } from '@app/data'
import { getType } from './helpers'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 0,
  },
  paper: {
    backgroundColor: 'transparent',
    boxShadow: theme.shadows[5],
    padding: 0,
    [theme.breakpoints.down('sm')]: {
      backgroundColor: theme.palette.background.paper,
    },
  },
}))

export function DynamicModal() {
  const classes = useStyles()
  const { modelData, setModal } = useDynamicModal()
  const { open, modalType, html } = modelData

  return (
    <Modal
      aria-labelledby='dynamic-modal-title'
      aria-describedby='dynamic-modal-description'
      className={classes.modal}
      open={!!open}
      onClose={() => {
        setModal({ open: false })
      }}
      closeAfterTransition
      BackdropComponent={Backdrop}
    >
      <Fade in={!!open}>
        <div className={classes.paper}>{getType({ modalType, html })}</div>
      </Fade>
    </Modal>
  )
}

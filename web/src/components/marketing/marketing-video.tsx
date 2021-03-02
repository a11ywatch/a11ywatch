import React from 'react'
import { Paper, Backdrop, Modal } from '@material-ui/core'
import { useCtaModal } from '@app/data'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    width: '75vw',
    height: '75vh',
  },
  video: {
    width: '100%',
    height: '100%',
  },
  hidden: {
    border: 0,
    clip: 'rect(1px 1px 1px 1px)',
    clipPath: 'inset(50%)',
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    width: 1,
    height: 1,
  },
}))

export function MarketingVideo() {
  const classes = useStyles()
  const { modalOpen, setModalOpen } = useCtaModal()

  const handleClose = () => {
    setModalOpen(false)
  }

  return (
    <Modal
      aria-labelledby='transition-modal-title'
      aria-describedby='transition-modal-description'
      className={classes.modal}
      open={!!modalOpen}
      onClose={handleClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
    >
      <Paper className={classes.paper} variant='outlined'>
        <iframe
          src='https://player.vimeo.com/video/387196528?title=0&amp;byline=0&amp;portrait=0&amp;muted=1&amp;autoplay=1&amp;autopause=0&amp;controls=0&amp;loop=1&amp;'
          frameBorder='0'
          allowFullScreen
          title='a11ywatch demo'
          className={classes.video}
        />
        <h2 id={'transition-modal-title'} className={classes.hidden}>
          A11ywatch intro video
        </h2>
        <div id={'transition-modal-description'} className={classes.hidden}>
          a11ywatch intro video showing how to use the product to improve your
          accessibility productivity
        </div>
      </Paper>
    </Modal>
  )
}

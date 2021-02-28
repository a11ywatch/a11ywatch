import React, { useEffect, Fragment } from 'react'
import { IconButton, Tooltip, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import GTranslateIcon from '@material-ui/icons/GTranslate'
import { loadTranslate } from '@app/lib'

const useStyles = makeStyles((theme) => ({
  badge: {
    marginLeft: 6,
    marginRight: 6,
    background: 'none',
    pointerEvents: 'auto',
    [theme.breakpoints.down('sm')]: {
      marginRight: 12,
    },
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

export const TranslateBadge = ({ inline }: { inline?: boolean }) => {
  const classes = useStyles()
  const ariaT = 'Translate page using google'

  function clickTranslate(event: any) {
    event?.preventDefault()

    let translate = document?.querySelector('.goog-te-combo')

    if (!translate) {
      translate = document?.querySelector(
        '.goog-te-gadget-simple .goog-te-menu-value span'
      )
    }

    if (translate) {
      const evt = document.createEvent('MouseEvent')
      evt.initEvent('click', { bubbles: true } as any)
      translate.dispatchEvent(evt)
    }
  }

  const readyChange = (event: any) => {
    if (event.target.readyState === 'complete') {
      loadTranslate()
      document.removeEventListener('readystatechange', readyChange)
    }
  }

  const receiveMessage = (event: any) => {
    if (event.origin !== window?.location?.origin) {
      return
    }
    if (event.data === 'TRX_FINISHED') {
      document.addEventListener('readystatechange', readyChange)
      window.removeEventListener('message', receiveMessage)
    }
  }

  useEffect(() => {
    let messageListener: any
    if (typeof document !== 'undefined') {
      const translateLoaded = document.querySelector(
        `script[src="/static/load-google.min.js"]`
      )

      if (translateLoaded) {
        loadTranslate(true)
        return
      }

      const script = document.createElement('script')

      script.src = '/static/load-google.min.js'
      script.defer = true
      document.body.appendChild(script)

      messageListener = window?.addEventListener(
        'message',
        receiveMessage,
        false
      )
    }

    return () => {
      if (messageListener) {
        messageListener?.removeEventListener('message', receiveMessage)
      }
    }
  }, [])

  const iconStyles = { color: '#959da5' }

  if (inline) {
    return (
      <button
        style={{ display: 'flex', alignItems: 'center' }}
        onClick={clickTranslate}
      >
        <GTranslateIcon style={iconStyles} />
        <Typography
          variant={'subtitle1'}
          style={{ marginLeft: '0.3em', fontSize: '1.05rem' }}
        >
          Translate
        </Typography>
      </button>
    )
  }

  return (
    <Fragment>
      <Tooltip title={'Change language'}>
        <IconButton
          onClick={clickTranslate}
          aria-label={ariaT}
          className={classes.badge}
        >
          <GTranslateIcon style={iconStyles} />
        </IconButton>
      </Tooltip>
      <div id='google_translate_element' className={classes.hidden} />
    </Fragment>
  )
}

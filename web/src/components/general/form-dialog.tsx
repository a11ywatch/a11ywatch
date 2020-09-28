/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/
import React, { useRef, useState } from 'react'
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Checkbox,
  FormControl,
  FormControlLabel,
  Select,
  MenuItem,
  IconButton,
} from '@material-ui/core'
import { makeStyles, Theme } from '@material-ui/core/styles'
import { domainList as dmList } from '@app/utils'
import { Close as CloseIcon } from '@material-ui/icons'
import { InputHeaders } from './input-headers'
import { useInputHeader } from './hooks'

const domainList = [...dmList, 'none']

interface MergedTheme extends Theme {
  color: any
}
const useStyles = makeStyles((theme: MergedTheme) => ({
  row: {
    flexDirection: 'row',
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1) - 4.2,
  },
  addButton: {
    marginLeft: theme.spacing(1),
  },
  dialogPadding: {
    paddingTop: `${theme.spacing(1)}px !important`,
  },
  input: {
    marginLeft: 2,
    flex: 1,
    width: '100%',
    [theme.breakpoints.down('md')]: {
      minWidth: 60,
      marginLeft: 'auto',
    },
  },
  inputAdjust: {
    marginLeft: 4,
  },
  formLabel: {
    marginLeft: 10,
    [theme.breakpoints.down('md')]: {
      marginLeft: 'auto',
      marginRight: 14,
    },
  },
  inputSelect: {
    [theme.breakpoints.down('md')]: {
      fontSize: 13,
      paddingRight: 0,
    },
    maxHeight: '50vh',
  },
  formLabelText: {
    [theme.breakpoints.down('md')]: {
      fontSize: 13,
    },
  },
  textInput: {
    [theme.breakpoints.down('md')]: {
      fontSize: 15,
    },
  },
  buttonAdjust: {
    marginTop: 12,
    minWidth: 300,
    paddingTop: 6,
    paddingBottom: 6,
    '&:hover': {
      background: '#fff',
      color: theme.color.primary,
    },
    [theme.breakpoints.down('md')]: {
      minWidth: 380,
    },
    [theme.breakpoints.down('sm')]: {
      minWidth: '96.5%',
    },
  },
  formControl: {
    marginLeft: 4,
    marginRight: 10,
    width: 'auto',
    minWidth: 70,
    [theme.breakpoints.down('md')]: {
      marginLeft: 'auto',
      minWidth: 60,
    },
  },
  topRow: {
    display: 'flex',
    alignItems: 'center',
    paddingRight: theme.spacing(3),
  },
  topTitle: {
    flex: 1,
    ['& > h2']: {
      fontWeight: 600,
    },
  },
}))

export function FormDialog({ buttonTitle = 'Add Website', okPress }: any) {
  const classes = useStyles()
  const [open, setOpen] = useState(false)
  const [websitUrl, setUrl] = useState('')

  const {
    customHeader,
    customFields,
    removeFormField,
    addFormField,
    updateFormField,
    setCustomHeader,
  } = useInputHeader()

  const [https, setTransportType] = useState(true)
  const [extension, setExtension] = useState('.com')
  const inputRef = useRef(null)

  const handleClickOpen = () => {
    setOpen(true)
  }
  const onChangeText = (event: any) => {
    setUrl(event.target.value)
  }
  const handleClose = () => {
    setOpen(false)
    setUrl('')
  }

  const handleChangeExt = (event: any) => {
    setExtension(event.target.value)
  }

  const submit = (event: any) => {
    event?.preventDefault()
    if (typeof okPress === 'function' && websitUrl) {
      let cleanUrl = websitUrl
        .replace(https ? 'https' : 'http', https ? 'http' : 'https')
        .replace(/^(?:https?:\/\/)?/i, '')
        .split('/')[0]

      if (cleanUrl[cleanUrl.length - 1] === '/') {
        cleanUrl = cleanUrl.slice(0, -1)
      }

      let tpt = 'https'
      if (websitUrl.includes('http://') || !https) {
        tpt = 'http'
      }
      // build url
      let urlBase = cleanUrl.includes('://') ? '' : `://`
      let blockExt = extension === 'none'

      if (cleanUrl?.includes('localhost:')) {
        if (!cleanUrl.includes('http')) {
          tpt = 'http'
        }
        blockExt = true
      }

      const ex =
        blockExt ||
        domainList.some((element: any) => cleanUrl.includes(element))
          ? ''
          : extension

      okPress(
        `${tpt}${urlBase}${cleanUrl}${ex}`.trim(),
        customHeader ? customFields : null
      )
    }
    handleClose()
  }

  const formLabelStyles = {
    root: classes.formLabel,
    label: classes.formLabelText,
  }

  const inputProps = {
    customHeader,
    customFields,
    removeFormField,
    addFormField,
    updateFormField,
  }

  return (
    <>
      <Button
        variant={'outlined'}
        onClick={handleClickOpen}
        className={classes.buttonAdjust}
      >
        {buttonTitle}
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby='form-dialog-title'
      >
        <div className={classes.topRow}>
          <DialogTitle id='form-dialog-title' className={classes.topTitle}>
            Subscribe
          </DialogTitle>
          <IconButton aria-label='close modal' onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </div>
        <form onSubmit={submit} noValidate>
          <DialogContent className={classes.dialogPadding}>
            <DialogContentText>
              To add a website to your watchlist, please enter the website url
              below.
            </DialogContentText>
            <TextField
              autoFocus
              onChange={onChangeText}
              className={classes.input}
              inputProps={{
                className: classes.textInput,
                minLength: 3,
              }}
              inputRef={inputRef}
              color='secondary'
              margin='dense'
              // pattern='url'
              value={websitUrl}
              id='name'
              placeholder='Url'
              type='url'
              required
            />
            <div className={classes.row}>
              <FormControl
                variant='outlined'
                className={classes.formControl}
                size='small'
              >
                <Select
                  labelId='extany-select-outlined-label'
                  id='ext-select-outlined'
                  value={extension}
                  onChange={handleChangeExt}
                  classes={{
                    selectMenu: classes.inputSelect,
                  }}
                >
                  {domainList.map((value: any) => (
                    <MenuItem value={value} key={value}>
                      {value.toUpperCase()}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControlLabel
                classes={formLabelStyles}
                control={
                  <Checkbox
                    checked={https}
                    onChange={() => {
                      setTransportType(!https)
                    }}
                    value={https}
                    color='primary'
                  />
                }
                label='HTTPS'
              />
              <FormControlLabel
                classes={formLabelStyles}
                control={
                  <Checkbox
                    color='primary'
                    checked={customHeader}
                    value={customHeader}
                    onChange={() => setCustomHeader(!customHeader)}
                  />
                }
                label='Headers'
              />
            </div>
            {customHeader ? <InputHeaders {...inputProps} /> : null}
          </DialogContent>
          <DialogActions style={{ padding: 0 }}>
            <Button
              onClick={submit}
              disabled={!websitUrl}
              type='submit'
              style={{ width: '100%', borderRadius: 0 }}
            >
              Subscribe
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  )
}

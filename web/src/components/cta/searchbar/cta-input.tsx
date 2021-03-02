/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/

import React, { useState, useRef } from 'react'
import { InputBase, Button } from '@material-ui/core'
import { fade, makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import { useSearch } from '@app/data'
import { AppManager } from '@app/managers'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      borderRadius: theme.shape.borderRadius,
      [theme.breakpoints.down('sm')]: {
        position: 'relative',
        flexDirection: 'column',
      },
    },
    search: {
      position: 'relative',
      display: 'flex',
      overflow: 'hidden',
      padding: 4,
      paddingLeft: 12,
      backgroundColor: fade(theme.palette.common.white, 0.15),
      '&:hover': {
        backgroundColor: fade(theme.palette.common.white, 0.25),
      },
      borderTopLeftRadius: theme.shape.borderRadius,
      borderBottomLeftRadius: theme.shape.borderRadius,
      [theme.breakpoints.down('sm')]: {
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
      },
    },
    hiddenLabel: {
      border: 0,
      clip: 'rect(0 0 0 0)',
      height: 1,
      margin: -1,
      overflow: 'hidden',
      padding: 0,
      position: 'absolute',
      width: 1,
    },
    submit: {
      width: 'auto',
      borderTopLeftRadius: 0,
      borderBottomLeftRadius: 0,
      paddingLeft: theme.spacing(5),
      paddingRight: theme.spacing(5),
      minWidth: '187.562px',
      fontWeight: 'bold',
      fontSize: '1.5rem',
      [theme.breakpoints.down('sm')]: {
        borderTopLeftRadius: 0,
        borderTopRightRadius: 0,
      },
    },
    inputRoot: {
      color: 'inherit',
    },
    inputInput: {
      padding: theme.spacing(1),
    },
  })
)

function CtaInput() {
  const classes = useStyles()
  const [searchFocused, setSearchFocused] = useState<boolean>()
  const ref = useRef(null)
  const { search, setSearch, loading, toggleModal } = useSearch()

  const toggleSearch = (open: boolean = false) => () => {
    // @ts-ignore
    open && !searchFocused && ref?.current?.focus()
    setSearchFocused(!!open)
  }

  const submitForm = (e: any) => {
    e?.preventDefault()
    if (!search) {
      AppManager.toggleSnack(true, `Please enter a valid web url`, 'error')
    } else {
      toggleModal(true, search)
      // @ts-ignore
      ref.current.value = ''
      return false
    }
  }

  return (
    <form className={classes.root} onSubmit={submitForm} noValidate>
      <div className={classes.search}>
        <InputBase
          placeholder={'Enter website url'}
          id='search-input-c'
          inputRef={ref}
          color={'primary'}
          type='url'
          classes={{
            root: classes.inputRoot,
            input: classes.inputInput,
          }}
          onBlur={toggleSearch(false)}
          onFocus={toggleSearch(true)}
          onChange={(event: any) => setSearch({ search: event?.target?.value })}
          inputProps={{
            minLength: 6,
            name: 'search',
          }}
        />
      </div>
      <Button
        className={classes.submit}
        type={'submit'}
        disabled={loading || !search}
        aria-label={loading ? 'Scanning website loading' : 'Analyze website'}
      >
        ANALYZE
      </Button>
    </form>
  )
}

export { CtaInput }

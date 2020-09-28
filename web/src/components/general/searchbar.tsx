/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/

import React from 'react'

import { InputBase, Fade, Button } from '@material-ui/core'
import { fade, makeStyles } from '@material-ui/core/styles'
import { Search as SearchIcon } from '@material-ui/icons'
import { useSearchFilter, useSearch } from '@app/data'
import { AppManager, HomeManager } from '@app/managers'

const useStyles = makeStyles((theme) => ({
  root: ({ noWidth }: any) => ({
    marginLeft: 12,
    marginRight: 12,
    maxWidth: noWidth ? '50%' : '35%',
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  }),
  submit: {
    margin: 7,
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  },
  searchIcon: {
    width: theme.spacing(7),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: ({ noWidth }: any) => ({
    padding: theme.spacing(1, 1, 1, 7),
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: noWidth ? 'auto' : 120,
      '&:focus': noWidth
        ? {}
        : {
            width: 200,
          },
    },
  }),
}))

export function SearchBar({ placeholder, noWidth, cta }: any) {
  const classes = useStyles({ noWidth })
  const { setSearchFilter } = useSearchFilter()
  const { search: ctaSearch, setSearch, loading, toggleModal } = cta
    ? useSearch()
    : {
        search: null,
        setSearch: null,
        loading: false,
        toggleModal: null,
      }

  const submit = (e: any) => {
    e?.preventDefault()

    if (cta && ctaSearch) {
      const searchUrl = ctaSearch.includes('http')
        ? ctaSearch
        : `http://${ctaSearch}`
      setSearch && setSearch({ search: '' })

      HomeManager.submit(null, searchUrl)
      toggleModal && toggleModal(true, searchUrl)
    } else {
      AppManager.toggleSnack(true, 'Please enter a valid website url', 'error')
    }
  }

  return (
    <form className={classes.root} onSubmit={submit} noValidate>
      <div className={classes.search}>
        <div className={classes.searchIcon}>
          <SearchIcon />
        </div>
        <InputBase
          placeholder={placeholder || 'Search…'}
          classes={{
            root: classes.inputRoot,
            input: classes.inputInput,
          }}
          type={'search'}
          color={'primary'}
          onChange={
            !cta
              ? setSearchFilter
              : (event: any) => {
                  setSearch && setSearch({ search: event?.target?.value })
                }
          }
          inputProps={{ 'aria-label': 'search' }}
        />
        {!!(cta && ctaSearch) ? (
          <Fade in={true}>
            <Button
              type='submit'
              className={classes.submit}
              disabled={!!loading}
            >
              Submit
            </Button>
          </Fade>
        ) : null}
      </div>
    </form>
  )
}

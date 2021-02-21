/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/

import React, { useState, useRef } from 'react'
import { FormControl, InputLabel, InputBase, Button } from '@material-ui/core'
import { fade, makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import { Search as SearchIcon } from '@material-ui/icons'
import { useSearch } from '@app/data'
import { AppManager } from '@app/managers'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      flex: 1,
      marginTop: '12px',
      borderRadius: theme.shape.borderRadius,
      backgroundColor: fade(theme.palette.common.white, 0.15),
      minHeight: '8.3rem',
      '&:hover': {
        backgroundColor: fade(theme.palette.common.white, 0.25),
      },
      [theme.breakpoints.down(920)]: {
        flexDirection: 'column',
      },
      [theme.breakpoints.down('sm')]: {
        position: 'relative',
      },
    },
    search: {
      position: 'relative',
      display: 'flex',
      flex: 1,
      overflow: 'hidden',
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
    searchIcon: {
      width: '10%',
      height: '100%',
      position: 'absolute',
      pointerEvents: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      [theme.breakpoints.down(920)]: {
        width: theme.spacing(12),
      },
    },
    inputRoot: {
      color: 'inherit',
      flex: 1,
      overflow: 'hidden',
      paddingLeft: '25%',
      paddingRight: theme.spacing(2),
      [theme.breakpoints.down(920)]: {
        paddingLeft: '15%',
      },
    },
    inputTypeSearch: {
      paddingRight: theme.spacing(2),
      [theme.breakpoints.down(920)]: {
        position: 'relative',
        right: '20px',
      },
    },
    inputInput: {
      paddingLeft: '13%',
      transition: theme.transitions.create('width'),
      fontSize: '3.3rem',
      position: 'relative',
      [theme.breakpoints.down(920)]: {
        fontSize: '1.2rem',
      },
      flex: 1,
      display: 'flex',
    },
    innerInput: {
      width: '125%',
      minHeight: '8rem',
      backgroundColor: 'transparent',
      border: 'none',
      position: 'absolute',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      ['&:focus']: {
        outline: 0,
        border: 0,
      },
      [theme.breakpoints.down(920)]: {
        ['&:focus']: {
          width: '100%',
        },
        position: 'relative',
      },
    },
    hiddenClass: {
      visibility: 'hidden',
      width: '1px !important',
    },
    searchIconFont: {
      fontSize: '4.2rem',
      [theme.breakpoints.down(920)]: {
        fontSize: '2.9rem',
      },
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
      [theme.breakpoints.down(920)]: {
        fontSize: '1rem',
        paddingLeft: theme.spacing(3),
        paddingRight: theme.spacing(3),
        minWidth: '80px',
      },
      [theme.breakpoints.down('sm')]: {
        flex: 1,
        width: '100%',
        bottom: 0,
        borderTopLeftRadius: 0,
        borderTopRightRadius: 0,
        position: 'absolute',
      },
    },
    relative: {
      position: 'relative',
      paddingLeft: '18%',
    },
    formControl: {
      [theme.breakpoints.down('sm')]: {
        position: 'absolute',
      },
    },
  })
)

function FadeBlock({ search, loading, className, hiddenClass }: any) {
  return (
    <Button
      className={`${className} ${
        !!search || (!!search && loading) ? '' : hiddenClass
      }`}
      type={'submit'}
      disabled={loading}
      aria-label={loading ? 'Scanning website loading' : 'Analyze website'}
    >
      ANALYZE
    </Button>
  )
}

function CtaSearchBar({ children, checker }: any) {
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
        <div className={classes.searchIcon}>
          <SearchIcon className={classes.searchIconFont} />
        </div>
        <FormControl fullWidth className={classes.formControl}>
          <InputLabel htmlFor='search-input' className={classes.hiddenLabel}>
            Search your website for issues
          </InputLabel>
          <InputBase
            placeholder={'Enter a website url'}
            id='search-input'
            classes={{
              root: !checker ? classes.inputRoot : '',
              input: `${classes.inputInput} ${classes.innerInput} ${
                (!children && !checker) || checker ? classes.relative : ''
              }`,
              inputTypeSearch: classes.inputTypeSearch,
            }}
            inputRef={ref}
            type='url'
            onBlur={toggleSearch(false)}
            onFocus={toggleSearch(true)}
            onChange={(event: any) =>
              setSearch({ search: event?.target?.value })
            }
            inputProps={{
              minLength: 6,
              name: 'search',
            }}
            fullWidth
          />
        </FormControl>
        {children && !search && !searchFocused ? (
          <div
            className={classes.innerInput}
            tabIndex={0}
            title={'Enter your website to check for accessibility issues'}
            onClick={toggleSearch(true)}
          >
            {children}
          </div>
        ) : null}
      </div>
      <FadeBlock
        className={classes.submit}
        hiddenClass={classes.hiddenClass}
        loading={loading}
        search={search}
      />
    </form>
  )
}

export { CtaSearchBar }

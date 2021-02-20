/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/

import React, { useMemo, useCallback } from 'react'
import { IconButton, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { useMediaQuery } from '@material-ui/core'
import { strings } from '@app-strings'
import { useSearch } from '@app/data'

const useStyles = makeStyles((theme) => ({
  root: {
    paddingBottom: '12%',
    width: 'calc(100% - 3px)',
    display: 'block',
  },
  card: {
    position: 'relative',
    overflow: 'hidden',
    border: `1px solid ${theme.palette.background.paper}`,
    borderRadius: 8,
    width: '100%',
    justifyContent: 'space-around',
    display: 'flex',
    padding: 10,
    flexDirection: 'row',
  },
}))

export function CtaCustomers() {
  const classes = useStyles()
  const { toggleModal } = useSearch()
  const clickItem = useCallback((item: string) => {
    toggleModal(true, item)
  }, [])
  const size = useMediaQuery('(min-width:600px)') ? 78 : 25

  return (
    <section className={classes.root}>
      <Typography variant='h4' component='h3'>
        {strings.customers}
      </Typography>
      <Typography variant='h6' component='h4' gutterBottom>
        {strings.customersWhy}
      </Typography>
      <div className={classes.card}>
        {useMemo(() => ['twitter', 'github', 'dropbox'], []).map((item, i) => (
          <IconButton
            onClick={() => clickItem(`https://${item}.com`)}
            aria-label={`Scan ${item} for issues`}
            key={item + i}
          >
            <img
              src={`static/img/${item}.svg`}
              alt={item}
              width={size}
              height={size}
            />
          </IconButton>
        ))}
      </div>
    </section>
  )
}

/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/

import React from 'react'
import {
  Divider,
  Grid,
  Typography,
  Drawer,
  IconButton,
} from '@material-ui/core'
import { Close as CloseIcon } from '@material-ui/icons'
import { makeStyles } from '@material-ui/core/styles'

import { useSearch } from '@app/data'
import {
  Pulse,
  IssueFeed,
  RenderSecondary,
  Spacer,
} from '@app/components/general'
import { CtaCdn } from '@app/components/cta'
import { strings } from '@app-strings'

const useStyles = makeStyles((theme) => ({
  container: {
    padding: theme.spacing(1),
  },
  loading: {
    padding: 12,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  row: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: 6,
  },
  rowBlock: {
    display: 'flex',
  },
  title: {
    flex: 1,
    fontWeight: 600,
    maxWidth: '95vw',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    paddingRight: 6,
  },
  block: {
    flex: 1,
    width: '50%',
  },
}))

export function SwipeableTemporaryDrawer() {
  const classes = useStyles()
  const { bottomModal, website, toggleModal } = useSearch()

  const toggleDrawer = (type: any) => () => {
    toggleModal(type, '')
  }

  return (
    <Drawer anchor='bottom' open={bottomModal} onClose={toggleDrawer(false)}>
      <div role='presentation' style={{ overflow: 'hidden' }}>
        {website ? (
          <>
            <div className={classes.container}>
              <Grid className={classes.row}>
                <Typography
                  variant='h4'
                  component='p'
                  className={classes.title}
                >
                  {website?.url || strings.trySearch}
                </Typography>
                <IconButton
                  aria-label='close modal'
                  onClick={toggleDrawer(false)}
                >
                  <CloseIcon />
                </IconButton>
              </Grid>
              <RenderSecondary {...website} />
              <CtaCdn website={website} block />
              <Spacer height={6} />
            </div>
            <Divider />
            <div className={classes.rowBlock}>
              <IssueFeed
                website={website}
                renderListOnly
                className={classes.block}
              />
              <img
                src={website?.screenshot}
                className={classes.block}
                alt={`${website?.url} screenshot`}
              />
            </div>
          </>
        ) : (
          <div className={classes.loading}>
            <Pulse visible size={30} aria-label='Loading issues' />
          </div>
        )}
      </div>
    </Drawer>
  )
}

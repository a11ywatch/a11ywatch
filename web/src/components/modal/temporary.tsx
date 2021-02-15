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
import { a11yDark } from '@app/styles'

import { useSearch } from '@app/data'
import {
  Pulse,
  IssueFeed,
  RenderSecondary,
  Spacer,
  WebsiteTabs,
} from '@app/components/general'
import { CtaCdn } from '@app/components/cta'
import { FakeButtonContainer } from '@app/components/fake'
import { strings } from '@app-strings'
import { EditableMixture } from '@app/components/mixtures/editable-mixture'

const useStyles = makeStyles((theme) => ({
  container: {
    padding: theme.spacing(1),
  },
  root: {
    maxHeight: '100vh',
    overflow: 'hidden',
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
  title: {
    flex: 1,
    fontWeight: 600,
    maxWidth: '95vw',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    paddingRight: 6,
  },
  centerAlign: {
    display: 'flex',
    justifyContent: 'center',
    height: '100%',
    ['& > img']: {
      textAlign: 'center',
      display: 'block',
      maxWidth: '100%',
      maxHeight: '380vh',
    },
  },
  block: {
    flex: 1,
    display: 'block',
    maxHeight: '65vh',
    ['& > pre']: {
      overflowY: 'scroll',
      maxHeight: '65vh',
    },
  },
  screenshotContainer: {
    border: 'solid rgb(33,32,36)',
    borderWidth: '30px 4px 4px',
    borderRadius: 4,
    overflowY: 'scroll',
    maxHeight: 480,
    margin: 20,
    marginLeft: '20vw',
    marginRight: '20vw',
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
      <div className={classes.root}>
        <div className={classes.container}>
          <Grid className={classes.row}>
            <Typography variant='h4' component='p' className={classes.title}>
              {website?.url || strings.trySearch}
            </Typography>
            <IconButton aria-label='close modal' onClick={toggleDrawer(false)}>
              <CloseIcon />
            </IconButton>
          </Grid>
          <RenderSecondary {...website} />
          <CtaCdn website={website} block />
          <Spacer height={6} />
        </div>
        <Divider />
        {Object.keys(website).length <= 1 ? (
          <div className={classes.loading} role='presentation'>
            <Pulse visible size={30} aria-label='Loading issues' />
          </div>
        ) : (
          <WebsiteTabs
            issues={<IssueFeed website={website} renderListOnly />}
            html={
              <div className={classes.block}>
                <EditableMixture
                  language='html'
                  style={a11yDark}
                  lineProps={() => ({
                    style: { display: 'block', cursor: 'pointer' },
                  })}
                  editMode={false}
                >
                  {website?.html || ''}
                </EditableMixture>
              </div>
            }
            screenshot={
              <div className={classes.screenshotContainer}>
                <FakeButtonContainer />
                <div className={classes.centerAlign}>
                  <img
                    src={website?.screenshot}
                    alt={`screenshot of ${website?.url} tested`}
                  />
                </div>
              </div>
            }
          />
        )}
      </div>
    </Drawer>
  )
}

/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/
import React from 'react'
import { observer } from 'mobx-react'
import { frameDom, IframeManager } from '@app/managers'
import {
  Build as BuildIcon,
  Error as ErrorIcon,
  ListAlt as ListAltIcon,
  DeveloperMode as DeveloperModeIcon,
  Visibility as VisibilityIcon,
  VisibilityOff as VisibilityOffIcon,
} from '@material-ui/icons'
import { Button, Tooltip } from '@material-ui/core'
import { useAutoFix, useMiniPlayer, useIframe, useHtmlView } from '@app/data'
import { makeStyles, Theme } from '@material-ui/core/styles'
import { Box } from '@app/components/general'

interface MergedTheme extends Theme {
  color: any
}

const useStyles = makeStyles((theme: MergedTheme) => ({
  bar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    flexDirection: 'column',
    display: 'flex',
    justifyContent: 'flex-end',
    minWidth: '100px',
    padding: '12px',
  },
  button: {
    marginBottom: '10px',
    width: '100%',
    paddingTop: '14px',
    paddingBottom: '14px',
    justifyContent: 'center',
    alignItems: 'center',
    background: 'rgba(20,20,20,0.3)',
    border: `4px solid ${theme.color.indigo}`,
  },
  icon: {
    color: theme.color.indigo,
  },
}))

const MFab = observer(({ iframeStore, issue, script, marketing }: any) => {
  const classes = useStyles()
  const { setMiniPlayerContent } = useMiniPlayer()
  const { highLight, toggleHighLight, setFrameContent } = useIframe()
  const { htmlView, toggleHtmlModal } = useHtmlView()
  const { autoFixEnabled, setAutoFix } = useAutoFix(script)

  return (
    <Box className={classes.bar}>
      {!marketing ? (
        <Tooltip title='Issue with page, toggle to webview' placement='right'>
          <Button
            className={classes.button}
            onClick={() => iframeStore.toggleView()}
          >
            {iframeStore.viewMode ? (
              <VisibilityOffIcon className={classes.icon} />
            ) : (
              <VisibilityIcon className={classes.icon} />
            )}
          </Button>
        </Tooltip>
      ) : null}
      {htmlView?.display ? (
        <Tooltip title='View html fixed by CDN' placement='right'>
          <Button
            className={classes.button}
            onClick={() => toggleHtmlModal(true)}
          >
            <DeveloperModeIcon className={classes.icon} />
          </Button>
        </Tooltip>
      ) : null}
      {highLight?.display ? (
        <Tooltip title='Highlight elements fixed by CDN' placement='right'>
          <Button className={classes.button} onClick={toggleHighLight}>
            <ListAltIcon className={classes.icon} />
          </Button>
        </Tooltip>
      ) : null}
      {issue?.issues?.length ? (
        <Button className={classes.button} onClick={setMiniPlayerContent(true)}>
          <ErrorIcon className={classes.icon} />
        </Button>
      ) : null}
      {script?.cdnUrlMinified && issue?.issues?.length && !autoFixEnabled ? (
        <Button
          onClick={() =>
            frameDom.injectAutoFix({
              cdn: script?.cdnUrlMinified,
              autoFixEnabled,
              setAutoFix,
              callBack: setFrameContent,
            })
          }
          className={classes.button}
        >
          <BuildIcon className={classes.icon} />
        </Button>
      ) : null}
    </Box>
  )
})

// <Button
//   onClick={adaStore.toggleScriptFix}
//   className={classes.button}
//   variant='text'
// >
//   <CodeIcon color='secondary' />
// </Button>

export const Fab = ({ issue, script, marketing }: any) => (
  <MFab
    iframeStore={IframeManager}
    issue={issue}
    script={script}
    marketing={marketing}
  />
)

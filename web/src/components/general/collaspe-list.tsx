/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/
import React, { useState, useEffect } from 'react'
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Checkbox,
} from '@material-ui/core'
import { Button } from 'ui'
import { scriptData } from '@app/data'
import { UserManager, AppManager } from '@app/managers'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import { a11yDark } from '@app/styles'
import Collapse from '@material-ui/core/Collapse'
import WebIcon from '@material-ui/icons/Web'
import ExpandLess from '@material-ui/icons/ExpandLess'
import ExpandMore from '@material-ui/icons/ExpandMore'
import { EditableMixture } from '@app/components/mixtures/editable-mixture'

interface MergedTheme extends Theme {
  color: any
}

const useStyles = makeStyles(({ palette, spacing, color }: MergedTheme) =>
  createStyles({
    root: {
      width: '100%',
      backgroundColor: palette.background.paper,
      marginTop: '60px',
    },
    nested: {
      paddingLeft: spacing(4),
      paddingRight: spacing(4),
    },
    info: {
      borderTop: `1px solid ${color.border}`,
      paddingLeft: spacing(2),
      paddingRight: spacing(2),
      paddingBottom: spacing(1),
      paddingTop: spacing(1),
    },
    text: {
      fontSize: '1em',
    },
    textHeader: {
      fontSize: '1.2em',
      fontWeight: 'bold',
    },
    code: {
      maxHeight: '60vh',
      '&::-webkit-scrollbar': {
        width: '8px',
      },
      '&::-webkit-scrollbar-thumb': {
        borderRadius: 0,
        border: 0,
      },
    },
    title: {
      flex: 1,
      fontWeight: 500,
    },
    row: {
      display: 'inline-flex',
      alignItems: 'center',
    },
  })
)

const handleClick = (item: any, open: boolean, cb?: any) => {
  cb(item === open ? '' : item)
}

function MainCell({
  source: sourceData,
  classes,
  updateScript,
  scriptLoading,
  newItemUpdate,
}: any) {
  const [source, setSource] = useState(sourceData)
  const [newScript, setScript] = useState(sourceData)
  const [checked, setChecked] = useState(
    !source?.issueMeta?.skipContentIncluded &&
      source?.scriptMeta?.skipContentEnabled
  )
  const [editMode, setEdit] = useState(false)
  const freeAccount = UserManager.freeAccount && !UserManager.firstDay

  useEffect(() => {
    if (newItemUpdate) {
      setSource(newItemUpdate)
    }
  }, [newItemUpdate])

  const handleChange = () => {
    if (freeAccount) {
      AppManager.toggleSnack(
        true,
        'You need to upgrade your account to edit scripts',
        'warning'
      )
    } else {
      setChecked(!checked)
      updateScript({
        variables: {
          url: source?.pageUrl,
          scriptMeta: {
            skipContentEnabled: !checked,
          },
          editScript: false,
        },
      }).catch((e: any) => {
        console.error(e)
      })
    }
  }

  const submitEdit = () => {
    updateScript({
      variables: {
        url: source?.pageUrl,
        scriptMeta: {
          skipContentEnabled: !checked,
        },
        editScript: true,
        newScript,
      },
    }).catch((e: any) => {
      console.error(e)
    })
    setSource({ ...source, script: newScript })
    setEdit(false)
  }

  return (
    <li>
      <div className={classes.info}>
        <ListItemText
          primaryTypographyProps={{
            className: classes.textHeader,
          }}
        >
          {source?.pageUrl}
        </ListItemText>
        {!source?.issueMeta?.skipContentIncluded ? (
          <div className={classes.row}>
            <ListItemText primaryTypographyProps={{ className: classes.text }}>
              Skip Content Button Inserted
            </ListItemText>
            {!source?.issueMeta?.skipContentIncluded ? (
              <Checkbox
                checked={checked}
                onChange={handleChange}
                inputProps={{
                  'aria-label': 'Skip content enabled',
                }}
                disabled={scriptLoading}
                size='small'
              />
            ) : null}
          </div>
        ) : null}
        <>
          <div style={{ flex: 1 }} />
          <div style={{ flex: 1, display: 'flex', paddingBottom: 4 }}>
            <Button
              onClick={() => {
                if (freeAccount) {
                  AppManager.toggleSnack(
                    true,
                    'You need to upgrade your account to edit scripts',
                    'warning'
                  )
                } else {
                  setEdit(!editMode)
                }
              }}
              className={'hover:text-black'}
            >
              {editMode ? 'Default' : 'Edit'}
            </Button>
            <div style={{ flex: 1 }} />
            {editMode ? (
              <Button
                onClick={() => {
                  submitEdit()
                }}
                className={'hover:text-green-600'}
              >
                Submit
              </Button>
            ) : null}
          </div>
        </>
      </div>
      <EditableMixture
        language='javascript'
        style={a11yDark}
        className={classes.code}
        lineProps={() => ({
          style: { display: 'block', cursor: 'pointer' },
        })}
        setScript={setScript}
        editMode={editMode}
      >
        {source?.script || ''}
      </EditableMixture>
    </li>
  )
}

function CollaspeListEntry({
  classes,
  item,
  updateScript,
  scriptLoading,
  open,
  setOpen,
  updateScriptData,
}: any) {
  const sectionTitle = item[0]
  const sectionData = item[1]
  const [newItemUpdate, setUpdate] = useState({ key: null, script: null })

  useEffect(() => {
    const scriptData = updateScriptData?.updateScript

    if (scriptData) {
      const newScript = scriptData.script
      // const newDomain = newScript.domain
      const newPageUrl = newScript.pageUrl

      if (sectionData) {
        const dataSourceIndex = sectionData.findIndex(
          (source: any) => source.pageUrl === newPageUrl
        )
        if (sectionData[dataSourceIndex]) {
          setUpdate({ key: dataSourceIndex, script: newScript })
        }
      }
    }
  }, [updateScriptData])

  return (
    <span>
      <ListItem button onClick={() => handleClick(sectionTitle, open, setOpen)}>
        <ListItemIcon>
          <WebIcon />
        </ListItemIcon>
        <ListItemText primary={sectionTitle} />
        {sectionTitle === open ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={sectionTitle === open} timeout='auto' unmountOnExit>
        <ul>
          {sectionData?.map((source: any, index: number) => (
            <MainCell
              source={source}
              classes={classes}
              updateScript={updateScript}
              key={`${source.pageUrl}`}
              scriptLoading={scriptLoading}
              newItemUpdate={
                index === newItemUpdate?.key ? newItemUpdate?.script : null
              }
            />
          ))}
        </ul>
      </Collapse>
    </span>
  )
}

export function CollaspeList({ dataSource }: any) {
  const classes = useStyles()
  const [open, setOpen] = useState(true)
  const entries = Object.entries(dataSource)
  const { updateScript, updateScriptData, scriptLoading } = scriptData(
    '',
    false
  )

  return (
    <List aria-labelledby='nested-list-subheader' className={classes.root}>
      {entries?.map((item: any, ek: number) => (
        <CollaspeListEntry
          key={ek}
          item={item}
          classes={classes}
          setOpen={setOpen}
          open={open}
          updateScript={updateScript}
          scriptLoading={scriptLoading}
          updateScriptData={updateScriptData}
        />
      ))}
    </List>
  )
}

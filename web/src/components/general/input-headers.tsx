/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/
import React from 'react'
import { TextField, IconButton } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { Add as AddIcon, Remove as RemoveIcon } from '@material-ui/icons'

const useStyles = makeStyles((theme) => ({
  row: {
    flexDirection: 'row',
    display: 'flex',
    alignItems: 'center',
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1) - 4.2,
  },
  addButton: {
    marginLeft: theme.spacing(1),
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
  formLabelText: {
    [theme.breakpoints.down('md')]: {
      fontSize: 13,
    },
  },
}))

export function InputHeaders({
  customHeader,
  customFields,
  removeFormField,
  addFormField,
  updateFormField,
}: any) {
  const classes = useStyles()

  // const formLabelStyles = {
  //   root: classes.formLabel,
  //   label: classes.formLabelText,
  // }

  return customHeader
    ? customFields?.map((item: any, index: number) => {
        const inputKeyName = 'Key'
        const inputValueName = 'Value'

        return (
          <div className={classes.row} key={index}>
            <TextField
              autoFocus
              className={`${classes.input} ${classes.inputAdjust}`}
              color='secondary'
              margin='dense'
              value={item.key}
              placeholder={inputKeyName}
              required
              onChange={(event: any) =>
                updateFormField(
                  event.target.value,
                  index,
                  inputKeyName.toLowerCase()
                )
              }
            />
            <TextField
              className={`${classes.input} ${classes.inputAdjust}`}
              color='secondary'
              margin='dense'
              value={item.value}
              placeholder={inputValueName}
              onChange={(event: any) =>
                updateFormField(
                  event.target.value,
                  index,
                  inputValueName.toLowerCase()
                )
              }
              required
            />
            {customFields.length > 1 ? (
              <IconButton
                aria-label='add header field'
                onClick={() => removeFormField(index)}
                className={classes.addButton}
              >
                <RemoveIcon />
              </IconButton>
            ) : null}
            {index === customFields.length - 1 ? (
              <IconButton
                aria-label='add header field'
                onClick={addFormField}
                className={classes.addButton}
              >
                <AddIcon />
              </IconButton>
            ) : null}
          </div>
        )
      })
    : null
}

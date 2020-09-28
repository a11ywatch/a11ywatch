/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/

import React from 'react'
import { Button } from '@material-ui/core'
import { Link } from '@app/components/general'
import { strings } from '@app-strings'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  root: {
    color: '#fff',
    right: 0,
    padding: '8px 16px 8px 16px',
    maxHeight: '40px',
    background: theme.palette.secondary.main,
    top: '100px',
    position: 'absolute',
    borderTopLeftRadius: '18px',
    borderBottomLeftRadius: '18px',
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
    textTransform: 'none',
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  },
}))

function CtaProfessionalSupportButton() {
  const classes = useStyles()

  return (
    <Button className={classes.root} component={Link} href={'/consulting'}>
      {strings.getSupport}
    </Button>
  )
}

export { CtaProfessionalSupportButton }

/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/
import { makeStyles } from '@material-ui/core/styles'
import { Screenshot } from '../general'
import { Typography } from '@material-ui/core'
import { strings } from '@app-strings'

const useStyles = makeStyles((theme: any) => ({
  container: {
    padding: theme.spacing(2),
    display: 'inline-flex',
    maxWidth: '95vw',
    maxHeight: '40vh',
    overflowY: 'hidden',
    overflowX: 'scroll',
  },
  root: {
    paddingBottom: '12%',
    width: 'calc(100% - 3px)',
    display: 'block',
  },
}))

function MarketingWebsites({ websites }: any) {
  if (!websites?.length) {
    return null
  }
  const { container, root } = useStyles()

  return (
    <section className={root}>
      <Typography variant='h4' component='h3'>
        {strings.usersUsing}
      </Typography>
      <div className={container}>
        {websites.map(({ screenshot, url }: any, i: number) => {
          return (
            <Screenshot
              url={url}
              src={screenshot}
              width={600}
              height={1220}
              resetMargin
              key={i}
            />
          )
        })}
      </div>
    </section>
  )
}

export { MarketingWebsites }

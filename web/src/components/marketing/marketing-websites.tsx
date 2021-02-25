/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/
import { makeStyles } from '@material-ui/core/styles'
import { Screenshot } from '../general'

const useStyles = makeStyles((theme: any) => ({
  container: {
    padding: theme.spacing(2),
    marginBottom: '12%',
    display: 'inline-flex',
    maxWidth: '95vw',
    maxHeight: '40vh',
    overflowY: 'hidden',
    overflowX: 'scroll',
    borderRadius: 2,
  },
}))

function MarketingWebsites({ websites }: any) {
  if (!websites?.length) {
    return null
  }
  const { container } = useStyles()

  return (
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
  )
}

export { MarketingWebsites }

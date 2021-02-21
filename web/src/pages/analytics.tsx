/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/

import React from 'react'
import { red, grey, yellow } from '@material-ui/core/colors'
import { Skeleton } from '@material-ui/lab'
import { Container, Box, List } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { VictoryLabel, VictoryTheme, VictoryBar, VictoryChart } from 'victory'
import { PageTitle, Drawer } from '@app/components/general'
import { Failure } from '@app/components/empty'
import { analyticsData, useSearchFilter } from '@app/data'
import { filterSort } from '@app/lib'
import { theme } from '@app-theme'
import { withApollo } from '@app/apollo'
import { WithHydrate } from '@app/components/adhoc'
import { metaSetter } from '@app/utils'
import type { PageProps } from '@app/types'

const useStyles = makeStyles(() => ({
  alignCenter: {
    textAlign: 'center',
  },
  flex: {
    flex: 1,
  },
  center: {
    justfiyContent: 'center',
    alignCenter: 'center',
    display: 'flex',
    flexDirection: 'column',
  },
  box: { marginTop: 30 },
  textLoader: {
    marginBottom: 30,
  },
  subtitle: {
    marginTop: 20,
    fontWeight: 500,
  },
}))

function Analytics({ name }: PageProps) {
  const classes = useStyles()
  const { data, loading } = analyticsData(true)
  const { search } = useSearchFilter()
  const dataSource = filterSort(data, search)

  return (
    <WithHydrate>
      <Drawer title={name}>
        <Container maxWidth={'xl'}>
          <Box my={4}>
            <PageTitle title={'All Analytics'} />
            {loading && !dataSource.length ? (
              <List className={classes.center}>
                <Box key={0} className={`${classes.center} ${classes.box}`}>
                  <Skeleton
                    variant='text'
                    width={100}
                    className={classes.textLoader}
                  />
                  <Skeleton variant='rect' width={'100%'} height={240} />
                </Box>
                <Box key={1} className={`${classes.center} ${classes.box}`}>
                  <Skeleton
                    variant='text'
                    width={100}
                    className={classes.textLoader}
                  />
                  <Skeleton variant='circle' width={300} height={240} />
                </Box>
              </List>
            ) : !loading && !dataSource.length ? (
              <Failure />
            ) : (
              <List>
                {dataSource?.map((source: any, i: number) => {
                  return (
                    <li key={`${source.pageUrl} ${i}`} className={classes.flex}>
                      <VictoryChart
                        theme={VictoryTheme.material}
                        domainPadding={{ x: 12 }}
                        height={180}
                      >
                        <VictoryLabel
                          text={source.pageUrl}
                          x={160}
                          y={22}
                          style={{ fill: theme.palette.text.secondary }}
                          textAnchor='middle'
                        />
                        <VictoryBar
                          style={{
                            data: {
                              fill: ({ datum }: any) =>
                                datum.x === 'Errors'
                                  ? red[300]
                                  : datum.x === 'Warnings'
                                  ? yellow[300]
                                  : grey[300],
                              fillOpacity: 0.7,
                              strokeWidth: 3,
                            },
                            parent: {
                              fontSize: 8,
                              fill: theme.palette.text.primary,
                            },
                            labels: {
                              fontSize: 7,
                              fill: ({ datum }: any) =>
                                datum.x === 'Errors'
                                  ? red[300]
                                  : datum.x === 'Warnings'
                                  ? yellow[300]
                                  : grey[300],
                            },
                          }}
                          data={[
                            {
                              x: 'Errors',
                              y: source.errorCount,
                              fill: red[300],
                            },
                            {
                              x: 'Warnings',
                              y: source.warningCount,
                              fill: yellow[300],
                            },
                            {
                              x: 'Notices',
                              y: source.noticeCount,
                              fill: grey[300],
                            },
                          ]}
                          // colorScale={[red[300], yellow[300], grey[300]]}
                          labels={({ datum }: any) =>
                            (datum.y && datum.x) || ''
                          }
                          events={[
                            {
                              target: 'data',
                              eventHandlers: {
                                onClick: () => {
                                  return [
                                    {
                                      target: 'data',
                                      mutation: ({ style }: any) => {
                                        return style.fill === grey[800]
                                          ? null
                                          : {
                                              style: { fill: grey[800] },
                                            }
                                      },
                                    },
                                    {
                                      target: 'labels',
                                      mutation: ({ text, datum }: any) => {
                                        return typeof text === 'number'
                                          ? { text: datum?.x }
                                          : { text: datum?.y }
                                      },
                                    },
                                  ]
                                },
                              },
                            },
                          ]}
                        />
                      </VictoryChart>
                    </li>
                  )
                })}
              </List>
            )}
          </Box>
        </Container>
      </Drawer>
    </WithHydrate>
  )
}

export default withApollo(metaSetter({ Analytics }))

/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/

import React, { useMemo } from 'react'
import { Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { strings } from '@app-strings'

import { rollStyles } from '@app/styles'
import { CtaSearchBar } from './searchbar'

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: '12%',
    paddingBottom: '12%',
    display: 'block',
    overflow: 'hidden',
    [theme.breakpoints.down('sm')]: {
      paddingTop: '18%',
    },
  },
  detailedContainer: {
    paddingTop: '6%',
  },
  title: {
    width: '100%',
    display: 'flex',
    paddingLeft: '8vw',
    textAlign: 'left',
    position: 'relative',
    [theme.breakpoints.down('sm')]: {
      wordBreak: 'break-word',
      display: 'block',
      textAlign: 'center',
      paddingLeft: 0,
      left: 20,
    },
  },
  smallFont: {
    [theme.breakpoints.down(900)]: {
      fontSize: '2.6rem',
    },
    [theme.breakpoints.down(800)]: {
      fontSize: '2rem',
    },
    [theme.breakpoints.down(600)]: {
      fontSize: '1.8rem',
    },
  },
}))

function CtaIntro({ checker }: any) {
  const classes = useStyles()
  const roll = rollStyles()

  const Head = ({ children }: any) => {
    return (
      <Typography className={classes.title} component={'h1'}>
        {children}
      </Typography>
    )
  }

  const Heading = ({ className, children }: any) => {
    return (
      <Typography
        component={'span'}
        variant={'h2'}
        className={className ?? classes.smallFont}
      >
        {children}
      </Typography>
    )
  }

  return (
    <section
      className={`${classes.root}${
        checker ? ` ${classes.detailedContainer}` : ''
      }`}
    >
      {checker ? (
        <>
          <Typography variant='h1' component={'h1'}>
            Web Accessibility Checker
          </Typography>
          <Typography variant='h5' component={'span'}>
            Check your website for accessibility issues for free
          </Typography>
        </>
      ) : null}
      <CtaSearchBar checker={checker}>
        {checker ? (
          <Head>
            <Heading>Check website for issues</Heading>
          </Head>
        ) : (
          <Head>
            <Heading>{`${strings.title} `}</Heading>
            <Heading className={roll.g}>
              {useMemo(
                () => [
                  strings.monitoring,
                  strings.fixer,
                  strings.helper,
                  strings.ai,
                  strings.productivity,
                ],
                [strings]
              ).map((item: string, itemIndex: number): any => (
                <Heading
                  // @ts-ignore
                  className={`${roll.roll} ${roll[`d${itemIndex}`]} ${
                    roll.gi
                  } ${classes.smallFont}`}
                  key={item}
                >
                  {item}
                </Heading>
              ))}
            </Heading>
          </Head>
        )}
      </CtaSearchBar>
    </section>
  )
}

export { CtaIntro }

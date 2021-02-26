/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/

import { useState } from 'react'
import { Tabs, Tab } from '@material-ui/core'

type TabPanelProps = {
  children: any
  index: any
  value: any
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props

  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`a11y-tabpanel-${index}`}
      aria-labelledby={`a11y-tab-${index}`}
      style={{ height: '100%' }}
      {...other}
    >
      {value === index && children}
    </div>
  )
}

function a11yProps(index: number) {
  return {
    id: `a11y-tab-${index}`,
    'aria-controls': `a11y-tabpanel-${index}`,
  }
}

export function WebsiteTabs({ issues, html, screenshot, playground }: any) {
  const [value, setValue] = useState<number>(0)

  const handleChange = (_: any, newValue: number) => {
    setValue(newValue)
  }

  return (
    <div style={{ height: '100%', width: '100%' }}>
      <Tabs
        value={value}
        onChange={handleChange}
        aria-label='web page tabs to compare problems and fixes'
        variant='fullWidth'
      >
        <Tab label='Insights' {...a11yProps(0)} />
        <Tab label='HTML' {...a11yProps(1)} />
        <Tab label='Screenshots' {...a11yProps(2)} />
        <Tab label='Playground' {...a11yProps(3)} />
      </Tabs>
      <TabPanel value={value} index={0}>
        {issues}
      </TabPanel>
      <TabPanel value={value} index={1}>
        {html}
      </TabPanel>
      <TabPanel value={value} index={2}>
        {screenshot}
      </TabPanel>
      <TabPanel value={value} index={3}>
        {playground}
      </TabPanel>
    </div>
  )
}

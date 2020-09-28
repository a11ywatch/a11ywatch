import React from 'react'

const dynamic = () => ({ children, ...props }) =>
  React.createElement('Dynamic', props, children)

export default dynamic

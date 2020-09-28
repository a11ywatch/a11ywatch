const logGraphErrors = (res: any) => {
  const errors = res?.graphQLErrors.map((error: any) => {
    return error?.message
  })
  console.error(errors)
}

export { logGraphErrors }

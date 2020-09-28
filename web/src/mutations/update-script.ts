import gql from 'graphql-tag'

const UPDATE_SCRIPT = gql`
  mutation UpdateScript(
    $url: String
    $scriptMeta: ScriptMetaInput
    $editScript: Boolean
    $newScript: String
  ) {
    updateScript(
      url: $url
      scriptMeta: $scriptMeta
      editScript: $editScript
      newScript: $newScript
    ) {
      code
      success
      message
      script {
        pageUrl
        domain
        script
        cdnUrl
        cdnUrlMinified
        cdnConnected
        issueMeta {
          skipContentIncluded
        }
        scriptMeta {
          skipContentEnabled
        }
      }
    }
  }
`

export { UPDATE_SCRIPT }

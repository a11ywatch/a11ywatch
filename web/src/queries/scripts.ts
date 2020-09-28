import gql from 'graphql-tag'

const GET_SCRIPTS = gql`
  query getScripts($filter: String) {
    user {
      id
      scripts(filter: $filter) {
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

const GET_SCRIPT = gql`
  query getScript($filter: String, $url: String) {
    user {
      id
      script(filter: $filter, url: $url) {
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

export { GET_SCRIPTS, GET_SCRIPT }

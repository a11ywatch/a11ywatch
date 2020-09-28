import gql from 'graphql-tag'

export const UPDATE_WEBSITE = gql`
  mutation UpdateWebsite($url: String, $customHeaders: [CreatePageHeaders]) {
    updateWebsite(url: $url, customHeaders: $customHeaders) {
      code
      success
      message
      website {
        url
        id
        domain
        htmlIncluded
        html
        pageHeaders {
          key
          value
        }
        subDomains {
          domain
          url
          issues {
            url
            code
            type
            selector
            message
            context
            pageUrl
          }
        }
        issues {
          pageUrl
          issues {
            url
            code
            type
            selector
            message
            context
            pageUrl
          }
        }
      }
    }
  }
`

import gql from 'graphql-tag'

export const ADD_WEBSITE = gql`
  mutation AddWebsite($url: String!, $customHeaders: [CreatePageHeaders]) {
    addWebsite(url: $url, customHeaders: $customHeaders) {
      website {
        url
        id
        domain
        adaScore
        cdnConnected
        html
        htmlIncluded
        lastScanDate
        pageLoadTime {
          duration
          durationFormated
          color
        }
        pageHeaders {
          key
          value
        }
        issuesInfo {
          issuesFixedByCdn
          possibleIssuesFixedByCdn
          totalIssues
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
        subDomains {
          domain
          url
          adaScore
          cdnConnected
          html
          htmlIncluded
          pageLoadTime {
            duration
            durationFormated
            color
          }
          issues {
            code
            type
            selector
            message
            context
            pageUrl
          }
        }
      }
      code
      success
      message
    }
  }
`

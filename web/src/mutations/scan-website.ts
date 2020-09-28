import gql from 'graphql-tag'

const SCAN_WEBSITE = gql`
  mutation ScanWebsite($url: String) {
    scanWebsite(url: $url) {
      code
      success
      message
      website {
        url
        domain
        adaScore
        cdnConnected
        htmlIncluded
        cdn
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
          errorCount
          warningCount
          limitedCount
        }
        script {
          script
        }
        issue {
          code
          type
          typeCode
          message
          context
          selector
          runner
        }
      }
    }
  }
`

export { SCAN_WEBSITE }

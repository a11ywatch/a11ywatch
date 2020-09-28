import gql from 'graphql-tag'

export const CRAWL_WEBSITE = gql`
  mutation CrawlWebsite($url: String) {
    crawlWebsite(url: $url) {
      code
      success
      message
      website {
        url
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
        issuesInfo {
          issuesFixedByCdn
          possibleIssuesFixedByCdn
          totalIssues
        }
      }
    }
  }
`

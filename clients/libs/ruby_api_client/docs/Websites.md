# OpenapiClient::Websites

## Properties

| Name | Type | Description | Notes |
| ---- | ---- | ----------- | ----- |
| **_id** | **Integer** |  | [optional] |
| **user_id** | **Integer** |  | [optional] |
| **url** | **String** |  | [optional] |
| **domain** | **String** |  | [optional] |
| **crawl_duration** | **Integer** |  | [optional] |
| **cdn_connected** | **Boolean** |  | [optional] |
| **page_insights** | **Boolean** |  | [optional] |
| **online** | **Boolean** |  | [optional] |
| **mobile** | **Boolean** |  | [optional] |
| **robots** | **Boolean** |  | [optional] |
| **insight** | [**WebsitesInsight**](WebsitesInsight.md) |  | [optional] |
| **page_headers** | **Array&lt;String&gt;** |  | [optional] |
| **page_load_time** | [**PageLoadTime**](PageLoadTime.md) |  | [optional] |
| **issues_info** | [**IssuesInfo**](IssuesInfo.md) |  | [optional] |

## Example

```ruby
require 'openapi_client'

instance = OpenapiClient::Websites.new(
  _id: null,
  user_id: null,
  url: null,
  domain: null,
  crawl_duration: null,
  cdn_connected: null,
  page_insights: null,
  online: null,
  mobile: null,
  robots: null,
  insight: null,
  page_headers: null,
  page_load_time: null,
  issues_info: null
)
```


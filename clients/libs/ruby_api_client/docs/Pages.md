# OpenapiClient::Pages

## Properties

| Name | Type | Description | Notes |
| ---- | ---- | ----------- | ----- |
| **_id** | **Integer** |  | [optional] |
| **user_id** | **Integer** |  | [optional] |
| **domain** | **String** |  | [optional] |
| **url** | **String** |  | [optional] |
| **cdn_connected** | **Boolean** |  | [optional] |
| **online** | **Boolean** |  | [optional] |
| **page_load_time** | [**PageLoadTime**](PageLoadTime.md) |  | [optional] |
| **insight** | [**WebsitesInsight**](WebsitesInsight.md) |  | [optional] |
| **issues_info** | [**IssuesInfo**](IssuesInfo.md) |  | [optional] |
| **last_scan_date** | **String** |  | [optional] |

## Example

```ruby
require 'openapi_client'

instance = OpenapiClient::Pages.new(
  _id: null,
  user_id: null,
  domain: null,
  url: null,
  cdn_connected: null,
  online: null,
  page_load_time: null,
  insight: null,
  issues_info: null,
  last_scan_date: null
)
```


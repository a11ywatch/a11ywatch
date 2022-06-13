# OpenapiClient::History

## Properties

| Name | Type | Description | Notes |
| ---- | ---- | ----------- | ----- |
| **_id** | **Integer** |  | [optional] |
| **domain** | **String** |  | [optional] |
| **insight** | [**WebsitesInsight**](WebsitesInsight.md) |  | [optional] |
| **page_headers** | **Array&lt;String&gt;** |  | [optional] |
| **issues_info** | [**IssuesInfo**](IssuesInfo.md) |  | [optional] |

## Example

```ruby
require 'openapi_client'

instance = OpenapiClient::History.new(
  _id: null,
  domain: null,
  insight: null,
  page_headers: null,
  issues_info: null
)
```


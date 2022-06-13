# OpenapiClient::Issues

## Properties

| Name | Type | Description | Notes |
| ---- | ---- | ----------- | ----- |
| **_id** | **Integer** |  | [optional] |
| **user_id** | **Integer** |  | [optional] |
| **domain** | **String** |  | [optional] |
| **page_url** | **String** |  | [optional] |
| **issues** | [**PageIssue**](PageIssue.md) |  | [optional] |

## Example

```ruby
require 'openapi_client'

instance = OpenapiClient::Issues.new(
  _id: null,
  user_id: null,
  domain: null,
  page_url: null,
  issues: null
)
```


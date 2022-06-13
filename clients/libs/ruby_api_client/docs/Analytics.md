# OpenapiClient::Analytics

## Properties

| Name | Type | Description | Notes |
| ---- | ---- | ----------- | ----- |
| **_id** | **Integer** |  | [optional] |
| **domain** | **String** |  | [optional] |
| **page_url** | **String** |  | [optional] |
| **user_id** | **Integer** |  | [optional] |
| **ada_score** | **Integer** |  | [optional] |
| **possible_issues_fixed_by_cdn** | **Integer** |  | [optional] |
| **total_issues** | **Integer** |  | [optional] |
| **issues_fixed_by_cdn** | **Integer** |  | [optional] |
| **error_count** | **Integer** |  | [optional] |
| **warning_count** | **Integer** |  | [optional] |
| **notice_count** | **Integer** |  | [optional] |

## Example

```ruby
require 'openapi_client'

instance = OpenapiClient::Analytics.new(
  _id: null,
  domain: null,
  page_url: null,
  user_id: null,
  ada_score: null,
  possible_issues_fixed_by_cdn: null,
  total_issues: null,
  issues_fixed_by_cdn: null,
  error_count: null,
  warning_count: null,
  notice_count: null
)
```


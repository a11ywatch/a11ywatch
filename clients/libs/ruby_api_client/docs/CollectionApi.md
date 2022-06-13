# OpenapiClient::CollectionApi

All URIs are relative to *https://api.a11ywatch.com/api*

| Method | HTTP request | Description |
| ------ | ------------ | ----------- |
| [**get_analytics**](CollectionApi.md#get_analytics) | **GET** /list/analytics | Get the analytics for a website |
| [**get_issues**](CollectionApi.md#get_issues) | **GET** /list/issue | List the issues for a website |
| [**get_pages**](CollectionApi.md#get_pages) | **GET** /list/pages | List the pages in order for a website |
| [**get_websites**](CollectionApi.md#get_websites) | **GET** /list/website | Returns websites for the user in alphabetical order |


## get_analytics

> <GetAnalytics200Response> get_analytics(opts)

Get the analytics for a website



### Examples

```ruby
require 'time'
require 'openapi_client'
# setup authorization
OpenapiClient.configure do |config|
  # Configure Bearer authorization (JWT): bearerAuth
  config.access_token = 'YOUR_BEARER_TOKEN'
end

api_instance = OpenapiClient::CollectionApi.new
opts = {
  offset: 'offset_example' # String | The page offset for the next set
}

begin
  # Get the analytics for a website
  result = api_instance.get_analytics(opts)
  p result
rescue OpenapiClient::ApiError => e
  puts "Error when calling CollectionApi->get_analytics: #{e}"
end
```

#### Using the get_analytics_with_http_info variant

This returns an Array which contains the response data, status code and headers.

> <Array(<GetAnalytics200Response>, Integer, Hash)> get_analytics_with_http_info(opts)

```ruby
begin
  # Get the analytics for a website
  data, status_code, headers = api_instance.get_analytics_with_http_info(opts)
  p status_code # => 2xx
  p headers # => { ... }
  p data # => <GetAnalytics200Response>
rescue OpenapiClient::ApiError => e
  puts "Error when calling CollectionApi->get_analytics_with_http_info: #{e}"
end
```

### Parameters

| Name | Type | Description | Notes |
| ---- | ---- | ----------- | ----- |
| **offset** | **String** | The page offset for the next set | [optional] |

### Return type

[**GetAnalytics200Response**](GetAnalytics200Response.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## get_issues

> <GetIssues200Response> get_issues(opts)

List the issues for a website



### Examples

```ruby
require 'time'
require 'openapi_client'
# setup authorization
OpenapiClient.configure do |config|
  # Configure Bearer authorization (JWT): bearerAuth
  config.access_token = 'YOUR_BEARER_TOKEN'
end

api_instance = OpenapiClient::CollectionApi.new
opts = {
  offset: 'offset_example' # String | The page offset for the next set
}

begin
  # List the issues for a website
  result = api_instance.get_issues(opts)
  p result
rescue OpenapiClient::ApiError => e
  puts "Error when calling CollectionApi->get_issues: #{e}"
end
```

#### Using the get_issues_with_http_info variant

This returns an Array which contains the response data, status code and headers.

> <Array(<GetIssues200Response>, Integer, Hash)> get_issues_with_http_info(opts)

```ruby
begin
  # List the issues for a website
  data, status_code, headers = api_instance.get_issues_with_http_info(opts)
  p status_code # => 2xx
  p headers # => { ... }
  p data # => <GetIssues200Response>
rescue OpenapiClient::ApiError => e
  puts "Error when calling CollectionApi->get_issues_with_http_info: #{e}"
end
```

### Parameters

| Name | Type | Description | Notes |
| ---- | ---- | ----------- | ----- |
| **offset** | **String** | The page offset for the next set | [optional] |

### Return type

[**GetIssues200Response**](GetIssues200Response.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## get_pages

> <GetPages200Response> get_pages(opts)

List the pages in order for a website



### Examples

```ruby
require 'time'
require 'openapi_client'
# setup authorization
OpenapiClient.configure do |config|
  # Configure Bearer authorization (JWT): bearerAuth
  config.access_token = 'YOUR_BEARER_TOKEN'
end

api_instance = OpenapiClient::CollectionApi.new
opts = {
  offset: 'offset_example' # String | The page offset for the next set
}

begin
  # List the pages in order for a website
  result = api_instance.get_pages(opts)
  p result
rescue OpenapiClient::ApiError => e
  puts "Error when calling CollectionApi->get_pages: #{e}"
end
```

#### Using the get_pages_with_http_info variant

This returns an Array which contains the response data, status code and headers.

> <Array(<GetPages200Response>, Integer, Hash)> get_pages_with_http_info(opts)

```ruby
begin
  # List the pages in order for a website
  data, status_code, headers = api_instance.get_pages_with_http_info(opts)
  p status_code # => 2xx
  p headers # => { ... }
  p data # => <GetPages200Response>
rescue OpenapiClient::ApiError => e
  puts "Error when calling CollectionApi->get_pages_with_http_info: #{e}"
end
```

### Parameters

| Name | Type | Description | Notes |
| ---- | ---- | ----------- | ----- |
| **offset** | **String** | The page offset for the next set | [optional] |

### Return type

[**GetPages200Response**](GetPages200Response.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## get_websites

> <GetWebsites200Response> get_websites(opts)

Returns websites for the user in alphabetical order

Returns a map of websites

### Examples

```ruby
require 'time'
require 'openapi_client'
# setup authorization
OpenapiClient.configure do |config|
  # Configure Bearer authorization (JWT): bearerAuth
  config.access_token = 'YOUR_BEARER_TOKEN'
end

api_instance = OpenapiClient::CollectionApi.new
opts = {
  offset: 'offset_example' # String | The page offset for the next set
}

begin
  # Returns websites for the user in alphabetical order
  result = api_instance.get_websites(opts)
  p result
rescue OpenapiClient::ApiError => e
  puts "Error when calling CollectionApi->get_websites: #{e}"
end
```

#### Using the get_websites_with_http_info variant

This returns an Array which contains the response data, status code and headers.

> <Array(<GetWebsites200Response>, Integer, Hash)> get_websites_with_http_info(opts)

```ruby
begin
  # Returns websites for the user in alphabetical order
  data, status_code, headers = api_instance.get_websites_with_http_info(opts)
  p status_code # => 2xx
  p headers # => { ... }
  p data # => <GetWebsites200Response>
rescue OpenapiClient::ApiError => e
  puts "Error when calling CollectionApi->get_websites_with_http_info: #{e}"
end
```

### Parameters

| Name | Type | Description | Notes |
| ---- | ---- | ----------- | ----- |
| **offset** | **String** | The page offset for the next set | [optional] |

### Return type

[**GetWebsites200Response**](GetWebsites200Response.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


# OpenapiClient::ReportsApi

All URIs are relative to *https://api.a11ywatch.com/api*

| Method | HTTP request | Description |
| ------ | ------------ | ----------- |
| [**crawl_website**](ReportsApi.md#crawl_website) | **POST** /crawl | Multi-page crawl a website for issues |
| [**crawl_website_stream**](ReportsApi.md#crawl_website_stream) | **POST** /crawl-stream | Multi-page crawl a website streaming issues on found |
| [**get_report**](ReportsApi.md#get_report) | **GET** /report | Get the report from a previus scan |
| [**scan_website**](ReportsApi.md#scan_website) | **POST** /scan-simple | Scan a website for issues |


## crawl_website

> <CrawlWebsite200Response> crawl_website(website_input)

Multi-page crawl a website for issues



### Examples

```ruby
require 'time'
require 'openapi_client'
# setup authorization
OpenapiClient.configure do |config|
  # Configure Bearer authorization (JWT): bearerAuth
  config.access_token = 'YOUR_BEARER_TOKEN'
end

api_instance = OpenapiClient::ReportsApi.new
website_input = OpenapiClient::WebsiteInput.new # WebsiteInput | The website standard body

begin
  # Multi-page crawl a website for issues
  result = api_instance.crawl_website(website_input)
  p result
rescue OpenapiClient::ApiError => e
  puts "Error when calling ReportsApi->crawl_website: #{e}"
end
```

#### Using the crawl_website_with_http_info variant

This returns an Array which contains the response data, status code and headers.

> <Array(<CrawlWebsite200Response>, Integer, Hash)> crawl_website_with_http_info(website_input)

```ruby
begin
  # Multi-page crawl a website for issues
  data, status_code, headers = api_instance.crawl_website_with_http_info(website_input)
  p status_code # => 2xx
  p headers # => { ... }
  p data # => <CrawlWebsite200Response>
rescue OpenapiClient::ApiError => e
  puts "Error when calling ReportsApi->crawl_website_with_http_info: #{e}"
end
```

### Parameters

| Name | Type | Description | Notes |
| ---- | ---- | ----------- | ----- |
| **website_input** | [**WebsiteInput**](WebsiteInput.md) | The website standard body |  |

### Return type

[**CrawlWebsite200Response**](CrawlWebsite200Response.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json


## crawl_website_stream

> <CrawlWebsite200Response> crawl_website_stream(transfer_encoding, website_input)

Multi-page crawl a website streaming issues on found



### Examples

```ruby
require 'time'
require 'openapi_client'
# setup authorization
OpenapiClient.configure do |config|
  # Configure Bearer authorization (JWT): bearerAuth
  config.access_token = 'YOUR_BEARER_TOKEN'
end

api_instance = OpenapiClient::ReportsApi.new
transfer_encoding = 'transfer_encoding_example' # String | 
website_input = OpenapiClient::WebsiteInput.new # WebsiteInput | The website standard body

begin
  # Multi-page crawl a website streaming issues on found
  result = api_instance.crawl_website_stream(transfer_encoding, website_input)
  p result
rescue OpenapiClient::ApiError => e
  puts "Error when calling ReportsApi->crawl_website_stream: #{e}"
end
```

#### Using the crawl_website_stream_with_http_info variant

This returns an Array which contains the response data, status code and headers.

> <Array(<CrawlWebsite200Response>, Integer, Hash)> crawl_website_stream_with_http_info(transfer_encoding, website_input)

```ruby
begin
  # Multi-page crawl a website streaming issues on found
  data, status_code, headers = api_instance.crawl_website_stream_with_http_info(transfer_encoding, website_input)
  p status_code # => 2xx
  p headers # => { ... }
  p data # => <CrawlWebsite200Response>
rescue OpenapiClient::ApiError => e
  puts "Error when calling ReportsApi->crawl_website_stream_with_http_info: #{e}"
end
```

### Parameters

| Name | Type | Description | Notes |
| ---- | ---- | ----------- | ----- |
| **transfer_encoding** | **String** |  | [default to &#39;Chunked&#39;] |
| **website_input** | [**WebsiteInput**](WebsiteInput.md) | The website standard body |  |

### Return type

[**CrawlWebsite200Response**](CrawlWebsite200Response.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json


## get_report

> <CrawlWebsite200Response> get_report(opts)

Get the report from a previus scan



### Examples

```ruby
require 'time'
require 'openapi_client'
# setup authorization
OpenapiClient.configure do |config|
  # Configure Bearer authorization (JWT): bearerAuth
  config.access_token = 'YOUR_BEARER_TOKEN'
end

api_instance = OpenapiClient::ReportsApi.new
opts = {
  url: 'url_example' # String | The page url or domain for the report
}

begin
  # Get the report from a previus scan
  result = api_instance.get_report(opts)
  p result
rescue OpenapiClient::ApiError => e
  puts "Error when calling ReportsApi->get_report: #{e}"
end
```

#### Using the get_report_with_http_info variant

This returns an Array which contains the response data, status code and headers.

> <Array(<CrawlWebsite200Response>, Integer, Hash)> get_report_with_http_info(opts)

```ruby
begin
  # Get the report from a previus scan
  data, status_code, headers = api_instance.get_report_with_http_info(opts)
  p status_code # => 2xx
  p headers # => { ... }
  p data # => <CrawlWebsite200Response>
rescue OpenapiClient::ApiError => e
  puts "Error when calling ReportsApi->get_report_with_http_info: #{e}"
end
```

### Parameters

| Name | Type | Description | Notes |
| ---- | ---- | ----------- | ----- |
| **url** | **String** | The page url or domain for the report | [optional] |

### Return type

[**CrawlWebsite200Response**](CrawlWebsite200Response.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## scan_website

> <ScanWebsite200Response> scan_website(website_input)

Scan a website for issues



### Examples

```ruby
require 'time'
require 'openapi_client'
# setup authorization
OpenapiClient.configure do |config|
  # Configure Bearer authorization (JWT): bearerAuth
  config.access_token = 'YOUR_BEARER_TOKEN'
end

api_instance = OpenapiClient::ReportsApi.new
website_input = OpenapiClient::WebsiteInput.new # WebsiteInput | The website standard body

begin
  # Scan a website for issues
  result = api_instance.scan_website(website_input)
  p result
rescue OpenapiClient::ApiError => e
  puts "Error when calling ReportsApi->scan_website: #{e}"
end
```

#### Using the scan_website_with_http_info variant

This returns an Array which contains the response data, status code and headers.

> <Array(<ScanWebsite200Response>, Integer, Hash)> scan_website_with_http_info(website_input)

```ruby
begin
  # Scan a website for issues
  data, status_code, headers = api_instance.scan_website_with_http_info(website_input)
  p status_code # => 2xx
  p headers # => { ... }
  p data # => <ScanWebsite200Response>
rescue OpenapiClient::ApiError => e
  puts "Error when calling ReportsApi->scan_website_with_http_info: #{e}"
end
```

### Parameters

| Name | Type | Description | Notes |
| ---- | ---- | ----------- | ----- |
| **website_input** | [**WebsiteInput**](WebsiteInput.md) | The website standard body |  |

### Return type

[**ScanWebsite200Response**](ScanWebsite200Response.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json


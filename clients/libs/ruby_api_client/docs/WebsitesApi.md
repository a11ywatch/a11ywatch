# OpenapiClient::WebsitesApi

All URIs are relative to *https://api.a11ywatch.com/api*

| Method | HTTP request | Description |
| ------ | ------------ | ----------- |
| [**add_website**](WebsitesApi.md#add_website) | **POST** /website | Add a website in the collection with form data |
| [**delete_website**](WebsitesApi.md#delete_website) | **DELETE** /website | Deletes a website |
| [**get_website_by_domain**](WebsitesApi.md#get_website_by_domain) | **GET** /website | Find website by Domain |


## add_website

> <GetWebsiteByDomain200Response> add_website(website_input)

Add a website in the collection with form data



### Examples

```ruby
require 'time'
require 'openapi_client'
# setup authorization
OpenapiClient.configure do |config|
  # Configure Bearer authorization (JWT): bearerAuth
  config.access_token = 'YOUR_BEARER_TOKEN'
end

api_instance = OpenapiClient::WebsitesApi.new
website_input = OpenapiClient::WebsiteInput.new # WebsiteInput | The website standard body

begin
  # Add a website in the collection with form data
  result = api_instance.add_website(website_input)
  p result
rescue OpenapiClient::ApiError => e
  puts "Error when calling WebsitesApi->add_website: #{e}"
end
```

#### Using the add_website_with_http_info variant

This returns an Array which contains the response data, status code and headers.

> <Array(<GetWebsiteByDomain200Response>, Integer, Hash)> add_website_with_http_info(website_input)

```ruby
begin
  # Add a website in the collection with form data
  data, status_code, headers = api_instance.add_website_with_http_info(website_input)
  p status_code # => 2xx
  p headers # => { ... }
  p data # => <GetWebsiteByDomain200Response>
rescue OpenapiClient::ApiError => e
  puts "Error when calling WebsitesApi->add_website_with_http_info: #{e}"
end
```

### Parameters

| Name | Type | Description | Notes |
| ---- | ---- | ----------- | ----- |
| **website_input** | [**WebsiteInput**](WebsiteInput.md) | The website standard body |  |

### Return type

[**GetWebsiteByDomain200Response**](GetWebsiteByDomain200Response.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json


## delete_website

> <GetWebsiteByDomain200Response> delete_website(domain)

Deletes a website



### Examples

```ruby
require 'time'
require 'openapi_client'
# setup authorization
OpenapiClient.configure do |config|
  # Configure Bearer authorization (JWT): bearerAuth
  config.access_token = 'YOUR_BEARER_TOKEN'
end

api_instance = OpenapiClient::WebsitesApi.new
domain = 'domain_example' # String | Websites domain to delete

begin
  # Deletes a website
  result = api_instance.delete_website(domain)
  p result
rescue OpenapiClient::ApiError => e
  puts "Error when calling WebsitesApi->delete_website: #{e}"
end
```

#### Using the delete_website_with_http_info variant

This returns an Array which contains the response data, status code and headers.

> <Array(<GetWebsiteByDomain200Response>, Integer, Hash)> delete_website_with_http_info(domain)

```ruby
begin
  # Deletes a website
  data, status_code, headers = api_instance.delete_website_with_http_info(domain)
  p status_code # => 2xx
  p headers # => { ... }
  p data # => <GetWebsiteByDomain200Response>
rescue OpenapiClient::ApiError => e
  puts "Error when calling WebsitesApi->delete_website_with_http_info: #{e}"
end
```

### Parameters

| Name | Type | Description | Notes |
| ---- | ---- | ----------- | ----- |
| **domain** | **String** | Websites domain to delete |  |

### Return type

[**GetWebsiteByDomain200Response**](GetWebsiteByDomain200Response.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## get_website_by_domain

> <GetWebsiteByDomain200Response> get_website_by_domain(domain)

Find website by Domain

Returns a website when DOMAIN == website.domain.  Empty strings will simulate API error conditions

### Examples

```ruby
require 'time'
require 'openapi_client'
# setup authorization
OpenapiClient.configure do |config|
  # Configure Bearer authorization (JWT): bearerAuth
  config.access_token = 'YOUR_BEARER_TOKEN'
end

api_instance = OpenapiClient::WebsitesApi.new
domain = 'domain_example' # String | Domain of website that needs to be fetched

begin
  # Find website by Domain
  result = api_instance.get_website_by_domain(domain)
  p result
rescue OpenapiClient::ApiError => e
  puts "Error when calling WebsitesApi->get_website_by_domain: #{e}"
end
```

#### Using the get_website_by_domain_with_http_info variant

This returns an Array which contains the response data, status code and headers.

> <Array(<GetWebsiteByDomain200Response>, Integer, Hash)> get_website_by_domain_with_http_info(domain)

```ruby
begin
  # Find website by Domain
  data, status_code, headers = api_instance.get_website_by_domain_with_http_info(domain)
  p status_code # => 2xx
  p headers # => { ... }
  p data # => <GetWebsiteByDomain200Response>
rescue OpenapiClient::ApiError => e
  puts "Error when calling WebsitesApi->get_website_by_domain_with_http_info: #{e}"
end
```

### Parameters

| Name | Type | Description | Notes |
| ---- | ---- | ----------- | ----- |
| **domain** | **String** | Domain of website that needs to be fetched |  |

### Return type

[**GetWebsiteByDomain200Response**](GetWebsiteByDomain200Response.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


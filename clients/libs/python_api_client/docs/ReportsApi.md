# openapi_client.ReportsApi

All URIs are relative to *https://api.a11ywatch.com/api*

Method | HTTP request | Description
------------- | ------------- | -------------
[**crawl_website**](ReportsApi.md#crawl_website) | **POST** /crawl | Multi-page crawl a website for issues
[**crawl_website_stream**](ReportsApi.md#crawl_website_stream) | **POST** /crawl-stream | Multi-page crawl a website streaming issues on found
[**get_report**](ReportsApi.md#get_report) | **GET** /report | Get the report from a previus scan
[**scan_website**](ReportsApi.md#scan_website) | **POST** /scan-simple | Scan a website for issues


# **crawl_website**
> CrawlWebsite200Response crawl_website(website_input)

Multi-page crawl a website for issues



### Example

* Bearer (JWT) Authentication (bearerAuth):

```python
import time
import openapi_client
from openapi_client.api import reports_api
from openapi_client.model.crawl_website200_response import CrawlWebsite200Response
from openapi_client.model.website_input import WebsiteInput
from pprint import pprint
# Defining the host is optional and defaults to https://api.a11ywatch.com/api
# See configuration.py for a list of all supported configuration parameters.
configuration = openapi_client.Configuration(
    host = "https://api.a11ywatch.com/api"
)

# The client must configure the authentication and authorization parameters
# in accordance with the API server security policy.
# Examples for each auth method are provided below, use the example that
# satisfies your auth use case.

# Configure Bearer authorization (JWT): bearerAuth
configuration = openapi_client.Configuration(
    access_token = 'YOUR_BEARER_TOKEN'
)

# Enter a context with an instance of the API client
with openapi_client.ApiClient(configuration) as api_client:
    # Create an instance of the API class
    api_instance = reports_api.ReportsApi(api_client)
    website_input = WebsiteInput(
        domain="domain_example",
    ) # WebsiteInput | The website standard body

    # example passing only required values which don't have defaults set
    try:
        # Multi-page crawl a website for issues
        api_response = api_instance.crawl_website(website_input)
        pprint(api_response)
    except openapi_client.ApiException as e:
        print("Exception when calling ReportsApi->crawl_website: %s\n" % e)
```


### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **website_input** | [**WebsiteInput**](WebsiteInput.md)| The website standard body |

### Return type

[**CrawlWebsite200Response**](CrawlWebsite200Response.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


### HTTP response details

| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | successful operation |  -  |
**405** | Invalid input |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **crawl_website_stream**
> CrawlWebsite200Response crawl_website_stream(website_input)

Multi-page crawl a website streaming issues on found



### Example

* Bearer (JWT) Authentication (bearerAuth):

```python
import time
import openapi_client
from openapi_client.api import reports_api
from openapi_client.model.crawl_website200_response import CrawlWebsite200Response
from openapi_client.model.website_input import WebsiteInput
from pprint import pprint
# Defining the host is optional and defaults to https://api.a11ywatch.com/api
# See configuration.py for a list of all supported configuration parameters.
configuration = openapi_client.Configuration(
    host = "https://api.a11ywatch.com/api"
)

# The client must configure the authentication and authorization parameters
# in accordance with the API server security policy.
# Examples for each auth method are provided below, use the example that
# satisfies your auth use case.

# Configure Bearer authorization (JWT): bearerAuth
configuration = openapi_client.Configuration(
    access_token = 'YOUR_BEARER_TOKEN'
)

# Enter a context with an instance of the API client
with openapi_client.ApiClient(configuration) as api_client:
    # Create an instance of the API class
    api_instance = reports_api.ReportsApi(api_client)
    website_input = WebsiteInput(
        domain="domain_example",
    ) # WebsiteInput | The website standard body

    # example passing only required values which don't have defaults set
    try:
        # Multi-page crawl a website streaming issues on found
        api_response = api_instance.crawl_website_stream(website_input)
        pprint(api_response)
    except openapi_client.ApiException as e:
        print("Exception when calling ReportsApi->crawl_website_stream: %s\n" % e)
```


### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **website_input** | [**WebsiteInput**](WebsiteInput.md)| The website standard body |
 **transfer_encoding** | **str**|  | defaults to "Chunked"

### Return type

[**CrawlWebsite200Response**](CrawlWebsite200Response.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


### HTTP response details

| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | successful operation |  -  |
**405** | Invalid input |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **get_report**
> CrawlWebsite200Response get_report()

Get the report from a previus scan



### Example

* Bearer (JWT) Authentication (bearerAuth):

```python
import time
import openapi_client
from openapi_client.api import reports_api
from openapi_client.model.crawl_website200_response import CrawlWebsite200Response
from pprint import pprint
# Defining the host is optional and defaults to https://api.a11ywatch.com/api
# See configuration.py for a list of all supported configuration parameters.
configuration = openapi_client.Configuration(
    host = "https://api.a11ywatch.com/api"
)

# The client must configure the authentication and authorization parameters
# in accordance with the API server security policy.
# Examples for each auth method are provided below, use the example that
# satisfies your auth use case.

# Configure Bearer authorization (JWT): bearerAuth
configuration = openapi_client.Configuration(
    access_token = 'YOUR_BEARER_TOKEN'
)

# Enter a context with an instance of the API client
with openapi_client.ApiClient(configuration) as api_client:
    # Create an instance of the API class
    api_instance = reports_api.ReportsApi(api_client)
    url = "url_example" # str | The page url or domain for the report (optional)

    # example passing only required values which don't have defaults set
    # and optional values
    try:
        # Get the report from a previus scan
        api_response = api_instance.get_report(url=url)
        pprint(api_response)
    except openapi_client.ApiException as e:
        print("Exception when calling ReportsApi->get_report: %s\n" % e)
```


### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **url** | **str**| The page url or domain for the report | [optional]

### Return type

[**CrawlWebsite200Response**](CrawlWebsite200Response.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details

| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | successful operation |  -  |
**405** | Invalid input |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **scan_website**
> ScanWebsite200Response scan_website(website_input)

Scan a website for issues



### Example

* Bearer (JWT) Authentication (bearerAuth):

```python
import time
import openapi_client
from openapi_client.api import reports_api
from openapi_client.model.scan_website200_response import ScanWebsite200Response
from openapi_client.model.website_input import WebsiteInput
from pprint import pprint
# Defining the host is optional and defaults to https://api.a11ywatch.com/api
# See configuration.py for a list of all supported configuration parameters.
configuration = openapi_client.Configuration(
    host = "https://api.a11ywatch.com/api"
)

# The client must configure the authentication and authorization parameters
# in accordance with the API server security policy.
# Examples for each auth method are provided below, use the example that
# satisfies your auth use case.

# Configure Bearer authorization (JWT): bearerAuth
configuration = openapi_client.Configuration(
    access_token = 'YOUR_BEARER_TOKEN'
)

# Enter a context with an instance of the API client
with openapi_client.ApiClient(configuration) as api_client:
    # Create an instance of the API class
    api_instance = reports_api.ReportsApi(api_client)
    website_input = WebsiteInput(
        domain="domain_example",
    ) # WebsiteInput | The website standard body

    # example passing only required values which don't have defaults set
    try:
        # Scan a website for issues
        api_response = api_instance.scan_website(website_input)
        pprint(api_response)
    except openapi_client.ApiException as e:
        print("Exception when calling ReportsApi->scan_website: %s\n" % e)
```


### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **website_input** | [**WebsiteInput**](WebsiteInput.md)| The website standard body |

### Return type

[**ScanWebsite200Response**](ScanWebsite200Response.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


### HTTP response details

| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | successful operation |  -  |
**405** | Invalid input |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)


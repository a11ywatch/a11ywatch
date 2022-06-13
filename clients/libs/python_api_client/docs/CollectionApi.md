# openapi_client.CollectionApi

All URIs are relative to *https://api.a11ywatch.com/api*

Method | HTTP request | Description
------------- | ------------- | -------------
[**get_analytics**](CollectionApi.md#get_analytics) | **GET** /list/analytics | Get the analytics for a website
[**get_issues**](CollectionApi.md#get_issues) | **GET** /list/issue | List the issues for a website
[**get_pages**](CollectionApi.md#get_pages) | **GET** /list/pages | List the pages in order for a website
[**get_websites**](CollectionApi.md#get_websites) | **GET** /list/website | Returns websites for the user in alphabetical order


# **get_analytics**
> GetAnalytics200Response get_analytics()

Get the analytics for a website



### Example

* Bearer (JWT) Authentication (bearerAuth):

```python
import time
import openapi_client
from openapi_client.api import collection_api
from openapi_client.model.get_analytics200_response import GetAnalytics200Response
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
    api_instance = collection_api.CollectionApi(api_client)
    offset = "offset_example" # str | The page offset for the next set (optional)

    # example passing only required values which don't have defaults set
    # and optional values
    try:
        # Get the analytics for a website
        api_response = api_instance.get_analytics(offset=offset)
        pprint(api_response)
    except openapi_client.ApiException as e:
        print("Exception when calling CollectionApi->get_analytics: %s\n" % e)
```


### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **offset** | **str**| The page offset for the next set | [optional]

### Return type

[**GetAnalytics200Response**](GetAnalytics200Response.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details

| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | successful operation |  -  |
**400** | Invalid Analytics |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **get_issues**
> GetIssues200Response get_issues()

List the issues for a website



### Example

* Bearer (JWT) Authentication (bearerAuth):

```python
import time
import openapi_client
from openapi_client.api import collection_api
from openapi_client.model.get_issues200_response import GetIssues200Response
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
    api_instance = collection_api.CollectionApi(api_client)
    offset = "offset_example" # str | The page offset for the next set (optional)

    # example passing only required values which don't have defaults set
    # and optional values
    try:
        # List the issues for a website
        api_response = api_instance.get_issues(offset=offset)
        pprint(api_response)
    except openapi_client.ApiException as e:
        print("Exception when calling CollectionApi->get_issues: %s\n" % e)
```


### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **offset** | **str**| The page offset for the next set | [optional]

### Return type

[**GetIssues200Response**](GetIssues200Response.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details

| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | successful operation |  -  |
**400** | Invalid Issues |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **get_pages**
> GetPages200Response get_pages()

List the pages in order for a website



### Example

* Bearer (JWT) Authentication (bearerAuth):

```python
import time
import openapi_client
from openapi_client.api import collection_api
from openapi_client.model.get_pages200_response import GetPages200Response
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
    api_instance = collection_api.CollectionApi(api_client)
    offset = "offset_example" # str | The page offset for the next set (optional)

    # example passing only required values which don't have defaults set
    # and optional values
    try:
        # List the pages in order for a website
        api_response = api_instance.get_pages(offset=offset)
        pprint(api_response)
    except openapi_client.ApiException as e:
        print("Exception when calling CollectionApi->get_pages: %s\n" % e)
```


### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **offset** | **str**| The page offset for the next set | [optional]

### Return type

[**GetPages200Response**](GetPages200Response.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details

| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | successful operation |  -  |
**400** | Invalid Pages |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **get_websites**
> GetWebsites200Response get_websites()

Returns websites for the user in alphabetical order

Returns a map of websites

### Example

* Bearer (JWT) Authentication (bearerAuth):

```python
import time
import openapi_client
from openapi_client.api import collection_api
from openapi_client.model.get_websites200_response import GetWebsites200Response
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
    api_instance = collection_api.CollectionApi(api_client)
    offset = "offset_example" # str | The page offset for the next set (optional)

    # example passing only required values which don't have defaults set
    # and optional values
    try:
        # Returns websites for the user in alphabetical order
        api_response = api_instance.get_websites(offset=offset)
        pprint(api_response)
    except openapi_client.ApiException as e:
        print("Exception when calling CollectionApi->get_websites: %s\n" % e)
```


### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **offset** | **str**| The page offset for the next set | [optional]

### Return type

[**GetWebsites200Response**](GetWebsites200Response.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details

| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | successful operation |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)


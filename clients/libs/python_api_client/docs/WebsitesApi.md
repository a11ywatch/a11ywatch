# openapi_client.WebsitesApi

All URIs are relative to *https://api.a11ywatch.com/api*

Method | HTTP request | Description
------------- | ------------- | -------------
[**add_website**](WebsitesApi.md#add_website) | **POST** /website | Add a website in the collection with form data
[**delete_website**](WebsitesApi.md#delete_website) | **DELETE** /website | Deletes a website
[**get_website_by_domain**](WebsitesApi.md#get_website_by_domain) | **GET** /website | Find website by Domain


# **add_website**
> GetWebsiteByDomain200Response add_website(website_input)

Add a website in the collection with form data



### Example

* Bearer (JWT) Authentication (bearerAuth):

```python
import time
import openapi_client
from openapi_client.api import websites_api
from openapi_client.model.website_input import WebsiteInput
from openapi_client.model.get_website_by_domain200_response import GetWebsiteByDomain200Response
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
    api_instance = websites_api.WebsitesApi(api_client)
    website_input = WebsiteInput(
        domain="domain_example",
    ) # WebsiteInput | The website standard body

    # example passing only required values which don't have defaults set
    try:
        # Add a website in the collection with form data
        api_response = api_instance.add_website(website_input)
        pprint(api_response)
    except openapi_client.ApiException as e:
        print("Exception when calling WebsitesApi->add_website: %s\n" % e)
```


### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **website_input** | [**WebsiteInput**](WebsiteInput.md)| The website standard body |

### Return type

[**GetWebsiteByDomain200Response**](GetWebsiteByDomain200Response.md)

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

# **delete_website**
> GetWebsiteByDomain200Response delete_website(domain)

Deletes a website



### Example

* Bearer (JWT) Authentication (bearerAuth):

```python
import time
import openapi_client
from openapi_client.api import websites_api
from openapi_client.model.get_website_by_domain200_response import GetWebsiteByDomain200Response
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
    api_instance = websites_api.WebsitesApi(api_client)
    domain = "domain_example" # str | Websites domain to delete

    # example passing only required values which don't have defaults set
    try:
        # Deletes a website
        api_response = api_instance.delete_website(domain)
        pprint(api_response)
    except openapi_client.ApiException as e:
        print("Exception when calling WebsitesApi->delete_website: %s\n" % e)
```


### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **domain** | **str**| Websites domain to delete |

### Return type

[**GetWebsiteByDomain200Response**](GetWebsiteByDomain200Response.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details

| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | successful operation |  -  |
**400** | Invalid website value |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **get_website_by_domain**
> GetWebsiteByDomain200Response get_website_by_domain(domain)

Find website by Domain

Returns a website when DOMAIN == website.domain.  Empty strings will simulate API error conditions

### Example

* Bearer (JWT) Authentication (bearerAuth):

```python
import time
import openapi_client
from openapi_client.api import websites_api
from openapi_client.model.get_website_by_domain200_response import GetWebsiteByDomain200Response
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
    api_instance = websites_api.WebsitesApi(api_client)
    domain = "domain_example" # str | Domain of website that needs to be fetched

    # example passing only required values which don't have defaults set
    try:
        # Find website by Domain
        api_response = api_instance.get_website_by_domain(domain)
        pprint(api_response)
    except openapi_client.ApiException as e:
        print("Exception when calling WebsitesApi->get_website_by_domain: %s\n" % e)
```


### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **domain** | **str**| Domain of website that needs to be fetched |

### Return type

[**GetWebsiteByDomain200Response**](GetWebsiteByDomain200Response.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details

| Status code | Description | Response headers |
|-------------|-------------|------------------|
**404** | Websites not found |  -  |
**200** | successful operation |  -  |
**400** | Invalid domain supplied |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)


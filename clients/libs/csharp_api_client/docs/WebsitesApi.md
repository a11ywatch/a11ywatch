# Org.OpenAPITools.Api.WebsitesApi

All URIs are relative to *https://api.a11ywatch.com/api*

Method | HTTP request | Description
------------- | ------------- | -------------
[**AddWebsite**](WebsitesApi.md#addwebsite) | **POST** /website | Add a website in the collection with form data
[**DeleteWebsite**](WebsitesApi.md#deletewebsite) | **DELETE** /website | Deletes a website
[**GetWebsiteByDomain**](WebsitesApi.md#getwebsitebydomain) | **GET** /website | Find website by Domain



## AddWebsite

> GetWebsiteByDomain200Response AddWebsite (WebsiteInput websiteInput)

Add a website in the collection with form data

### Example

```csharp
using System.Collections.Generic;
using System.Diagnostics;
using Org.OpenAPITools.Api;
using Org.OpenAPITools.Client;
using Org.OpenAPITools.Model;

namespace Example
{
    public class AddWebsiteExample
    {
        public static void Main()
        {
            Configuration.Default.BasePath = "https://api.a11ywatch.com/api";
            // Configure HTTP bearer authorization: bearerAuth
            Configuration.Default.AccessToken = "YOUR_ACCESS_TOKEN";

            var apiInstance = new WebsitesApi(Configuration.Default);
            var websiteInput = new WebsiteInput(); // WebsiteInput | The website standard body

            try
            {
                // Add a website in the collection with form data
                GetWebsiteByDomain200Response result = apiInstance.AddWebsite(websiteInput);
                Debug.WriteLine(result);
            }
            catch (ApiException e)
            {
                Debug.Print("Exception when calling WebsitesApi.AddWebsite: " + e.Message );
                Debug.Print("Status Code: "+ e.ErrorCode);
                Debug.Print(e.StackTrace);
            }
        }
    }
}
```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **websiteInput** | [**WebsiteInput**](WebsiteInput.md)| The website standard body | 

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
| **200** | successful operation |  -  |
| **405** | Invalid input |  -  |

[[Back to top]](#)
[[Back to API list]](../README.md#documentation-for-api-endpoints)
[[Back to Model list]](../README.md#documentation-for-models)
[[Back to README]](../README.md)


## DeleteWebsite

> GetWebsiteByDomain200Response DeleteWebsite (string domain)

Deletes a website

### Example

```csharp
using System.Collections.Generic;
using System.Diagnostics;
using Org.OpenAPITools.Api;
using Org.OpenAPITools.Client;
using Org.OpenAPITools.Model;

namespace Example
{
    public class DeleteWebsiteExample
    {
        public static void Main()
        {
            Configuration.Default.BasePath = "https://api.a11ywatch.com/api";
            // Configure HTTP bearer authorization: bearerAuth
            Configuration.Default.AccessToken = "YOUR_ACCESS_TOKEN";

            var apiInstance = new WebsitesApi(Configuration.Default);
            var domain = "domain_example";  // string | Websites domain to delete

            try
            {
                // Deletes a website
                GetWebsiteByDomain200Response result = apiInstance.DeleteWebsite(domain);
                Debug.WriteLine(result);
            }
            catch (ApiException e)
            {
                Debug.Print("Exception when calling WebsitesApi.DeleteWebsite: " + e.Message );
                Debug.Print("Status Code: "+ e.ErrorCode);
                Debug.Print(e.StackTrace);
            }
        }
    }
}
```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **domain** | **string**| Websites domain to delete | 

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
| **200** | successful operation |  -  |
| **400** | Invalid website value |  -  |

[[Back to top]](#)
[[Back to API list]](../README.md#documentation-for-api-endpoints)
[[Back to Model list]](../README.md#documentation-for-models)
[[Back to README]](../README.md)


## GetWebsiteByDomain

> GetWebsiteByDomain200Response GetWebsiteByDomain (string domain)

Find website by Domain

Returns a website when DOMAIN == website.domain.  Empty strings will simulate API error conditions

### Example

```csharp
using System.Collections.Generic;
using System.Diagnostics;
using Org.OpenAPITools.Api;
using Org.OpenAPITools.Client;
using Org.OpenAPITools.Model;

namespace Example
{
    public class GetWebsiteByDomainExample
    {
        public static void Main()
        {
            Configuration.Default.BasePath = "https://api.a11ywatch.com/api";
            // Configure HTTP bearer authorization: bearerAuth
            Configuration.Default.AccessToken = "YOUR_ACCESS_TOKEN";

            var apiInstance = new WebsitesApi(Configuration.Default);
            var domain = "domain_example";  // string | Domain of website that needs to be fetched

            try
            {
                // Find website by Domain
                GetWebsiteByDomain200Response result = apiInstance.GetWebsiteByDomain(domain);
                Debug.WriteLine(result);
            }
            catch (ApiException e)
            {
                Debug.Print("Exception when calling WebsitesApi.GetWebsiteByDomain: " + e.Message );
                Debug.Print("Status Code: "+ e.ErrorCode);
                Debug.Print(e.StackTrace);
            }
        }
    }
}
```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **domain** | **string**| Domain of website that needs to be fetched | 

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
| **404** | Websites not found |  -  |
| **200** | successful operation |  -  |
| **400** | Invalid domain supplied |  -  |

[[Back to top]](#)
[[Back to API list]](../README.md#documentation-for-api-endpoints)
[[Back to Model list]](../README.md#documentation-for-models)
[[Back to README]](../README.md)


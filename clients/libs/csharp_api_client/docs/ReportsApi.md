# Org.OpenAPITools.Api.ReportsApi

All URIs are relative to *https://api.a11ywatch.com/api*

Method | HTTP request | Description
------------- | ------------- | -------------
[**CrawlWebsite**](ReportsApi.md#crawlwebsite) | **POST** /crawl | Multi-page crawl a website for issues
[**CrawlWebsiteStream**](ReportsApi.md#crawlwebsitestream) | **POST** /crawl-stream | Multi-page crawl a website streaming issues on found
[**GetReport**](ReportsApi.md#getreport) | **GET** /report | Get the report from a previus scan
[**ScanWebsite**](ReportsApi.md#scanwebsite) | **POST** /scan-simple | Scan a website for issues



## CrawlWebsite

> CrawlWebsite200Response CrawlWebsite (WebsiteInput websiteInput)

Multi-page crawl a website for issues

### Example

```csharp
using System.Collections.Generic;
using System.Diagnostics;
using Org.OpenAPITools.Api;
using Org.OpenAPITools.Client;
using Org.OpenAPITools.Model;

namespace Example
{
    public class CrawlWebsiteExample
    {
        public static void Main()
        {
            Configuration.Default.BasePath = "https://api.a11ywatch.com/api";
            // Configure HTTP bearer authorization: bearerAuth
            Configuration.Default.AccessToken = "YOUR_ACCESS_TOKEN";

            var apiInstance = new ReportsApi(Configuration.Default);
            var websiteInput = new WebsiteInput(); // WebsiteInput | The website standard body

            try
            {
                // Multi-page crawl a website for issues
                CrawlWebsite200Response result = apiInstance.CrawlWebsite(websiteInput);
                Debug.WriteLine(result);
            }
            catch (ApiException e)
            {
                Debug.Print("Exception when calling ReportsApi.CrawlWebsite: " + e.Message );
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

[**CrawlWebsite200Response**](CrawlWebsite200Response.md)

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


## CrawlWebsiteStream

> CrawlWebsite200Response CrawlWebsiteStream (string transferEncoding, WebsiteInput websiteInput)

Multi-page crawl a website streaming issues on found

### Example

```csharp
using System.Collections.Generic;
using System.Diagnostics;
using Org.OpenAPITools.Api;
using Org.OpenAPITools.Client;
using Org.OpenAPITools.Model;

namespace Example
{
    public class CrawlWebsiteStreamExample
    {
        public static void Main()
        {
            Configuration.Default.BasePath = "https://api.a11ywatch.com/api";
            // Configure HTTP bearer authorization: bearerAuth
            Configuration.Default.AccessToken = "YOUR_ACCESS_TOKEN";

            var apiInstance = new ReportsApi(Configuration.Default);
            var transferEncoding = "\"Chunked\"";  // string |  (default to "Chunked")
            var websiteInput = new WebsiteInput(); // WebsiteInput | The website standard body

            try
            {
                // Multi-page crawl a website streaming issues on found
                CrawlWebsite200Response result = apiInstance.CrawlWebsiteStream(transferEncoding, websiteInput);
                Debug.WriteLine(result);
            }
            catch (ApiException e)
            {
                Debug.Print("Exception when calling ReportsApi.CrawlWebsiteStream: " + e.Message );
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
 **transferEncoding** | **string**|  | [default to &quot;Chunked&quot;]
 **websiteInput** | [**WebsiteInput**](WebsiteInput.md)| The website standard body | 

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
| **200** | successful operation |  -  |
| **405** | Invalid input |  -  |

[[Back to top]](#)
[[Back to API list]](../README.md#documentation-for-api-endpoints)
[[Back to Model list]](../README.md#documentation-for-models)
[[Back to README]](../README.md)


## GetReport

> CrawlWebsite200Response GetReport (string url = null)

Get the report from a previus scan

### Example

```csharp
using System.Collections.Generic;
using System.Diagnostics;
using Org.OpenAPITools.Api;
using Org.OpenAPITools.Client;
using Org.OpenAPITools.Model;

namespace Example
{
    public class GetReportExample
    {
        public static void Main()
        {
            Configuration.Default.BasePath = "https://api.a11ywatch.com/api";
            // Configure HTTP bearer authorization: bearerAuth
            Configuration.Default.AccessToken = "YOUR_ACCESS_TOKEN";

            var apiInstance = new ReportsApi(Configuration.Default);
            var url = "url_example";  // string | The page url or domain for the report (optional) 

            try
            {
                // Get the report from a previus scan
                CrawlWebsite200Response result = apiInstance.GetReport(url);
                Debug.WriteLine(result);
            }
            catch (ApiException e)
            {
                Debug.Print("Exception when calling ReportsApi.GetReport: " + e.Message );
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
 **url** | **string**| The page url or domain for the report | [optional] 

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
| **200** | successful operation |  -  |
| **405** | Invalid input |  -  |

[[Back to top]](#)
[[Back to API list]](../README.md#documentation-for-api-endpoints)
[[Back to Model list]](../README.md#documentation-for-models)
[[Back to README]](../README.md)


## ScanWebsite

> ScanWebsite200Response ScanWebsite (WebsiteInput websiteInput)

Scan a website for issues

### Example

```csharp
using System.Collections.Generic;
using System.Diagnostics;
using Org.OpenAPITools.Api;
using Org.OpenAPITools.Client;
using Org.OpenAPITools.Model;

namespace Example
{
    public class ScanWebsiteExample
    {
        public static void Main()
        {
            Configuration.Default.BasePath = "https://api.a11ywatch.com/api";
            // Configure HTTP bearer authorization: bearerAuth
            Configuration.Default.AccessToken = "YOUR_ACCESS_TOKEN";

            var apiInstance = new ReportsApi(Configuration.Default);
            var websiteInput = new WebsiteInput(); // WebsiteInput | The website standard body

            try
            {
                // Scan a website for issues
                ScanWebsite200Response result = apiInstance.ScanWebsite(websiteInput);
                Debug.WriteLine(result);
            }
            catch (ApiException e)
            {
                Debug.Print("Exception when calling ReportsApi.ScanWebsite: " + e.Message );
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

[**ScanWebsite200Response**](ScanWebsite200Response.md)

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


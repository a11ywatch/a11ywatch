# ReportsApi

All URIs are relative to *https://api.a11ywatch.com/api*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**crawlWebsite**](ReportsApi.md#crawlWebsite) | **POST** /crawl | Multi-page crawl a website for issues |
| [**crawlWebsiteStream**](ReportsApi.md#crawlWebsiteStream) | **POST** /crawl-stream | Multi-page crawl a website streaming issues on found |
| [**getReport**](ReportsApi.md#getReport) | **GET** /report | Get the report from a previus scan |
| [**scanWebsite**](ReportsApi.md#scanWebsite) | **POST** /scan-simple | Scan a website for issues |


<a name="crawlWebsite"></a>
# **crawlWebsite**
> CrawlWebsite200Response crawlWebsite(websiteInput)

Multi-page crawl a website for issues



### Example
```java
// Import classes:
import org.openapitools.client.ApiClient;
import org.openapitools.client.ApiException;
import org.openapitools.client.Configuration;
import org.openapitools.client.auth.*;
import org.openapitools.client.models.*;
import org.openapitools.client.api.ReportsApi;

public class Example {
  public static void main(String[] args) {
    ApiClient defaultClient = Configuration.getDefaultApiClient();
    defaultClient.setBasePath("https://api.a11ywatch.com/api");
    
    // Configure HTTP bearer authorization: bearerAuth
    HttpBearerAuth bearerAuth = (HttpBearerAuth) defaultClient.getAuthentication("bearerAuth");
    bearerAuth.setBearerToken("BEARER TOKEN");

    ReportsApi apiInstance = new ReportsApi(defaultClient);
    WebsiteInput websiteInput = new WebsiteInput(); // WebsiteInput | The website standard body
    try {
      CrawlWebsite200Response result = apiInstance.crawlWebsite(websiteInput);
      System.out.println(result);
    } catch (ApiException e) {
      System.err.println("Exception when calling ReportsApi#crawlWebsite");
      System.err.println("Status code: " + e.getCode());
      System.err.println("Reason: " + e.getResponseBody());
      System.err.println("Response headers: " + e.getResponseHeaders());
      e.printStackTrace();
    }
  }
}
```

### Parameters

| Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **websiteInput** | [**WebsiteInput**](WebsiteInput.md)| The website standard body | |

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

<a name="crawlWebsiteStream"></a>
# **crawlWebsiteStream**
> CrawlWebsite200Response crawlWebsiteStream(transferEncoding, websiteInput)

Multi-page crawl a website streaming issues on found



### Example
```java
// Import classes:
import org.openapitools.client.ApiClient;
import org.openapitools.client.ApiException;
import org.openapitools.client.Configuration;
import org.openapitools.client.auth.*;
import org.openapitools.client.models.*;
import org.openapitools.client.api.ReportsApi;

public class Example {
  public static void main(String[] args) {
    ApiClient defaultClient = Configuration.getDefaultApiClient();
    defaultClient.setBasePath("https://api.a11ywatch.com/api");
    
    // Configure HTTP bearer authorization: bearerAuth
    HttpBearerAuth bearerAuth = (HttpBearerAuth) defaultClient.getAuthentication("bearerAuth");
    bearerAuth.setBearerToken("BEARER TOKEN");

    ReportsApi apiInstance = new ReportsApi(defaultClient);
    String transferEncoding = "Chunked"; // String | 
    WebsiteInput websiteInput = new WebsiteInput(); // WebsiteInput | The website standard body
    try {
      CrawlWebsite200Response result = apiInstance.crawlWebsiteStream(transferEncoding, websiteInput);
      System.out.println(result);
    } catch (ApiException e) {
      System.err.println("Exception when calling ReportsApi#crawlWebsiteStream");
      System.err.println("Status code: " + e.getCode());
      System.err.println("Reason: " + e.getResponseBody());
      System.err.println("Response headers: " + e.getResponseHeaders());
      e.printStackTrace();
    }
  }
}
```

### Parameters

| Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **transferEncoding** | **String**|  | [default to Chunked] |
| **websiteInput** | [**WebsiteInput**](WebsiteInput.md)| The website standard body | |

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

<a name="getReport"></a>
# **getReport**
> CrawlWebsite200Response getReport(url)

Get the report from a previus scan



### Example
```java
// Import classes:
import org.openapitools.client.ApiClient;
import org.openapitools.client.ApiException;
import org.openapitools.client.Configuration;
import org.openapitools.client.auth.*;
import org.openapitools.client.models.*;
import org.openapitools.client.api.ReportsApi;

public class Example {
  public static void main(String[] args) {
    ApiClient defaultClient = Configuration.getDefaultApiClient();
    defaultClient.setBasePath("https://api.a11ywatch.com/api");
    
    // Configure HTTP bearer authorization: bearerAuth
    HttpBearerAuth bearerAuth = (HttpBearerAuth) defaultClient.getAuthentication("bearerAuth");
    bearerAuth.setBearerToken("BEARER TOKEN");

    ReportsApi apiInstance = new ReportsApi(defaultClient);
    String url = "url_example"; // String | The page url or domain for the report
    try {
      CrawlWebsite200Response result = apiInstance.getReport(url);
      System.out.println(result);
    } catch (ApiException e) {
      System.err.println("Exception when calling ReportsApi#getReport");
      System.err.println("Status code: " + e.getCode());
      System.err.println("Reason: " + e.getResponseBody());
      System.err.println("Response headers: " + e.getResponseHeaders());
      e.printStackTrace();
    }
  }
}
```

### Parameters

| Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **url** | **String**| The page url or domain for the report | [optional] |

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

<a name="scanWebsite"></a>
# **scanWebsite**
> ScanWebsite200Response scanWebsite(websiteInput)

Scan a website for issues



### Example
```java
// Import classes:
import org.openapitools.client.ApiClient;
import org.openapitools.client.ApiException;
import org.openapitools.client.Configuration;
import org.openapitools.client.auth.*;
import org.openapitools.client.models.*;
import org.openapitools.client.api.ReportsApi;

public class Example {
  public static void main(String[] args) {
    ApiClient defaultClient = Configuration.getDefaultApiClient();
    defaultClient.setBasePath("https://api.a11ywatch.com/api");
    
    // Configure HTTP bearer authorization: bearerAuth
    HttpBearerAuth bearerAuth = (HttpBearerAuth) defaultClient.getAuthentication("bearerAuth");
    bearerAuth.setBearerToken("BEARER TOKEN");

    ReportsApi apiInstance = new ReportsApi(defaultClient);
    WebsiteInput websiteInput = new WebsiteInput(); // WebsiteInput | The website standard body
    try {
      ScanWebsite200Response result = apiInstance.scanWebsite(websiteInput);
      System.out.println(result);
    } catch (ApiException e) {
      System.err.println("Exception when calling ReportsApi#scanWebsite");
      System.err.println("Status code: " + e.getCode());
      System.err.println("Reason: " + e.getResponseBody());
      System.err.println("Response headers: " + e.getResponseHeaders());
      e.printStackTrace();
    }
  }
}
```

### Parameters

| Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **websiteInput** | [**WebsiteInput**](WebsiteInput.md)| The website standard body | |

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


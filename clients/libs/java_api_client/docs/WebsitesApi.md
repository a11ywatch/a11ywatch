# WebsitesApi

All URIs are relative to *https://api.a11ywatch.com/api*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**addWebsite**](WebsitesApi.md#addWebsite) | **POST** /website | Add a website in the collection with form data |
| [**deleteWebsite**](WebsitesApi.md#deleteWebsite) | **DELETE** /website | Deletes a website |
| [**getWebsiteByDomain**](WebsitesApi.md#getWebsiteByDomain) | **GET** /website | Find website by Domain |


<a name="addWebsite"></a>
# **addWebsite**
> GetWebsiteByDomain200Response addWebsite(websiteInput)

Add a website in the collection with form data



### Example
```java
// Import classes:
import org.openapitools.client.ApiClient;
import org.openapitools.client.ApiException;
import org.openapitools.client.Configuration;
import org.openapitools.client.auth.*;
import org.openapitools.client.models.*;
import org.openapitools.client.api.WebsitesApi;

public class Example {
  public static void main(String[] args) {
    ApiClient defaultClient = Configuration.getDefaultApiClient();
    defaultClient.setBasePath("https://api.a11ywatch.com/api");
    
    // Configure HTTP bearer authorization: bearerAuth
    HttpBearerAuth bearerAuth = (HttpBearerAuth) defaultClient.getAuthentication("bearerAuth");
    bearerAuth.setBearerToken("BEARER TOKEN");

    WebsitesApi apiInstance = new WebsitesApi(defaultClient);
    WebsiteInput websiteInput = new WebsiteInput(); // WebsiteInput | The website standard body
    try {
      GetWebsiteByDomain200Response result = apiInstance.addWebsite(websiteInput);
      System.out.println(result);
    } catch (ApiException e) {
      System.err.println("Exception when calling WebsitesApi#addWebsite");
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

<a name="deleteWebsite"></a>
# **deleteWebsite**
> GetWebsiteByDomain200Response deleteWebsite(domain)

Deletes a website



### Example
```java
// Import classes:
import org.openapitools.client.ApiClient;
import org.openapitools.client.ApiException;
import org.openapitools.client.Configuration;
import org.openapitools.client.auth.*;
import org.openapitools.client.models.*;
import org.openapitools.client.api.WebsitesApi;

public class Example {
  public static void main(String[] args) {
    ApiClient defaultClient = Configuration.getDefaultApiClient();
    defaultClient.setBasePath("https://api.a11ywatch.com/api");
    
    // Configure HTTP bearer authorization: bearerAuth
    HttpBearerAuth bearerAuth = (HttpBearerAuth) defaultClient.getAuthentication("bearerAuth");
    bearerAuth.setBearerToken("BEARER TOKEN");

    WebsitesApi apiInstance = new WebsitesApi(defaultClient);
    String domain = "domain_example"; // String | Websites domain to delete
    try {
      GetWebsiteByDomain200Response result = apiInstance.deleteWebsite(domain);
      System.out.println(result);
    } catch (ApiException e) {
      System.err.println("Exception when calling WebsitesApi#deleteWebsite");
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
| **domain** | **String**| Websites domain to delete | |

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

<a name="getWebsiteByDomain"></a>
# **getWebsiteByDomain**
> GetWebsiteByDomain200Response getWebsiteByDomain(domain)

Find website by Domain

Returns a website when DOMAIN &#x3D;&#x3D; website.domain.  Empty strings will simulate API error conditions

### Example
```java
// Import classes:
import org.openapitools.client.ApiClient;
import org.openapitools.client.ApiException;
import org.openapitools.client.Configuration;
import org.openapitools.client.auth.*;
import org.openapitools.client.models.*;
import org.openapitools.client.api.WebsitesApi;

public class Example {
  public static void main(String[] args) {
    ApiClient defaultClient = Configuration.getDefaultApiClient();
    defaultClient.setBasePath("https://api.a11ywatch.com/api");
    
    // Configure HTTP bearer authorization: bearerAuth
    HttpBearerAuth bearerAuth = (HttpBearerAuth) defaultClient.getAuthentication("bearerAuth");
    bearerAuth.setBearerToken("BEARER TOKEN");

    WebsitesApi apiInstance = new WebsitesApi(defaultClient);
    String domain = "domain_example"; // String | Domain of website that needs to be fetched
    try {
      GetWebsiteByDomain200Response result = apiInstance.getWebsiteByDomain(domain);
      System.out.println(result);
    } catch (ApiException e) {
      System.err.println("Exception when calling WebsitesApi#getWebsiteByDomain");
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
| **domain** | **String**| Domain of website that needs to be fetched | |

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


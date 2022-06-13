# A11ywatchClient.ReportsApi

All URIs are relative to *https://api.a11ywatch.com/api*

Method | HTTP request | Description
------------- | ------------- | -------------
[**crawlWebsite**](ReportsApi.md#crawlWebsite) | **POST** /crawl | Multi-page crawl a website for issues
[**crawlWebsiteStream**](ReportsApi.md#crawlWebsiteStream) | **POST** /crawl-stream | Multi-page crawl a website streaming issues on found
[**getReport**](ReportsApi.md#getReport) | **GET** /report | Get the report from a previus scan
[**scanWebsite**](ReportsApi.md#scanWebsite) | **POST** /scan-simple | Scan a website for issues



## crawlWebsite

> CrawlWebsite200Response crawlWebsite(websiteInput)

Multi-page crawl a website for issues



### Example

```javascript
import A11ywatchClient from 'a11ywatch_client';
let defaultClient = A11ywatchClient.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: bearerAuth
let bearerAuth = defaultClient.authentications['bearerAuth'];
bearerAuth.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new A11ywatchClient.ReportsApi();
let websiteInput = new A11ywatchClient.WebsiteInput(); // WebsiteInput | The website standard body
apiInstance.crawlWebsite(websiteInput, (error, data, response) => {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
});
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


## crawlWebsiteStream

> CrawlWebsite200Response crawlWebsiteStream(transferEncoding, websiteInput)

Multi-page crawl a website streaming issues on found



### Example

```javascript
import A11ywatchClient from 'a11ywatch_client';
let defaultClient = A11ywatchClient.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: bearerAuth
let bearerAuth = defaultClient.authentications['bearerAuth'];
bearerAuth.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new A11ywatchClient.ReportsApi();
let transferEncoding = "'Chunked'"; // String | 
let websiteInput = new A11ywatchClient.WebsiteInput(); // WebsiteInput | The website standard body
apiInstance.crawlWebsiteStream(transferEncoding, websiteInput, (error, data, response) => {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
});
```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **transferEncoding** | **String**|  | [default to &#39;Chunked&#39;]
 **websiteInput** | [**WebsiteInput**](WebsiteInput.md)| The website standard body | 

### Return type

[**CrawlWebsite200Response**](CrawlWebsite200Response.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json


## getReport

> CrawlWebsite200Response getReport(opts)

Get the report from a previus scan



### Example

```javascript
import A11ywatchClient from 'a11ywatch_client';
let defaultClient = A11ywatchClient.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: bearerAuth
let bearerAuth = defaultClient.authentications['bearerAuth'];
bearerAuth.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new A11ywatchClient.ReportsApi();
let opts = {
  'url': "url_example" // String | The page url or domain for the report
};
apiInstance.getReport(opts, (error, data, response) => {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
});
```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **url** | **String**| The page url or domain for the report | [optional] 

### Return type

[**CrawlWebsite200Response**](CrawlWebsite200Response.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## scanWebsite

> ScanWebsite200Response scanWebsite(websiteInput)

Scan a website for issues



### Example

```javascript
import A11ywatchClient from 'a11ywatch_client';
let defaultClient = A11ywatchClient.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: bearerAuth
let bearerAuth = defaultClient.authentications['bearerAuth'];
bearerAuth.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new A11ywatchClient.ReportsApi();
let websiteInput = new A11ywatchClient.WebsiteInput(); // WebsiteInput | The website standard body
apiInstance.scanWebsite(websiteInput, (error, data, response) => {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
});
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


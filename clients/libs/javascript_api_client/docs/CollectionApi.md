# A11ywatchClient.CollectionApi

All URIs are relative to *https://api.a11ywatch.com/api*

Method | HTTP request | Description
------------- | ------------- | -------------
[**getAnalytics**](CollectionApi.md#getAnalytics) | **GET** /list/analytics | Get the analytics for a website
[**getIssues**](CollectionApi.md#getIssues) | **GET** /list/issue | List the issues for a website
[**getPages**](CollectionApi.md#getPages) | **GET** /list/pages | List the pages in order for a website
[**getWebsites**](CollectionApi.md#getWebsites) | **GET** /list/website | Returns websites for the user in alphabetical order



## getAnalytics

> GetAnalytics200Response getAnalytics(opts)

Get the analytics for a website



### Example

```javascript
import A11ywatchClient from 'a11ywatch_client';
let defaultClient = A11ywatchClient.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: bearerAuth
let bearerAuth = defaultClient.authentications['bearerAuth'];
bearerAuth.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new A11ywatchClient.CollectionApi();
let opts = {
  'offset': "offset_example" // String | The page offset for the next set
};
apiInstance.getAnalytics(opts, (error, data, response) => {
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
 **offset** | **String**| The page offset for the next set | [optional] 

### Return type

[**GetAnalytics200Response**](GetAnalytics200Response.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## getIssues

> GetIssues200Response getIssues(opts)

List the issues for a website



### Example

```javascript
import A11ywatchClient from 'a11ywatch_client';
let defaultClient = A11ywatchClient.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: bearerAuth
let bearerAuth = defaultClient.authentications['bearerAuth'];
bearerAuth.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new A11ywatchClient.CollectionApi();
let opts = {
  'offset': "offset_example" // String | The page offset for the next set
};
apiInstance.getIssues(opts, (error, data, response) => {
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
 **offset** | **String**| The page offset for the next set | [optional] 

### Return type

[**GetIssues200Response**](GetIssues200Response.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## getPages

> GetPages200Response getPages(opts)

List the pages in order for a website



### Example

```javascript
import A11ywatchClient from 'a11ywatch_client';
let defaultClient = A11ywatchClient.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: bearerAuth
let bearerAuth = defaultClient.authentications['bearerAuth'];
bearerAuth.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new A11ywatchClient.CollectionApi();
let opts = {
  'offset': "offset_example" // String | The page offset for the next set
};
apiInstance.getPages(opts, (error, data, response) => {
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
 **offset** | **String**| The page offset for the next set | [optional] 

### Return type

[**GetPages200Response**](GetPages200Response.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## getWebsites

> GetWebsites200Response getWebsites(opts)

Returns websites for the user in alphabetical order

Returns a map of websites

### Example

```javascript
import A11ywatchClient from 'a11ywatch_client';
let defaultClient = A11ywatchClient.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: bearerAuth
let bearerAuth = defaultClient.authentications['bearerAuth'];
bearerAuth.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new A11ywatchClient.CollectionApi();
let opts = {
  'offset': "offset_example" // String | The page offset for the next set
};
apiInstance.getWebsites(opts, (error, data, response) => {
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
 **offset** | **String**| The page offset for the next set | [optional] 

### Return type

[**GetWebsites200Response**](GetWebsites200Response.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


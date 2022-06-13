# A11ywatchClient.WebsitesApi

All URIs are relative to *https://api.a11ywatch.com/api*

Method | HTTP request | Description
------------- | ------------- | -------------
[**addWebsite**](WebsitesApi.md#addWebsite) | **POST** /website | Add a website in the collection with form data
[**deleteWebsite**](WebsitesApi.md#deleteWebsite) | **DELETE** /website | Deletes a website
[**getWebsiteByDomain**](WebsitesApi.md#getWebsiteByDomain) | **GET** /website | Find website by Domain



## addWebsite

> GetWebsiteByDomain200Response addWebsite(websiteInput)

Add a website in the collection with form data



### Example

```javascript
import A11ywatchClient from 'a11ywatch_client';
let defaultClient = A11ywatchClient.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: bearerAuth
let bearerAuth = defaultClient.authentications['bearerAuth'];
bearerAuth.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new A11ywatchClient.WebsitesApi();
let websiteInput = new A11ywatchClient.WebsiteInput(); // WebsiteInput | The website standard body
apiInstance.addWebsite(websiteInput, (error, data, response) => {
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

[**GetWebsiteByDomain200Response**](GetWebsiteByDomain200Response.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json


## deleteWebsite

> GetWebsiteByDomain200Response deleteWebsite(domain)

Deletes a website



### Example

```javascript
import A11ywatchClient from 'a11ywatch_client';
let defaultClient = A11ywatchClient.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: bearerAuth
let bearerAuth = defaultClient.authentications['bearerAuth'];
bearerAuth.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new A11ywatchClient.WebsitesApi();
let domain = "domain_example"; // String | Websites domain to delete
apiInstance.deleteWebsite(domain, (error, data, response) => {
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
 **domain** | **String**| Websites domain to delete | 

### Return type

[**GetWebsiteByDomain200Response**](GetWebsiteByDomain200Response.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## getWebsiteByDomain

> GetWebsiteByDomain200Response getWebsiteByDomain(domain)

Find website by Domain

Returns a website when DOMAIN &#x3D;&#x3D; website.domain.  Empty strings will simulate API error conditions

### Example

```javascript
import A11ywatchClient from 'a11ywatch_client';
let defaultClient = A11ywatchClient.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: bearerAuth
let bearerAuth = defaultClient.authentications['bearerAuth'];
bearerAuth.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new A11ywatchClient.WebsitesApi();
let domain = "domain_example"; // String | Domain of website that needs to be fetched
apiInstance.getWebsiteByDomain(domain, (error, data, response) => {
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
 **domain** | **String**| Domain of website that needs to be fetched | 

### Return type

[**GetWebsiteByDomain200Response**](GetWebsiteByDomain200Response.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


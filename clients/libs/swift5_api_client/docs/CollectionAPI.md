# CollectionAPI

All URIs are relative to *https://api.a11ywatch.com/api*

Method | HTTP request | Description
------------- | ------------- | -------------
[**getAnalytics**](CollectionAPI.md#getanalytics) | **GET** /list/analytics | Get the analytics for a website
[**getIssues**](CollectionAPI.md#getissues) | **GET** /list/issue | List the issues for a website
[**getPages**](CollectionAPI.md#getpages) | **GET** /list/pages | List the pages in order for a website
[**getWebsites**](CollectionAPI.md#getwebsites) | **GET** /list/website | Returns websites for the user in alphabetical order


# **getAnalytics**
```swift
    open class func getAnalytics(offset: String? = nil, completion: @escaping (_ data: GetAnalytics200Response?, _ error: Error?) -> Void)
```

Get the analytics for a website



### Example
```swift
// The following code samples are still beta. For any issue, please report via http://github.com/OpenAPITools/openapi-generator/issues/new
import OpenAPIClient

let offset = "offset_example" // String | The page offset for the next set (optional)

// Get the analytics for a website
CollectionAPI.getAnalytics(offset: offset) { (response, error) in
    guard error == nil else {
        print(error)
        return
    }

    if (response) {
        dump(response)
    }
}
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **offset** | **String** | The page offset for the next set | [optional] 

### Return type

[**GetAnalytics200Response**](GetAnalytics200Response.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **getIssues**
```swift
    open class func getIssues(offset: String? = nil, completion: @escaping (_ data: GetIssues200Response?, _ error: Error?) -> Void)
```

List the issues for a website



### Example
```swift
// The following code samples are still beta. For any issue, please report via http://github.com/OpenAPITools/openapi-generator/issues/new
import OpenAPIClient

let offset = "offset_example" // String | The page offset for the next set (optional)

// List the issues for a website
CollectionAPI.getIssues(offset: offset) { (response, error) in
    guard error == nil else {
        print(error)
        return
    }

    if (response) {
        dump(response)
    }
}
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **offset** | **String** | The page offset for the next set | [optional] 

### Return type

[**GetIssues200Response**](GetIssues200Response.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **getPages**
```swift
    open class func getPages(offset: String? = nil, completion: @escaping (_ data: GetPages200Response?, _ error: Error?) -> Void)
```

List the pages in order for a website



### Example
```swift
// The following code samples are still beta. For any issue, please report via http://github.com/OpenAPITools/openapi-generator/issues/new
import OpenAPIClient

let offset = "offset_example" // String | The page offset for the next set (optional)

// List the pages in order for a website
CollectionAPI.getPages(offset: offset) { (response, error) in
    guard error == nil else {
        print(error)
        return
    }

    if (response) {
        dump(response)
    }
}
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **offset** | **String** | The page offset for the next set | [optional] 

### Return type

[**GetPages200Response**](GetPages200Response.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **getWebsites**
```swift
    open class func getWebsites(offset: String? = nil, completion: @escaping (_ data: GetWebsites200Response?, _ error: Error?) -> Void)
```

Returns websites for the user in alphabetical order

Returns a map of websites

### Example
```swift
// The following code samples are still beta. For any issue, please report via http://github.com/OpenAPITools/openapi-generator/issues/new
import OpenAPIClient

let offset = "offset_example" // String | The page offset for the next set (optional)

// Returns websites for the user in alphabetical order
CollectionAPI.getWebsites(offset: offset) { (response, error) in
    guard error == nil else {
        print(error)
        return
    }

    if (response) {
        dump(response)
    }
}
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **offset** | **String** | The page offset for the next set | [optional] 

### Return type

[**GetWebsites200Response**](GetWebsites200Response.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)


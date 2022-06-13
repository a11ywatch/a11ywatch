# WebsitesAPI

All URIs are relative to *https://api.a11ywatch.com/api*

Method | HTTP request | Description
------------- | ------------- | -------------
[**addWebsite**](WebsitesAPI.md#addwebsite) | **POST** /website | Add a website in the collection with form data
[**deleteWebsite**](WebsitesAPI.md#deletewebsite) | **DELETE** /website | Deletes a website
[**getWebsiteByDomain**](WebsitesAPI.md#getwebsitebydomain) | **GET** /website | Find website by Domain


# **addWebsite**
```swift
    open class func addWebsite(websiteInput: WebsiteInput, completion: @escaping (_ data: GetWebsiteByDomain200Response?, _ error: Error?) -> Void)
```

Add a website in the collection with form data



### Example
```swift
// The following code samples are still beta. For any issue, please report via http://github.com/OpenAPITools/openapi-generator/issues/new
import OpenAPIClient

let websiteInput = WebsiteInput(domain: "domain_example") // WebsiteInput | The website standard body

// Add a website in the collection with form data
WebsitesAPI.addWebsite(websiteInput: websiteInput) { (response, error) in
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
 **websiteInput** | [**WebsiteInput**](WebsiteInput.md) | The website standard body | 

### Return type

[**GetWebsiteByDomain200Response**](GetWebsiteByDomain200Response.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **deleteWebsite**
```swift
    open class func deleteWebsite(domain: String, completion: @escaping (_ data: GetWebsiteByDomain200Response?, _ error: Error?) -> Void)
```

Deletes a website



### Example
```swift
// The following code samples are still beta. For any issue, please report via http://github.com/OpenAPITools/openapi-generator/issues/new
import OpenAPIClient

let domain = "domain_example" // String | Websites domain to delete

// Deletes a website
WebsitesAPI.deleteWebsite(domain: domain) { (response, error) in
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
 **domain** | **String** | Websites domain to delete | 

### Return type

[**GetWebsiteByDomain200Response**](GetWebsiteByDomain200Response.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **getWebsiteByDomain**
```swift
    open class func getWebsiteByDomain(domain: String, completion: @escaping (_ data: GetWebsiteByDomain200Response?, _ error: Error?) -> Void)
```

Find website by Domain

Returns a website when DOMAIN == website.domain.  Empty strings will simulate API error conditions

### Example
```swift
// The following code samples are still beta. For any issue, please report via http://github.com/OpenAPITools/openapi-generator/issues/new
import OpenAPIClient

let domain = "domain_example" // String | Domain of website that needs to be fetched

// Find website by Domain
WebsitesAPI.getWebsiteByDomain(domain: domain) { (response, error) in
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
 **domain** | **String** | Domain of website that needs to be fetched | 

### Return type

[**GetWebsiteByDomain200Response**](GetWebsiteByDomain200Response.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)


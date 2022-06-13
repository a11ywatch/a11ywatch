# ReportsAPI

All URIs are relative to *https://api.a11ywatch.com/api*

Method | HTTP request | Description
------------- | ------------- | -------------
[**crawlWebsite**](ReportsAPI.md#crawlwebsite) | **POST** /crawl | Multi-page crawl a website for issues
[**crawlWebsiteStream**](ReportsAPI.md#crawlwebsitestream) | **POST** /crawl-stream | Multi-page crawl a website streaming issues on found
[**getReport**](ReportsAPI.md#getreport) | **GET** /report | Get the report from a previus scan
[**scanWebsite**](ReportsAPI.md#scanwebsite) | **POST** /scan-simple | Scan a website for issues


# **crawlWebsite**
```swift
    open class func crawlWebsite(websiteInput: WebsiteInput, completion: @escaping (_ data: CrawlWebsite200Response?, _ error: Error?) -> Void)
```

Multi-page crawl a website for issues



### Example
```swift
// The following code samples are still beta. For any issue, please report via http://github.com/OpenAPITools/openapi-generator/issues/new
import OpenAPIClient

let websiteInput = WebsiteInput(domain: "domain_example") // WebsiteInput | The website standard body

// Multi-page crawl a website for issues
ReportsAPI.crawlWebsite(websiteInput: websiteInput) { (response, error) in
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

[**CrawlWebsite200Response**](CrawlWebsite200Response.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **crawlWebsiteStream**
```swift
    open class func crawlWebsiteStream(transferEncoding: String, websiteInput: WebsiteInput, completion: @escaping (_ data: CrawlWebsite200Response?, _ error: Error?) -> Void)
```

Multi-page crawl a website streaming issues on found



### Example
```swift
// The following code samples are still beta. For any issue, please report via http://github.com/OpenAPITools/openapi-generator/issues/new
import OpenAPIClient

let transferEncoding = "transferEncoding_example" // String |  (default to "Chunked")
let websiteInput = WebsiteInput(domain: "domain_example") // WebsiteInput | The website standard body

// Multi-page crawl a website streaming issues on found
ReportsAPI.crawlWebsiteStream(transferEncoding: transferEncoding, websiteInput: websiteInput) { (response, error) in
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
 **transferEncoding** | **String** |  | [default to &quot;Chunked&quot;]
 **websiteInput** | [**WebsiteInput**](WebsiteInput.md) | The website standard body | 

### Return type

[**CrawlWebsite200Response**](CrawlWebsite200Response.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **getReport**
```swift
    open class func getReport(url: String? = nil, completion: @escaping (_ data: CrawlWebsite200Response?, _ error: Error?) -> Void)
```

Get the report from a previus scan



### Example
```swift
// The following code samples are still beta. For any issue, please report via http://github.com/OpenAPITools/openapi-generator/issues/new
import OpenAPIClient

let url = "url_example" // String | The page url or domain for the report (optional)

// Get the report from a previus scan
ReportsAPI.getReport(url: url) { (response, error) in
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
 **url** | **String** | The page url or domain for the report | [optional] 

### Return type

[**CrawlWebsite200Response**](CrawlWebsite200Response.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **scanWebsite**
```swift
    open class func scanWebsite(websiteInput: WebsiteInput, completion: @escaping (_ data: ScanWebsite200Response?, _ error: Error?) -> Void)
```

Scan a website for issues



### Example
```swift
// The following code samples are still beta. For any issue, please report via http://github.com/OpenAPITools/openapi-generator/issues/new
import OpenAPIClient

let websiteInput = WebsiteInput(domain: "domain_example") // WebsiteInput | The website standard body

// Scan a website for issues
ReportsAPI.scanWebsite(websiteInput: websiteInput) { (response, error) in
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

[**ScanWebsite200Response**](ScanWebsite200Response.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)


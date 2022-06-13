# \ReportsApi

All URIs are relative to *https://api.a11ywatch.com/api*

Method | HTTP request | Description
------------- | ------------- | -------------
[**CrawlWebsite**](ReportsApi.md#CrawlWebsite) | **Post** /crawl | Multi-page crawl a website for issues
[**CrawlWebsiteStream**](ReportsApi.md#CrawlWebsiteStream) | **Post** /crawl-stream | Multi-page crawl a website streaming issues on found
[**GetReport**](ReportsApi.md#GetReport) | **Get** /report | Get the report from a previus scan
[**ScanWebsite**](ReportsApi.md#ScanWebsite) | **Post** /scan-simple | Scan a website for issues



## CrawlWebsite

> CrawlWebsite200Response CrawlWebsite(ctx).WebsiteInput(websiteInput).Execute()

Multi-page crawl a website for issues



### Example

```go
package main

import (
    "context"
    "fmt"
    "os"
    openapiclient "./openapi"
)

func main() {
    websiteInput := *openapiclient.NewWebsiteInput() // WebsiteInput | The website standard body

    configuration := openapiclient.NewConfiguration()
    apiClient := openapiclient.NewAPIClient(configuration)
    resp, r, err := apiClient.ReportsApi.CrawlWebsite(context.Background()).WebsiteInput(websiteInput).Execute()
    if err != nil {
        fmt.Fprintf(os.Stderr, "Error when calling `ReportsApi.CrawlWebsite``: %v\n", err)
        fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
    }
    // response from `CrawlWebsite`: CrawlWebsite200Response
    fmt.Fprintf(os.Stdout, "Response from `ReportsApi.CrawlWebsite`: %v\n", resp)
}
```

### Path Parameters



### Other Parameters

Other parameters are passed through a pointer to a apiCrawlWebsiteRequest struct via the builder pattern


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

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints)
[[Back to Model list]](../README.md#documentation-for-models)
[[Back to README]](../README.md)


## CrawlWebsiteStream

> CrawlWebsite200Response CrawlWebsiteStream(ctx).TransferEncoding(transferEncoding).WebsiteInput(websiteInput).Execute()

Multi-page crawl a website streaming issues on found



### Example

```go
package main

import (
    "context"
    "fmt"
    "os"
    openapiclient "./openapi"
)

func main() {
    transferEncoding := "transferEncoding_example" // string |  (default to "Chunked")
    websiteInput := *openapiclient.NewWebsiteInput() // WebsiteInput | The website standard body

    configuration := openapiclient.NewConfiguration()
    apiClient := openapiclient.NewAPIClient(configuration)
    resp, r, err := apiClient.ReportsApi.CrawlWebsiteStream(context.Background()).TransferEncoding(transferEncoding).WebsiteInput(websiteInput).Execute()
    if err != nil {
        fmt.Fprintf(os.Stderr, "Error when calling `ReportsApi.CrawlWebsiteStream``: %v\n", err)
        fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
    }
    // response from `CrawlWebsiteStream`: CrawlWebsite200Response
    fmt.Fprintf(os.Stdout, "Response from `ReportsApi.CrawlWebsiteStream`: %v\n", resp)
}
```

### Path Parameters



### Other Parameters

Other parameters are passed through a pointer to a apiCrawlWebsiteStreamRequest struct via the builder pattern


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **transferEncoding** | **string** |  | [default to &quot;Chunked&quot;]
 **websiteInput** | [**WebsiteInput**](WebsiteInput.md) | The website standard body | 

### Return type

[**CrawlWebsite200Response**](CrawlWebsite200Response.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints)
[[Back to Model list]](../README.md#documentation-for-models)
[[Back to README]](../README.md)


## GetReport

> CrawlWebsite200Response GetReport(ctx).Url(url).Execute()

Get the report from a previus scan



### Example

```go
package main

import (
    "context"
    "fmt"
    "os"
    openapiclient "./openapi"
)

func main() {
    url := "url_example" // string | The page url or domain for the report (optional)

    configuration := openapiclient.NewConfiguration()
    apiClient := openapiclient.NewAPIClient(configuration)
    resp, r, err := apiClient.ReportsApi.GetReport(context.Background()).Url(url).Execute()
    if err != nil {
        fmt.Fprintf(os.Stderr, "Error when calling `ReportsApi.GetReport``: %v\n", err)
        fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
    }
    // response from `GetReport`: CrawlWebsite200Response
    fmt.Fprintf(os.Stdout, "Response from `ReportsApi.GetReport`: %v\n", resp)
}
```

### Path Parameters



### Other Parameters

Other parameters are passed through a pointer to a apiGetReportRequest struct via the builder pattern


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **url** | **string** | The page url or domain for the report | 

### Return type

[**CrawlWebsite200Response**](CrawlWebsite200Response.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints)
[[Back to Model list]](../README.md#documentation-for-models)
[[Back to README]](../README.md)


## ScanWebsite

> ScanWebsite200Response ScanWebsite(ctx).WebsiteInput(websiteInput).Execute()

Scan a website for issues



### Example

```go
package main

import (
    "context"
    "fmt"
    "os"
    openapiclient "./openapi"
)

func main() {
    websiteInput := *openapiclient.NewWebsiteInput() // WebsiteInput | The website standard body

    configuration := openapiclient.NewConfiguration()
    apiClient := openapiclient.NewAPIClient(configuration)
    resp, r, err := apiClient.ReportsApi.ScanWebsite(context.Background()).WebsiteInput(websiteInput).Execute()
    if err != nil {
        fmt.Fprintf(os.Stderr, "Error when calling `ReportsApi.ScanWebsite``: %v\n", err)
        fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
    }
    // response from `ScanWebsite`: ScanWebsite200Response
    fmt.Fprintf(os.Stdout, "Response from `ReportsApi.ScanWebsite`: %v\n", resp)
}
```

### Path Parameters



### Other Parameters

Other parameters are passed through a pointer to a apiScanWebsiteRequest struct via the builder pattern


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

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints)
[[Back to Model list]](../README.md#documentation-for-models)
[[Back to README]](../README.md)


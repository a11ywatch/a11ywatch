# \WebsitesApi

All URIs are relative to *https://api.a11ywatch.com/api*

Method | HTTP request | Description
------------- | ------------- | -------------
[**AddWebsite**](WebsitesApi.md#AddWebsite) | **Post** /website | Add a website in the collection with form data
[**DeleteWebsite**](WebsitesApi.md#DeleteWebsite) | **Delete** /website | Deletes a website
[**GetWebsiteByDomain**](WebsitesApi.md#GetWebsiteByDomain) | **Get** /website | Find website by Domain



## AddWebsite

> GetWebsiteByDomain200Response AddWebsite(ctx).WebsiteInput(websiteInput).Execute()

Add a website in the collection with form data



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
    resp, r, err := apiClient.WebsitesApi.AddWebsite(context.Background()).WebsiteInput(websiteInput).Execute()
    if err != nil {
        fmt.Fprintf(os.Stderr, "Error when calling `WebsitesApi.AddWebsite``: %v\n", err)
        fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
    }
    // response from `AddWebsite`: GetWebsiteByDomain200Response
    fmt.Fprintf(os.Stdout, "Response from `WebsitesApi.AddWebsite`: %v\n", resp)
}
```

### Path Parameters



### Other Parameters

Other parameters are passed through a pointer to a apiAddWebsiteRequest struct via the builder pattern


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

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints)
[[Back to Model list]](../README.md#documentation-for-models)
[[Back to README]](../README.md)


## DeleteWebsite

> GetWebsiteByDomain200Response DeleteWebsite(ctx).Domain(domain).Execute()

Deletes a website



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
    domain := "domain_example" // string | Websites domain to delete

    configuration := openapiclient.NewConfiguration()
    apiClient := openapiclient.NewAPIClient(configuration)
    resp, r, err := apiClient.WebsitesApi.DeleteWebsite(context.Background()).Domain(domain).Execute()
    if err != nil {
        fmt.Fprintf(os.Stderr, "Error when calling `WebsitesApi.DeleteWebsite``: %v\n", err)
        fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
    }
    // response from `DeleteWebsite`: GetWebsiteByDomain200Response
    fmt.Fprintf(os.Stdout, "Response from `WebsitesApi.DeleteWebsite`: %v\n", resp)
}
```

### Path Parameters



### Other Parameters

Other parameters are passed through a pointer to a apiDeleteWebsiteRequest struct via the builder pattern


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **domain** | **string** | Websites domain to delete | 

### Return type

[**GetWebsiteByDomain200Response**](GetWebsiteByDomain200Response.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints)
[[Back to Model list]](../README.md#documentation-for-models)
[[Back to README]](../README.md)


## GetWebsiteByDomain

> GetWebsiteByDomain200Response GetWebsiteByDomain(ctx).Domain(domain).Execute()

Find website by Domain



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
    domain := "domain_example" // string | Domain of website that needs to be fetched

    configuration := openapiclient.NewConfiguration()
    apiClient := openapiclient.NewAPIClient(configuration)
    resp, r, err := apiClient.WebsitesApi.GetWebsiteByDomain(context.Background()).Domain(domain).Execute()
    if err != nil {
        fmt.Fprintf(os.Stderr, "Error when calling `WebsitesApi.GetWebsiteByDomain``: %v\n", err)
        fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
    }
    // response from `GetWebsiteByDomain`: GetWebsiteByDomain200Response
    fmt.Fprintf(os.Stdout, "Response from `WebsitesApi.GetWebsiteByDomain`: %v\n", resp)
}
```

### Path Parameters



### Other Parameters

Other parameters are passed through a pointer to a apiGetWebsiteByDomainRequest struct via the builder pattern


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **domain** | **string** | Domain of website that needs to be fetched | 

### Return type

[**GetWebsiteByDomain200Response**](GetWebsiteByDomain200Response.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints)
[[Back to Model list]](../README.md#documentation-for-models)
[[Back to README]](../README.md)


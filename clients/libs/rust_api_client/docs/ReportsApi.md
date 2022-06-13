# \ReportsApi

All URIs are relative to *https://api.a11ywatch.com/api*

Method | HTTP request | Description
------------- | ------------- | -------------
[**crawl_website**](ReportsApi.md#crawl_website) | **POST** /crawl | Multi-page crawl a website for issues
[**crawl_website_stream**](ReportsApi.md#crawl_website_stream) | **POST** /crawl-stream | Multi-page crawl a website streaming issues on found
[**get_report**](ReportsApi.md#get_report) | **GET** /report | Get the report from a previus scan
[**scan_website**](ReportsApi.md#scan_website) | **POST** /scan-simple | Scan a website for issues



## crawl_website

> crate::models::CrawlWebsite200Response crawl_website(website_input)
Multi-page crawl a website for issues



### Parameters


Name | Type | Description  | Required | Notes
------------- | ------------- | ------------- | ------------- | -------------
**website_input** | [**WebsiteInput**](WebsiteInput.md) | The website standard body | [required] |

### Return type

[**crate::models::CrawlWebsite200Response**](crawlWebsite_200_response.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)


## crawl_website_stream

> crate::models::CrawlWebsite200Response crawl_website_stream(transfer_encoding, website_input)
Multi-page crawl a website streaming issues on found



### Parameters


Name | Type | Description  | Required | Notes
------------- | ------------- | ------------- | ------------- | -------------
**transfer_encoding** | **String** |  | [required] |[default to Chunked]
**website_input** | [**WebsiteInput**](WebsiteInput.md) | The website standard body | [required] |

### Return type

[**crate::models::CrawlWebsite200Response**](crawlWebsite_200_response.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)


## get_report

> crate::models::CrawlWebsite200Response get_report(url)
Get the report from a previus scan



### Parameters


Name | Type | Description  | Required | Notes
------------- | ------------- | ------------- | ------------- | -------------
**url** | Option<**String**> | The page url or domain for the report |  |

### Return type

[**crate::models::CrawlWebsite200Response**](crawlWebsite_200_response.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)


## scan_website

> crate::models::ScanWebsite200Response scan_website(website_input)
Scan a website for issues



### Parameters


Name | Type | Description  | Required | Notes
------------- | ------------- | ------------- | ------------- | -------------
**website_input** | [**WebsiteInput**](WebsiteInput.md) | The website standard body | [required] |

### Return type

[**crate::models::ScanWebsite200Response**](scanWebsite_200_response.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)


# \CollectionApi

All URIs are relative to *https://api.a11ywatch.com/api*

Method | HTTP request | Description
------------- | ------------- | -------------
[**get_analytics**](CollectionApi.md#get_analytics) | **GET** /list/analytics | Get the analytics for a website
[**get_issues**](CollectionApi.md#get_issues) | **GET** /list/issue | List the issues for a website
[**get_pages**](CollectionApi.md#get_pages) | **GET** /list/pages | List the pages in order for a website
[**get_websites**](CollectionApi.md#get_websites) | **GET** /list/website | Returns websites for the user in alphabetical order



## get_analytics

> crate::models::GetAnalytics200Response get_analytics(offset)
Get the analytics for a website



### Parameters


Name | Type | Description  | Required | Notes
------------- | ------------- | ------------- | ------------- | -------------
**offset** | Option<**String**> | The page offset for the next set |  |

### Return type

[**crate::models::GetAnalytics200Response**](getAnalytics_200_response.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)


## get_issues

> crate::models::GetIssues200Response get_issues(offset)
List the issues for a website



### Parameters


Name | Type | Description  | Required | Notes
------------- | ------------- | ------------- | ------------- | -------------
**offset** | Option<**String**> | The page offset for the next set |  |

### Return type

[**crate::models::GetIssues200Response**](getIssues_200_response.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)


## get_pages

> crate::models::GetPages200Response get_pages(offset)
List the pages in order for a website



### Parameters


Name | Type | Description  | Required | Notes
------------- | ------------- | ------------- | ------------- | -------------
**offset** | Option<**String**> | The page offset for the next set |  |

### Return type

[**crate::models::GetPages200Response**](getPages_200_response.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)


## get_websites

> crate::models::GetWebsites200Response get_websites(offset)
Returns websites for the user in alphabetical order

Returns a map of websites

### Parameters


Name | Type | Description  | Required | Notes
------------- | ------------- | ------------- | ------------- | -------------
**offset** | Option<**String**> | The page offset for the next set |  |

### Return type

[**crate::models::GetWebsites200Response**](getWebsites_200_response.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)


# \WebsitesApi

All URIs are relative to *https://api.a11ywatch.com/api*

Method | HTTP request | Description
------------- | ------------- | -------------
[**add_website**](WebsitesApi.md#add_website) | **POST** /website | Add a website in the collection with form data
[**delete_website**](WebsitesApi.md#delete_website) | **DELETE** /website | Deletes a website
[**get_website_by_domain**](WebsitesApi.md#get_website_by_domain) | **GET** /website | Find website by Domain



## add_website

> crate::models::GetWebsiteByDomain200Response add_website(website_input)
Add a website in the collection with form data



### Parameters


Name | Type | Description  | Required | Notes
------------- | ------------- | ------------- | ------------- | -------------
**website_input** | [**WebsiteInput**](WebsiteInput.md) | The website standard body | [required] |

### Return type

[**crate::models::GetWebsiteByDomain200Response**](getWebsiteByDomain_200_response.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)


## delete_website

> crate::models::GetWebsiteByDomain200Response delete_website(domain)
Deletes a website



### Parameters


Name | Type | Description  | Required | Notes
------------- | ------------- | ------------- | ------------- | -------------
**domain** | **String** | Websites domain to delete | [required] |

### Return type

[**crate::models::GetWebsiteByDomain200Response**](getWebsiteByDomain_200_response.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)


## get_website_by_domain

> crate::models::GetWebsiteByDomain200Response get_website_by_domain(domain)
Find website by Domain

Returns a website when DOMAIN == website.domain.  Empty strings will simulate API error conditions

### Parameters


Name | Type | Description  | Required | Notes
------------- | ------------- | ------------- | ------------- | -------------
**domain** | **String** | Domain of website that needs to be fetched | [required] |

### Return type

[**crate::models::GetWebsiteByDomain200Response**](getWebsiteByDomain_200_response.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)


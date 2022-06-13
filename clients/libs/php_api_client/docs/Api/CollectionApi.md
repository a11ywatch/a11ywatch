# OpenAPI\Client\CollectionApi

All URIs are relative to https://api.a11ywatch.com/api.

Method | HTTP request | Description
------------- | ------------- | -------------
[**getAnalytics()**](CollectionApi.md#getAnalytics) | **GET** /list/analytics | Get the analytics for a website
[**getIssues()**](CollectionApi.md#getIssues) | **GET** /list/issue | List the issues for a website
[**getPages()**](CollectionApi.md#getPages) | **GET** /list/pages | List the pages in order for a website
[**getWebsites()**](CollectionApi.md#getWebsites) | **GET** /list/website | Returns websites for the user in alphabetical order


## `getAnalytics()`

```php
getAnalytics($offset): \OpenAPI\Client\Model\GetAnalytics200Response
```

Get the analytics for a website



### Example

```php
<?php
require_once(__DIR__ . '/vendor/autoload.php');


// Configure Bearer (JWT) authorization: bearerAuth
$config = OpenAPI\Client\Configuration::getDefaultConfiguration()->setAccessToken('YOUR_ACCESS_TOKEN');


$apiInstance = new OpenAPI\Client\Api\CollectionApi(
    // If you want use custom http client, pass your client which implements `GuzzleHttp\ClientInterface`.
    // This is optional, `GuzzleHttp\Client` will be used as default.
    new GuzzleHttp\Client(),
    $config
);
$offset = 'offset_example'; // string | The page offset for the next set

try {
    $result = $apiInstance->getAnalytics($offset);
    print_r($result);
} catch (Exception $e) {
    echo 'Exception when calling CollectionApi->getAnalytics: ', $e->getMessage(), PHP_EOL;
}
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **offset** | **string**| The page offset for the next set | [optional]

### Return type

[**\OpenAPI\Client\Model\GetAnalytics200Response**](../Model/GetAnalytics200Response.md)

### Authorization

[bearerAuth](../../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`

[[Back to top]](#) [[Back to API list]](../../README.md#endpoints)
[[Back to Model list]](../../README.md#models)
[[Back to README]](../../README.md)

## `getIssues()`

```php
getIssues($offset): \OpenAPI\Client\Model\GetIssues200Response
```

List the issues for a website



### Example

```php
<?php
require_once(__DIR__ . '/vendor/autoload.php');


// Configure Bearer (JWT) authorization: bearerAuth
$config = OpenAPI\Client\Configuration::getDefaultConfiguration()->setAccessToken('YOUR_ACCESS_TOKEN');


$apiInstance = new OpenAPI\Client\Api\CollectionApi(
    // If you want use custom http client, pass your client which implements `GuzzleHttp\ClientInterface`.
    // This is optional, `GuzzleHttp\Client` will be used as default.
    new GuzzleHttp\Client(),
    $config
);
$offset = 'offset_example'; // string | The page offset for the next set

try {
    $result = $apiInstance->getIssues($offset);
    print_r($result);
} catch (Exception $e) {
    echo 'Exception when calling CollectionApi->getIssues: ', $e->getMessage(), PHP_EOL;
}
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **offset** | **string**| The page offset for the next set | [optional]

### Return type

[**\OpenAPI\Client\Model\GetIssues200Response**](../Model/GetIssues200Response.md)

### Authorization

[bearerAuth](../../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`

[[Back to top]](#) [[Back to API list]](../../README.md#endpoints)
[[Back to Model list]](../../README.md#models)
[[Back to README]](../../README.md)

## `getPages()`

```php
getPages($offset): \OpenAPI\Client\Model\GetPages200Response
```

List the pages in order for a website



### Example

```php
<?php
require_once(__DIR__ . '/vendor/autoload.php');


// Configure Bearer (JWT) authorization: bearerAuth
$config = OpenAPI\Client\Configuration::getDefaultConfiguration()->setAccessToken('YOUR_ACCESS_TOKEN');


$apiInstance = new OpenAPI\Client\Api\CollectionApi(
    // If you want use custom http client, pass your client which implements `GuzzleHttp\ClientInterface`.
    // This is optional, `GuzzleHttp\Client` will be used as default.
    new GuzzleHttp\Client(),
    $config
);
$offset = 'offset_example'; // string | The page offset for the next set

try {
    $result = $apiInstance->getPages($offset);
    print_r($result);
} catch (Exception $e) {
    echo 'Exception when calling CollectionApi->getPages: ', $e->getMessage(), PHP_EOL;
}
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **offset** | **string**| The page offset for the next set | [optional]

### Return type

[**\OpenAPI\Client\Model\GetPages200Response**](../Model/GetPages200Response.md)

### Authorization

[bearerAuth](../../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`

[[Back to top]](#) [[Back to API list]](../../README.md#endpoints)
[[Back to Model list]](../../README.md#models)
[[Back to README]](../../README.md)

## `getWebsites()`

```php
getWebsites($offset): \OpenAPI\Client\Model\GetWebsites200Response
```

Returns websites for the user in alphabetical order

Returns a map of websites

### Example

```php
<?php
require_once(__DIR__ . '/vendor/autoload.php');


// Configure Bearer (JWT) authorization: bearerAuth
$config = OpenAPI\Client\Configuration::getDefaultConfiguration()->setAccessToken('YOUR_ACCESS_TOKEN');


$apiInstance = new OpenAPI\Client\Api\CollectionApi(
    // If you want use custom http client, pass your client which implements `GuzzleHttp\ClientInterface`.
    // This is optional, `GuzzleHttp\Client` will be used as default.
    new GuzzleHttp\Client(),
    $config
);
$offset = 'offset_example'; // string | The page offset for the next set

try {
    $result = $apiInstance->getWebsites($offset);
    print_r($result);
} catch (Exception $e) {
    echo 'Exception when calling CollectionApi->getWebsites: ', $e->getMessage(), PHP_EOL;
}
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **offset** | **string**| The page offset for the next set | [optional]

### Return type

[**\OpenAPI\Client\Model\GetWebsites200Response**](../Model/GetWebsites200Response.md)

### Authorization

[bearerAuth](../../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`

[[Back to top]](#) [[Back to API list]](../../README.md#endpoints)
[[Back to Model list]](../../README.md#models)
[[Back to README]](../../README.md)

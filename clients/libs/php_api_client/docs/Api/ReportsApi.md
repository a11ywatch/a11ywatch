# OpenAPI\Client\ReportsApi

All URIs are relative to https://api.a11ywatch.com/api.

Method | HTTP request | Description
------------- | ------------- | -------------
[**crawlWebsite()**](ReportsApi.md#crawlWebsite) | **POST** /crawl | Multi-page crawl a website for issues
[**crawlWebsiteStream()**](ReportsApi.md#crawlWebsiteStream) | **POST** /crawl-stream | Multi-page crawl a website streaming issues on found
[**getReport()**](ReportsApi.md#getReport) | **GET** /report | Get the report from a previus scan
[**scanWebsite()**](ReportsApi.md#scanWebsite) | **POST** /scan-simple | Scan a website for issues


## `crawlWebsite()`

```php
crawlWebsite($website_input): \OpenAPI\Client\Model\CrawlWebsite200Response
```

Multi-page crawl a website for issues



### Example

```php
<?php
require_once(__DIR__ . '/vendor/autoload.php');


// Configure Bearer (JWT) authorization: bearerAuth
$config = OpenAPI\Client\Configuration::getDefaultConfiguration()->setAccessToken('YOUR_ACCESS_TOKEN');


$apiInstance = new OpenAPI\Client\Api\ReportsApi(
    // If you want use custom http client, pass your client which implements `GuzzleHttp\ClientInterface`.
    // This is optional, `GuzzleHttp\Client` will be used as default.
    new GuzzleHttp\Client(),
    $config
);
$website_input = new \OpenAPI\Client\Model\WebsiteInput(); // \OpenAPI\Client\Model\WebsiteInput | The website standard body

try {
    $result = $apiInstance->crawlWebsite($website_input);
    print_r($result);
} catch (Exception $e) {
    echo 'Exception when calling ReportsApi->crawlWebsite: ', $e->getMessage(), PHP_EOL;
}
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **website_input** | [**\OpenAPI\Client\Model\WebsiteInput**](../Model/WebsiteInput.md)| The website standard body |

### Return type

[**\OpenAPI\Client\Model\CrawlWebsite200Response**](../Model/CrawlWebsite200Response.md)

### Authorization

[bearerAuth](../../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`

[[Back to top]](#) [[Back to API list]](../../README.md#endpoints)
[[Back to Model list]](../../README.md#models)
[[Back to README]](../../README.md)

## `crawlWebsiteStream()`

```php
crawlWebsiteStream($transfer_encoding, $website_input): \OpenAPI\Client\Model\CrawlWebsite200Response
```

Multi-page crawl a website streaming issues on found



### Example

```php
<?php
require_once(__DIR__ . '/vendor/autoload.php');


// Configure Bearer (JWT) authorization: bearerAuth
$config = OpenAPI\Client\Configuration::getDefaultConfiguration()->setAccessToken('YOUR_ACCESS_TOKEN');


$apiInstance = new OpenAPI\Client\Api\ReportsApi(
    // If you want use custom http client, pass your client which implements `GuzzleHttp\ClientInterface`.
    // This is optional, `GuzzleHttp\Client` will be used as default.
    new GuzzleHttp\Client(),
    $config
);
$transfer_encoding = 'Chunked'; // string
$website_input = new \OpenAPI\Client\Model\WebsiteInput(); // \OpenAPI\Client\Model\WebsiteInput | The website standard body

try {
    $result = $apiInstance->crawlWebsiteStream($transfer_encoding, $website_input);
    print_r($result);
} catch (Exception $e) {
    echo 'Exception when calling ReportsApi->crawlWebsiteStream: ', $e->getMessage(), PHP_EOL;
}
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **transfer_encoding** | **string**|  | [default to &#39;Chunked&#39;]
 **website_input** | [**\OpenAPI\Client\Model\WebsiteInput**](../Model/WebsiteInput.md)| The website standard body |

### Return type

[**\OpenAPI\Client\Model\CrawlWebsite200Response**](../Model/CrawlWebsite200Response.md)

### Authorization

[bearerAuth](../../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`

[[Back to top]](#) [[Back to API list]](../../README.md#endpoints)
[[Back to Model list]](../../README.md#models)
[[Back to README]](../../README.md)

## `getReport()`

```php
getReport($url): \OpenAPI\Client\Model\CrawlWebsite200Response
```

Get the report from a previus scan



### Example

```php
<?php
require_once(__DIR__ . '/vendor/autoload.php');


// Configure Bearer (JWT) authorization: bearerAuth
$config = OpenAPI\Client\Configuration::getDefaultConfiguration()->setAccessToken('YOUR_ACCESS_TOKEN');


$apiInstance = new OpenAPI\Client\Api\ReportsApi(
    // If you want use custom http client, pass your client which implements `GuzzleHttp\ClientInterface`.
    // This is optional, `GuzzleHttp\Client` will be used as default.
    new GuzzleHttp\Client(),
    $config
);
$url = 'url_example'; // string | The page url or domain for the report

try {
    $result = $apiInstance->getReport($url);
    print_r($result);
} catch (Exception $e) {
    echo 'Exception when calling ReportsApi->getReport: ', $e->getMessage(), PHP_EOL;
}
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **url** | **string**| The page url or domain for the report | [optional]

### Return type

[**\OpenAPI\Client\Model\CrawlWebsite200Response**](../Model/CrawlWebsite200Response.md)

### Authorization

[bearerAuth](../../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`

[[Back to top]](#) [[Back to API list]](../../README.md#endpoints)
[[Back to Model list]](../../README.md#models)
[[Back to README]](../../README.md)

## `scanWebsite()`

```php
scanWebsite($website_input): \OpenAPI\Client\Model\ScanWebsite200Response
```

Scan a website for issues



### Example

```php
<?php
require_once(__DIR__ . '/vendor/autoload.php');


// Configure Bearer (JWT) authorization: bearerAuth
$config = OpenAPI\Client\Configuration::getDefaultConfiguration()->setAccessToken('YOUR_ACCESS_TOKEN');


$apiInstance = new OpenAPI\Client\Api\ReportsApi(
    // If you want use custom http client, pass your client which implements `GuzzleHttp\ClientInterface`.
    // This is optional, `GuzzleHttp\Client` will be used as default.
    new GuzzleHttp\Client(),
    $config
);
$website_input = new \OpenAPI\Client\Model\WebsiteInput(); // \OpenAPI\Client\Model\WebsiteInput | The website standard body

try {
    $result = $apiInstance->scanWebsite($website_input);
    print_r($result);
} catch (Exception $e) {
    echo 'Exception when calling ReportsApi->scanWebsite: ', $e->getMessage(), PHP_EOL;
}
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **website_input** | [**\OpenAPI\Client\Model\WebsiteInput**](../Model/WebsiteInput.md)| The website standard body |

### Return type

[**\OpenAPI\Client\Model\ScanWebsite200Response**](../Model/ScanWebsite200Response.md)

### Authorization

[bearerAuth](../../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`

[[Back to top]](#) [[Back to API list]](../../README.md#endpoints)
[[Back to Model list]](../../README.md#models)
[[Back to README]](../../README.md)

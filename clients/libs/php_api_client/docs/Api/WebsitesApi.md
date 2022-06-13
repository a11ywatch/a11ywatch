# OpenAPI\Client\WebsitesApi

All URIs are relative to https://api.a11ywatch.com/api.

Method | HTTP request | Description
------------- | ------------- | -------------
[**addWebsite()**](WebsitesApi.md#addWebsite) | **POST** /website | Add a website in the collection with form data
[**deleteWebsite()**](WebsitesApi.md#deleteWebsite) | **DELETE** /website | Deletes a website
[**getWebsiteByDomain()**](WebsitesApi.md#getWebsiteByDomain) | **GET** /website | Find website by Domain


## `addWebsite()`

```php
addWebsite($website_input): \OpenAPI\Client\Model\GetWebsiteByDomain200Response
```

Add a website in the collection with form data



### Example

```php
<?php
require_once(__DIR__ . '/vendor/autoload.php');


// Configure Bearer (JWT) authorization: bearerAuth
$config = OpenAPI\Client\Configuration::getDefaultConfiguration()->setAccessToken('YOUR_ACCESS_TOKEN');


$apiInstance = new OpenAPI\Client\Api\WebsitesApi(
    // If you want use custom http client, pass your client which implements `GuzzleHttp\ClientInterface`.
    // This is optional, `GuzzleHttp\Client` will be used as default.
    new GuzzleHttp\Client(),
    $config
);
$website_input = new \OpenAPI\Client\Model\WebsiteInput(); // \OpenAPI\Client\Model\WebsiteInput | The website standard body

try {
    $result = $apiInstance->addWebsite($website_input);
    print_r($result);
} catch (Exception $e) {
    echo 'Exception when calling WebsitesApi->addWebsite: ', $e->getMessage(), PHP_EOL;
}
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **website_input** | [**\OpenAPI\Client\Model\WebsiteInput**](../Model/WebsiteInput.md)| The website standard body |

### Return type

[**\OpenAPI\Client\Model\GetWebsiteByDomain200Response**](../Model/GetWebsiteByDomain200Response.md)

### Authorization

[bearerAuth](../../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`

[[Back to top]](#) [[Back to API list]](../../README.md#endpoints)
[[Back to Model list]](../../README.md#models)
[[Back to README]](../../README.md)

## `deleteWebsite()`

```php
deleteWebsite($domain): \OpenAPI\Client\Model\GetWebsiteByDomain200Response
```

Deletes a website



### Example

```php
<?php
require_once(__DIR__ . '/vendor/autoload.php');


// Configure Bearer (JWT) authorization: bearerAuth
$config = OpenAPI\Client\Configuration::getDefaultConfiguration()->setAccessToken('YOUR_ACCESS_TOKEN');


$apiInstance = new OpenAPI\Client\Api\WebsitesApi(
    // If you want use custom http client, pass your client which implements `GuzzleHttp\ClientInterface`.
    // This is optional, `GuzzleHttp\Client` will be used as default.
    new GuzzleHttp\Client(),
    $config
);
$domain = 'domain_example'; // string | Websites domain to delete

try {
    $result = $apiInstance->deleteWebsite($domain);
    print_r($result);
} catch (Exception $e) {
    echo 'Exception when calling WebsitesApi->deleteWebsite: ', $e->getMessage(), PHP_EOL;
}
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **domain** | **string**| Websites domain to delete |

### Return type

[**\OpenAPI\Client\Model\GetWebsiteByDomain200Response**](../Model/GetWebsiteByDomain200Response.md)

### Authorization

[bearerAuth](../../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`

[[Back to top]](#) [[Back to API list]](../../README.md#endpoints)
[[Back to Model list]](../../README.md#models)
[[Back to README]](../../README.md)

## `getWebsiteByDomain()`

```php
getWebsiteByDomain($domain): \OpenAPI\Client\Model\GetWebsiteByDomain200Response
```

Find website by Domain

Returns a website when DOMAIN == website.domain.  Empty strings will simulate API error conditions

### Example

```php
<?php
require_once(__DIR__ . '/vendor/autoload.php');


// Configure Bearer (JWT) authorization: bearerAuth
$config = OpenAPI\Client\Configuration::getDefaultConfiguration()->setAccessToken('YOUR_ACCESS_TOKEN');


$apiInstance = new OpenAPI\Client\Api\WebsitesApi(
    // If you want use custom http client, pass your client which implements `GuzzleHttp\ClientInterface`.
    // This is optional, `GuzzleHttp\Client` will be used as default.
    new GuzzleHttp\Client(),
    $config
);
$domain = 'domain_example'; // string | Domain of website that needs to be fetched

try {
    $result = $apiInstance->getWebsiteByDomain($domain);
    print_r($result);
} catch (Exception $e) {
    echo 'Exception when calling WebsitesApi->getWebsiteByDomain: ', $e->getMessage(), PHP_EOL;
}
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **domain** | **string**| Domain of website that needs to be fetched |

### Return type

[**\OpenAPI\Client\Model\GetWebsiteByDomain200Response**](../Model/GetWebsiteByDomain200Response.md)

### Authorization

[bearerAuth](../../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`

[[Back to top]](#) [[Back to API list]](../../README.md#endpoints)
[[Back to Model list]](../../README.md#models)
[[Back to README]](../../README.md)

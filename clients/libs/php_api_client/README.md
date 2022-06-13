# OpenAPIClient-php

The web accessibility API built for scale.  For this sample, you can use the api key \"special-key\" to test the authorization filters


## Installation & Usage

### Requirements

PHP 7.4 and later.
Should also work with PHP 8.0.

### Composer

To install the bindings via [Composer](https://getcomposer.org/), add the following to `composer.json`:

```json
{
  "repositories": [
    {
      "type": "vcs",
      "url": "https://github.com/GIT_USER_ID/GIT_REPO_ID.git"
    }
  ],
  "require": {
    "GIT_USER_ID/GIT_REPO_ID": "*@dev"
  }
}
```

Then run `composer install`

### Manual Installation

Download the files and include `autoload.php`:

```php
<?php
require_once('/path/to/OpenAPIClient-php/vendor/autoload.php');
```

## Getting Started

Please follow the [installation procedure](#installation--usage) and then run the following:

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

## API Endpoints

All URIs are relative to *https://api.a11ywatch.com/api*

Class | Method | HTTP request | Description
------------ | ------------- | ------------- | -------------
*CollectionApi* | [**getAnalytics**](docs/Api/CollectionApi.md#getanalytics) | **GET** /list/analytics | Get the analytics for a website
*CollectionApi* | [**getIssues**](docs/Api/CollectionApi.md#getissues) | **GET** /list/issue | List the issues for a website
*CollectionApi* | [**getPages**](docs/Api/CollectionApi.md#getpages) | **GET** /list/pages | List the pages in order for a website
*CollectionApi* | [**getWebsites**](docs/Api/CollectionApi.md#getwebsites) | **GET** /list/website | Returns websites for the user in alphabetical order
*ReportsApi* | [**crawlWebsite**](docs/Api/ReportsApi.md#crawlwebsite) | **POST** /crawl | Multi-page crawl a website for issues
*ReportsApi* | [**crawlWebsiteStream**](docs/Api/ReportsApi.md#crawlwebsitestream) | **POST** /crawl-stream | Multi-page crawl a website streaming issues on found
*ReportsApi* | [**getReport**](docs/Api/ReportsApi.md#getreport) | **GET** /report | Get the report from a previus scan
*ReportsApi* | [**scanWebsite**](docs/Api/ReportsApi.md#scanwebsite) | **POST** /scan-simple | Scan a website for issues
*UserApi* | [**createUser**](docs/Api/UserApi.md#createuser) | **POST** /register | Register user into the system
*UserApi* | [**getUsers**](docs/Api/UserApi.md#getusers) | **GET** /user | Get user
*UserApi* | [**loginUser**](docs/Api/UserApi.md#loginuser) | **POST** /login | Logs user into the system
*UserApi* | [**logoutUser**](docs/Api/UserApi.md#logoutuser) | **POST** /logout | Logs out current logged in user session
*WebsitesApi* | [**addWebsite**](docs/Api/WebsitesApi.md#addwebsite) | **POST** /website | Add a website in the collection with form data
*WebsitesApi* | [**deleteWebsite**](docs/Api/WebsitesApi.md#deletewebsite) | **DELETE** /website | Deletes a website
*WebsitesApi* | [**getWebsiteByDomain**](docs/Api/WebsitesApi.md#getwebsitebydomain) | **GET** /website | Find website by Domain

## Models

- [Analytics](docs/Model/Analytics.md)
- [AuthInput](docs/Model/AuthInput.md)
- [CrawlInput](docs/Model/CrawlInput.md)
- [CrawlWebsite200Response](docs/Model/CrawlWebsite200Response.md)
- [GenericInput](docs/Model/GenericInput.md)
- [GetAnalytics200Response](docs/Model/GetAnalytics200Response.md)
- [GetIssues200Response](docs/Model/GetIssues200Response.md)
- [GetPages200Response](docs/Model/GetPages200Response.md)
- [GetWebsiteByDomain200Response](docs/Model/GetWebsiteByDomain200Response.md)
- [GetWebsites200Response](docs/Model/GetWebsites200Response.md)
- [History](docs/Model/History.md)
- [Issues](docs/Model/Issues.md)
- [IssuesInfo](docs/Model/IssuesInfo.md)
- [PageIssue](docs/Model/PageIssue.md)
- [PageLoadTime](docs/Model/PageLoadTime.md)
- [Pages](docs/Model/Pages.md)
- [Report](docs/Model/Report.md)
- [ScanWebsite200Response](docs/Model/ScanWebsite200Response.md)
- [Users](docs/Model/Users.md)
- [WebsiteInput](docs/Model/WebsiteInput.md)
- [Websites](docs/Model/Websites.md)
- [WebsitesInsight](docs/Model/WebsitesInsight.md)

## Authorization

### bearerAuth

- **Type**: Bearer authentication (JWT)

## Tests

To run the tests, use:

```bash
composer install
vendor/bin/phpunit
```

## Author



## About this package

This PHP package is automatically generated by the [OpenAPI Generator](https://openapi-generator.tech) project:

- API version: `0.1.0`
- Build package: `org.openapitools.codegen.languages.PhpClientCodegen`

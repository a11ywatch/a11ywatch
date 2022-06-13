# A11ywatchClient.UserApi

All URIs are relative to *https://api.a11ywatch.com/api*

Method | HTTP request | Description
------------- | ------------- | -------------
[**createUser**](UserApi.md#createUser) | **POST** /register | Register user into the system
[**getUsers**](UserApi.md#getUsers) | **GET** /user | Get user
[**loginUser**](UserApi.md#loginUser) | **POST** /login | Logs user into the system
[**logoutUser**](UserApi.md#logoutUser) | **POST** /logout | Logs out current logged in user session



## createUser

> Users createUser(authInput)

Register user into the system

Adds a new user not created yet into the system

### Example

```javascript
import A11ywatchClient from 'a11ywatch_client';
let defaultClient = A11ywatchClient.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: bearerAuth
let bearerAuth = defaultClient.authentications['bearerAuth'];
bearerAuth.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new A11ywatchClient.UserApi();
let authInput = new A11ywatchClient.AuthInput(); // AuthInput | The auth standard body
apiInstance.createUser(authInput, (error, data, response) => {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
});
```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **authInput** | [**AuthInput**](AuthInput.md)| The auth standard body | 

### Return type

[**Users**](Users.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json


## getUsers

> getUsers()

Get user

Retrieve the current user.

### Example

```javascript
import A11ywatchClient from 'a11ywatch_client';
let defaultClient = A11ywatchClient.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: bearerAuth
let bearerAuth = defaultClient.authentications['bearerAuth'];
bearerAuth.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new A11ywatchClient.UserApi();
apiInstance.getUsers((error, data, response) => {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully.');
  }
});
```

### Parameters

This endpoint does not need any parameter.

### Return type

null (empty response body)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: Not defined


## loginUser

> Users loginUser(authInput)

Logs user into the system



### Example

```javascript
import A11ywatchClient from 'a11ywatch_client';
let defaultClient = A11ywatchClient.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: bearerAuth
let bearerAuth = defaultClient.authentications['bearerAuth'];
bearerAuth.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new A11ywatchClient.UserApi();
let authInput = new A11ywatchClient.AuthInput(); // AuthInput | The auth standard body
apiInstance.loginUser(authInput, (error, data, response) => {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
});
```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **authInput** | [**AuthInput**](AuthInput.md)| The auth standard body | 

### Return type

[**Users**](Users.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json


## logoutUser

> logoutUser()

Logs out current logged in user session



### Example

```javascript
import A11ywatchClient from 'a11ywatch_client';
let defaultClient = A11ywatchClient.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: bearerAuth
let bearerAuth = defaultClient.authentications['bearerAuth'];
bearerAuth.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new A11ywatchClient.UserApi();
apiInstance.logoutUser((error, data, response) => {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully.');
  }
});
```

### Parameters

This endpoint does not need any parameter.

### Return type

null (empty response body)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: Not defined


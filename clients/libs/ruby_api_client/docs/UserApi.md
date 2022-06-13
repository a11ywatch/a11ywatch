# OpenapiClient::UserApi

All URIs are relative to *https://api.a11ywatch.com/api*

| Method | HTTP request | Description |
| ------ | ------------ | ----------- |
| [**create_user**](UserApi.md#create_user) | **POST** /register | Register user into the system |
| [**get_users**](UserApi.md#get_users) | **GET** /user | Get user |
| [**login_user**](UserApi.md#login_user) | **POST** /login | Logs user into the system |
| [**logout_user**](UserApi.md#logout_user) | **POST** /logout | Logs out current logged in user session |


## create_user

> <Users> create_user(auth_input)

Register user into the system

Adds a new user not created yet into the system

### Examples

```ruby
require 'time'
require 'openapi_client'
# setup authorization
OpenapiClient.configure do |config|
  # Configure Bearer authorization (JWT): bearerAuth
  config.access_token = 'YOUR_BEARER_TOKEN'
end

api_instance = OpenapiClient::UserApi.new
auth_input = OpenapiClient::AuthInput.new({email: 'email_example', password: 'password_example'}) # AuthInput | The auth standard body

begin
  # Register user into the system
  result = api_instance.create_user(auth_input)
  p result
rescue OpenapiClient::ApiError => e
  puts "Error when calling UserApi->create_user: #{e}"
end
```

#### Using the create_user_with_http_info variant

This returns an Array which contains the response data, status code and headers.

> <Array(<Users>, Integer, Hash)> create_user_with_http_info(auth_input)

```ruby
begin
  # Register user into the system
  data, status_code, headers = api_instance.create_user_with_http_info(auth_input)
  p status_code # => 2xx
  p headers # => { ... }
  p data # => <Users>
rescue OpenapiClient::ApiError => e
  puts "Error when calling UserApi->create_user_with_http_info: #{e}"
end
```

### Parameters

| Name | Type | Description | Notes |
| ---- | ---- | ----------- | ----- |
| **auth_input** | [**AuthInput**](AuthInput.md) | The auth standard body |  |

### Return type

[**Users**](Users.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json


## get_users

> get_users

Get user

Retrieve the current user.

### Examples

```ruby
require 'time'
require 'openapi_client'
# setup authorization
OpenapiClient.configure do |config|
  # Configure Bearer authorization (JWT): bearerAuth
  config.access_token = 'YOUR_BEARER_TOKEN'
end

api_instance = OpenapiClient::UserApi.new

begin
  # Get user
  api_instance.get_users
rescue OpenapiClient::ApiError => e
  puts "Error when calling UserApi->get_users: #{e}"
end
```

#### Using the get_users_with_http_info variant

This returns an Array which contains the response data (`nil` in this case), status code and headers.

> <Array(nil, Integer, Hash)> get_users_with_http_info

```ruby
begin
  # Get user
  data, status_code, headers = api_instance.get_users_with_http_info
  p status_code # => 2xx
  p headers # => { ... }
  p data # => nil
rescue OpenapiClient::ApiError => e
  puts "Error when calling UserApi->get_users_with_http_info: #{e}"
end
```

### Parameters

This endpoint does not need any parameter.

### Return type

nil (empty response body)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: Not defined


## login_user

> <Users> login_user(auth_input)

Logs user into the system



### Examples

```ruby
require 'time'
require 'openapi_client'
# setup authorization
OpenapiClient.configure do |config|
  # Configure Bearer authorization (JWT): bearerAuth
  config.access_token = 'YOUR_BEARER_TOKEN'
end

api_instance = OpenapiClient::UserApi.new
auth_input = OpenapiClient::AuthInput.new({email: 'email_example', password: 'password_example'}) # AuthInput | The auth standard body

begin
  # Logs user into the system
  result = api_instance.login_user(auth_input)
  p result
rescue OpenapiClient::ApiError => e
  puts "Error when calling UserApi->login_user: #{e}"
end
```

#### Using the login_user_with_http_info variant

This returns an Array which contains the response data, status code and headers.

> <Array(<Users>, Integer, Hash)> login_user_with_http_info(auth_input)

```ruby
begin
  # Logs user into the system
  data, status_code, headers = api_instance.login_user_with_http_info(auth_input)
  p status_code # => 2xx
  p headers # => { ... }
  p data # => <Users>
rescue OpenapiClient::ApiError => e
  puts "Error when calling UserApi->login_user_with_http_info: #{e}"
end
```

### Parameters

| Name | Type | Description | Notes |
| ---- | ---- | ----------- | ----- |
| **auth_input** | [**AuthInput**](AuthInput.md) | The auth standard body |  |

### Return type

[**Users**](Users.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json


## logout_user

> logout_user

Logs out current logged in user session



### Examples

```ruby
require 'time'
require 'openapi_client'
# setup authorization
OpenapiClient.configure do |config|
  # Configure Bearer authorization (JWT): bearerAuth
  config.access_token = 'YOUR_BEARER_TOKEN'
end

api_instance = OpenapiClient::UserApi.new

begin
  # Logs out current logged in user session
  api_instance.logout_user
rescue OpenapiClient::ApiError => e
  puts "Error when calling UserApi->logout_user: #{e}"
end
```

#### Using the logout_user_with_http_info variant

This returns an Array which contains the response data (`nil` in this case), status code and headers.

> <Array(nil, Integer, Hash)> logout_user_with_http_info

```ruby
begin
  # Logs out current logged in user session
  data, status_code, headers = api_instance.logout_user_with_http_info
  p status_code # => 2xx
  p headers # => { ... }
  p data # => nil
rescue OpenapiClient::ApiError => e
  puts "Error when calling UserApi->logout_user_with_http_info: #{e}"
end
```

### Parameters

This endpoint does not need any parameter.

### Return type

nil (empty response body)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: Not defined


# Users

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**Id** | Pointer to **int64** |  | [optional] 
**Email** | Pointer to **string** |  | [optional] 
**Jwt** | Pointer to **string** |  | [optional] 
**Role** | Pointer to **string** |  | [optional] 
**Password** | Pointer to **string** |  | [optional] 
**AlertEnabled** | Pointer to **bool** |  | [optional] 

## Methods

### NewUsers

`func NewUsers() *Users`

NewUsers instantiates a new Users object
This constructor will assign default values to properties that have it defined,
and makes sure properties required by API are set, but the set of arguments
will change when the set of required properties is changed

### NewUsersWithDefaults

`func NewUsersWithDefaults() *Users`

NewUsersWithDefaults instantiates a new Users object
This constructor will only assign default values to properties that have it defined,
but it doesn't guarantee that properties required by API are set

### GetId

`func (o *Users) GetId() int64`

GetId returns the Id field if non-nil, zero value otherwise.

### GetIdOk

`func (o *Users) GetIdOk() (*int64, bool)`

GetIdOk returns a tuple with the Id field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetId

`func (o *Users) SetId(v int64)`

SetId sets Id field to given value.

### HasId

`func (o *Users) HasId() bool`

HasId returns a boolean if a field has been set.

### GetEmail

`func (o *Users) GetEmail() string`

GetEmail returns the Email field if non-nil, zero value otherwise.

### GetEmailOk

`func (o *Users) GetEmailOk() (*string, bool)`

GetEmailOk returns a tuple with the Email field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetEmail

`func (o *Users) SetEmail(v string)`

SetEmail sets Email field to given value.

### HasEmail

`func (o *Users) HasEmail() bool`

HasEmail returns a boolean if a field has been set.

### GetJwt

`func (o *Users) GetJwt() string`

GetJwt returns the Jwt field if non-nil, zero value otherwise.

### GetJwtOk

`func (o *Users) GetJwtOk() (*string, bool)`

GetJwtOk returns a tuple with the Jwt field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetJwt

`func (o *Users) SetJwt(v string)`

SetJwt sets Jwt field to given value.

### HasJwt

`func (o *Users) HasJwt() bool`

HasJwt returns a boolean if a field has been set.

### GetRole

`func (o *Users) GetRole() string`

GetRole returns the Role field if non-nil, zero value otherwise.

### GetRoleOk

`func (o *Users) GetRoleOk() (*string, bool)`

GetRoleOk returns a tuple with the Role field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetRole

`func (o *Users) SetRole(v string)`

SetRole sets Role field to given value.

### HasRole

`func (o *Users) HasRole() bool`

HasRole returns a boolean if a field has been set.

### GetPassword

`func (o *Users) GetPassword() string`

GetPassword returns the Password field if non-nil, zero value otherwise.

### GetPasswordOk

`func (o *Users) GetPasswordOk() (*string, bool)`

GetPasswordOk returns a tuple with the Password field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetPassword

`func (o *Users) SetPassword(v string)`

SetPassword sets Password field to given value.

### HasPassword

`func (o *Users) HasPassword() bool`

HasPassword returns a boolean if a field has been set.

### GetAlertEnabled

`func (o *Users) GetAlertEnabled() bool`

GetAlertEnabled returns the AlertEnabled field if non-nil, zero value otherwise.

### GetAlertEnabledOk

`func (o *Users) GetAlertEnabledOk() (*bool, bool)`

GetAlertEnabledOk returns a tuple with the AlertEnabled field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetAlertEnabled

`func (o *Users) SetAlertEnabled(v bool)`

SetAlertEnabled sets AlertEnabled field to given value.

### HasAlertEnabled

`func (o *Users) HasAlertEnabled() bool`

HasAlertEnabled returns a boolean if a field has been set.


[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)



# Issues

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**Id** | Pointer to **int64** |  | [optional] 
**UserId** | Pointer to **int64** |  | [optional] 
**Domain** | Pointer to **string** |  | [optional] 
**PageUrl** | Pointer to **string** |  | [optional] 
**Issues** | Pointer to [**PageIssue**](PageIssue.md) |  | [optional] 

## Methods

### NewIssues

`func NewIssues() *Issues`

NewIssues instantiates a new Issues object
This constructor will assign default values to properties that have it defined,
and makes sure properties required by API are set, but the set of arguments
will change when the set of required properties is changed

### NewIssuesWithDefaults

`func NewIssuesWithDefaults() *Issues`

NewIssuesWithDefaults instantiates a new Issues object
This constructor will only assign default values to properties that have it defined,
but it doesn't guarantee that properties required by API are set

### GetId

`func (o *Issues) GetId() int64`

GetId returns the Id field if non-nil, zero value otherwise.

### GetIdOk

`func (o *Issues) GetIdOk() (*int64, bool)`

GetIdOk returns a tuple with the Id field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetId

`func (o *Issues) SetId(v int64)`

SetId sets Id field to given value.

### HasId

`func (o *Issues) HasId() bool`

HasId returns a boolean if a field has been set.

### GetUserId

`func (o *Issues) GetUserId() int64`

GetUserId returns the UserId field if non-nil, zero value otherwise.

### GetUserIdOk

`func (o *Issues) GetUserIdOk() (*int64, bool)`

GetUserIdOk returns a tuple with the UserId field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetUserId

`func (o *Issues) SetUserId(v int64)`

SetUserId sets UserId field to given value.

### HasUserId

`func (o *Issues) HasUserId() bool`

HasUserId returns a boolean if a field has been set.

### GetDomain

`func (o *Issues) GetDomain() string`

GetDomain returns the Domain field if non-nil, zero value otherwise.

### GetDomainOk

`func (o *Issues) GetDomainOk() (*string, bool)`

GetDomainOk returns a tuple with the Domain field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetDomain

`func (o *Issues) SetDomain(v string)`

SetDomain sets Domain field to given value.

### HasDomain

`func (o *Issues) HasDomain() bool`

HasDomain returns a boolean if a field has been set.

### GetPageUrl

`func (o *Issues) GetPageUrl() string`

GetPageUrl returns the PageUrl field if non-nil, zero value otherwise.

### GetPageUrlOk

`func (o *Issues) GetPageUrlOk() (*string, bool)`

GetPageUrlOk returns a tuple with the PageUrl field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetPageUrl

`func (o *Issues) SetPageUrl(v string)`

SetPageUrl sets PageUrl field to given value.

### HasPageUrl

`func (o *Issues) HasPageUrl() bool`

HasPageUrl returns a boolean if a field has been set.

### GetIssues

`func (o *Issues) GetIssues() PageIssue`

GetIssues returns the Issues field if non-nil, zero value otherwise.

### GetIssuesOk

`func (o *Issues) GetIssuesOk() (*PageIssue, bool)`

GetIssuesOk returns a tuple with the Issues field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetIssues

`func (o *Issues) SetIssues(v PageIssue)`

SetIssues sets Issues field to given value.

### HasIssues

`func (o *Issues) HasIssues() bool`

HasIssues returns a boolean if a field has been set.


[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)



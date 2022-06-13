# GetIssues200Response

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**Data** | Pointer to [**[]Issues**](Issues.md) |  | [optional] 

## Methods

### NewGetIssues200Response

`func NewGetIssues200Response() *GetIssues200Response`

NewGetIssues200Response instantiates a new GetIssues200Response object
This constructor will assign default values to properties that have it defined,
and makes sure properties required by API are set, but the set of arguments
will change when the set of required properties is changed

### NewGetIssues200ResponseWithDefaults

`func NewGetIssues200ResponseWithDefaults() *GetIssues200Response`

NewGetIssues200ResponseWithDefaults instantiates a new GetIssues200Response object
This constructor will only assign default values to properties that have it defined,
but it doesn't guarantee that properties required by API are set

### GetData

`func (o *GetIssues200Response) GetData() []Issues`

GetData returns the Data field if non-nil, zero value otherwise.

### GetDataOk

`func (o *GetIssues200Response) GetDataOk() (*[]Issues, bool)`

GetDataOk returns a tuple with the Data field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetData

`func (o *GetIssues200Response) SetData(v []Issues)`

SetData sets Data field to given value.

### HasData

`func (o *GetIssues200Response) HasData() bool`

HasData returns a boolean if a field has been set.


[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)



# Report

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**Id** | Pointer to **int64** |  | [optional] 
**Domain** | Pointer to **string** |  | [optional] 
**PageUrl** | Pointer to **string** |  | [optional] 
**Issues** | Pointer to [**PageIssue**](PageIssue.md) |  | [optional] 
**IssuesInfo** | Pointer to [**IssuesInfo**](IssuesInfo.md) |  | [optional] 

## Methods

### NewReport

`func NewReport() *Report`

NewReport instantiates a new Report object
This constructor will assign default values to properties that have it defined,
and makes sure properties required by API are set, but the set of arguments
will change when the set of required properties is changed

### NewReportWithDefaults

`func NewReportWithDefaults() *Report`

NewReportWithDefaults instantiates a new Report object
This constructor will only assign default values to properties that have it defined,
but it doesn't guarantee that properties required by API are set

### GetId

`func (o *Report) GetId() int64`

GetId returns the Id field if non-nil, zero value otherwise.

### GetIdOk

`func (o *Report) GetIdOk() (*int64, bool)`

GetIdOk returns a tuple with the Id field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetId

`func (o *Report) SetId(v int64)`

SetId sets Id field to given value.

### HasId

`func (o *Report) HasId() bool`

HasId returns a boolean if a field has been set.

### GetDomain

`func (o *Report) GetDomain() string`

GetDomain returns the Domain field if non-nil, zero value otherwise.

### GetDomainOk

`func (o *Report) GetDomainOk() (*string, bool)`

GetDomainOk returns a tuple with the Domain field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetDomain

`func (o *Report) SetDomain(v string)`

SetDomain sets Domain field to given value.

### HasDomain

`func (o *Report) HasDomain() bool`

HasDomain returns a boolean if a field has been set.

### GetPageUrl

`func (o *Report) GetPageUrl() string`

GetPageUrl returns the PageUrl field if non-nil, zero value otherwise.

### GetPageUrlOk

`func (o *Report) GetPageUrlOk() (*string, bool)`

GetPageUrlOk returns a tuple with the PageUrl field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetPageUrl

`func (o *Report) SetPageUrl(v string)`

SetPageUrl sets PageUrl field to given value.

### HasPageUrl

`func (o *Report) HasPageUrl() bool`

HasPageUrl returns a boolean if a field has been set.

### GetIssues

`func (o *Report) GetIssues() PageIssue`

GetIssues returns the Issues field if non-nil, zero value otherwise.

### GetIssuesOk

`func (o *Report) GetIssuesOk() (*PageIssue, bool)`

GetIssuesOk returns a tuple with the Issues field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetIssues

`func (o *Report) SetIssues(v PageIssue)`

SetIssues sets Issues field to given value.

### HasIssues

`func (o *Report) HasIssues() bool`

HasIssues returns a boolean if a field has been set.

### GetIssuesInfo

`func (o *Report) GetIssuesInfo() IssuesInfo`

GetIssuesInfo returns the IssuesInfo field if non-nil, zero value otherwise.

### GetIssuesInfoOk

`func (o *Report) GetIssuesInfoOk() (*IssuesInfo, bool)`

GetIssuesInfoOk returns a tuple with the IssuesInfo field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetIssuesInfo

`func (o *Report) SetIssuesInfo(v IssuesInfo)`

SetIssuesInfo sets IssuesInfo field to given value.

### HasIssuesInfo

`func (o *Report) HasIssuesInfo() bool`

HasIssuesInfo returns a boolean if a field has been set.


[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)



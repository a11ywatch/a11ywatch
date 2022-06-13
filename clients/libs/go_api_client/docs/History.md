# History

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**Id** | Pointer to **int64** |  | [optional] 
**Domain** | Pointer to **string** |  | [optional] 
**Insight** | Pointer to [**WebsitesInsight**](WebsitesInsight.md) |  | [optional] 
**PageHeaders** | Pointer to **[]string** |  | [optional] 
**IssuesInfo** | Pointer to [**IssuesInfo**](IssuesInfo.md) |  | [optional] 

## Methods

### NewHistory

`func NewHistory() *History`

NewHistory instantiates a new History object
This constructor will assign default values to properties that have it defined,
and makes sure properties required by API are set, but the set of arguments
will change when the set of required properties is changed

### NewHistoryWithDefaults

`func NewHistoryWithDefaults() *History`

NewHistoryWithDefaults instantiates a new History object
This constructor will only assign default values to properties that have it defined,
but it doesn't guarantee that properties required by API are set

### GetId

`func (o *History) GetId() int64`

GetId returns the Id field if non-nil, zero value otherwise.

### GetIdOk

`func (o *History) GetIdOk() (*int64, bool)`

GetIdOk returns a tuple with the Id field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetId

`func (o *History) SetId(v int64)`

SetId sets Id field to given value.

### HasId

`func (o *History) HasId() bool`

HasId returns a boolean if a field has been set.

### GetDomain

`func (o *History) GetDomain() string`

GetDomain returns the Domain field if non-nil, zero value otherwise.

### GetDomainOk

`func (o *History) GetDomainOk() (*string, bool)`

GetDomainOk returns a tuple with the Domain field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetDomain

`func (o *History) SetDomain(v string)`

SetDomain sets Domain field to given value.

### HasDomain

`func (o *History) HasDomain() bool`

HasDomain returns a boolean if a field has been set.

### GetInsight

`func (o *History) GetInsight() WebsitesInsight`

GetInsight returns the Insight field if non-nil, zero value otherwise.

### GetInsightOk

`func (o *History) GetInsightOk() (*WebsitesInsight, bool)`

GetInsightOk returns a tuple with the Insight field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetInsight

`func (o *History) SetInsight(v WebsitesInsight)`

SetInsight sets Insight field to given value.

### HasInsight

`func (o *History) HasInsight() bool`

HasInsight returns a boolean if a field has been set.

### GetPageHeaders

`func (o *History) GetPageHeaders() []string`

GetPageHeaders returns the PageHeaders field if non-nil, zero value otherwise.

### GetPageHeadersOk

`func (o *History) GetPageHeadersOk() (*[]string, bool)`

GetPageHeadersOk returns a tuple with the PageHeaders field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetPageHeaders

`func (o *History) SetPageHeaders(v []string)`

SetPageHeaders sets PageHeaders field to given value.

### HasPageHeaders

`func (o *History) HasPageHeaders() bool`

HasPageHeaders returns a boolean if a field has been set.

### GetIssuesInfo

`func (o *History) GetIssuesInfo() IssuesInfo`

GetIssuesInfo returns the IssuesInfo field if non-nil, zero value otherwise.

### GetIssuesInfoOk

`func (o *History) GetIssuesInfoOk() (*IssuesInfo, bool)`

GetIssuesInfoOk returns a tuple with the IssuesInfo field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetIssuesInfo

`func (o *History) SetIssuesInfo(v IssuesInfo)`

SetIssuesInfo sets IssuesInfo field to given value.

### HasIssuesInfo

`func (o *History) HasIssuesInfo() bool`

HasIssuesInfo returns a boolean if a field has been set.


[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)



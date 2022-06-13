# Analytics

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**Id** | Pointer to **int64** |  | [optional] 
**Domain** | Pointer to **string** |  | [optional] 
**PageUrl** | Pointer to **string** |  | [optional] 
**UserId** | Pointer to **int64** |  | [optional] 
**AdaScore** | Pointer to **int64** |  | [optional] 
**PossibleIssuesFixedByCdn** | Pointer to **int64** |  | [optional] 
**TotalIssues** | Pointer to **int64** |  | [optional] 
**IssuesFixedByCdn** | Pointer to **int64** |  | [optional] 
**ErrorCount** | Pointer to **int64** |  | [optional] 
**WarningCount** | Pointer to **int64** |  | [optional] 
**NoticeCount** | Pointer to **int64** |  | [optional] 

## Methods

### NewAnalytics

`func NewAnalytics() *Analytics`

NewAnalytics instantiates a new Analytics object
This constructor will assign default values to properties that have it defined,
and makes sure properties required by API are set, but the set of arguments
will change when the set of required properties is changed

### NewAnalyticsWithDefaults

`func NewAnalyticsWithDefaults() *Analytics`

NewAnalyticsWithDefaults instantiates a new Analytics object
This constructor will only assign default values to properties that have it defined,
but it doesn't guarantee that properties required by API are set

### GetId

`func (o *Analytics) GetId() int64`

GetId returns the Id field if non-nil, zero value otherwise.

### GetIdOk

`func (o *Analytics) GetIdOk() (*int64, bool)`

GetIdOk returns a tuple with the Id field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetId

`func (o *Analytics) SetId(v int64)`

SetId sets Id field to given value.

### HasId

`func (o *Analytics) HasId() bool`

HasId returns a boolean if a field has been set.

### GetDomain

`func (o *Analytics) GetDomain() string`

GetDomain returns the Domain field if non-nil, zero value otherwise.

### GetDomainOk

`func (o *Analytics) GetDomainOk() (*string, bool)`

GetDomainOk returns a tuple with the Domain field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetDomain

`func (o *Analytics) SetDomain(v string)`

SetDomain sets Domain field to given value.

### HasDomain

`func (o *Analytics) HasDomain() bool`

HasDomain returns a boolean if a field has been set.

### GetPageUrl

`func (o *Analytics) GetPageUrl() string`

GetPageUrl returns the PageUrl field if non-nil, zero value otherwise.

### GetPageUrlOk

`func (o *Analytics) GetPageUrlOk() (*string, bool)`

GetPageUrlOk returns a tuple with the PageUrl field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetPageUrl

`func (o *Analytics) SetPageUrl(v string)`

SetPageUrl sets PageUrl field to given value.

### HasPageUrl

`func (o *Analytics) HasPageUrl() bool`

HasPageUrl returns a boolean if a field has been set.

### GetUserId

`func (o *Analytics) GetUserId() int64`

GetUserId returns the UserId field if non-nil, zero value otherwise.

### GetUserIdOk

`func (o *Analytics) GetUserIdOk() (*int64, bool)`

GetUserIdOk returns a tuple with the UserId field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetUserId

`func (o *Analytics) SetUserId(v int64)`

SetUserId sets UserId field to given value.

### HasUserId

`func (o *Analytics) HasUserId() bool`

HasUserId returns a boolean if a field has been set.

### GetAdaScore

`func (o *Analytics) GetAdaScore() int64`

GetAdaScore returns the AdaScore field if non-nil, zero value otherwise.

### GetAdaScoreOk

`func (o *Analytics) GetAdaScoreOk() (*int64, bool)`

GetAdaScoreOk returns a tuple with the AdaScore field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetAdaScore

`func (o *Analytics) SetAdaScore(v int64)`

SetAdaScore sets AdaScore field to given value.

### HasAdaScore

`func (o *Analytics) HasAdaScore() bool`

HasAdaScore returns a boolean if a field has been set.

### GetPossibleIssuesFixedByCdn

`func (o *Analytics) GetPossibleIssuesFixedByCdn() int64`

GetPossibleIssuesFixedByCdn returns the PossibleIssuesFixedByCdn field if non-nil, zero value otherwise.

### GetPossibleIssuesFixedByCdnOk

`func (o *Analytics) GetPossibleIssuesFixedByCdnOk() (*int64, bool)`

GetPossibleIssuesFixedByCdnOk returns a tuple with the PossibleIssuesFixedByCdn field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetPossibleIssuesFixedByCdn

`func (o *Analytics) SetPossibleIssuesFixedByCdn(v int64)`

SetPossibleIssuesFixedByCdn sets PossibleIssuesFixedByCdn field to given value.

### HasPossibleIssuesFixedByCdn

`func (o *Analytics) HasPossibleIssuesFixedByCdn() bool`

HasPossibleIssuesFixedByCdn returns a boolean if a field has been set.

### GetTotalIssues

`func (o *Analytics) GetTotalIssues() int64`

GetTotalIssues returns the TotalIssues field if non-nil, zero value otherwise.

### GetTotalIssuesOk

`func (o *Analytics) GetTotalIssuesOk() (*int64, bool)`

GetTotalIssuesOk returns a tuple with the TotalIssues field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetTotalIssues

`func (o *Analytics) SetTotalIssues(v int64)`

SetTotalIssues sets TotalIssues field to given value.

### HasTotalIssues

`func (o *Analytics) HasTotalIssues() bool`

HasTotalIssues returns a boolean if a field has been set.

### GetIssuesFixedByCdn

`func (o *Analytics) GetIssuesFixedByCdn() int64`

GetIssuesFixedByCdn returns the IssuesFixedByCdn field if non-nil, zero value otherwise.

### GetIssuesFixedByCdnOk

`func (o *Analytics) GetIssuesFixedByCdnOk() (*int64, bool)`

GetIssuesFixedByCdnOk returns a tuple with the IssuesFixedByCdn field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetIssuesFixedByCdn

`func (o *Analytics) SetIssuesFixedByCdn(v int64)`

SetIssuesFixedByCdn sets IssuesFixedByCdn field to given value.

### HasIssuesFixedByCdn

`func (o *Analytics) HasIssuesFixedByCdn() bool`

HasIssuesFixedByCdn returns a boolean if a field has been set.

### GetErrorCount

`func (o *Analytics) GetErrorCount() int64`

GetErrorCount returns the ErrorCount field if non-nil, zero value otherwise.

### GetErrorCountOk

`func (o *Analytics) GetErrorCountOk() (*int64, bool)`

GetErrorCountOk returns a tuple with the ErrorCount field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetErrorCount

`func (o *Analytics) SetErrorCount(v int64)`

SetErrorCount sets ErrorCount field to given value.

### HasErrorCount

`func (o *Analytics) HasErrorCount() bool`

HasErrorCount returns a boolean if a field has been set.

### GetWarningCount

`func (o *Analytics) GetWarningCount() int64`

GetWarningCount returns the WarningCount field if non-nil, zero value otherwise.

### GetWarningCountOk

`func (o *Analytics) GetWarningCountOk() (*int64, bool)`

GetWarningCountOk returns a tuple with the WarningCount field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetWarningCount

`func (o *Analytics) SetWarningCount(v int64)`

SetWarningCount sets WarningCount field to given value.

### HasWarningCount

`func (o *Analytics) HasWarningCount() bool`

HasWarningCount returns a boolean if a field has been set.

### GetNoticeCount

`func (o *Analytics) GetNoticeCount() int64`

GetNoticeCount returns the NoticeCount field if non-nil, zero value otherwise.

### GetNoticeCountOk

`func (o *Analytics) GetNoticeCountOk() (*int64, bool)`

GetNoticeCountOk returns a tuple with the NoticeCount field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetNoticeCount

`func (o *Analytics) SetNoticeCount(v int64)`

SetNoticeCount sets NoticeCount field to given value.

### HasNoticeCount

`func (o *Analytics) HasNoticeCount() bool`

HasNoticeCount returns a boolean if a field has been set.


[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)



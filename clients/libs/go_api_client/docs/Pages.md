# Pages

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**Id** | Pointer to **int64** |  | [optional] 
**UserId** | Pointer to **int64** |  | [optional] 
**Domain** | Pointer to **string** |  | [optional] 
**Url** | Pointer to **string** |  | [optional] 
**CdnConnected** | Pointer to **bool** |  | [optional] 
**Online** | Pointer to **bool** |  | [optional] 
**PageLoadTime** | Pointer to [**PageLoadTime**](PageLoadTime.md) |  | [optional] 
**Insight** | Pointer to [**WebsitesInsight**](WebsitesInsight.md) |  | [optional] 
**IssuesInfo** | Pointer to [**IssuesInfo**](IssuesInfo.md) |  | [optional] 
**LastScanDate** | Pointer to **string** |  | [optional] 

## Methods

### NewPages

`func NewPages() *Pages`

NewPages instantiates a new Pages object
This constructor will assign default values to properties that have it defined,
and makes sure properties required by API are set, but the set of arguments
will change when the set of required properties is changed

### NewPagesWithDefaults

`func NewPagesWithDefaults() *Pages`

NewPagesWithDefaults instantiates a new Pages object
This constructor will only assign default values to properties that have it defined,
but it doesn't guarantee that properties required by API are set

### GetId

`func (o *Pages) GetId() int64`

GetId returns the Id field if non-nil, zero value otherwise.

### GetIdOk

`func (o *Pages) GetIdOk() (*int64, bool)`

GetIdOk returns a tuple with the Id field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetId

`func (o *Pages) SetId(v int64)`

SetId sets Id field to given value.

### HasId

`func (o *Pages) HasId() bool`

HasId returns a boolean if a field has been set.

### GetUserId

`func (o *Pages) GetUserId() int64`

GetUserId returns the UserId field if non-nil, zero value otherwise.

### GetUserIdOk

`func (o *Pages) GetUserIdOk() (*int64, bool)`

GetUserIdOk returns a tuple with the UserId field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetUserId

`func (o *Pages) SetUserId(v int64)`

SetUserId sets UserId field to given value.

### HasUserId

`func (o *Pages) HasUserId() bool`

HasUserId returns a boolean if a field has been set.

### GetDomain

`func (o *Pages) GetDomain() string`

GetDomain returns the Domain field if non-nil, zero value otherwise.

### GetDomainOk

`func (o *Pages) GetDomainOk() (*string, bool)`

GetDomainOk returns a tuple with the Domain field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetDomain

`func (o *Pages) SetDomain(v string)`

SetDomain sets Domain field to given value.

### HasDomain

`func (o *Pages) HasDomain() bool`

HasDomain returns a boolean if a field has been set.

### GetUrl

`func (o *Pages) GetUrl() string`

GetUrl returns the Url field if non-nil, zero value otherwise.

### GetUrlOk

`func (o *Pages) GetUrlOk() (*string, bool)`

GetUrlOk returns a tuple with the Url field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetUrl

`func (o *Pages) SetUrl(v string)`

SetUrl sets Url field to given value.

### HasUrl

`func (o *Pages) HasUrl() bool`

HasUrl returns a boolean if a field has been set.

### GetCdnConnected

`func (o *Pages) GetCdnConnected() bool`

GetCdnConnected returns the CdnConnected field if non-nil, zero value otherwise.

### GetCdnConnectedOk

`func (o *Pages) GetCdnConnectedOk() (*bool, bool)`

GetCdnConnectedOk returns a tuple with the CdnConnected field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetCdnConnected

`func (o *Pages) SetCdnConnected(v bool)`

SetCdnConnected sets CdnConnected field to given value.

### HasCdnConnected

`func (o *Pages) HasCdnConnected() bool`

HasCdnConnected returns a boolean if a field has been set.

### GetOnline

`func (o *Pages) GetOnline() bool`

GetOnline returns the Online field if non-nil, zero value otherwise.

### GetOnlineOk

`func (o *Pages) GetOnlineOk() (*bool, bool)`

GetOnlineOk returns a tuple with the Online field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetOnline

`func (o *Pages) SetOnline(v bool)`

SetOnline sets Online field to given value.

### HasOnline

`func (o *Pages) HasOnline() bool`

HasOnline returns a boolean if a field has been set.

### GetPageLoadTime

`func (o *Pages) GetPageLoadTime() PageLoadTime`

GetPageLoadTime returns the PageLoadTime field if non-nil, zero value otherwise.

### GetPageLoadTimeOk

`func (o *Pages) GetPageLoadTimeOk() (*PageLoadTime, bool)`

GetPageLoadTimeOk returns a tuple with the PageLoadTime field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetPageLoadTime

`func (o *Pages) SetPageLoadTime(v PageLoadTime)`

SetPageLoadTime sets PageLoadTime field to given value.

### HasPageLoadTime

`func (o *Pages) HasPageLoadTime() bool`

HasPageLoadTime returns a boolean if a field has been set.

### GetInsight

`func (o *Pages) GetInsight() WebsitesInsight`

GetInsight returns the Insight field if non-nil, zero value otherwise.

### GetInsightOk

`func (o *Pages) GetInsightOk() (*WebsitesInsight, bool)`

GetInsightOk returns a tuple with the Insight field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetInsight

`func (o *Pages) SetInsight(v WebsitesInsight)`

SetInsight sets Insight field to given value.

### HasInsight

`func (o *Pages) HasInsight() bool`

HasInsight returns a boolean if a field has been set.

### GetIssuesInfo

`func (o *Pages) GetIssuesInfo() IssuesInfo`

GetIssuesInfo returns the IssuesInfo field if non-nil, zero value otherwise.

### GetIssuesInfoOk

`func (o *Pages) GetIssuesInfoOk() (*IssuesInfo, bool)`

GetIssuesInfoOk returns a tuple with the IssuesInfo field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetIssuesInfo

`func (o *Pages) SetIssuesInfo(v IssuesInfo)`

SetIssuesInfo sets IssuesInfo field to given value.

### HasIssuesInfo

`func (o *Pages) HasIssuesInfo() bool`

HasIssuesInfo returns a boolean if a field has been set.

### GetLastScanDate

`func (o *Pages) GetLastScanDate() string`

GetLastScanDate returns the LastScanDate field if non-nil, zero value otherwise.

### GetLastScanDateOk

`func (o *Pages) GetLastScanDateOk() (*string, bool)`

GetLastScanDateOk returns a tuple with the LastScanDate field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetLastScanDate

`func (o *Pages) SetLastScanDate(v string)`

SetLastScanDate sets LastScanDate field to given value.

### HasLastScanDate

`func (o *Pages) HasLastScanDate() bool`

HasLastScanDate returns a boolean if a field has been set.


[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)



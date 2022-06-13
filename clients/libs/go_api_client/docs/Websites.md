# Websites

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**Id** | Pointer to **int64** |  | [optional] 
**UserId** | Pointer to **int64** |  | [optional] 
**Url** | Pointer to **string** |  | [optional] 
**Domain** | Pointer to **string** |  | [optional] 
**CrawlDuration** | Pointer to **int64** |  | [optional] 
**CdnConnected** | Pointer to **bool** |  | [optional] 
**PageInsights** | Pointer to **bool** |  | [optional] 
**Online** | Pointer to **bool** |  | [optional] 
**Mobile** | Pointer to **bool** |  | [optional] 
**Robots** | Pointer to **bool** |  | [optional] 
**Insight** | Pointer to [**WebsitesInsight**](WebsitesInsight.md) |  | [optional] 
**PageHeaders** | Pointer to **[]string** |  | [optional] 
**PageLoadTime** | Pointer to [**PageLoadTime**](PageLoadTime.md) |  | [optional] 
**IssuesInfo** | Pointer to [**IssuesInfo**](IssuesInfo.md) |  | [optional] 

## Methods

### NewWebsites

`func NewWebsites() *Websites`

NewWebsites instantiates a new Websites object
This constructor will assign default values to properties that have it defined,
and makes sure properties required by API are set, but the set of arguments
will change when the set of required properties is changed

### NewWebsitesWithDefaults

`func NewWebsitesWithDefaults() *Websites`

NewWebsitesWithDefaults instantiates a new Websites object
This constructor will only assign default values to properties that have it defined,
but it doesn't guarantee that properties required by API are set

### GetId

`func (o *Websites) GetId() int64`

GetId returns the Id field if non-nil, zero value otherwise.

### GetIdOk

`func (o *Websites) GetIdOk() (*int64, bool)`

GetIdOk returns a tuple with the Id field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetId

`func (o *Websites) SetId(v int64)`

SetId sets Id field to given value.

### HasId

`func (o *Websites) HasId() bool`

HasId returns a boolean if a field has been set.

### GetUserId

`func (o *Websites) GetUserId() int64`

GetUserId returns the UserId field if non-nil, zero value otherwise.

### GetUserIdOk

`func (o *Websites) GetUserIdOk() (*int64, bool)`

GetUserIdOk returns a tuple with the UserId field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetUserId

`func (o *Websites) SetUserId(v int64)`

SetUserId sets UserId field to given value.

### HasUserId

`func (o *Websites) HasUserId() bool`

HasUserId returns a boolean if a field has been set.

### GetUrl

`func (o *Websites) GetUrl() string`

GetUrl returns the Url field if non-nil, zero value otherwise.

### GetUrlOk

`func (o *Websites) GetUrlOk() (*string, bool)`

GetUrlOk returns a tuple with the Url field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetUrl

`func (o *Websites) SetUrl(v string)`

SetUrl sets Url field to given value.

### HasUrl

`func (o *Websites) HasUrl() bool`

HasUrl returns a boolean if a field has been set.

### GetDomain

`func (o *Websites) GetDomain() string`

GetDomain returns the Domain field if non-nil, zero value otherwise.

### GetDomainOk

`func (o *Websites) GetDomainOk() (*string, bool)`

GetDomainOk returns a tuple with the Domain field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetDomain

`func (o *Websites) SetDomain(v string)`

SetDomain sets Domain field to given value.

### HasDomain

`func (o *Websites) HasDomain() bool`

HasDomain returns a boolean if a field has been set.

### GetCrawlDuration

`func (o *Websites) GetCrawlDuration() int64`

GetCrawlDuration returns the CrawlDuration field if non-nil, zero value otherwise.

### GetCrawlDurationOk

`func (o *Websites) GetCrawlDurationOk() (*int64, bool)`

GetCrawlDurationOk returns a tuple with the CrawlDuration field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetCrawlDuration

`func (o *Websites) SetCrawlDuration(v int64)`

SetCrawlDuration sets CrawlDuration field to given value.

### HasCrawlDuration

`func (o *Websites) HasCrawlDuration() bool`

HasCrawlDuration returns a boolean if a field has been set.

### GetCdnConnected

`func (o *Websites) GetCdnConnected() bool`

GetCdnConnected returns the CdnConnected field if non-nil, zero value otherwise.

### GetCdnConnectedOk

`func (o *Websites) GetCdnConnectedOk() (*bool, bool)`

GetCdnConnectedOk returns a tuple with the CdnConnected field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetCdnConnected

`func (o *Websites) SetCdnConnected(v bool)`

SetCdnConnected sets CdnConnected field to given value.

### HasCdnConnected

`func (o *Websites) HasCdnConnected() bool`

HasCdnConnected returns a boolean if a field has been set.

### GetPageInsights

`func (o *Websites) GetPageInsights() bool`

GetPageInsights returns the PageInsights field if non-nil, zero value otherwise.

### GetPageInsightsOk

`func (o *Websites) GetPageInsightsOk() (*bool, bool)`

GetPageInsightsOk returns a tuple with the PageInsights field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetPageInsights

`func (o *Websites) SetPageInsights(v bool)`

SetPageInsights sets PageInsights field to given value.

### HasPageInsights

`func (o *Websites) HasPageInsights() bool`

HasPageInsights returns a boolean if a field has been set.

### GetOnline

`func (o *Websites) GetOnline() bool`

GetOnline returns the Online field if non-nil, zero value otherwise.

### GetOnlineOk

`func (o *Websites) GetOnlineOk() (*bool, bool)`

GetOnlineOk returns a tuple with the Online field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetOnline

`func (o *Websites) SetOnline(v bool)`

SetOnline sets Online field to given value.

### HasOnline

`func (o *Websites) HasOnline() bool`

HasOnline returns a boolean if a field has been set.

### GetMobile

`func (o *Websites) GetMobile() bool`

GetMobile returns the Mobile field if non-nil, zero value otherwise.

### GetMobileOk

`func (o *Websites) GetMobileOk() (*bool, bool)`

GetMobileOk returns a tuple with the Mobile field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetMobile

`func (o *Websites) SetMobile(v bool)`

SetMobile sets Mobile field to given value.

### HasMobile

`func (o *Websites) HasMobile() bool`

HasMobile returns a boolean if a field has been set.

### GetRobots

`func (o *Websites) GetRobots() bool`

GetRobots returns the Robots field if non-nil, zero value otherwise.

### GetRobotsOk

`func (o *Websites) GetRobotsOk() (*bool, bool)`

GetRobotsOk returns a tuple with the Robots field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetRobots

`func (o *Websites) SetRobots(v bool)`

SetRobots sets Robots field to given value.

### HasRobots

`func (o *Websites) HasRobots() bool`

HasRobots returns a boolean if a field has been set.

### GetInsight

`func (o *Websites) GetInsight() WebsitesInsight`

GetInsight returns the Insight field if non-nil, zero value otherwise.

### GetInsightOk

`func (o *Websites) GetInsightOk() (*WebsitesInsight, bool)`

GetInsightOk returns a tuple with the Insight field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetInsight

`func (o *Websites) SetInsight(v WebsitesInsight)`

SetInsight sets Insight field to given value.

### HasInsight

`func (o *Websites) HasInsight() bool`

HasInsight returns a boolean if a field has been set.

### GetPageHeaders

`func (o *Websites) GetPageHeaders() []string`

GetPageHeaders returns the PageHeaders field if non-nil, zero value otherwise.

### GetPageHeadersOk

`func (o *Websites) GetPageHeadersOk() (*[]string, bool)`

GetPageHeadersOk returns a tuple with the PageHeaders field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetPageHeaders

`func (o *Websites) SetPageHeaders(v []string)`

SetPageHeaders sets PageHeaders field to given value.

### HasPageHeaders

`func (o *Websites) HasPageHeaders() bool`

HasPageHeaders returns a boolean if a field has been set.

### GetPageLoadTime

`func (o *Websites) GetPageLoadTime() PageLoadTime`

GetPageLoadTime returns the PageLoadTime field if non-nil, zero value otherwise.

### GetPageLoadTimeOk

`func (o *Websites) GetPageLoadTimeOk() (*PageLoadTime, bool)`

GetPageLoadTimeOk returns a tuple with the PageLoadTime field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetPageLoadTime

`func (o *Websites) SetPageLoadTime(v PageLoadTime)`

SetPageLoadTime sets PageLoadTime field to given value.

### HasPageLoadTime

`func (o *Websites) HasPageLoadTime() bool`

HasPageLoadTime returns a boolean if a field has been set.

### GetIssuesInfo

`func (o *Websites) GetIssuesInfo() IssuesInfo`

GetIssuesInfo returns the IssuesInfo field if non-nil, zero value otherwise.

### GetIssuesInfoOk

`func (o *Websites) GetIssuesInfoOk() (*IssuesInfo, bool)`

GetIssuesInfoOk returns a tuple with the IssuesInfo field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetIssuesInfo

`func (o *Websites) SetIssuesInfo(v IssuesInfo)`

SetIssuesInfo sets IssuesInfo field to given value.

### HasIssuesInfo

`func (o *Websites) HasIssuesInfo() bool`

HasIssuesInfo returns a boolean if a field has been set.


[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)



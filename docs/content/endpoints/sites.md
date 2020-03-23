# Sites Endpoint

## Sites

The `/sites` endpoint provides information about 
[NEON field sites](https://www.neonscience.org/field-sites/field-sites-map) where data 
are currently available.  Numerous data products are produced from each site. 
Site names are abbreviated into four-letter site codes -- for example, 
the Arikaree River site abbreviation is ARIK. For more information about sites, 
you can find a listing on our 
[main website](https://www.neonscience.org/field-sites/field-sites-map/list). 
If you need to know about our remote 
sensing data availability, visit the 
[Airborne Data webpage](https://www.neonscience.org/data-collection/airborne-remote-sensing).  


<a name="get_sites"></a>
### GET /sites

#### Description
Get information about all sites.


#### Responses

|HTTP Code|Description|Schema|
|---|---|---|
|**200**|List of data products|[Response 200](#get_sites_response-200)|

<a name="get_sites_response-200"></a>
**Response 200**

|Name|Schema|
|---|---|
|**data**  <br>*optional*|< [site](#site) > array|


#### Produces

* `application/json`


#### Tags

* Sites


<a name="get_sites-sitecode"></a>
### GET /sites/{siteCode}

#### Description
Get information about a site.


#### Parameters

|Type|Name|Description|Schema|
|---|---|---|---|
|**Path**|**siteCode**  <br>*required*|Site to get|string|


#### Responses

|HTTP Code|Description|Schema|
|---|---|---|
|**200**|Single site|[Response 200](#get_sites-sitecode_response-200)|
|**400**|Site(s) not found|[Response 400](#get_sites-sitecode_response-400)|
|**default**|General error|[error](#error)|

<a name="get_sites-sitecode_response-200"></a>
**Response 200**

|Name|Schema|
|---|---|
|**data**  <br>*optional*|[site](#site)|

<a name="get_sites-sitecode_response-400"></a>
**Response 400**

|Name|Schema|
|---|---|
|**errors**  <br>*optional*|< [error](#error) > array|


#### Produces

* `application/json`


#### Tags

* Sites

<a name="definitions"></a>
## Definitions


<a name="site"></a>
### site

|Name|Description|Schema|
|---|---|---|
|**dataProducts**|List of data products and months of available data|< [productAvailability](#productavailability) > array|
|**domainCode**|Three character domain abbreviation (D01, D02, etc) for the domain this site is in|string|
|**domainName**|Brief description for the domain this site is in|string|
|**siteCode**|Four character code for the site|string|
|**siteDescription**|Brief site description|string|
|**siteLatitude**|Point latitude for the site|number|
|**siteLongitude**|Point longitude for the site|number|
|**siteName**|Full name for the site|string|
|**siteType**|Core or Relocatable site|enum (CORE, RELOCATABLE)|
|**stateCode**|Two letter state code that this site is in|string|
|**stateName**|Full name of the state or territory that this site is in|string|

<a name="productavailability"></a>
### productAvailability

|Name|Description|Schema|
|---|---|---|
|**availableDataUrls**|List of data urls for products that are available.|< string > array|
|**availableMonths**|List of years and months that products are available.  Formatted as YYYY-MM.|< string > array|
|**dataProductCode**|Revisioned, shortened code for the data product (DP1.00001.001, DP1.10072.001, etc)|string|
|**dataProductTitle**|Full title for the data product.|string|


<a name="error"></a>
### error

|Name|Schema|
|---|---|
|**detail**  <br>*optional*|string|
|**status**  <br>*optional*|number (int)|


<a name="securityscheme"></a>
## API Tokens

<a name="x-api-token"></a>
### X-API-Token
*Type* : apiKey  
*Name* : X-API-Token  
*In* : HEADER

<br />

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
|**dataProducts**  <br>*optional*||< [productAvailability](#productavailability) > array|
|**domainCode**  <br>*optional*|Three character domain abbreviation (D01, D02, etc) for the domain this site is in|string|
|**domainName**  <br>*optional*|Brief description for the domain this site is in|string|
|**siteCode**  <br>*optional*|Four character code for the site|string|
|**siteDescription**  <br>*optional*|Brief site description|string|
|**siteLatitude**  <br>*optional*|Point latitude for the site|number|
|**siteLongitude**  <br>*optional*|Point longitude for the site|number|
|**siteName**  <br>*optional*|Full name for the site|string|
|**siteType**  <br>*optional*|Core or Relocatable site|enum (CORE, RELOCATABLE)|
|**stateCode**  <br>*optional*|Two letter state code that this site is in|string|
|**stateName**  <br>*optional*|Full name of the state or territory that this site is in|string|


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

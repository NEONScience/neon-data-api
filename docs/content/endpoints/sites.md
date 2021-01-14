# Sites Endpoint

The `/sites` endpoint provides information about [NEON field sites](https://www.neonscience.org/field-sites/) where data are available.  Numerous data products are produced from each site. Site names are abbreviated into four-letter site codes -- for example, the Arikaree River site abbreviation is ARIK. For more information about sites, including the four-letter code for each site, you can find a list on our [main website](https://www.neonscience.org/field-sites/explore-field-sites). For information about locations within a site (plots, instruments, etc.), explore the `/locations` endpoint.

<a name="data-releases"></a>
## **Data Releases**

The `/sites` endpoint allows filtering the response based on data available within 
a particular release by adding a `release` query parameter to requests. For example:  

  ```
  /sites?release={releaseTag}
  ```

The learn more about data releases, see: <a href="#" onclick="Router.jumpToReleasePage()">releases</a>

<a name="paths"></a>
## **Paths**

<a name="get_sites"></a>
### GET `/sites`

#### **Description**
Get information about all field sites.

#### **Parameters**

|Type|Name|Description|Schema|
|---|---|---|---|
|**Query**|**release**  <br>*optional*|The name or tag of the release to get availability for.|string|

#### **Responses**

|HTTP Code|Description|Schema|
|---|---|---|
|**200**|List of field sites|[Response 200](#get_sites-response-200)|
|**default**|General error|[error](#error)|

<h5 id="get_sites-response-200">Response 200</h5>

|Name|Schema|
|---|---|
|**data**  <br>*optional*|[[site](#site)]|


#### **Produces**

* `application/json`


#### **Tags**

* Sites


<a name="get_sites-sitecode"></a>
### GET `/sites/{siteCode}`

#### **Description**
Get information about a field site.


#### **Parameters**

|Type|Name|Description|Schema|
|---|---|---|---|
|**Path**|**siteCode**  <br>*required*|Site to get|string|
|**Query**|**release**  <br>*optional*|The name or tag of the release to get availability for|string|


#### **Responses**

|HTTP Code|Description|Schema|
|---|---|---|
|**200**|Single site|[Response 200](#get_sites_sitecode-response-200)|
|**400**|Site(s) not found|[Response 400](#get_sites_sitecode-response-400)|
|**default**|General error|[error](#error)|

<h5 id="get_sites_sitecode-response-200">Response 200</h5>

|Name|Schema|
|---|---|
|**data**  <br>*optional*|[site](#site)|

<h5 id="get_sites_sitecode-response-400">Response 400</h5>

|Name|Schema|
|---|---|
|**errors**  <br>*optional*|[[error](#error)]|


#### **Produces**

* `application/json`


#### **Tags**

* Sites

<a name="definitions"></a>
## **Definitions**


<a name="site"></a>
### **site**

|Name|Description|Schema|
|---|---|---|
|**siteCode**|Four character code for the site|string|
|**siteName**|Full name for the site|string|
|**siteDescription**|Brief version of site name|string|
|**siteType**|Core or Relocatable site|enum (CORE, RELOCATABLE)|
|**siteLatitude**|Point latitude for the site|number|
|**siteLongitude**|Point longitude for the site|number|
|**stateCode**|Two-letter state code that this site is in|string|
|**stateName**|Full name of the state or territory that this site is in|string|
|**domainCode**|Three-character domain abbreviation (D01, D02, etc) for the domain this site is in|string|
|**domainName**|Name of the domain this site is in|string|
|**releases**|List of releases that this site has available data within|[[releases](#site-releases)]|
|**dataProducts**|List of data products and months of available data|[[productAvailability](#productavailability)]|

<a name="site-releases"></a>
### **releases**

|Name|Description|Schema|
|---|---|---|
|**release**|The name of the release|string|
|**generationDate**|The generation date of the release|string (date-time)|
|**url**|The URL to the API endpoint that references the release|string|

<a name="productavailability"></a>
### **productAvailability**

|Name|Description|Schema|
|---|---|---|
|**dataProductCode**|Revisioned, shortened code for the data product (DP1.00001.001, DP1.10072.001, etc.)|string|
|**dataProductTitle**|Full title for the data product|string|
|**availableMonths**|List of years and months that products are available, formatted as YYYY-MM|[string]|
|**availableDataUrls**|List of data urls for products that are available|[string]|
|**availableReleases**|List of available releases and months contained within each release|[[availableReleases](#productavailability-availablereleases)]|

<a name="productavailability-availablereleases"></a>
### **availableReleases**

|Name|Description|Schema|
|---|---|---|
|**release**|The name of the release.|string|
|**availableMonths**|List of years and months that products are available within for this release. Formatted as YYYY-MM.|[string]|

<a name="error"></a>
### **error**

|Name|Schema|
|---|---|
|**detail**  <br>*optional*|string|
|**status**  <br>*optional*|number (int)|


<br />

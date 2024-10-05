# Releases Endpoint

The `/releases` endpoint provides information about NEON data releases, 
including availability by product, site, and month (also see the 
[data product catalog](https://data.neonscience.org/data-products/explore)
to filter products and availability by release). The `/releases/{releaseTag}` 
endpoint also supplies path based access for a specific release for the 
`/products`, `/sites`, `/data`, and `/data/query` endpoints.

A data release is a set of data files that is static (unchanging), 
always available to end users, and citable.  

To learn more about NEON data releases, see:
[NEON data releases](https://www.neonscience.org/data-samples/data-management/data-revisions-releases)  


<a name="paths"></a>
## **Paths**

<a name="get_releases"></a>
### GET `/releases`

#### Description
Get information about all available data releases.


#### Responses

|HTTP Code|Description|Schema|
|---|---|---|
|**200**|List of data releases|[Response 200](#get_releases_response-200)|
|**default**|General error|[error](#error)|

<a name="get_releases_response-200"></a>
**Response 200**

|Name|Schema|
|---|---|
|**data**  <br>*optional*|[[release](#release)]|


#### Produces

* `application/json`


#### Tags

* Releases


<a name="get_releases_releaseidentifier"></a>
### GET `/releases/{releaseIdentifier}`

#### Description
Get information about a data release.


#### Parameters

|Type|Name|Description|Schema|
|---|---|---|---|
|**Path**|**releaseIdentifier**  <br>*required*|Release tag or UUID to get information for|string|


#### Responses

|HTTP Code|Description|Schema|
|---|---|---|
|**200**|Single data release|[Response 200](#get_releases_releaseidentifier_response-200)|
|**400**|Release(s) not found|[error](#error)|
|**default**|General error|[error](#error)|

<a name="get_releases_releaseidentifier_response-200"></a>
**Response 200**

|Name|Schema|
|---|---|
|**data**  <br>*optional*|[release](#release)|


#### Produces

* `application/json`


#### Tags

* Releases

<a name="get_releases_products"></a>
### GET `/releases/{releaseTag}/products`

#### Description
Get information about all data products within a specific release.


#### Parameters

|Type|Name|Description|Schema|
|---|---|---|---|
|**Path**|**releaseTag**  <br>*required*|The name of the release to get availability for|string|


#### Responses

|HTTP Code|Description|Schema|
|---|---|---|
|**200**|List of data products|[Response 200](#get_releases_products_response-200)|
|**default**|General error|[error](#error)|

<a name="get_releases_products_response-200"></a>
**Response 200**

|Name|Schema|
|---|---|
|**data**  <br>*optional*|[<a href="#" onclick="Router.jumpToProduct()">product</a>]|


#### Produces

* `application/json`


#### Tags

* Releases


<a name="get_releases_products_productcode"></a>
### GET `/releases/{releaseTag}/products/{productCode}`

#### Description
Get information about a data product within a specific release.


#### Parameters

|Type|Name|Description|Schema|
|---|---|---|---|
|**Path**|**productCode**  <br>*required*|Data product to get|string|
|**Path**|**releaseTag**  <br>*required*|The name of the release to get availability for|string|


#### Responses

|HTTP Code|Description|Schema|
|---|---|---|
|**200**|Single data product|[Response 200](#get_releases_products_productcode_response-200)|
|**400**|Product(s) not found|[error](#error)|
|**default**|General error|[error](#error)|

<a name="get_releases_products_productcode_response-200"></a>
**Response 200**

|Name|Schema|
|---|---|
|**data**  <br>*optional*|<a href="#" onclick="Router.jumpToProduct()">product</a>|


#### Produces

* `application/json`


#### Tags

* Releases


<a name="get_releases_sites"></a>
### GET `/releases/{releaseTag}/sites`

#### Description
Get information about all sites within a specific release.


#### Parameters

|Type|Name|Description|Schema|
|---|---|---|---|
|**Path**|**releaseTag**  <br>*required*|The name of the release to get availability for|string|


#### Responses

|HTTP Code|Description|Schema|
|---|---|---|
|**200**|List of sites|[Response 200](#get_releases_sites_response-200)|

<a name="get_releases_sites_response-200"></a>
**Response 200**

|Name|Schema|
|---|---|
|**data**  <br>*optional*|[<a href="#" onclick="Router.jumpToSite()">site</a>]|


#### Produces

* `application/json`


#### Tags

* Releases


<a name="get_releases_sites-sitecode"></a>
### GET `/releases/{releaseTag}/sites/{siteCode}`

#### Description
Get information about a field site within a specific release


#### Parameters

|Type|Name|Description|Schema|
|---|---|---|---|
|**Path**|**releaseTag**  <br>*required*|The name of the release to get availability for|string|
|**Path**|**siteCode**  <br>*required*|Site to get|string|


#### Responses

|HTTP Code|Description|Schema|
|---|---|---|
|**200**|Single site|[Response 200](#get_releases_sites-sitecode_response-200)|
|**400**|Site(s) not found|[Response 400](#get_releases_sites-sitecode_response-400)|
|**default**|General error|[error](#error)|

<a name="get_releases_sites-sitecode_response-200"></a>
**Response 200**

|Name|Schema|
|---|---|
|**data**  <br>*optional*|<a href="#" onclick="Router.jumpToSite()">site</a>|

<a name="get_releases_sites-sitecode_response-400"></a>
**Response 400**

|Name|Schema|
|---|---|
|**errors**  <br>*optional*|[[error](#error)]|


#### Produces

* `application/json`


#### Tags

* Releases

<a name="get_releases_data-availability"></a>
### GET `/releases/{releaseTag}/data/{productCode}/{siteCode}/{year-month}`

#### Description
Get files available for a given release and product/site/month combination


#### Parameters

|Type|Name|Description|Schema|
|---|---|---|---|
|**Path**|**productCode**  <br>*required*|Product to check for files|string|
|**Path**|**releaseTag**  <br>*required*|The name of the release to get availability for|string|
|**Path**|**siteCode**  <br>*required*|Site to check for files|string|
|**Path**|**year-month**  <br>*required*|YYYY-MM month to check for files|string|
|**Query**|**package**  <br>*optional*|Package type to return, basic or expanded|enum (basic, expanded)|


#### Responses

|HTTP Code|Description|Schema|
|---|---|---|
|**200**|Available files|[Response 200](#get_releases_data-availability_response-200)|
|**400**|Product, site not found or invalid date range specified|[Response 400](#get_releases_data-availability_response-400)|
|**default**|General error|[error](#error)|

<a name="get_releases_data-availability_response-200"></a>
**Response 200**

|Name|Schema|
|---|---|
|**data**  <br>*optional*|<a href="#" onclick="Router.jumpToData()">data</a>|

<a name="get_releases_data-availability_response-400"></a>
**Response 400**

|Name|Schema|
|---|---|
|**errors**  <br>*optional*|[[error](#error)]|


#### Produces

* `application/json`


#### Tags

* Releases


<a name="get_releases_data-availability_file"></a>
### GET `/releases/{releaseTag}/data/{productCode}/{siteCode}/{year-month}/{filename}`

#### Description
Get a file for a given release and product/site/month/filename combination


#### Parameters

|Type|Name|Description|Schema|
|---|---|---|---|
|**Path**|**filename**  <br>*required*|The name of the file|string|
|**Path**|**productCode**  <br>*required*|Product to check for files|string|
|**Path**|**releaseTag**  <br>*required*|The name of the release to get availability for|string|
|**Path**|**siteCode**  <br>*required*|Site to check for files|string|
|**Path**|**year-month**  <br>*required*|YYYY-MM month to check for files|string|
|**Query**|**package**  <br>*optional*|Package type to return, basic or expanded|enum (basic, expanded)|


#### Responses

|HTTP Code|Description|Schema|
|---|---|---|
|**200**|Available file data|string (binary)|
|**302**|Found available file and redirects to data|string (binary)|
|**400**|Invalid file name specified|[Response 400](#get_releases_data-availability_file_response-400)|
|**default**|General error|[error](#error)|

<a name="get_releases_data-availability_file_response-400"></a>
**Response 400**

|Name|Schema|
|---|---|
|**errors**  <br>*optional*|{[error](#error)]|


#### Produces

* `application/octet-stream`


#### Tags

* Releases

<a name="get_releases_data-availability_package"></a>
### GET `/releases/{releaseTag}/data/package/{productCode}/{siteCode}/{year-month}`

#### Description
Get a data package for a given release and product/site/month and package combination


#### Parameters

|Type|Name|Description|Schema|
|---|---|---|---|
|**Path**|**productCode**  <br>*required*|Product to check for files|string|
|**Path**|**releaseTag**  <br>*required*|The name of the release to get availability for|string|
|**Path**|**siteCode**  <br>*required*|Site to check for files|string|
|**Path**|**year-month**  <br>*required*|YYYY-MM month to check for files|string|
|**Query**|**package**  <br>*optional*|Package type to return, basic or expanded|enum (basic, expanded)|


#### Responses

|HTTP Code|Description|Schema|
|---|---|---|
|**200**|Available data package as zip|No Content|
|**400**|Invalid product, site, or month specified|[Response 400](#get_releases_data-availability_package_response-400)|
|**default**|General error|[error](#error)|

<a name="get_releases_data-availability_package_response-400"></a>
**Response 400**

|Name|Schema|
|---|---|
|**errors**  <br>*optional*|[[error](#error)]|


#### Produces

* `application/zip`


#### Tags

* Releases


<a name="definitions"></a>
## Definitions


<a name="release"></a>
### **release**

|Name|Description|Schema|
|---|---|---|
|**release**|The name or "tag" of the release.|string|
|**uuid**|The UUID associated with the release.|string|
|**generationDate**|Generation date of the release.|string (date-time)|
|**artifacts**|The set of artifacts associated with the release.|[[artifacts](#release-artifacts)]|
|**dataProducts**|The set of available data products within the release.|[[dataProducts](#release-dataproducts)]|

<a name="release-artifacts"></a>
### **artifacts**

|Name|Description|Schema|
|---|---|---|
|**name**|The name of the artifact.|string|
|**type**|The type of the artifact.|string|
|**size**|The file size in bytes.|number (int)|
|**md5**|MD5 value in hex|string|
|**url**|The download URL for the artifact|string|

<a name="release-dataproducts"></a>
### **dataProducts**

|Name|Description|Schema|
|---|---|---|
|**productCode**|Revisioned, shortened code for the data product (DP1.00001.001, DP1.10072.001, etc)|string|
|**productDescription**|A brief description of the data product.|string|
|**productDoi**|The DOI for the product within the release.|string|
|**productName**|The name of the data product.|string|

<a name="error"></a>
### error

|Name|Schema|
|---|---|
|**detail**  <br>*optional*|string|
|**status**  <br>*optional*|number (int)|


<br />

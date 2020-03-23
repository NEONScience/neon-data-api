# Data Products Endpoint

## Products

The `/products` endpoint provides information about NEON data products, 
including availability by site and month (also see the 
[data product catalog](https://data.neonscience.org/data-products/explore)). 
In the API, data products are specified using a 13 character code. For instance, 
[Chemical properties of groundwater](https://data.neonscience.org/data-products/DP1.20092.001) 
uses product code DP1.20092.001, where DP1 
refers to [data level](https://www.neonscience.org/data/about-data/data-processing-publication) 
1 (quality controlled), 20092 is the unique numeric id of 
the data product, and 001 refers to the revision. All of our data products are 
currently provisional and annotated as revision 1.  


<a name="get_products"></a>
### GET /products

#### Description
Get information about all data products.


#### Responses

|HTTP Code|Description|Schema|
|---|---|---|
|**200**|List of data products|[Response 200](#get_products_response-200)|
|**default**|General error|[error](#error)|

<a name="get_products_response-200"></a>
**Response 200**

|Name|Schema|
|---|---|
|**data**|< [product](#product) > array|


#### Produces

* `application/json`


#### Tags

* Products


<a name="get_products_productcode"></a>
### GET /products/{productCode}

#### Description
Get information about a data product.


#### Parameters

|Type|Name|Description|Schema|
|---|---|---|---|
|**Path**|**productCode**  <br>*required*|Data product to get|string|


#### Responses

|HTTP Code|Description|Schema|
|---|---|---|
|**200**|Single data product  <br>**Headers** :   <br>`X-RateLimit-Limit` (integer) : Request burst limit.  <br>`X-RateLimit-Remaining` (integer) : The number of remaining requests of the burst limit.  <br>`X-RateLimit-Reset` (integer) : The number of seconds until the burst limit resets in full.  <br>`RetryAfter` (integer) : The number of seconds until the next request can be made.|[Response 200](#get_products_productcode_response-200)|
|**400**|Product(s) not found|[error](#error)|
|**default**|General error|[error](#error)|

<a name="get_products_productcode_response-200"></a>
**Response 200**

|Name|Schema|
|---|---|
|**data**|[product](#product)|


#### Produces

* `application/json`


#### Tags

* Products


<a name="definitions"></a>
## Definitions

<a name="product"></a>
### product

|Name|Description|Schema|
|---|---|---|
|**changeLogs**|List of issues and associated details for the product.|< [changeLogs](#changeLogs) > array|
|**keywords**|List of words and phrases associated with the data product|< string > array|
|**productCategory**|Level 1, 2, 3, or 4 data product|string|
|**productCode**|Revisioned, shortened code for the data product (DP1.00001.001, DP1.10072.001, etc)|string|
|**productCodeLong**|Revisioned, long code for the data product (NEON.DOM.SITE.DP1.00001.001, etc)|string|
|**productCodePresentation**|Shortened product code|string|
|**productName**|The name of the data product.|string|
|**productDescription**|A brief description of the data product.|string|
|**productAbstract**|An abstract for the data product.|string|
|**productHasExpanded**|Whether a data product has expanded data|boolean|
|**productBasicDescription**|A description of the basic package available for download|string|
|**productExpandedDescription**|A description of the expanded package available for download|string|
|**productPublicationFormatType**|Class of publication system used during the publication process; can be independent from productScienceTeam.|string|
|**productScienceTeam**|Science team responsible for the data product|string|
|**productScienceTeamAbbr**|Three letter abbreviation for the data science team.|string|
|**productStatus**|Future, active, or retired product status|enum (FUTURE, ACTIVE, RETIRED)|
|**siteCodes**|List of sites and months of available data|< [siteCodes](#product-sitecodes) > array|
|**specs**|List of documents associated with the data product.|< [spec](#spec) > array|
|**themes**|List of themes to which the data product belongs.|< string > array|

<a name="product-sitecodes"></a>
**siteCodes**

|Name|Description|Schema|
|---|---|---|
|**availableDataUrls**|List of data urls for products that are available.|< string > array|
|**availableMonths**|List of years and months that products are available.  Formatted as YYYY-MM.|< string > array|
|**siteCode**|Four character code for the site|string|


<a name="spec"></a>
### spec

|Name|Description|Schema|
|---|---|---|
|**specId**|Document code for the associated document.|string|
|**specName**|Name of the associated document.|string|


<a name="changeLogs"></a>
### changeLogs

|Name|Description|Schema|
|---|---|---|
|**id**|The identifier for the issue.|number (int)|
|**parentIssueID**|The identifier for the parent issue that this issue is associated with.|number (int)|
|**issueDate**|The date and time associated with the creation of the issue.|string (date-time)|
|**resolvedDate**|The date and time associated with the resolution of the issue.|string (date-time)|
|**dateRangeStart**|The start of the date interval that this issue impacts the data product.|string (date-time)|
|**dateRangeEnd**|The end of the date interval that this issue impacts the data product.|string (date-time)|
|**locationAffected**|The locations affected by this issue.|string (date-time)|
|**resolution**|The description of the resolution applied for this issue.|string (date-time)|


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

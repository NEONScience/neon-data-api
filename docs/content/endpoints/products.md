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
|**data**  <br>*optional*|< [product](#product) > array|


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
|**data**  <br>*optional*|[product](#product)|


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
|**keywords**  <br>*optional*|List of words and phrases associated with the data product|< string > array|
|**productCategory**  <br>*optional*|Level 1, 2, 3, or 4 data product|string|
|**productCode**  <br>*optional*|Revisioned, shortened code for the data product (DP1.00001.001, DP1.10072.001, etc)|string|
|**productCodeLong**  <br>*optional*|Revisioned, long code for the data product (NEON.DOM.SITE.DP1.00001.001, etc)|string|
|**productCodePresentation**  <br>*optional*|Shortened product code|string|
|**productDescription**  <br>*optional*|A brief description of the data product.|string|
|**productHasExpanded**  <br>*optional*|Whether a data product has expanded data|boolean|
|**productPublicationFormatType**  <br>*optional*|Class of publication system used during the publication process; can be independent from productScienceTeam.|string|
|**productScienceTeam**  <br>*optional*|Science team responsible for the data product|string|
|**productScienceTeamAbbr**  <br>*optional*|Three letter abbreviation for the data science team.|string|
|**productStatus**  <br>*optional*|Future, active, or retired product status|enum (FUTURE, ACTIVE, RETIRED)|
|**siteCodes**  <br>*optional*|List of sites and months of available data|< [siteCodes](#product-sitecodes) > array|
|**specs**  <br>*optional*|List of documents associated with the data product.|< [spec](#spec) > array|
|**themes**  <br>*optional*|List of themes to which the data product belongs.|< string > array|

<a name="product-sitecodes"></a>
**siteCodes**

|Name|Description|Schema|
|---|---|---|
|**availableDataUrls**  <br>*optional*|List of data urls for products that are available.|< string > array|
|**availableMonths**  <br>*optional*|List of years and months that products are available.  Formatted as YYYY-MM.|< string > array|
|**siteCode**  <br>*optional*|Four character code for the site|string|


<a name="productavailability"></a>
### productAvailability

|Name|Description|Schema|
|---|---|---|
|**availableDataUrls**  <br>*optional*|List of data urls for products that are available.|< string > array|
|**availableMonths**  <br>*optional*|List of years and months that products are available.  Formatted as YYYY-MM.|< string > array|
|**dataProductCode**  <br>*optional*|Revisioned, shortened code for the data product (DP1.00001.001, DP1.10072.001, etc)|string|
|**dataProductTitle**  <br>*optional*|Full title for the data product.|string|

<a name="spec"></a>
### spec

|Name|Description|Schema|
|---|---|---|
|**specId**  <br>*optional*|Document code for the associated document.|string|
|**specName**  <br>*optional*|Name of the associated document.|string|


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

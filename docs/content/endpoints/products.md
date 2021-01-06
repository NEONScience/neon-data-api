# Data Products Endpoint

The `/products` endpoint provides information about NEON data products, 
including availability by site and month (also see the 
[data product catalog](https://data.neonscience.org/data-products/explore)). 
In the API, data products are specified using a 13 character code. For instance, 
[Chemical properties of groundwater](https://data.neonscience.org/data-products/DP1.20092.001) 
uses product code DP1.20092.001, where DP1 
refers to [data level](https://www.neonscience.org/data/about-data/data-processing-publication) 
1 (quality controlled), 20092 is the unique numeric id of 
the data product, and 001 refers to the revision. Almost all of our data products are 
currently in revision 1.  

<a name="data-releases"></a>
## **Data Releases**

The `/products` endpoints allow filtering the response based on data available within 
a particular release by adding a `release` query parameter to requests. For example:  

  ```
  /products?release={releaseTag}
  ```

The learn more about data releases, see: <a href="#" onclick="Router.jumpToReleasePage()">releases</a>


<a name="paths"></a>
## **Paths**

<a name="get_products"></a>
### GET `/products`

#### **Description**
Get information about all current data products.

#### **Parameters**

|Type|Name|Description|Schema|
|---|---|---|---|
|**Query**|**release**  <br>*optional*|The name or tag of the release to get availability for.|string|

#### **Responses**

|HTTP Code|Description|Schema|
|---|---|---|
|**200**|List of data products|[Response 200](#get_products_response-200)|
|**default**|General error|[error](#error)|

<h5 id="get_products_response-200">Response 200</h5>

|Name|Schema|
|---|---|
|**data**|[[product](#product)]|


#### **Produces**

* `application/json`


#### **Tags**

* Products


<a name="get_products_productcode"></a>
### GET `/products/{productCode}`

#### **Description**
Get information about a data product.


#### **Parameters**

|Type|Name|Description|Schema|
|---|---|---|---|
|**Path**|**productCode**  <br>*required*|Data product to get|string|
|**Query**|**release**  <br>*optional*|The name or tag of the release to get availability for.|string|


#### **Responses**

|HTTP Code|Description|Schema|
|---|---|---|
|**200**|Single data product|[Response 200](#get_products_productcode_response-200)|
|**400**|Product(s) not found|[error](#error)|
|**default**|General error|[error](#error)|

<h5 id="get_products_productcode_response-200">Response 200</h5>

|Name|Schema|
|---|---|
|**data**|[product](#product)|


#### **Produces**

* `application/json`


#### **Tags**

* Products


<a name="definitions"></a>
## **Definitions**

<a name="product"></a>
### **product**

|Name|Description|Schema|
|---|---|---|
|**productCodeLong**|Revisioned, long code for the data product (NEON.DOM.SITE.DP1.00001.001, etc)|string|
|**productCode**|Revisioned, shortened code for the data product (DP1.00001.001, DP1.10072.001, etc)|string|
|**productCodePresentation**|Shortened product code|string|
|**productName**|The name of the data product.|string|
|**productDescription**|A brief description of the data product.|string|
|**productStatus**|Future, active, or retired product status|enum (FUTURE, ACTIVE, RETIRED)|
|**productCategory**|Level 1, 2, 3, or 4 data product|string|
|**productHasExpanded**|Whether a data product has expanded data|boolean|
|**productScienceTeamAbbr**|Three letter abbreviation for the data science team.|string|
|**productPublicationFormatType**|Class of publication system used during the publication process; can be independent from productScienceTeam.|string|
|**productAbstract**|An abstract for the data product.|string|
|**productDesignDescription**|A design description of the data product|string|
|**productStudyDescription**|A study description of the data product|string|
|**productBasicDescription**|A description of the basic package available for download|string|
|**productExpandedDescription**|A description of the expanded package available for download|string|
|**productSensor**|A description of the type of sensor utilized by the data product|string|
|**productRemarks**|Remarks about the data product|string|
|**themes**|List of themes to which the data product belongs.|[string]|
|**changeLogs**|List of issues and associated details for the product.|[[changeLogs](#changelogs)]|
|**specs**|List of documents associated with the data product.|[[spec](#spec)]|
|**keywords**|List of words and phrases associated with the data product|[string]|
|**releases**|List of releases that this product has available data within.|[[releases](#product-releases)]|
|**siteCodes**|List of sites and months of available data|[[siteCodes](#sitecodes)]|

<a name="spec"></a>
### **spec**

|Name|Description|Schema|
|---|---|---|
|**specDescription**|Description of the associated document.|string|
|**specId**|Document identifier for the associated document.|string|
|**specNumber**|The specification number for the associated document.|string|
|**specSize**|The size in bytes of the associated document.|number (int)|
|**specType**|The MIME type of the associated document.|string|


<a name="changeLogs"></a>
### **changeLogs**

|Name|Description|Schema|
|---|---|---|
|**id**|The identifier for the issue.|number (int)|
|**parentIssueID**|The identifier for the parent issue that this issue is associated with.|number (int)|
|**issueDate**|The date and time associated with the creation of the issue.|string (date-time)|
|**resolvedDate**|The date and time associated with the resolution of the issue.|string (date-time)|
|**dateRangeStart**|The start of the date interval that this issue impacts the data product.|string (date-time)|
|**dateRangeEnd**|The end of the date interval that this issue impacts the data product.|string (date-time)|
|**locationAffected**|The locations affected by this issue.|string (date-time)|
|**issue**|The description of the issue.|string|
|**resolution**|The description of the resolution applied for this issue.|string|

<a name="product-releases"></a>
### **releases**

|Name|Description|Schema|
|---|---|---|
|**release**|The name of the release|string|
|**generationDate**|The generation date of the release.|string (date-time)|
|**url**|The URL to the API endpoint that references the release.|string|
|**productDoi**|A description for the DOI associated with the product and release.|[productDoi](#product-productdoi)|

<a name="product-productdoi"></a>
### **productDoi**

|Name|Description|Schema|
|---|---|---|
|**generationDate**|The generation date of the DOI.|string (date-time)|
|**url**|The DOI URL for the product and release.|string|


<a name="product-sitecodes"></a>
### **siteCodes**

|Name|Description|Schema|
|---|---|---|
|**siteCode**|Four character code for the site|string|
|**availableMonths**|List of years and months that products are available.  Formatted as YYYY-MM.|[string]|
|**availableDataUrls**|List of data urls for products that are available.|[string]|
|**availableReleases**|List of available releases and months contained within each release.|[[availableReleases](#product-availablereleases)]|

<a name="product-availablereleases"></a>
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

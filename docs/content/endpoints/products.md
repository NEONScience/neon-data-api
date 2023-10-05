# Data Products Endpoint

The `/products` endpoint provides information about all published NEON data products, including availability by site and month (also see the [data product catalog](https://data.neonscience.org/data-products/explore)). The response can be filtered by a data product code or a release tag.

Data products are specified using a 13 character code, and this code can be added the `/products` endpoint to filter the reponse to a single data product. For instance, 
[Chemical properties of groundwater](https://data.neonscience.org/data-products/DP1.20092.001) 
uses product code DP1.20092.001, where  

  * "DP1" refers to [data level](https://www.neonscience.org/data-samples/data-management/data-processing) 
  1 (quality controlled), 
  * "20092" is the unique numeric id of the data product, and 
  * "001" refers to the [revision](https://www.neonscience.org/data-samples/data-management/data-revisions-releases). Almost all of our data products are currently in revision 1.  

Here, simply add the product code:

```
/products/{productCode}
```

The `/products` endpoint allows filtering the response based on data available within a particular [release]((https://www.neonscience.org/data-samples/data-management/data-revisions-releases)) by adding a `release` query parameter to requests. For example:  

  ```
  /products?release={releaseTag}
  ```

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

Information about each data product

|Name|Description|Schema|
|---|---|---|
|**productCodeLong**|Revisioned, long code for the data product (NEON.DOM.SITE.DP1.00001.001, etc.)|string|
|**productCode**|Revisioned, shortened code for the data product (DP1.00001.001, DP1.10072.001, etc.)|string|
|**productCodePresentation**|Shortened product code for presentation (NEON.DP1.00001, etc.)|string|
|**productName**|The name of the data product|string|
|**productDescription**|A brief description of the data product|string|
|**productStatus**|Future, active, or retired product status|enum (FUTURE, ACTIVE, RETIRED)|
|**productCategory**|Level 1, 2, 3, or 4 data product|string|
|**productHasExpanded**|Whether a data product provides both a basic and expanded package|boolean|
|**productScienceTeamAbbr**|Three letter abbreviation for the science team responsible for the data product|string|
|**productPublicationFormatType**|Class of publication system used during the publication process; can be independent from productScienceTeam|string|
|**productAbstract**|An abstract for the data product|string|
|**productDesignDescription**|A description of the data product's design|string|
|**productStudyDescription**|A description of the data product's spatial extent|string|
|**productBasicDescription**|A description of the basic package available for download|string|
|**productExpandedDescription**|A description of the expanded package available for download (where applicable; see productHasExpanded)|string|
|**productSensor**|A description of the type of sensor(s) used in the data product design|string|
|**productRemarks**|Remarks or additional information about the data product|string|
|**themes**|List of themes to which the data product belongs|[string]|
|**changeLogs**|List of issues and associated details for the product|[[changeLogs](#changelogs)]|
|**specs**|List of documents, including protocols or user guides, associated with the data product|[[spec](#spec)]|
|**keywords**|List of words and phrases associated with the data product|[string]|
|**biorepositoryCollections**|List of NEON biorepository collections associated with the data product|[biorepositoryCollections](#biorepository-collections)|
|**releases**|List of releases that this product has available data within|[[releases](#product-releases)]|
|**siteCodes**|List of sites and months of available data|[[siteCodes](#sitecodes)]|

<a name="changeLogs"></a>
### **changeLogs**  

Information about issues or changes that have affected the data

|Name|Description|Schema|
|---|---|---|
|**id**|The identifier for the issue|number (int)|
|**parentIssueID**|The identifier for the parent issue that this issue is associated with|number (int)|
|**issueDate**|The date and time associated with the creation of the issue|string (date-time)|
|**resolvedDate**|The date and time associated with the resolution of the issue|string (date-time)|
|**dateRangeStart**|The start of the date interval that this issue impacts the data product|string (date-time)|
|**dateRangeEnd**|The end of the date interval that this issue impacts the data product|string (date-time)|
|**locationAffected**|The locations affected by this issue|string (date-time)|
|**issue**|The description of the issue|string|
|**resolution**|The description of the resolution applied for this issue|string|

<a name="spec"></a>
### **spec**  

Information about each specification or informational document associated with a data product

|Name|Description|Schema|
|---|---|---|
|**specId**|Identifier for the associated document|string|
|**specNumber**|The specification number or name for the associated document|string|
|**specType**|The MIME type of the associated document|string|
|**specSize**|The size in bytes of the associated document|number (int)|
|**specDescription**|Title or description of the associated document|string|

<a name="product-releases"></a>
### **releases**  

Information about releases that a data product is included in

|Name|Description|Schema|
|---|---|---|
|**release**|The name of the release, also called the release tag|string|
|**generationDate**|The generation date of the release|string (date-time)|
|**url**|The URL to the API endpoint that references the release|string|
|**productDoi**|Information about the DOI associated with the product and release|[productDoi](#product-productdoi)|

<a name="biorepository-collections"></a>
### **biorepositoryCollections**  

Information about biorepository collections that are associated with this data product

|Name|Description|Schema|
|---|---|---|
|**collectionCode**|The collection code assigned to the collection|string|
|**collectionName**|The name of the collection|string|
|**collectionUrl**|The URL to the API endpoint for the specified collection|string|
|**collecitonContentUrl**|The URL to the biorepository collection landing page|string|
|**collecitonDownloadUrl**|The URL to the biorepository collection dataset used for downloads|string|

<a name="product-productdoi"></a>
### **productDoi**  

Information about the Digital Object Identifier associated with this release of the data product

|Name|Description|Schema|
|---|---|---|
|**generationDate**|The generation date of the DOI|string (date-time)|
|**url**|The DOI URL for the product and release|string|


<a name="product-sitecodes"></a>
### **siteCodes**  

Information about where (field sites) and when data were collected

|Name|Description|Schema|
|---|---|---|
|**siteCode**|Four character code for the site|string|
|**availableMonths**|List of years and months that products are available, formatted as YYYY-MM|[string]|
|**availableDataUrls**|List of data urls for products that are available|[string]|
|**availableReleases**|List of available releases and months contained within each release|[[availableReleases](#product-availablereleases)]|

<a name="product-availablereleases"></a>
### **availableReleases**  

Releases that are available for each field site and month

|Name|Description|Schema|
|---|---|---|
|**release**|The name of the release, also called the release tag|string|
|**availableMonths**|List of years and months that products are available within this release, formatted as YYYY-MM|[string]|


<a name="error"></a>
### **error**  

Information about errors in the response

|Name|Schema|
|---|---|
|**detail**  <br>*optional*|string|
|**status**  <br>*optional*|number (int)|


<br />

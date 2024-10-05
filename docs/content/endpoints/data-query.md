# Data Query Endpoint

The `/data/query` endpoint provides the ability to query for available data
files by product, one or more sites, a specified date range, and optionally
by release, package type, and whether or not the query results should include
provisional data. By default, provisional data are excluded from results and
the latest available release data are included.

<a name="data-releases"></a>
## **Data Releases**

The `/data/query` endpoints allow filtering the response based on data available within 
a particular release by adding a `release` query parameter to GET requests or by 
specifying the `release` property within the request body object to POST requests. For example:  

### GET Request
  ```
  /data/query?productCode={productCode}&siteCode={siteCode}&startDateMonth={startDateMonth}&endDateMonth={endDateMonth}&release={releaseTag}
  ```  

### POST Request
  ```
  /data/query
  ```
  ``` JSON
  {
    "productCode": "DP1.00001.001",
    "siteCodes": ["ABBY"],
    "startDateMonth": "2023-01",
    "endDateMonth": "2023-12",
    "release": "RELEASE-2024"
  }
  ```

The learn more about data releases, see: <a href="#" onclick="Router.jumpToReleasePage()">releases</a>


<a name="paths"></a>
## **Paths**

<a name="get_data_query-availability"></a>
### GET `/data/query`

#### **Description**
Get files available for a given product, one or more sites, date range, release, package combination


#### **Parameters**

|Type|Name|Description|Schema|
|---|---|---|---|
|**Query**|**productCode**  <br>*required*|Product code to query for files|string|
|**Query**|**siteCode**  <br>*required*|One or more four letter site codes to query for files|string|
|**Query**|**startDateMonth**  <br>*required*|YYYY-MM start date month to query for files|string|
|**Query**|**endDateMonth**  <br>*required*|YYYY-MM end date month to query for files|string|
|**Query**|**release**  <br>*optional*|The name of the release to query for|string|
|**Query**|**package**  <br>*optional*|Package type to query, basic or expanded|enum (basic, expanded)|
|**Query**|**includeProvisional**  <br>*optional*|Optionally include provisional data in the query|boolean|


#### **Responses**

|HTTP Code|Description|Schema|
|---|---|---|
|**200**|Available files|[Response 200](#get_data_query_availability_response_200)|
|**400**|One or more invalid paramaters specified|[Response 400](#get_data_query_availability_response_400)|
|**default**|General error|[error](#error)|

<h5 id="get_data_query_availability_response_200">Response 200</h5>

|Name|Schema|
|---|---|
|**data**|[data](#data-query-response-data)|


<h5 id="get_data_query_availability_response_400">Response 400</h5>

|Name|Schema|
|---|---|
|**errors**  <br>*optional*|[[error](#error)]|


#### **Produces**

* `application/json`


#### **Tags**

* Data Query


<a name="post_data_query-availability"></a>
### POST `/data/query`

#### **Description**
Get files available for a given product, one or more sites, date range, release, package combination


#### **Request Body**

|Name|Description|Schema|
|---|---|---|
|**productCode**  <br>*required*|Product code to query for files|string|
|**siteCodes**  <br>*required*|One or more four letter site codes to query for files|[string]|
|**startDateMonth**  <br>*required*|YYYY-MM start date month to query for files|string|
|**endDateMonth**  <br>*required*|YYYY-MM end date month to query for files|string|
|**release**  <br>*optional*|The name of the release to query for|string|
|**package**  <br>*optional*|Package type to query, basic or expanded|enum (basic, expanded)|
|**includeProvisional**  <br>*optional*|Optionally include provisional data in the query|boolean|

Example JSON Request Body  

  ``` JSON
  {
    "productCode": "DP1.00001.001",
    "siteCodes": ["ABBY"],
    "startDateMonth": "2023-01",
    "endDateMonth": "2023-12",
    "release": "RELEASE-2024",
    "package": "basic",
    "includeProvisional": false
  }
  ```

#### **Responses**

|HTTP Code|Description|Schema|
|---|---|---|
|**200**|Available files|[Response 200](#get_data_query_availability_response_200)|
|**400**|One or more invalid paramaters specified|[Response 400](#get_data_query_availability_response_400)|
|**default**|General error|[error](#error)|

<h5 id="get_data_query_availability_response_200">Response 200</h5>

|Name|Schema|
|---|---|
|**data**|[data](#data-query-response-data)|


<h5 id="get_data_query_availability_response_400">Response 400</h5>

|Name|Schema|
|---|---|
|**errors**  <br>*optional*|[[error](#error)]|


#### **Produces**

* `application/json`


#### **Tags**

* Data Query


<a name="definitions"></a>
## **Definitions**

<a name="data-query-response-data"></a>
### **data**

|Name|Description|Schema|
|---|---|---|
|**productCode**|Revisioned, shortened code for the data product (DP1.00001.001, DP1.10072.001, etc)|string|
|**siteCodes**|List of four character site codes available|[string]|
|**startDate**|The start date of the query interval|string (date-time)|
|**endDate**|The end date of the query interval|string (date-time)|
|**packageType**|The type of package, basic or expanded|string|
|**releases**|The list of available releases for the query|[[releases](#data-response-releases)]|


<a name="data-response-releases"></a>
### **releases**  
Describes a release package

|Name|Description|Schema|
|---|---|---|
|**release**|The name of the release|string|
|**generationDate**|The generation date of the release|string (date-time)|
|**packages**|The list of available packages within the release for the query|[[packages](#data-packages)]|


<a name="data-packages"></a>
### **packages**  
Describes a data package

|Name|Description|Schema|
|---|---|---|
|**domainCode**|Three character domain abbreviation (D01, D02, etc) for the domain this package is in|string|
|**siteCode**|Four character code for the site|string|
|**month**|The available month, formatted as YYYY-MM|string|
|**packageType**|The type of package, basic or expanded|string|
|**generationDate**|The generation date of the package|string (date-time)|
|**files**|The list of available files within the package for the query|[[file](#file)]|


<a name="file"></a>
### **file**

<div class="md-typeset__scrollwrap">
  <div class="md-typeset__table">
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Description</th>
          <th>Schema</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><strong>name</strong></td>
          <td>Filename</td>
          <td>string</td>
        </tr>
        <tr>
          <td><strong>size</strong></td>
          <td>File size in bytes</td>
          <td>number (int)</td>
        </tr>
        <tr>
          <td><strong>md5</strong></td>
          <td>MD5 value in hex</td>
          <td>string</td>
        </tr>
        <tr>
          <td><strong>crc32c</strong></td>
          <td>CRC32C value in hex</td>
          <td>string</td>
        </tr>
        <tr>
          <td><strong>url</strong></td>
          <td>Download URL</td>
          <td>string</td>
        </tr>
      </tbody>
    </table>
  </div>
</div>


<a name="error"></a>
### **error**

|Name|Schema|
|---|---|
|**detail**  <br>*optional*|string|
|**status**  <br>*optional*|number (int)|


<br />

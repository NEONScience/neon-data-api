# Data Endpoint

The `/data` endpoint shows which monthly data files are available, and provides 
URLs to downloadable files. Several terabytes of data are presently available. 
To keep data files to a reasonable size, they are generally arranged in 
product/site/monthly chunks. Even so, files can be large and you may find it 
worthwhile to check the size attribute before downloading. Also note that 
some provided URLs are from a Google Cloud Storage service and expire 1 hour after 
generation. If the time between when you obtain a URL and start downloading the 
file is more than 1 hour, you may need to obtain a new URL before proceeding.  

<a name="data-releases"></a>
## **Data Releases**

The `/data` endpoints allow filtering the response based on data available within 
a particular release by adding a `release `query parameter to requests. For example:  

  ```
  /data/{productCode}/{siteCode}/{year-month}?release={releaseTag}
  ```

The learn more about data releases, see: <a href="#" onclick="Router.jumpToReleasePage()">releases</a>


<a name="paths"></a>
## **Paths**

<a name="get_data-availability"></a>
### GET `/data/{productCode}/{siteCode}/{year-month}`

#### **Description**
Get files available for a given product/site/month combination


#### **Parameters**

|Type|Name|Description|Schema|
|---|---|---|---|
|**Path**|**productCode**  <br>*required*|Product to check for files|string|
|**Path**|**siteCode**  <br>*required*|Site to check for files|string|
|**Path**|**year-month**  <br>*required*|YYYY-MM month to check for files|string|
|**Query**|**package**  <br>*optional*|Package type to return, basic or expanded|enum (basic, expanded)|
|**Query**|**release**  <br>*optional*|The name or tag of the release to get availability for.|string|


#### **Responses**

|HTTP Code|Description|Schema|
|---|---|---|
|**200**|Available files|[Response 200](#get_data_availability_response_200)|
|**400**|Product, site not found or invalid date range specified|[Response 400](#get_data_availability_response_400)|
|**default**|General error|[error](#error)|

<h5 id="get_data_availability_response_200">Response 200</h5>

|Name|Schema|
|---|---|
|**data**|[data](#data-productcode-sitecode-year-month-get-data)|


<h5 id="get_data_availability_response_400">Response 400</h5>

|Name|Schema|
|---|---|
|**errors**  <br>*optional*|[[error](#error)]|


#### **Produces**

* `application/json`


#### **Tags**

* Data


<a name="get_data-availability_file"></a>
### GET /data/{productCode}/{siteCode}/{year-month}/{filename}

#### Description
Get a file for a given product/site/month/filename combination


#### Parameters

|Type|Name|Description|Schema|
|---|---|---|---|
|**Path**|**filename**  <br>*required*|The name of the file|string|
|**Path**|**productCode**  <br>*required*|Product to check for files|string|
|**Path**|**siteCode**  <br>*required*|Site to check for files|string|
|**Path**|**year-month**  <br>*required*|YYYY-MM month to check for files|string|
|**Query**|**package**  <br>*optional*|Package type to return, basic or expanded|enum (basic, expanded)|
|**Query**|**release**  <br>*optional*|The name of the release to get for|string|


#### Responses

|HTTP Code|Description|Schema|
|---|---|---|
|**200**|Available file data|string (binary)|
|**302**|Found available file and redirects to data|string (binary)|
|**400**|Invalid file name specified|[Response 400](#get_data-availability_file_response-400)|
|**default**|General error|[error](#error)|

<a name="get_data-availability_file_response-400"></a>
**Response 400**

|Name|Schema|
|---|---|
|**errors**  <br>*optional*|[[error](#error)]|


#### Produces

* `application/octet-stream`


#### Tags

* Data


<a name="get_data-availability_package"></a>
### GET /data/package/{productCode}/{siteCode}/{year-month}

#### Description
Get a data package for a given product/site/month and package combination


#### Parameters

|Type|Name|Description|Schema|
|---|---|---|---|
|**Path**|**productCode**  <br>*required*|Product to check for files|string|
|**Path**|**siteCode**  <br>*required*|Site to check for files|string|
|**Path**|**year-month**  <br>*required*|YYYY-MM month to check for files|string|
|**Query**|**package**  <br>*optional*|Package type to return, basic or expanded|enum (basic, expanded)|
|**Query**|**release**  <br>*optional*|The name of the release to get for|string|


#### Responses

|HTTP Code|Description|Schema|
|---|---|---|
|**200**|Available data package as a ZIP|The ZIP package|
|**400**|Invalid product, site, or month specified|[Response 400](#get_data-availability_package_response-400)|
|**default**|General error|[error](#error)|

<a name="get_data-availability_package_response-400"></a>
**Response 400**

|Name|Schema|
|---|---|
|**errors**  <br>*optional*|[[error](#error)]|


#### Produces

* `application/zip`


#### Tags

* Data


<a name="definitions"></a>
## **Definitions**

<a name="data-productcode-sitecode-year-month-get-data"></a>
### **data**

|Name|Description|Schema|
|---|---|---|
|**productCode**|The product code.|string|
|**siteCode**|The four letter site code.|string|
|**month**|The available month. Formatted as YYYY-MM.|string|
|**release**|The name of the associated release.|string|
|**packages**  <br>*optional*|The set of data packages.|[[packages](#data-packages)]|
|**files**|The set of data files.|[[file](#file)]|
|**externalData**  <br>*optional*|The set of externally hosted data.|[[externalData](#externaldata)]|


<a name="data-packages"></a>
### **packages**

|Name|Description|Schema|
|---|---|---|
|**type**|The type of package.|string|
|**url**|The URL to the data package API endpoint.|string|


<a name="file"></a>
### **file**

!!! info
    Note that the `crc32` checksum property is deprecated in favor of the `crc32c`
    checksum property.

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
        <tr class="neon-deprecated-property-table-row">
          <td><strong>crc32</strong></td>
          <td><strong>DEPRECATED.</strong><br /> CRC32 value in hex</td>
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


<a name="externalData"></a>
### **externalData**

|Name|Description|Schema|
|---|---|---|
|**name**|The name of the external data object|string|
|**type**|The type of external data link provided.|string|
|**url**|URL to external data.|string|

<a name="error"></a>
### **error**

|Name|Schema|
|---|---|
|**detail**  <br>*optional*|string|
|**status**  <br>*optional*|number (int)|


<br />

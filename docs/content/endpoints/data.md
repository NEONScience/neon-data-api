# Data Endpoint

## Data

The `/data` endpoint shows which monthly data files are available, and provides 
URLs to downloadable files. Several terabytes of data are presently available. 
To keep data files to a reasonable size, they are generally arranged in 
product/site/monthly chunks. Even so, files can be large and you may find it 
worthwhile to check the size attribute before downloading. Also note that the 
provided URLs are from an Amazon S3 service and expire about 24 hours after 
generation. If the time between when you obtain a URL and start downloading the 
file is more than 24 hours, you may need to obtain a new URL before proceeding.  


<a name="paths"></a>
## Paths

<a name="get_data-availability"></a>
### GET /data/{productCode}/{siteCode}/{year-month}

#### Description
Get files available for a given product/site/month combination


#### Parameters

|Type|Name|Description|Schema|
|---|---|---|---|
|**Path**|**productCode**  <br>*required*|Product to check for files|string|
|**Path**|**siteCode**  <br>*required*|Site to check for files|string|
|**Path**|**year-month**  <br>*required*|YYYY-MM month to check for files|string|
|**Query**|**package**  <br>*optional*|Package type to return, basic or expanded|enum (basic, expanded)|


#### Responses

|HTTP Code|Description|Schema|
|---|---|---|
|**200**|Available files|[Response 200](#get_data-availability_response-200)|
|**400**|Product, site not found or invalid date range specified|[Response 400](#get_data-availability_response-400)|
|**default**|General error|[error](#error)|

<a name="get_data-availability_response-200"></a>
**Response 200**

|Name|Schema|
|---|---|
|**data**  <br>*optional*|[data](#data-productcode-sitecode-year-month-get-data)|

<a name="data-productcode-sitecode-year-month-get-data"></a>
**data**

|Name|Schema|
|---|---|
|**files**  <br>*optional*|< [file](#file) > array|
|**month**  <br>*optional*|string|
|**productCode**  <br>*optional*|string|
|**siteCode**  <br>*optional*|string|
|**urls**  <br>*optional*|< string > array|

<a name="get_data-availability_response-400"></a>
**Response 400**

|Name|Schema|
|---|---|
|**errors**  <br>*optional*|< [error](#error) > array|


#### Produces

* `application/json`


#### Tags

* Data


<a name="definitions"></a>
## Definitions

<a name="file"></a>
### file

|Name|Description|Schema|
|---|---|---|
|**crc32**  <br>*optional*|CRC-32 value in hex|string|
|**name**  <br>*optional*|Filename|string|
|**size**  <br>*optional*|Estimated file size in bytes|number (int)|
|**url**  <br>*optional*|Download URL, *will change in the future*|string|


<a name="securityscheme"></a>
## API Tokens

<a name="x-api-token"></a>
### X-API-Token
*Type* : apiKey  
*Name* : X-API-Token  
*In* : HEADER


<br />

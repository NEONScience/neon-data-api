# Prototype Datasets Endpoint

The `/prototype/datasets` endpoint provides information about all prototype NEON datasets. Prototype datasets have generally been collected during the design and construction of NEON. These datasets are not necessarily representative of the long-term standardized data otherwise available on the NEON data portal. Prototype data are provided as downloadable zip files.

The `/prototype/data` endpoint provides access to all data associated with a single dataset.


<a name="paths"></a>
## **Paths**

<a name="get_prototype_datasets"></a>
### GET `/prototype/datasets`

#### **Description**
Get information about all prototype datasets


#### **Responses**

|HTTP Code|Description|Schema|
|---|---|---|
|**200**|List of prototype datasets|[Response 200](#get_prototype_datasets_response-200)|
|**default**|General error|[error](#error)|

<a name="get_prototype_datasets_response-200"></a>
**Response 200**

|Name|Schema|
|---|---|
|**data**  |[prototypeDataset](#prototypedataset) array|


#### **Produces**

* `application/json`


#### **Tags**

* Prototype Datasets


<a name="get_prototype_datasets_uuid"></a>
### GET `/prototype/datasets/{uuid}`

#### **Description**
Get information about a prototype dataset


#### **Parameters**

|Type|Name|Description|Schema|
|---|---|---|---|
|**Path**|**uuid**  <br>*required*|Prototype dataset UUID to get|string|


#### **Responses**

|HTTP Code|Description|Schema|
|---|---|---|
|**200**|Single prototype dataset|[Response 200](#get_prototype_datasets_uuid_response-200)|
|**400**|Prototype dataset not found|[error](#error)|
|**default**|General error|[error](#error)|

<a name="get_prototype_datasets_uuid_response-200"></a>
**Response 200**

|Name|Schema|
|---|---|
|**data**  |[prototypeDataset](#prototypedataset)|


#### **Produces**

* `application/json`


#### **Tags**

* Prototype Datasets

<a name="get_prototype_data_uuid"></a>
### GET `/prototype/data/{uuid}`

#### **Description**
Get information about data files for the prototype dataset

#### **Parameters**

|Type|Name|Description|Schema|
|---|---|---|---|
|**Path**|**uuid**  <br>*required*|Prototype dataset UUID to get|string|


#### **Responses**

|HTTP Code|Description|Schema|
|---|---|---|
|**200**|Available data for the prototype dataset|[Response 200](#get_prototype_data_uuid_response-200)|
|**400**|Prototype dataset not found|[error](#error)|
|**default**|General error|[error](#error)|

<a name="get_prototype_data_uuid_response-200"></a>
**Response 200**

|Name|Schema|
|---|---|
|**data**  |[prototypeDatasetData](#prototypedatasetdata)|


#### **Produces**

* `application/json`


#### **Tags**

* Prototype Datasets


<a name="get_prototype_data_uuid_file"></a>
### GET `/prototype/data/{uuid}/{filename}`

#### **Description**
Gets a data file


#### **Parameters**

|Type|Name|Description|Schema|
|---|---|---|---|
|**Path**|**filename**  <br>*required*|The name of the data file|string|
|**Path**|**uuid**  <br>*required*|Prototype dataset UUID to get|string|


#### **Responses**

|HTTP Code|Description|Schema|
|---|---|---|
|**200**|Available file data|string (binary)|
|**302**|Found available file and redirects to data|string (binary)|
|**400**|Invalid file name specified|[Response 400](#get_prototype_data_uuid_file_response-400)|
|**default**|General error|[error](#error)|

<a name="get_prototype_data_uuid_file_response-400"></a>
**Response 400**

|Name|Schema|
|---|---|
|**errors**  |[error](#error) array|


#### **Produces**

* `application/octet-stream`


#### **Tags**

* Prototype Datasets

<a name="definitions"></a>
## **Definitions**

<a name="prototypedataset"></a>
### **prototypeDataset**

|Name|Description|Schema|
|---|---|---|
|**uuid**  |The UUID of the dataset|string|
|**projectTitle**  |The title of the project|string|
|**projectDescription**  |The description of the project|string|
|**designDescription**  |A description of the dataset's design|string|
|**metadataDescription**  |A brief description of the metadata associated with the dataset|string|
|**studyAreaDescription**  |A description of the dataset's spatial extent|string|
|**datasetAbstract**  |An abstract of the dataset|string|
|**startYear**  |The start year for the time span of the dataset|number (int)|
|**endYear**  |The end year for the time span of the dataset|number (int)|
|**dateUploaded**  |The date the dataset was uploaded|string (date-time)|
|**isPublished**  |Whether or not the dataset has been included in a publication|boolean|
|**data**  |The dataset's data files|[prototypeDatasetDataDetail](#prototypedatasetdatadetail)|
|**dataThemes**  |List of themes to which the dataset belongs|string array|
|**fileTypes**  |List of file types to which the dataset belongs|[prototypeFileType](#prototypefiletype) array|
|**keywords**  |List of words and phrases associated with the dataset|string array|
|**locations**  |List of locations of the dataset's spatial extent|[prototypeLocation](#prototypelocation) array|
|**publicationCitations**  |List of publication citations involving the dataset|[prototypePublicationCitation](#prototypepublicationcitation) array|
|**relatedDataProducts**  |List of data product's that the dataset is related to|[prototypeRelatedDataProduct](#prototyperelateddataproduct) array|
|**responsibleParties**  |List of responsible parties for the dataset|[prototypeResponsibleParty](#prototyperesponsibleparty) array|


<a name="prototypedatasetdatadetail"></a>
### **prototypeDatasetDataDetail**
The dataset's data files


|Name|Description|Schema|
|---|---|---|
|**files** |List of data files for the dataset|[prototypeDataFile](#prototypedatafile) array|
|**url** |The data URL for accessing the data files for the dataset|string|


<a name="prototypedatasetdata"></a>
### **prototypeDatasetData**
Type definition for prototype dataset data


|Name|Description|Schema|
|---|---|---|
|**datasetUuid**  |The dataset UUID|string|
|**datasetProjectTitle**  |The title of the project|string|
|**files**  |List of data files for the dataset|[prototypeDatasetDataFile](#prototypedatasetdatafile) array|

<a name="prototypedatafile"></a>
### **prototypeDataFile**
Type definition for prototype dataset data file


|Name|Description|Schema|
|---|---|---|
|**name**  |The name of the data file|string|
|**description**  |A description of the data file|string|
|**fileSize**  |File size in bytes|string|
|**fileName**  |The filename of the file|string|
|**md5**  |MD5 checksum value in hex|string|
|**type**  |The type of the data file (metadata, data, etc)|[prototypeDataFileType](#prototypedatafiletype)|
|**url**  |Download URL for the file|string|

<a name="prototypedatafiletype"></a>
### **prototypeDataFileType**
Type definition for prototype dataset data file type


|Name|Description|Schema|
|---|---|---|
|**name**  |The name of the data file type|string|
|**description**  |The description of the data file type|string|

<a name="prototypefiletype"></a>
### **prototypeFileType**
Type definition for a prototype dataset file type


|Name|Description|Schema|
|---|---|---|
|**name**  |The name of the file type (CSV, PDF, HDF5, etc)|string|
|**description**  |A description of the file type|string|


<a name="prototypelocation"></a>
### **prototypeLocation**
Type definition for a prototype dataset location


|Name|Description|Schema|
|---|---|---|
|**domain**  |Three character domain abbreviation (D01, D02, etc) for the domain this site is in|string|
|**state**  |Two letter state code that this site is in|string|
|**siteCode**  |Four character code for the site|string|
|**siteName**  |Full name for the site|string|
|**latitude**  |Decimal latitude for the location|string|
|**longitude**  |Decimal longitude for the location|string|


<a name="prototypepublicationcitation"></a>
### **prototypePublicationCitation**
Type definition for a prototype dataset publication citation


|Name|Description|Schema|
|---|---|---|
|**citation**  |The citation associated with a publication involving the dataset|string|


<a name="prototyperelateddataproduct"></a>
### **prototypeRelatedDataProduct**
Type definition for a prototype dataset related data product


|Name|Description|Schema|
|---|---|---|
|**dataProductIdq**  |Revisioned, long code for the data product (NEON.DOM.SITE.DP1.00001.001, etc.)|string|
|**dataProductCode**  |Revisioned, shortened code for the data product (DP1.00001.001, DP1.10072.001, etc.)|string|
|**dataProductName**  |The name of the data product|string|
|**dataProductDescription**  |A brief description of the data product|string|


<a name="prototyperesponsibleparty"></a>
### **prototypeResponsibleParty**
Type definition for a prototype dataset responsible party


|Name|Description|Schema|
|---|---|---|
|**nameOne**  |Primary or first name of the responsible party|string|
|**nameTwo**  |Secondary or last name of the responsible party|string|
|**email**  |The email for the responsible party|string|
|**isNeonAffiliated**  |Whether or not the responsible party is a NEON science team or affiliated with NEON|string|
|**isThirdParty**  |Whether or not the responsible party is not affiliated with a NEON science team|string|

<a name="error"></a>
### **error**  

Information about errors in the response

|Name|Schema|
|---|---|
|**detail**  <br>*optional*|string|
|**status**  <br>*optional*|number (int)|


<br />

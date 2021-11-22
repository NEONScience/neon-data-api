# GraphQL API

In addition to providing REST API endpoints, the NEON Data API also provides 
a GraphQL endpoint, allowing users to take advantage of the flexibility and 
efficiency of the GraphQL data query language to access NEON metadata and data.  
  
The `/graphql` endpoint affords users the ability to define *precisely* the desired data 
in the request and receive *only* the desired data in response.  

## **Using GraphQL**

The following example will illustrate how to use the GraphQL endpoint by comparing 
a `/products` endpoint request for the current REST API to a comparable GraphQL query.

### **REST API**

In order to retrieve all data product codes, names, and descriptions with 
the REST `/products` endpoint, the following request would need to be made 
to obtain all associated metadata for a data product.

!!! example
    **Request:**  

    === "cURL"

        ``` bash
        curl -X GET https://data.neonscience.org/api/v0/products >> neon-data-products.json
        ```

    === "HTTPie"

        ``` bash
        http --download --output=neon-data-products.json GET https://data.neonscience.org/api/v0/products
        ```  

    **Response:**  
    Showing the first element in the products array, properties truncated and 
    excluded for brevity.
    ``` JSON
    {
      "data": [
        {
          "productCodeLong": "...",
          "productCode": "...",
          "productCodePresentation": "...",
          "productName": "...",
          "productDescription": "...",
          ...
          "themes": [...],
          "changeLogs": [...],
          "specs": [...],
          "keywords": [...],
          "siteCodes": [...]
        }
        ...
      ]
    }
    ```

### **GraphQL Query**

If a user wants to retrieve all product codes, names, and descriptions, 
with the `/graphql` endpoint, given the following GraphQL schema object:  

<!-- 
Using Ruby as the language as it yields a close enough 
syntax highlighting result 
-->
``` Ruby
# GraphQL Schema Language Definition
type DataProduct {
  productCode: String
  productName: String
  productDescription: String
  productScienceTeam: String
  productPublicationFormatType: String
  productAbstract: String
  productHasExpanded: Boolean
  productBasicDescription: String
  productExpandedDescription: String
  themes: [String!]
  keywords: [String!]
  specs: [DataProductSpec!]
  siteCodes: [DataProductSite!]
}
```  

The shape of the GraphQL schema definition will determine how queries can be 
formed. Note that in the following query, the `DataProduct` object designates three
properties that are defined in the schema definition. A POST request 
with the following JSON body would produce the desired result:    

``` JSON
{
  "query": "query Products {
    products {
      productCode
      productName
      productDescription
    }
  }"
}
```  

!!! example
    **Request:**  

    === "cURL"

        ``` bash
        curl -H "Content-Type: application/json" -X POST -d " \
        { \
          \"query\": \"query Products { \
            products { \
              productCode \
              productName \
              productDescription \
            } \
          }\" \
        } \
        " https://data.neonscience.org/graphql >> neon-data-products-graphql.json
        ```  

    === "HTTPie"

        ``` bash
        http --download --output=neon-data-products-graphql.json \
          POST https://data.neonscience.org/graphql \
          Content-Type:application/json \
          query="query Products { \
            products { \
              productCode \
              productName \
              productDescription \
            } \
          }"
        ```  

    As the shape of the request query determines the shape of the response,
    each product element in the array would have the following properties:  
    ``` JSON
    {
      "productCode": "...",
      "productName": "...",
      "productDescription": "..."
    }
    ```

    **Response:**  
    Showing the first element in the products array, property values 
    truncated for brevity.
    ``` JSON
    {
      "data": {
        "products": [
          {
            "productCode": "...",
            "productName": "...",
            "productDescription": "...",
          }
          ...
        ]
      }
    }
    ```

!!! note
    GraphQL queries can also describe the name of the response property by setting an alias
    for the query. For example, the products array in the GraphQL response will be a property 
    on the root `data` object. The name of the property on the data object 
    reflects the name of the alias given to the query in the request.  
    
    === "Default Alias"

        ``` JSON hl_lines="4 15"
        # Query
        {
          "query": "query Products {
            products {
              productCode
              productName
              productDescription
            }
          }"
        }

        # Response
        {
          "data": {
            "products": [
              {
                "productCode": "...",
                "productName": "...",
                "productDescription": "...",
              }
              ...
            ]
          }
        }
        ```

    === "Named Alias"

        ``` JSON hl_lines="4 15"
        # Query
        {
          "query": "query Products {
            productList: products {
              productCode
              productName
              productDescription
            }
          }"
        }

        # Response
        {
          "data": {
            "productList": [
              {
                "productCode": "...",
                "productName": "...",
                "productDescription": "...",
              }
              ...
            ]
          }
        }
        ```

To see this query in action, try it out using the [GraphQL Explorer](explorer/)!  
Copy the following GraphiQL query into the query editor window and perform the request.  

``` Ruby
query Products {
  products {
    productCode
    productName
    productDescription
  }
}
```  

See the [Examples](#examples) section for more query examples.

## **Endpoint Definition**

<a name="post_graphql"></a>
### POST `/graphql`

#### **Description**
All GraphQL queries utilize a single `/graphql` endpoint.

### **Queries**
Supported queries for the GraphQL endpoint.  

<table>
  <thead>
    <tr>
      <th align="left">Field</th>
      <th align="left">Arguments</th>
      <th align="left">Response Type</th>
      <th align="left">Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td valign="top"><strong>products</strong></td>
      <td valign="top">release<br><a href="#scalars">String</a></td>
      <td valign="top">[<a href="#dataproduct">DataProduct</a>!]</td>
      <td>Get all data products</td>
    </tr>
    <tr>
      <td valign="top"><strong>product</strong></td>
      <td valign="top">
        productCode<br><a href="#scalars">String</a>!
        <br>
        release<br><a href="#scalars">String</a>
      </td>
      <td valign="top"><a href="#dataproduct">DataProduct</a>!</td>
      <td>
      Get a single product by product code with optional set of site
      codes to include in the associated sites collection
      </td>
    </tr>
    <tr>
      <td valign="top"><strong>filterProducts</strong></td>
      <td valign="top">filter<br><a href="#dataproductfilter">DataProductFilter</a>!</td>
      <td valign="top">[<a href="#dataproduct">DataProduct</a>!]</td>
      <td>Get a set of data products based on a data product filter</td>
    </tr>
    <tr>
      <td valign="top"><strong>sites</strong></td>
      <td valign="top">release<br><a href="#scalars">String</a></td>
      <td valign="top">[<a href="#site">Site</a>!]</td>
      <td>Get all sites</td>
    </tr>
    <tr>
      <td valign="top"><strong>site</strong></td>
      <td valign="top">
        siteCode<br><a href="#scalars">String</a>!
        <br>
        release<br><a href="#scalars">String</a>
      </td>
      <td valign="top"><a href="#site">Site</a>!</td>
      <td>Get a single site by site code</td>
    </tr>
    <tr>
      <td valign="top"><strong>filterSites</strong></td>
      <td valign="top">filter<br><a href="#sitefilter">SiteFilter</a>!</td>
      <td valign="top">[<a href="#site">Site</a>!]</td>
      <td>Get a set of sites based on a site filter</td>
    </tr>
    <tr>
      <td valign="top"><strong>location</strong></td>
      <td valign="top">name<br><a href="#scalars">String</a>!</td>
      <td valign="top"><a href="#location">Location</a>!</td>
      <td>Get a single location by name</td>
    </tr>
    <tr>
      <td valign="top"><strong>locationHierarchy</strong></td>
      <td valign="top">
        name<br><a href="#scalars">String</a>!<br>
        locationType<br><a href="#scalars">String</a>
      </td>
      <td valign="top"><a href="#location">Location</a>!</td>
      <td>
        Get a single location hierarchy by name and optional type. <br>
        Specify a type of descendant to query for. For example, to obtain the
        location hierarchy for all towers at
        location CPER, utilize: locationType=TOWER
      </td>
    </tr>
    <tr>
      <td valign="top"><strong>findLocations</strong></td>
      <td valign="top">query<br><a href="#locationquery">LocationQuery</a>!</td>
      <td valign="top">[<a href="#location">Location</a>!]</td>
      <td>
        Get a set of locations based on a location query.<br>
        The maximum allowable number of locations for a single request is 1000.
      </td>
    </tr>
    <tr>
      <td valign="top"><strong>prototypeDatasets</strong></td>
      <td></td>
      <td valign="top">[<a href="#prototypedataset">PrototypeDataset</a>!]</td>
      <td>
        Get all prototype datasets
      </td>
    </tr>
    <tr>
      <td valign="top"><strong>prototypeDataset</strong></td>
      <td valign="top">uuid<br><a href="#scalars">String</a>!</td>
      <td valign="top"><a href="#prototypedataset">PrototypeDataset</a>!</td>
      <td>
        Get a prototype dataset based on UUID
      </td>
    </tr>
  </tbody>
</table>

### **Objects**

#### **ActivePeriod**

Type definition for an active period for a location

<table>
<thead>
<tr>
<th align="left">Field</th>
<th align="right">Argument</th>
<th align="left">Type</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td colspan="2" valign="top"><strong>activatedDate</strong></td>
<td valign="top"><a href="#scalars">DateTime</a></td>
<td>

The activation date for the time period

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>deactivatedDate</strong></td>
<td valign="top"><a href="#scalars">DateTime</a></td>
<td>

The deactivation date for the time period

</td>
</tr>
</tbody>
</table>

#### **AvailableRelease**

Type definition for associating a release with the set of months
that have available data within the containing product or site

<table>
<thead>
<tr>
<th align="left">Field</th>
<th align="right">Argument</th>
<th align="left">Type</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td colspan="2" valign="top"><strong>release</strong></td>
<td valign="top"><a href="#scalars">String</a></td>
<td>

The release that this availability refers to

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>availableMonths</strong></td>
<td valign="top">[<a href="#scalars">String</a>]</td>
<td>

List of years and months that products are available. Formatted as YYYY-MM.

</td>
</tr>
</tbody>
</table>

#### **Coordinate**

Type definition for a coordinate

<table>
<thead>
<tr>
<th align="left">Field</th>
<th align="right">Argument</th>
<th align="left">Type</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td colspan="2" valign="top"><strong>latitude</strong></td>
<td valign="top"><a href="#scalars">Float</a></td>
<td>

Decimal latitude for the coordinate

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>longitude</strong></td>
<td valign="top"><a href="#scalars">Float</a></td>
<td>

Decimal longitude for the coordinate

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>elevation</strong></td>
<td valign="top"><a href="#scalars">Float</a></td>
<td>

Elevation for the coordinate

</td>
</tr>
</tbody>
</table>

#### **DataProduct**

Type definition for a data product

<table>
<thead>
<tr>
<th align="left">Field</th>
<th align="right">Argument</th>
<th align="left">Type</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td colspan="2" valign="top"><strong>productCode</strong></td>
<td valign="top"><a href="#scalars">String</a></td>
<td>

Revisioned, shortened code for the data product
(DP1.00001.001, DP1.10072.001, etc)

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>productName</strong></td>
<td valign="top"><a href="#scalars">String</a></td>
<td>

The name of the data product

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>productDescription</strong></td>
<td valign="top"><a href="#scalars">String</a></td>
<td>

A brief description of the data product

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>productStatus</strong></td>
<td valign="top"><a href="#scalars">String</a></td>
<td>

Future, active, or retired product status

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>productScienceTeam</strong></td>
<td valign="top"><a href="#scalars">String</a></td>
<td>

Science team responsible for the data product

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>productPublicationFormatType</strong></td>
<td valign="top"><a href="#scalars">String</a></td>
<td>

Class of publication system used during the publication process;
can be independent from productScienceTeam.

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>productAbstract</strong></td>
<td valign="top"><a href="#scalars">String</a></td>
<td>

An abstract of the data product

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>productHasExpanded</strong></td>
<td valign="top"><a href="#scalars">Boolean</a></td>
<td>

Whether a data product has expanded data

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>productBasicDescription</strong></td>
<td valign="top"><a href="#scalars">String</a></td>
<td>

A description of the basic package available for download

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>productExpandedDescription</strong></td>
<td valign="top"><a href="#scalars">String</a></td>
<td>

A description of the expanded package available for download

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>themes</strong></td>
<td valign="top">[<a href="#scalars">String</a>]</td>
<td>

List of themes to which the data product belongs.

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>keywords</strong></td>
<td valign="top">[<a href="#scalars">String</a>]</td>
<td>

List of words and phrases associated with the data product

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>specs</strong></td>
<td valign="top">[<a href="#dataproductspec">DataProductSpec</a>]</td>
<td>

List of documents associated with the data product.

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>releases</strong></td>
<td valign="top">[<a href="#dataproductrelease">DataProductRelease</a>]</td>
<td>

List of releases associated with the data product.

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>siteCodes</strong></td>
<td valign="top">[<a href="#dataproductsite">DataProductSite</a>]</td>
<td>

List of sites and months of available data

</td>
</tr>
</tbody>
</table>

#### **DataProductDoi**

Type definition for a set of DOIs
associated with a data product and release

<table>
<thead>
<tr>
<th align="left">Field</th>
<th align="right">Argument</th>
<th align="left">Type</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td colspan="2" valign="top"><strong>url</strong></td>
<td valign="top"><a href="#scalars">String</a></td>
<td>

The URL of the DOI

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>generationDate</strong></td>
<td valign="top"><a href="#scalars">DateTime</a></td>
<td>

The generation date of the DOI

</td>
</tr>
</tbody>
</table>

#### **DataProductRelease**

Type definition for a release
associated with a data product.

<table>
<thead>
<tr>
<th align="left">Field</th>
<th align="right">Argument</th>
<th align="left">Type</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td colspan="2" valign="top"><strong>release</strong></td>
<td valign="top"><a href="#scalars">String</a></td>
<td>

The name of the release

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>generationDate</strong></td>
<td valign="top"><a href="#scalars">DateTime</a></td>
<td>

The generation date of the release

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>url</strong></td>
<td valign="top"><a href="#scalars">String</a></td>
<td>

The URL of the release API endpoint

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>productDoi</strong></td>
<td valign="top"><a href="#dataproductdoi">DataProductDoi</a></td>
<td>

The DOI definition for the product and release

</td>
</tr>
</tbody>
</table>

#### **DataProductSite**

Type definition for a set of sites describing available data
associated with a data product

<table>
<thead>
<tr>
<th align="left">Field</th>
<th align="right">Argument</th>
<th align="left">Type</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td colspan="2" valign="top"><strong>siteCode</strong></td>
<td valign="top"><a href="#scalars">String</a></td>
<td>

Four character code for the site

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>availableMonths</strong></td>
<td valign="top">[<a href="#scalars">String</a>]</td>
<td>

List of years and months that products are available. Formatted as YYYY-MM.

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>availableDataUrls</strong></td>
<td valign="top">[<a href="#scalars">String</a>]</td>
<td>

List of data urls for products that are available.

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>availableReleases</strong></td>
<td valign="top">[<a href="#availablerelease">AvailableRelease</a>]</td>
<td>

List of available releases and associated months that have
available data within the containing product, site combination.

</td>
</tr>
</tbody>
</table>

#### **DataProductSpec**

Type definition for a set of documents associated with a data product

<table>
<thead>
<tr>
<th align="left">Field</th>
<th align="right">Argument</th>
<th align="left">Type</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td colspan="2" valign="top"><strong>specId</strong></td>
<td valign="top"><a href="#scalars">Int</a></td>
<td>

Document identifier for the associated document

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>specNumber</strong></td>
<td valign="top"><a href="#scalars">String</a></td>
<td>

Document code for the associated document

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>specType</strong></td>
<td valign="top"><a href="#scalars">String</a></td>
<td>

The MIME type associated with the document.

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>specSize</strong></td>
<td valign="top"><a href="#scalars">String</a></td>
<td>

The size in bytes of the document.

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>specDescription</strong></td>
<td valign="top"><a href="#scalars">String</a></td>
<td>

The description of the document.

</td>
</tr>
</tbody>
</table>

#### **Location**

Type definition for a NEON location

<table>
<thead>
<tr>
<th align="left">Field</th>
<th align="right">Argument</th>
<th align="left">Type</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td colspan="2" valign="top"><strong>locationName</strong></td>
<td valign="top"><a href="#scalars">String</a></td>
<td>

Name of the location

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>locationDescription</strong></td>
<td valign="top"><a href="#scalars">String</a></td>
<td>

A description of the location

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>locationType</strong></td>
<td valign="top"><a href="#scalars">String</a></td>
<td>

The type of location

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>domainCode</strong></td>
<td valign="top"><a href="#scalars">String</a></td>
<td>

Three character domain abbreviation
(D01, D02, etc) for the domain this site is in

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>siteCode</strong></td>
<td valign="top"><a href="#scalars">String</a></td>
<td>

Four character code for the site

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>locationDecimalLatitude</strong></td>
<td valign="top"><a href="#scalars">Float</a></td>
<td>

Decimal latitude for the location

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>locationDecimalLongitude</strong></td>
<td valign="top"><a href="#scalars">Float</a></td>
<td>

Decimal longitude for the location

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>locationElevation</strong></td>
<td valign="top"><a href="#scalars">Float</a></td>
<td>

Elevation for the location

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>locationUtmEasting</strong></td>
<td valign="top"><a href="#scalars">Float</a></td>
<td>

The Universal Transverse Mercator easting

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>locationUtmNorthing</strong></td>
<td valign="top"><a href="#scalars">Float</a></td>
<td>

The Universal Transverse Mercator northing

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>locationUtmZone</strong></td>
<td valign="top"><a href="#scalars">Int</a></td>
<td>

The integer Universal Transverse Mercator zone

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>locationUtmHemisphere</strong></td>
<td valign="top"><a href="#scalars">String</a></td>
<td>

The single character Universal Transverse Mercator hemisphere

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>alphaOrientation</strong></td>
<td valign="top"><a href="#scalars">Float</a></td>
<td>

The elevation or pitch angle (in degrees) in the vertical plane at which a sensor is oriented relative to the horizontal plane.

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>betaOrientation</strong></td>
<td valign="top"><a href="#scalars">Float</a></td>
<td>

The roll angle (in degrees) about the longitudinal axis of the sensor at which the sensor is oriented.

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>gammaOrientation</strong></td>
<td valign="top"><a href="#scalars">Float</a></td>
<td>

The azimuth or yaw angle (in degrees) at which a sensor is facing relative to true North.

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>xOffset</strong></td>
<td valign="top"><a href="#scalars">Float</a></td>
<td>

Cartesian offsets of a sensor, in meters, west (positive values) or east (negative values) relative to the reference location.

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>yOffset</strong></td>
<td valign="top"><a href="#scalars">Float</a></td>
<td>

Cartesian offsets of a sensor, in meters, south (positive values) or north (negative values) relative to the reference location.

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>zOffset</strong></td>
<td valign="top"><a href="#scalars">Float</a></td>
<td>

Cartesian offsets of a sensor, in meters, up (positive values) or down (negative values) relative to the reference location.

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>offsetLocation</strong></td>
<td valign="top"><a href="#location">Location</a></td>
<td>

The named location used as a reference point. Offsets are relative
to this location

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>locationPolygon</strong></td>
<td valign="top"><a href="#polygon">Polygon</a></td>
<td>

A list of vertices that define the closed structure for the polygon

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>activePeriods</strong></td>
<td valign="top">[<a href="#activeperiod">ActivePeriod</a>!]</td>
<td>

List of active periods for the location

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>locationProperties</strong></td>
<td valign="top">[<a href="#locationproperty">LocationProperty</a>!]</td>
<td>

List of properties associated with the location.
Contents vary based on the type of location

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>locationHistory</strong></td>
<td valign="top">[<a href="#locationhistory">LocationHistory</a>!]</td>
<td>

The location's history

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>locationParent</strong></td>
<td valign="top"><a href="#scalars">String</a></td>
<td>

Name of the location that this location is in

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>locationParentUrl</strong></td>
<td valign="top"><a href="#scalars">String</a></td>
<td>

URL to request location data for the parent of this location

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>locationParentHierarchy</strong></td>
<td valign="top"><a href="#locationparenthierarchy">LocationParentHierarchy</a></td>
<td>

When querying for the hierarchy, the location's parent hierarchy

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>locationChildren</strong></td>
<td valign="top">[<a href="#scalars">String</a>!]</td>
<td>

A list of names of locations within this location

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>locationChildrenUrls</strong></td>
<td valign="top">[<a href="#scalars">String</a>!]</td>
<td>

A list of URLs to request location data for the children of this location

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>locationChildHierarchy</strong></td>
<td valign="top">[<a href="#locationchildhierarhcy">LocationChildHierarhcy</a>!]</td>
<td>

When querying for the hierarchy, the location's set of immediate children
and associated hierarchy

</td>
</tr>
</tbody>
</table>

#### **LocationChildHierarhcy**

Type definition for a child location hierarchy

<table>
<thead>
<tr>
<th align="left">Field</th>
<th align="right">Argument</th>
<th align="left">Type</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td colspan="2" valign="top"><strong>locationName</strong></td>
<td valign="top"><a href="#scalars">String</a></td>
<td>

Name of the location

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>locationType</strong></td>
<td valign="top"><a href="#scalars">String</a></td>
<td>

Type of location

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>locationDescription</strong></td>
<td valign="top"><a href="#scalars">String</a></td>
<td>

A description for the location

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>locationChildHierarchy</strong></td>
<td valign="top">[<a href="#locationchildhierarhcy">LocationChildHierarhcy</a>!]</td>
<td>

The location's child hierarchy

</td>
</tr>
</tbody>
</table>

#### **LocationHistory**

Type definition for a history record for a location

<table>
<thead>
<tr>
<th align="left">Field</th>
<th align="right">Argument</th>
<th align="left">Type</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td colspan="2" valign="top"><strong>current</strong></td>
<td valign="top"><a href="#scalars">Boolean</a></td>
<td>

Indicates if this is the current location for this location

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>locationStartDate</strong></td>
<td valign="top"><a href="#scalars">DateTime</a></td>
<td>

The start date and time for this location

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>locationEndDate</strong></td>
<td valign="top"><a href="#scalars">DateTime</a></td>
<td>

The end date and time for this location

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>locationDecimalLatitude</strong></td>
<td valign="top"><a href="#scalars">Float</a></td>
<td>

Decimal latitude for the location

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>locationDecimalLongitude</strong></td>
<td valign="top"><a href="#scalars">Float</a></td>
<td>

Decimal longitude for the location

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>locationElevation</strong></td>
<td valign="top"><a href="#scalars">Float</a></td>
<td>

Elevation for the location

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>locationUtmEasting</strong></td>
<td valign="top"><a href="#scalars">Float</a></td>
<td>

The Universal Transverse Mercator easting

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>locationUtmNorthing</strong></td>
<td valign="top"><a href="#scalars">Float</a></td>
<td>

The Universal Transverse Mercator northing

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>locationUtmHemisphere</strong></td>
<td valign="top"><a href="#scalars">String</a></td>
<td>

The single character Universal Transverse Mercator hemisphere

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>locationUtmZone</strong></td>
<td valign="top"><a href="#scalars">Int</a></td>
<td>

The integer Universal Transverse Mercator zone

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>alphaOrientation</strong></td>
<td valign="top"><a href="#scalars">Float</a></td>
<td>

The elevation or pitch angle (in degrees) in the vertical plane at which a sensor is oriented relative to the horizontal plane.

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>betaOrientation</strong></td>
<td valign="top"><a href="#scalars">Float</a></td>
<td>

The roll angle (in degrees) about the longitudinal axis of the sensor at which the sensor is oriented.

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>gammaOrientation</strong></td>
<td valign="top"><a href="#scalars">Float</a></td>
<td>

The azimuth or yaw angle (in degrees) at which a sensor is facing relative to true North.

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>xOffset</strong></td>
<td valign="top"><a href="#scalars">Float</a></td>
<td>

Cartesian offsets of a sensor, in meters, west (positive values) or east (negative values) relative to the reference location.

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>yOffset</strong></td>
<td valign="top"><a href="#scalars">Float</a></td>
<td>

Cartesian offsets of a sensor, in meters, south (positive values) or north (negative values) relative to the reference location.

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>zOffset</strong></td>
<td valign="top"><a href="#scalars">Float</a></td>
<td>

Cartesian offsets of a sensor, in meters, up (positive values) or down (negative values) relative to the reference location.

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>locationPolygon</strong></td>
<td valign="top"><a href="#polygon">Polygon</a></td>
<td>

A list of vertices that define the closed structure for the polygon

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>locationProperties</strong></td>
<td valign="top">[<a href="#locationproperty">LocationProperty</a>!]</td>
<td>

List of properties associated with the location.
Contents vary based on the type of location

</td>
</tr>
</tbody>
</table>

#### **LocationParentHierarchy**

Type definition for a parent location hierarchy

<table>
<thead>
<tr>
<th align="left">Field</th>
<th align="right">Argument</th>
<th align="left">Type</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td colspan="2" valign="top"><strong>locationName</strong></td>
<td valign="top"><a href="#scalars">String</a></td>
<td>

Name of the location

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>locationType</strong></td>
<td valign="top"><a href="#scalars">String</a></td>
<td>

Type of location

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>locationParent</strong></td>
<td valign="top"><a href="#scalars">String</a></td>
<td>

Name of the location that this location is in

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>locationParentUrl</strong></td>
<td valign="top"><a href="#scalars">String</a></td>
<td>

RL to request location data for the parent of this location

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>locationParentHierarchy</strong></td>
<td valign="top"><a href="#locationparenthierarchy">LocationParentHierarchy</a></td>
<td>

The location's parent hierarchy

</td>
</tr>
</tbody>
</table>

#### **LocationProperty**

Type definition for a generic location property value

<table>
<thead>
<tr>
<th align="left">Field</th>
<th align="right">Argument</th>
<th align="left">Type</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td colspan="2" valign="top"><strong>locationPropertyName</strong></td>
<td valign="top"><a href="#scalars">String</a></td>
<td>

The name of the property

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>locationPropertyValue</strong></td>
<td valign="top"><a href="#scalars">AnyScalar</a></td>
<td>

The value of the property

</td>
</tr>
</tbody>
</table>

#### **Polygon**

Type definition for a polygon

<table>
<thead>
<tr>
<th align="left">Field</th>
<th align="right">Argument</th>
<th align="left">Type</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td colspan="2" valign="top"><strong>coordinates</strong></td>
<td valign="top">[<a href="#coordinate">Coordinate</a>!]!</td>
<td></td>
</tr>
</tbody>
</table>

#### **PrototypeData**

Type definition for prototype dataset data

<table>
<thead>
<tr>
<th align="left">Field</th>
<th align="right">Argument</th>
<th align="left">Type</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td colspan="2" valign="top"><strong>url</strong></td>
<td valign="top"><a href="#string">String</a></td>
<td>

The data URL for accessing the data files for the dataset

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>files</strong></td>
<td valign="top">[<a href="#prototypedatafile">PrototypeDataFile</a>!]</td>
<td>

List of data files for the dataset

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>dataLocations</strong></td>
<td valign="top">[<a href="#prototypedatalocation">PrototypeDataLocation</a>!]</td>
<td>

List of data locations for the dataset

</td>
</tr>
</tbody>
</table>

#### **PrototypeDataFile**

Type definition for prototype dataset data file

<table>
<thead>
<tr>
<th align="left">Field</th>
<th align="right">Argument</th>
<th align="left">Type</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td colspan="2" valign="top"><strong>name</strong></td>
<td valign="top"><a href="#string">String</a></td>
<td>

The name of the data file

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>description</strong></td>
<td valign="top"><a href="#string">String</a></td>
<td>

A description of the data file

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>fileSize</strong></td>
<td valign="top"><a href="#int">Int</a></td>
<td>

File size in bytes

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>fileName</strong></td>
<td valign="top"><a href="#string">String</a></td>
<td>

Filename

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>md5</strong></td>
<td valign="top"><a href="#string">String</a></td>
<td>

MD5 checksum value in hex

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>type</strong></td>
<td valign="top"><a href="#prototypedatafiletype">PrototypeDataFileType</a>!</td>
<td>

The type of the data file (metadata, data, etc)

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>url</strong></td>
<td valign="top"><a href="#string">String</a></td>
<td>

Download URL

</td>
</tr>
</tbody>
</table>

#### **PrototypeDataFileType**

Type definition for prototype dataset data file type

<table>
<thead>
<tr>
<th align="left">Field</th>
<th align="right">Argument</th>
<th align="left">Type</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td colspan="2" valign="top"><strong>name</strong></td>
<td valign="top"><a href="#string">String</a></td>
<td>

The name of the data file type

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>description</strong></td>
<td valign="top"><a href="#string">String</a></td>
<td>

The description of the data file type

</td>
</tr>
</tbody>
</table>

#### **PrototypeDataLocation**

Type definition for a prototype dataset data location

<table>
<thead>
<tr>
<th align="left">Field</th>
<th align="right">Argument</th>
<th align="left">Type</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td colspan="2" valign="top"><strong>path</strong></td>
<td valign="top"><a href="#string">String</a></td>
<td>

The path or URL to the data location

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>description</strong></td>
<td valign="top"><a href="#string">String</a></td>
<td>

A description of the data location referenced by the path

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>metadata</strong></td>
<td valign="top"><a href="#string">Boolean</a></td>
<td>

Indicates that this data location refers to metadata exclusively

</td>
</tr>
</tbody>
</table>

#### **PrototypeDataset**

Type definition for a prototype dataset

<table>
<thead>
<tr>
<th align="left">Field</th>
<th align="right">Argument</th>
<th align="left">Type</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td colspan="2" valign="top"><strong>uuid</strong></td>
<td valign="top"><a href="#string">String</a></td>
<td>

The UUID of the dataset

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>projectTitle</strong></td>
<td valign="top"><a href="#string">String</a></td>
<td>

The title of the project

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>projectDescription</strong></td>
<td valign="top"><a href="#string">String</a></td>
<td>

The description of the project

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>designDescription</strong></td>
<td valign="top"><a href="#string">String</a></td>
<td>

A description of the dataset's design

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>metadataDescription</strong></td>
<td valign="top"><a href="#string">String</a></td>
<td>

A brief description of the metadata associated
with the dataset

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>studyAreaDescription</strong></td>
<td valign="top"><a href="#string">String</a></td>
<td>

A description of the dataset's spatial extent

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>datasetAbstract</strong></td>
<td valign="top"><a href="#string">String</a></td>
<td>

An abstract of the dataset

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>startYear</strong></td>
<td valign="top"><a href="#int">Int</a></td>
<td>

The start year for the time span of the dataset

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>endYear</strong></td>
<td valign="top"><a href="#int">Int</a></td>
<td>

The end year for the time span of the dataset

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>dateUploaded</strong></td>
<td valign="top"><a href="#datetime">DateTime</a></td>
<td>

The date the dataset was uploaded

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>isPublished</strong></td>
<td valign="top"><a href="#boolean">Boolean</a></td>
<td>

Whether or not the dataset has been included in a publication

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>version</strong></td>
<td valign="top"><a href="#string">String</a></td>
<td>

The version of the dataset

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>versionDescription</strong></td>
<td valign="top"><a href="#string">String</a></td>
<td>

The version description

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>doi</strong></td>
<td valign="top"><a href="#prototypedatasetdoi">PrototypeDatasetDoi</a></td>
<td>

The DOI for the dataset

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>relatedVersions</strong></td>
<td valign="top">[<a href="#prototypedatasetrelatedversion">PrototypeDatasetRelatedVersion</a>!]</td>
<td>

The related versions of this dataset

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>data</strong></td>
<td valign="top"><a href="#prototypedata">PrototypeData</a></td>
<td>

The dataset's data files

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>dataThemes</strong></td>
<td valign="top">[<a href="#string">String</a>!]</td>
<td>

List of themes to which the dataset belongs

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>fileTypes</strong></td>
<td valign="top">[<a href="#prototypefiletype">PrototypeFileType</a>!]</td>
<td>

List of file types to which the dataset belongs

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>keywords</strong></td>
<td valign="top">[<a href="#string">String</a>!]</td>
<td>

List of words and phrases associated with the dataset

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>locations</strong></td>
<td valign="top">[<a href="#prototypelocation">PrototypeLocation</a>!]</td>
<td>

List of locations of the dataset's spatial extent

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>publicationCitations</strong></td>
<td valign="top">[<a href="#prototypepublicationcitation">PrototypePublicationCitation</a>!]</td>
<td>

List of publication citations involving the dataset

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>relatedDataProducts</strong></td>
<td valign="top">[<a href="#prototyperelateddataproduct">PrototypeRelatedDataProduct</a>!]</td>
<td>

List of data product's that the dataset is related to

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>scienceTeams</strong></td>
<td valign="top">[<a href="#string">String</a>!]</td>
<td>

List of responsible science teams for the dataset

</td>
</tr>
</tbody>
</table>

#### **PrototypeDatasetDoi**

Type definition for a Prototype Dataset related version

<table>
<thead>
<tr>
<th align="left">Field</th>
<th align="right">Argument</th>
<th align="left">Type</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td colspan="2" valign="top"><strong>url</strong></td>
<td valign="top"><a href="#string">String</a></td>
<td>

The URL of the DOI

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>generationDate</strong></td>
<td valign="top"><a href="#datetime">DateTime</a></td>
<td>

The generation date of the DOI

</td>
</tr>
</tbody>
</table>

#### **PrototypeDatasetRelatedVersion**

Type definition for a Prototype Dataset related version

<table>
<thead>
<tr>
<th align="left">Field</th>
<th align="right">Argument</th>
<th align="left">Type</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td colspan="2" valign="top"><strong>datasetUuid</strong></td>
<td valign="top"><a href="#string">String</a></td>
<td>

The related dataset UUID

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>datasetProjectTitle</strong></td>
<td valign="top"><a href="#string">String</a></td>
<td>

The related dataset project title

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>datasetVersion</strong></td>
<td valign="top"><a href="#string">String</a></td>
<td>

The related dataset version

</td>
</tr>
</tbody>
</table>

#### **PrototypeFileType**

Type definition for a prototype dataset file type

<table>
<thead>
<tr>
<th align="left">Field</th>
<th align="right">Argument</th>
<th align="left">Type</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td colspan="2" valign="top"><strong>name</strong></td>
<td valign="top"><a href="#string">String</a></td>
<td>

The name of the file type (CSV, PDF, HDF5, etc)

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>description</strong></td>
<td valign="top"><a href="#string">String</a></td>
<td>

A description of the file type

</td>
</tr>
</tbody>
</table>

#### **PrototypeLocation**

Type definition for a prototype dataset location

<table>
<thead>
<tr>
<th align="left">Field</th>
<th align="right">Argument</th>
<th align="left">Type</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td colspan="2" valign="top"><strong>domain</strong></td>
<td valign="top"><a href="#string">String</a></td>
<td>

Three character domain abbreviation (D01, D02, etc) for the
domain this site is in

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>state</strong></td>
<td valign="top"><a href="#string">String</a></td>
<td>

Two letter state code that this site is in

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>siteCode</strong></td>
<td valign="top"><a href="#string">String</a></td>
<td>

Four character code for the site

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>siteName</strong></td>
<td valign="top"><a href="#string">String</a></td>
<td>

Full name for the site

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>latitude</strong></td>
<td valign="top"><a href="#float">Float</a></td>
<td>

Decimal latitude for the location

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>longitude</strong></td>
<td valign="top"><a href="#float">Float</a></td>
<td>

Decimal longitude for the location

</td>
</tr>
</tbody>
</table>

#### **PrototypePublicationCitation**

Type definition for a prototype dataset publication citation

<table>
<thead>
<tr>
<th align="left">Field</th>
<th align="right">Argument</th>
<th align="left">Type</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td colspan="2" valign="top"><strong>citation</strong></td>
<td valign="top"><a href="#string">String</a></td>
<td>

The citation associated with a publication involving the dataset

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>citationIdentifier</strong></td>
<td valign="top"><a href="#string">String</a></td>
<td>

The citation identifier (DOI, arXiv, URL) associated with a publication involving the dataset

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>citationIdentifierType</strong></td>
<td valign="top"><a href="#string">String</a></td>
<td>

The citation identifier type associated with a publication involving the dataset (DOI, arXiv, URL)

</td>
</tr>
</tbody>
</table>

#### **PrototypeRelatedDataProduct**

Type definition for a prototype dataset related data product

<table>
<thead>
<tr>
<th align="left">Field</th>
<th align="right">Argument</th>
<th align="left">Type</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td colspan="2" valign="top"><strong>dataProductIdq</strong></td>
<td valign="top"><a href="#string">String</a></td>
<td>

Revisioned, long code for the data product (NEON.DOM.SITE.DP1.00001.001, etc.)

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>dataProductCode</strong></td>
<td valign="top"><a href="#string">String</a></td>
<td>

Revisioned, shortened code for the data product (DP1.00001.001, DP1.10072.001, etc.)

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>dataProductName</strong></td>
<td valign="top"><a href="#string">String</a></td>
<td>

The name of the data product

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>dataProductDescription</strong></td>
<td valign="top"><a href="#string">String</a></td>
<td>

A brief description of the data product

</td>
</tr>
</tbody>
</table>

#### **Site**

Type definition for a site

<table>
<thead>
<tr>
<th align="left">Field</th>
<th align="right">Argument</th>
<th align="left">Type</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td colspan="2" valign="top"><strong>siteCode</strong></td>
<td valign="top"><a href="#scalars">String</a></td>
<td>

Four character code for the site

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>siteName</strong></td>
<td valign="top"><a href="#scalars">String</a></td>
<td>

Full name for the site

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>siteDescription</strong></td>
<td valign="top"><a href="#scalars">String</a></td>
<td>

Brief site description

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>siteType</strong></td>
<td valign="top"><a href="#scalars">String</a></td>
<td>

Core or Gradient site

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>siteLongitude</strong></td>
<td valign="top"><a href="#scalars">Float</a></td>
<td>

Point longitude for the site

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>siteLatitude</strong></td>
<td valign="top"><a href="#scalars">Float</a></td>
<td>

Point latitude for the site

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>stateName</strong></td>
<td valign="top"><a href="#scalars">String</a></td>
<td>

Full name of the state or territory that this site is in

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>stateCode</strong></td>
<td valign="top"><a href="#scalars">String</a></td>
<td>

Two letter state code that this site is in

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>domainName</strong></td>
<td valign="top"><a href="#scalars">String</a></td>
<td>

Brief description for the domain this site is in

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>domainCode</strong></td>
<td valign="top"><a href="#scalars">String</a></td>
<td>

Three character domain abbreviation (D01, D02, etc) for the
domain this site is in

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>deimsId</strong></td>
<td valign="top"><a href="#scalars">String</a></td>
<td>

Dynamic Ecological Information Management System - Site and dataset registry (DEIMS-SDR) ID for the site, see deims.org

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>releases</strong></td>
<td valign="top">[<a href="#dataproductrelease">DataProductRelease</a>]</td>
<td>

List of releases associated with the site based on data
products available.

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>dataProducts</strong></td>
<td valign="top">[<a href="#sitedataproduct">SiteDataProduct</a>]</td>
<td>

List of data products and months of available data

</td>
</tr>
</tbody>
</table>

#### **SiteDataProduct**

Type definition for a set of products describing available data
associated with a site

<table>
<thead>
<tr>
<th align="left">Field</th>
<th align="right">Argument</th>
<th align="left">Type</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td colspan="2" valign="top"><strong>dataProductCode</strong></td>
<td valign="top"><a href="#scalars">String</a></td>
<td>

Revisioned, shortened code for the data product
(DP1.00001.001, DP1.10072.001, etc)

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>dataProductTitle</strong></td>
<td valign="top"><a href="#scalars">String</a></td>
<td>

Full title for the data product.

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>availableMonths</strong></td>
<td valign="top">[<a href="#scalars">String</a>]</td>
<td>

List of years and months that products are available. Formatted as YYYY-MM.

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>availableDataUrls</strong></td>
<td valign="top">[<a href="#scalars">String</a>]</td>
<td>

List of data urls for products that are available.

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>availableReleases</strong></td>
<td valign="top">[<a href="#availablerelease">AvailableRelease</a>]</td>
<td>

List of available releases and associated months that have
available data within the containing site, product combination.

</td>
</tr>
</tbody>
</table>

### **Inputs**

#### **DataProductFilter**

Input type for encapsulating data product filter fields

<table>
<thead>
<tr>
<th colspan="2" align="left">Field</th>
<th align="left">Type</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td colspan="2" valign="top"><strong>productCodes</strong></td>
<td valign="top">[<a href="#scalars">String</a>!]!</td>
<td>

The set of product codes to get for

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>siteCodes</strong></td>
<td valign="top">[<a href="#scalars">String</a>!]</td>
<td>

The set of site codes to include for each product

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>startMonth</strong></td>
<td valign="top"><a href="#scalars">String</a></td>
<td>

The start month to filter the associated availability to. Formatted as YYYY-MM.

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>endMonth</strong></td>
<td valign="top"><a href="#scalars">String</a></td>
<td>

The end month to filter the associated availability to. Formatted as YYYY-MM.

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>release</strong></td>
<td valign="top"><a href="#scalars">String</a></td>
<td>

The release to filter the set of products and availability to.

</td>
</tr>
</tbody>
</table>

#### **LocationQuery**

Input type for encapsulating location query fields

<table>
<thead>
<tr>
<th colspan="2" align="left">Field</th>
<th align="left">Type</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td colspan="2" valign="top"><strong>locationNames</strong></td>
<td valign="top">[<a href="#scalars">String</a>!]!</td>
<td>

The set of location names to get for

</td>
</tr>
</tbody>
</table>

#### **SiteFilter**

Input type for encapsulating site filter fields

<table>
<thead>
<tr>
<th colspan="2" align="left">Field</th>
<th align="left">Type</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td colspan="2" valign="top"><strong>siteCodes</strong></td>
<td valign="top">[<a href="#scalars">String</a>!]!</td>
<td>

The set of site codes to get for

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>productCodes</strong></td>
<td valign="top">[<a href="#scalars">String</a>!]</td>
<td>

The set of product codes to include for each site

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>startMonth</strong></td>
<td valign="top"><a href="#scalars">String</a></td>
<td>

The start month to filter the associated availability to. Formatted as YYYY-MM.

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>endMonth</strong></td>
<td valign="top"><a href="#scalars">String</a></td>
<td>

The end month to filter the associated availability to. Formatted as YYYY-MM.

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>release</strong></td>
<td valign="top"><a href="#scalars">String</a></td>
<td>

The release to filter the set of sites and availability to.

</td>
</tr>
</tbody>
</table>

### **Scalars**

<table>
  <thead>
    <tr>
      <th align="left">Type</th>
      <th align="left">Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td valign="top"><strong>AnyScalar</strong></td>
      <td>
        The AnyScalar data type represents a union of possible scalar values.
      </td>
    </tr>
    <tr>
      <td valign="top"><strong>Boolean</strong></td>
      <td>Built-in Boolean</td>
    </tr>
    <tr>
      <td valign="top"><strong>DateTime</strong></td>
      <td>
        The DateTime data type represents a date as an ISO formatted date time: yyyy-MM-dd'T'HH:mm:ss'Z'
      </td>
    </tr>
    <tr>
      <td valign="top"><strong>Float</strong></td>
      <td>Built-in Float</td>
    </tr>
    <tr>
      <td valign="top"><strong>Int</strong></td>
      <td>Built-in Int</td>
    </tr>
    <tr>
      <td valign="top"><strong>String</strong></td>
      <td>Built-in String</td>
    </tr>
  </tbody>
</table>

## **Examples**

The following examples will provide both an example POST request JSON body as well 
as a GraphiQL query for utilization from the [GraphQL Explorer](explorer/).  

### **Data Products**

#### **All data products**

!!! example
    Get all products and include the product code, name, and description for each:  

    === "GraphiQL Query"

        ``` Ruby
        query Products {
          products {
            productCode
            productName
            productDescription
          }
        }
        ```

    === "POST JSON Body"

        ``` JSON
        {
          "query": "query Products {
            products {
              productCode
              productName
              productDescription
            }
          }"
        }
        ```  

    === "cURL"

        ``` bash
        curl -H "Content-Type: application/json" -X POST -d " \
        { \
          \"query\": \"query Products { \
            products { \
              productCode \
              productName \
              productDescription \
            } \
          }\" \
        } \
        " https://data.neonscience.org/graphql >> neon-data-products-graphql.json
        ```  

    === "HTTPie"

        ``` bash
        http --download --output=neon-data-products-graphql.json \
          POST https://data.neonscience.org/graphql \
          Content-Type:application/json \
          query="query Products { \
            products { \
              productCode \
              productName \
              productDescription \
            } \
          }"
        ```

#### **One or many data products**  

!!! example
    Get one or many data products with availability information.

    **One product:**

    === "GraphiQL Query"

        ``` Ruby
        query Product {
          product(productCode: "DP1.00001.001") {
            productCode
            productName
            siteCodes {
              siteCode
              availableMonths
            }
          }
        }
        ```

    === "POST JSON Body"

        ``` JSON
        {
          "query": "query Product {
            product(productCode: \"DP1.00001.001\") {
              productCode
              productName
              siteCodes {
                siteCode
                availableMonths
              }
            }
          }"
        }
        ```  

    === "HTTPie"

        ``` bash
        http --download --output=neon-data-product-DP1.00001.001-graphql.json \
          POST https://data.neonscience.org/graphql \
          Content-Type:application/json \
          query="query Product { \
            product(productCode: \"DP1.00001.001\") { \
              productCode \
              productName \
              siteCodes { \
                siteCode \
                availableMonths \
              } \
            } \
          }"
        ```  

    **Many products:**  
    Note that this introduces a new query - [filterProducts](#queries).  Utilizing 
    the [DataProductFilter](#dataproductfilter) input type as an argument.

    === "GraphiQL Query"

        ``` Ruby
        # Query editor window
        query filterProducts($filter: DataProductFilter!) {
          products: filterProducts(filter: $filter) {
            productCode
            productName
            productDescription
            siteCodes {
              siteCode
              availableMonths
            }
          }
        }
        ```  
        ``` Ruby
        # Query variables window
        {
          "filter": {
            "productCodes": ["DP1.00001.001", "DP1.00002.001"]
          }
        }
        ```

    === "POST JSON Body"

        ``` JSON
        {
          "query": "query filterProducts {
            products: filterProducts(
                filter: { 
                  productCodes: [\"DP1.00001.001\", \"DP1.00002.001\"]  
                }
            ) {
              productCode
              productName
              productDescription
              siteCodes {
                siteCode
                availableMonths
              }
            }
          }"
        }
        ```  

    === "HTTPie"

        ``` bash
        http --download --output=neon-data-product-many-graphql.json \
          POST https://data.neonscience.org/graphql \
          Content-Type:application/json \
          query="query filterProducts { \
            products: filterProducts( \
                filter: {  \
                  productCodes: [\"DP1.00001.001\", \"DP1.00002.001\"] \
                } \
            ) { \
              productCode \
              productName \
              productDescription \
              siteCodes { \
                siteCode \
                availableMonths \
              } \
            } \
          }"
        ```

#### **Filtered data products**

!!! example
    Get a data product and filter by availability.

    **Filtered product:**

    === "GraphiQL Query"

        ``` Ruby
        # Query editor window
        query filterProducts($filter: DataProductFilter!) {
          products: filterProducts(filter: $filter) {
            productCode
            productName
            productDescription
            siteCodes {
              siteCode
              availableMonths
            }
          }
        }
        ```  
        ``` Ruby
        # Query variables window
        {
          "filter": {
            "productCodes": ["DP1.00001.001"],
            "siteCodes": ["ABBY"],
            "startMonth": "2019-01",
            "endMonth": "2019-12"
          }
        }
        ```

    === "POST JSON Body"

        ``` JSON
        {
          "query": "query filterProducts {
            products: filterProducts(
                filter: { 
                  productCodes: [\"DP1.00001.001\"],
                  siteCodes: [\"ABBY\"],
                  startMonth: \"2019-01\",
                  endMonth: \"2019-12\"
                }
            ) {
              productCode
              productName
              productDescription
              siteCodes {
                siteCode
                availableMonths
              }
            }
          }"
        }
        ```  

    === "HTTPie"

        ``` bash
        http --download --output=neon-data-product-filtered-graphql.json \
          POST https://data.neonscience.org/graphql \
          Content-Type:application/json \
          query="query filterProducts { \
            products: filterProducts( \
                filter: {  \
                  productCodes: [\"DP1.00001.001\"] \
                  siteCodes: [\"ABBY\"], \
                  startMonth: \"2019-01\", \
                  endMonth: \"2019-12\" \
                } \
            ) { \
              productCode \
              productName \
              productDescription \
              siteCodes { \
                siteCode \
                availableMonths \
              } \
            } \
          }"
        ```


### **Sites**

#### **All sites**

!!! example    
    Get sites with code, description, latitude, longitude.  

    === "GraphiQL Query"

        ``` Ruby
        query Sites {
          sites {
            siteCode
            siteDescription
            siteLatitude
            siteLongitude
          }
        }
        ```

    === "POST JSON Body"

        ``` JSON
        {
          "query": "query Sites {
            sites {
              siteCode
              siteDescription
              siteLatitude
              siteLongitude
            }
          }"
        }
        ```  

    === "cURL"

        ``` bash
        curl -H "Content-Type: application/json" -X POST -d " \
        { \
          \"query\": \"query Sites { \
            products { \
              siteCode \
              siteDescription \
              siteLatitude \
              siteLongitude \
            } \
          }\" \
        } \
        " https://data.neonscience.org/graphql >> neon-sites-graphql.json
        ```  

    === "HTTPie"

        ``` bash
        http --download --output=neon-sites-graphql.json \
          POST https://data.neonscience.org/graphql \
          Content-Type:application/json \
          query="query Sites { \
            sites { \
              siteCode \
              siteDescription \
              siteLatitude \
              siteLongitude \
            } \
          }"
        ```

#### **One or many sites**

!!! example
    Get one or many sites with availability information.

    **One site:**

    === "GraphiQL Query"

        ``` Ruby
        query Site {
          site(siteCode: "ABBY") {
            siteCode
            siteDescription
            siteLatitude
            siteLongitude
            dataProducts {
              dataProductCode
              availableMonths
            }
          }
        }
        ```

    === "POST JSON Body"

        ``` JSON
        {
          "query": "query Site {
            site(siteCode: \"ABBY\") {
              siteCode
              siteDescription
              siteLatitude
              siteLongitude
              dataProducts {
                dataProductCode
                availableMonths
              }
            }
          }"
        }
        ```  

    === "HTTPie"

        ``` bash
        http --download --output=neon-site-ABBY-graphql.json \
          POST https://data.neonscience.org/graphql \
          Content-Type:application/json \
          query="query Site { \
            site(siteCode: \"ABBY\") { \
              siteCode \
              siteDescription \
              siteLatitude \
              siteLongitude \
              dataProducts { \
                dataProductCode \
                availableMonths \
              } \
            } \
          }"
        ```  

    **Many sites:**  
    Note that this introduces a new query - [filterSites](#queries).  Utilizing 
    the [SiteFilter](#sitefilter) input type as an argument.

    === "GraphiQL Query"

        ``` Ruby
        # Query editor window
        query filterSites($filter: SiteFilter!) {
          sites: filterSites(filter: $filter) {
            siteCode
            siteDescription
            siteLatitude
            siteLongitude
            dataProducts {
              dataProductCode
              availableMonths
            }
          }
        }
        ```  
        ``` Ruby
        # Query variables window
        {
          "filter": {
            "siteCodes": ["ABBY", "CPER"]
          }
        }
        ```

    === "POST JSON Body"

        ``` JSON
        {
          "query": "query filterSites {
            sites: filterSites(
                filter: { 
                  siteCodes: [\"ABBY\", \"CPER\"]  
                }
            ) {
              siteCode
              siteDescription
              siteLatitude
              siteLongitude
              dataProducts {
                dataProductCode
                availableMonths
              }
            }
          }"
        }
        ```  

    === "HTTPie"

        ``` bash
        http --download --output=neon-sites-many-graphql.json \
          POST https://data.neonscience.org/graphql \
          Content-Type:application/json \
          query="query filterSites { \
            sites: filterSites( \
                filter: {  \
                  siteCodes: [\"ABBY\", \"CPER\"] \
                } \
            ) { \
              siteCode \
              siteDescription \
              siteLatitude \
              siteLongitude \
              dataProducts { \
                dataProductCode \
                availableMonths \
              } \
            } \
          }"
        ```

#### **Filtered sites**

!!! example
    Get a site and filter by availability.

    **Filtered site:**

    === "GraphiQL Query"

        ``` Ruby
        # Query editor window
        query filterSites($filter: SiteFilter!) {
          sites: filterSites(filter: $filter) {
            siteCode
            siteDescription
            siteLatitude
            siteLongitude
            dataProducts {
              dataProductCode
              availableMonths
            }
          }
        }
        ```  
        ``` Ruby
        # Query variables window
        {
          "filter": {
            "siteCodes": ["ABBY"],
            "productCodes": ["DP1.00001.001"],
            "startMonth": "2019-01",
            "endMonth": "2019-12"
          }
        }
        ```

    === "POST JSON Body"

        ``` JSON
        {
          "query": "query filterSites {
            sites: filterSites(
                filter: { 
                  siteCodes: [\"ABBY\"],
                  productCodes: [\"DP1.00001.001\"],
                  startMonth: \"2019-01\",
                  endMonth: \"2019-12\"
                }
            ) {
              siteCode
              siteDescription
              siteLatitude
              siteLongitude
              dataProducts {
                dataProductCode
                availableMonths
              }
            }
          }"
        }
        ```  

    === "HTTPie"

        ``` bash
        http --download --output=neon-site-filtered-graphql.json \
          POST https://data.neonscience.org/graphql \
          Content-Type:application/json \
          query="query filterSites { \
            sites: filterSites( \
                filter: {  \
                  siteCodes: [\"ABBY\"], \
                  productCodes: [\"DP1.00001.001\"] \
                  startMonth: \"2019-01\", \
                  endMonth: \"2019-12\" \
                } \
            ) { \
              siteCode \
              siteDescription \
              siteLatitude \
              siteLongitude \
              dataProducts { \
                dataProductCode \
                availableMonths \
              } \
            } \
          }"
        ```

### **Locations**

#### **Get a location**

!!! example
    Get location information by name

    === "GraphiQL Query"

        ``` Ruby
        query Location {
          location(name: "ABBY") {
            locationName
            locationDescription
            locationType
            domainCode
            siteCode
            locationDecimalLatitude
            locationDecimalLongitude
            locationElevation
            locationUtmEasting
            locationUtmNorthing
            locationUtmHemisphere
            locationUtmZone
            alphaOrientation
            betaOrientation
            gammaOrientation
            xOffset
            yOffset
            zOffset
            locationProperties {
              locationPropertyName
              locationPropertyValue
            }
          }
        }
        ```

    === "POST JSON Body"

        ``` JSON
        {
          "query": "query Location {
            location(name: \"ABBY\") {
              locationName
              locationDescription
              locationType
              domainCode
              siteCode
              locationDecimalLatitude
              locationDecimalLongitude
              locationElevation
              locationUtmEasting
              locationUtmNorthing
              locationUtmHemisphere
              locationUtmZone
              alphaOrientation
              betaOrientation
              gammaOrientation
              xOffset
              yOffset
              zOffset
              locationProperties {
                locationPropertyName
                locationPropertyValue
              }
            }
          }"
        }
        ```  

    === "HTTPie"

        ``` bash
        http --download --output=neon-location-ABBY-graphql.json \
          POST https://data.neonscience.org/graphql \
          Content-Type:application/json \
          query="query Location { \
            location(name: \"ABBY\") { \
              locationName \
              locationDescription \
              locationType \
              domainCode \
              siteCode \
              locationDecimalLatitude \
              locationDecimalLongitude \
              locationElevation \
              locationUtmEasting \
              locationUtmNorthing \
              locationUtmHemisphere \
              locationUtmZone \
              alphaOrientation \
              betaOrientation \
              gammaOrientation \
              xOffset \
              yOffset \
              zOffset \
              locationProperties { \
                locationPropertyName \
                locationPropertyValue \
              } \
            } \
          }"
        ```  

#### **Find locations**

!!! example
    Get a set of locations by name

    **Find locations query:**

    === "GraphiQL Query"

        ``` Ruby
        # Query editor window
        query findLocations($query: LocationQuery!) {
          locations: findLocations(query: $query) {
            locationName
            locationDescription
            locationType
            domainCode
            siteCode
            locationDecimalLatitude
            locationDecimalLongitude
            locationElevation
          }
        }
        ```  
        ``` Ruby
        # Query variables window
        {
          "query": {
            "locationNames": ["D10", "CPER", "ARIK"]
          }
        }
        ```

    === "POST JSON Body"

        ``` JSON
        {
          "query": "query findLocations {
            locations: findLocations(
                query: { 
                  locationNames: [\"D10\", \"CPER\", \"ARIK\"]
                }
            ) {
              locationName
              locationDescription
              locationType
              domainCode
              siteCode
              locationDecimalLatitude
              locationDecimalLongitude
              locationElevation
            }
          }"
        }
        ```  

    === "HTTPie"

        ``` bash
        http --download --output=neon-locations-graphql.json \
          POST https://data.neonscience.org/graphql \
          Content-Type:application/json \
          query="query findLocations { \
            locations: findLocations( \
                query: {  \
                  locationNames: [\"D10\", \"CPER\", \"ARIK\"] \
                } \
            ) { \
              locationName \
              locationDescription \
              locationType \
              domainCode \
              siteCode \
              locationDecimalLatitude \
              locationDecimalLongitude \
              locationElevation \
            } \
          }"
        ```

## **Resources**

For a deeper dive into GraphQL concepts:  

- [graphql.org](https://graphql.org)
- [GraphQL Specification](https://spec.graphql.org/June2018/)

HTTPie CLI Tool:

- [httpie.org](https://httpie.org/)


<br/>

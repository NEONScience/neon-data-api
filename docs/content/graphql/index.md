# GraphQL API

## Introduction

In addition to providing REST API endpoints, the NEON Data API also provides 
a GraphQL endpoint, allowing users to take advantage of the flexibility and 
efficiency of the GraphQL data query language to access NEON metadata and data.  
  
The `/graphql` endpoint affords users the ability to define *precisely* the desired data 
in the request and receive *only* the desired data in response.  

## Using GraphQL

The following example will illustrate how to use the GraphQL endpoint by comparing 
a `/products` endpoint request for the current REST API to a comparable GraphQL query.

### REST API

In order to retrieve all data product codes, names, and descriptions with 
the REST `/products` endpoint, the following request would need to be made 
to obtain all associated metadata for a data product.

!!! example
    **Request:**  

    ``` bash tab="cURL"
    curl -X GET https://data.neonscience.org/api/v0/products >> neon-data-products.json
    ```  

    ``` bash tab="HTTPie"
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

### GraphQL Query

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
formed. Note that in the above query, the `DataProduct` object designates three
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

    ``` bash tab="cURL"
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

    ``` bash tab="HTTPie"
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
    
    ``` JSON hl_lines="4 15" tab="Default Alias"
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

    ``` JSON hl_lines="4 15" tab="Named Alias"
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

## Endpoint Definition

<a name="post_graphql"></a>
### POST `/graphql`

#### Description
All GraphQL queries utilize a single `/graphql` endpoint.

### Queries
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
      <td colspan="2" valign="top"><strong>products</strong></td>
      <td valign="top">[<a href="#dataproduct">DataProduct</a>!]</td>
      <td>Get all data products</td>
    </tr>
    <tr>
      <td valign="top"><strong>product</strong></td>
      <td valign="top">productCode  <a href="#scalars">String</a>!</td>
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
      <td colspan="2" valign="top"><strong>sites</strong></td>
      <td valign="top">[<a href="#site">Site</a>!]</td>
      <td>Get all sites</td>
    </tr>
    <tr>
      <td valign="top"><strong>site</strong></td>
      <td valign="top">siteCode<br><a href="#scalars">String</a>!</td>
      <td valign="top"><a href="#site">Site</a>!</td>
      <td>Get a single site by site code</td>
    </tr>
    <tr>
      <td valign="top"><strong>filterSites</strong></td>
      <td valign="top">filter<br><a href="#sitefilter">SiteFilter</a>!</td>
      <td valign="top">[<a href="#site">Site</a>!]</td>
      <td>Get a set of sites based on a site filter</td>
    </tr>
  </tbody>
</table>

### Objects

#### DataProduct

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
<td colspan="2" valign="top"><strong>siteCodes</strong></td>
<td valign="top">[<a href="#dataproductsite">DataProductSite</a>]</td>
<td>

List of sites and months of available data

</td>
</tr>
</tbody>
</table>

#### DataProductSite

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
</tbody>
</table>

#### DataProductSpec

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

Document code for the associated document.

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>specNumber</strong></td>
<td valign="top"><a href="#scalars">String</a></td>
<td>

Name of the associated document.

</td>
</tr>
</tbody>
</table>

#### Site

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

Core or Relocatable site

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
<td colspan="2" valign="top"><strong>dataProducts</strong></td>
<td valign="top">[<a href="#sitedataproduct">SiteDataProduct</a>]</td>
<td>

List of data products and months of available data

</td>
</tr>
</tbody>
</table>

#### SiteDataProduct

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
</tbody>
</table>

### Inputs

#### DataProductFilter

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
<td valign="top">[<a href="#scalars">String</a>!]</td>
<td>

The start month to filter the associated availability to. Formatted as YYYY-MM.

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>endMonth</strong></td>
<td valign="top">[<a href="#scalars">String</a>!]</td>
<td>

The end month to filter the associated availability to. Formatted as YYYY-MM.

</td>
</tr>
</tbody>
</table>

#### SiteFilter

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
<td valign="top">[<a href="#scalars">String</a>!]</td>
<td>

The start month to filter the associated availability to. Formatted as YYYY-MM.

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>endMonth</strong></td>
<td valign="top">[<a href="#scalars">String</a>!]</td>
<td>

The end month to filter the associated availability to. Formatted as YYYY-MM.

</td>
</tr>
</tbody>
</table>

### Scalars

<table>
  <thead>
    <tr>
      <th align="left">Type</th>
      <th align="left">Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td valign="top"><strong>Boolean</strong></td>
      <td>Built-in Boolean</td>
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

## Examples

The following examples will provide both an example POST request JSON body as well 
as a GraphiQL query for utilization from the [GraphQL Explorer](explorer/).  

### Data Products

#### All data products

!!! example
    Get all products and include the product code, name, and description for each:  

    ``` Ruby tab="GraphiQL Query"
    query Products {
      products {
        productCode
        productName
        productDescription
      }
    }
    ```

    ``` JSON tab="POST JSON Body"
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

    ``` bash tab="cURL"
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

    ``` bash tab="HTTPie"
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

#### One or many data products  

!!! example
    Get one or many data products with availability information.

    **One product:**

    ``` Ruby tab="GraphiQL Query"
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

    ``` JSON tab="POST JSON Body"
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

    ``` bash tab="HTTPie"
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

    ``` Ruby tab="GraphiQL Query"
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

    # Query variables window
    {
      "filter": {
        "productCodes": ["DP1.00001.001", "DP1.00002.001"]
      }
    }
    ```

    ``` JSON tab="POST JSON Body"
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

    ``` bash tab="HTTPie"
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

#### Filtered data products

!!! example
    Get a data product and filter by availability.

    **Filtered product:**

    ``` Ruby tab="GraphiQL Query"
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

    ``` JSON tab="POST JSON Body"
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

    ``` bash tab="HTTPie"
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


### Sites

#### All sites

!!! example    
    Get sites with code, description, latitude, longitude.  

    ``` Ruby tab="GraphiQL Query"
    query Sites {
      sites {
        siteCode
        siteDescription
        siteLatitude
        siteLongitude
      }
    }
    ```

    ``` JSON tab="POST JSON Body"
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

    ``` bash tab="cURL"
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

    ``` bash tab="HTTPie"
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

#### One or many sites

!!! example
    Get one or many sites with availability information.

    **One site:**

    ``` Ruby tab="GraphiQL Query"
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

    ``` JSON tab="POST JSON Body"
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

    ``` bash tab="HTTPie"
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

    ``` Ruby tab="GraphiQL Query"
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

    # Query variables window
    {
      "filter": {
        "siteCodes": ["ABBY", "CPER"]
      }
    }
    ```

    ``` JSON tab="POST JSON Body"
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

    ``` bash tab="HTTPie"
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

#### Filtered sites

!!! example
    Get a site and filter by availability.

    **Filtered site:**

    ``` Ruby tab="GraphiQL Query"
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

    ``` JSON tab="POST JSON Body"
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

    ``` bash tab="HTTPie"
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

## Resources

For a deeper dive into GraphQL concepts:  

- [graphql.org](https://graphql.org)
- [GraphQL Specification](https://spec.graphql.org/June2018/)

HTTPie CLI Tool:

- [httpie.org](https://httpie.org/)


<br/>

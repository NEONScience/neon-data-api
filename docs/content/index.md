# NEON Data API

## **Introduction**
The NEON Data API (Application Programming Interface) can be used to quickly access data as well as information about NEON's data products, samples, and sampling locations. It provides a simple means of constructing URLs or cURL statements that return information in a common machine-readable format, [JSON (JavaScript Object Notation)](https://json.org/json-en.html). 

## **Authentication**
You do not need to authenticate in order to explore information about NEON data or locations. However, if you will be using the APIs to download data products or sample data, or using the APIs intensively, then you will need to sign up for and use an [API Token](/authentication#api-tokens). To learn more about setting up and utilizing an API Token, see [API Token Setup](https://www.neonscience.org/resources/learning-hub/tutorials/api-token-setup). Endpoints that require authentication are identified in the documentation for each endpoint:

  - [Data Endpoints](/endpoints/data)
  - [Data Query Endpoints](/endpoints/data-query)
  - [Releases Endpoints](/endpoints/releases)
  - [Samples Endpoints](/endpoints/samples)

## **Data Use Policy and Licensing**
NEON data products and sample data are licensed under a Creative Commons Attribution 4.0 International License ([CC-BY](https://creativecommons.org/licenses/by/4.0/)). For more information, visit the [Data Guidelines and Policies](https://www.neonscience.org/data-samples/guidelines-policies) page.

## **R & Python packages**
The neonUtilities packages are the easiest way to download and reformat NEON data.  

  * [`neonUtilities` R package](https://cran.r-project.org/web/packages/neonUtilities/index.html)  
  * [`neonutilities` Python package](https://pypi.org/project/neonutilities)  
  * Check out the ["Use the neonUtilities Package to Access NEON Data" tutorial](https://www.neonscience.org/resources/learning-hub/tutorials/neondatastackr)  
  
## **REST API Explorer**
The API provides numerous endpoints, some of which provide the option to enter values for specific parameters that allow you to refine your search. To learn more about each endpoint, click on “REST API Endpoints” in the navigation menu. To try each endpoint out, open the [REST API Explorer](https://data.neonscience.org/data-api/explorer/). 

## **GraphQL**
The [GraphQL](https://data.neonscience.org/data-api/graphql/) endpoint allows users to take advantage of the flexibility and efficiency of the [GraphQL data query language](https://graphql.org/) to access NEON metadata. The `/graphql` endpoint affords users the ability to define and receive only desired metadata.

## **Other Resources**

  * [The NEON Data API GitHub repository](https://github.com/NEONScience/neon-data-api), 
  * [Using the NEON API tutorial](https://www.neonscience.org/neon-api-usage)
  * Download the [Swagger documentation](https://raw.githubusercontent.com/NEONScience/neon-data-api/refs/heads/main/packages/docs-app-swagger/src/swagger.json)
  
## **Provide Feedback**
If you have design ideas, functionality requests, bug notes, examples of how you used the API, etc., please [contact us](https://www.neonscience.org/about/contact-us).

<br />

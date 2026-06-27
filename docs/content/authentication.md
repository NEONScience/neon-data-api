# NEON Data API Authentication

You do not need to authenticate in order to explore information about NEON data or locations. However, if you will be using the APIs to download data products or sample data, or using the APIs intensively, then you will need to sign up for and use an [API Token](#api-tokens). To learn more about setting up and utilizing an API Token, see [API Token Setup](https://www.neonscience.org/resources/learning-hub/tutorials/api-token-setup).

<a name="api-tokens"></a>
## **API Tokens**  

The NEON data API provides users the ability to manage and obtain API tokens.

### **Generation**

In order to generate an API Token, you must first sign in with your account 
or create an account with the Data Portal. You can sign up or sign in by accessing 
the [My Account](https://data.neonscience.org/myaccount) page. Once authenticated 
and verified, you can request a token using the API Token management section 
provided on the account page.

!!! warning
    Tokens should be treated like credentials. 
    Never share your API token and store it in a secure location. 
    It is strongly recommended to never commit this token to source control 
    repositories such as GitHub. If your token has been compromised, 
    please disable or delete the token through the 
    [My Account](https://data.neonscience.org/myaccount) page and discontinue 
    use of the token.

### **Utilization**

To utilize an API Token when making a request, include it as a header or query 
parameter:  

  - Header Name: `X-API-Token`
  - Query Parameter Name: `apiToken`  

=== "cURL"

    ``` bash
    # Replace TOKEN_VALUE with your API Token
    # X-API-Token header
    curl --verbose -H "X-API-Token: TOKEN_VALUE" \
      -X GET https://data.neonscience.org/api/v0/products/DP1.00001.001 \
      >> neon-data-products-DP1.00001.001.json
    ```  
    ``` bash
    # apiToken query parameter
    curl --verbose \
      -X GET https://data.neonscience.org/api/v0/products/DP1.00001.001?apiToken=TOKEN_VALUE \
      >> neon-data-products-DP1.00001.001.json
    ```  

=== "HTTPie"

    ``` bash
    # Replace TOKEN_VALUE with your API Token
    # X-API-Token header
    http --download --output=neon-data-products-DP1.00001.001.json \
      GET https://data.neonscience.org/api/v0/products/DP1.00001.001 \
      X-API-Token:TOKEN_VALUE
    ```  
    ``` bash
    # apiToken query parameter
    http --download --output=neon-data-products-DP1.00001.001.json \
      GET https://data.neonscience.org/api/v0/products/DP1.00001.001?apiToken=TOKEN_VALUE
    ```

## **Endpoints**

Endpoints that require authentication are identified in the documentation for each endpoint:

  - [Data Endpoints](/data-api/endpoints/data)
  - [Data Query Endpoints](/data-api/endpoints/data-query)
  - [Releases Endpoints](/data-api/endpoints/releases)
  - [Samples Endpoints](/data-api/endpoints/samples)

<br />

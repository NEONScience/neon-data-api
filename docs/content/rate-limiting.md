# Rate Limiting

To ensure the quality of NEON's data API and associated services, 
the data APIs are subject to rate limiting. Limits are applied and tracked globally 
across all endpoints. You do not need to authenticate in order to explore information about 
NEON data or locations. However, if you will be using the APIs to download data products or 
sample data, or using the APIs intensively, then you will need to sign up for and 
use an [API Token](/data-api/authentication#api-tokens).  

!!! info
    NEON reserves the right to modify the rate limits at any time. 
    For the up-to-date information on rate limits, please review the headers 
    returned from rate limited endpoints.

All limits consist of two factors:  

  - A burst - the total number of requests that can be made in a short period of time 
    independent of rate, and  
  - a rate - the number of requests per second that can be made

Once the burst amount is utilized in its entirety, you will still be able to make 
requests at the specified rate, but you will be subject to staying within that rate. 
The burst amount will recover at the defined rate.

!!! example
    If the burst amount is 200 and the rate is 2 requests per second, 
    it will take 100 seconds to recover the full burst amount.

<a name="Usage"></a>
### **Inspecting Rate Limits**

For all endpoints, when rate limiting is applied, HTTP headers will be included 
in the response showing the current utilization of your rate limit.

The returned HTTP headers of any API request show your current rate limit status:  
``` bash
HTTP/1.1 200 OK
Status: 200 OK
X-Ratelimit-Limit: 200
X-Ratelimit-Remaining: 200
```  

By inspecting the `X-RateLimit-Remaining` header, you can ensure that you always stay 
within the defined limits.

#### **Headers**

|Name|Type|Description|
|---|---|---|
|**X-RateLimit-Limit**|number (int)|Request burst limit|
|**X-RateLimit-Remaining**|number (int)|The number of remaining requests of the burst limit|
|**X-RateLimit-Reset**  <br>*optional*|number (int)|The number of seconds until the burst limit resets in full|
|**RetryAfter**  <br>*optional*|number (int)|The number of seconds until the next request can be made|

<a name="default-rates"></a>
### **Default Rates**  

By default when no API token is provided with a request, limits are applied on 
a per IP address basis with the following rate specification:

|Type|Burst|Rate|Identifer|
|---|---|---|---|
|Public|200 requests|2 requests per second|IP address|

<a name="exceeding-limit"></a>
### **Exceeding the Rate Limit**

In order to exceed the rate limit you must:  

  - Utilize the entirety of the burst amount for the limit  
  - Make requests at a faster rate than the defined rate for the limit

If you exceed the rate limit, you will receive the following response:  

``` bash
HTTP/1.1 429 Too Many Requests
Status: 429 Too Many Requests
X-RateLimit-Limit: 200
X-RateLimit-Remaining: 0
X-RateLimit-Reset: 100
RetryAfter: 1
```  
``` JSON
{
  "message": "API rate limit exceeded"
}
```

!!! tip
    If you expect to be utilizing the API heavily and making many requests 
    over a short period of time, the best way to avoid being rate limited is to 
    always inspect the `X-RateLimit-Remaining` response header and react accordingly.

## **API Tokens**  

The NEON data API provides users the ability to manage and obtain [API Tokens](/data-api/authentication#api-tokens). 
For rate limiting, this allows us to supply a higher rate limit for authenticated 
users and tokens, enabling intensive use of the APIs.


To verify that you are utilizing the token properly, inspect the `X-RateLimit-Limit` 
and `X-RateLimit-Remaining` headers and verify it matches one of the 
[token rates](#token-rates) defined below.

<a name="token-rates"></a>
### **Token Rates**

By default when an API token is sent with a request, limits are applied on 
a per token basis with the following rate specification for the token's `rate` scope.

|Scope|Burst|Rate|Identifier|
|---|---|---|---|
|`rate:public`|2000 requests|8 requests per second|Token|


<br/>

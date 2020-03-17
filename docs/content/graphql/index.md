# GraphQL API

## Introduction

!!! quote "**A query language for your API**"
    GraphQL is a query language for APIs and a runtime for fulfilling those 
    queries with your existing data. GraphQL provides a complete and 
    understandable description of the data in your API, gives clients the 
    power to ask for exactly what they need and nothing more, makes it easier 
    to evolve APIs over time, and enables powerful developer tools.[^1]

## Examples

Get all products and include the product code, name, and description for each:  

``` JavaScript tab="GraphiQL Syntax"
query Products {
  products {
    productCode
    productName
    productDescription
  }
}
```

``` JSON tab="POST JSON"
{
  "query": "query Products {
    products {
      productCode
      productName
      productDescription
    }"
}
```

[^1]: “**GraphQL: A Query Language for APIs.**” A Query Language for Your API, 
  [graphql.org](https://graphql.org).

<br/>

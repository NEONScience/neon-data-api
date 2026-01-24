import { GraphiQL } from 'graphiql';
import { createGraphiQLFetcher } from '@graphiql/toolkit';
import type { Fetcher } from '@graphiql/toolkit';

import Env from './env';

const defaultQuery = `
# Type queries into this side of the screen,
# and you will see intelligent typeaheads aware
# of the current GraphQL type schema,
# live syntax, and validation errors highlighted
# within the text.

# Here's a query for retrieving a single data product
# as specified by the query variables window below.
query Product($productCode: String!) {
  product (productCode: $productCode) {
    productCode
    productName
    productDescription
    productScienceTeam
    productHasExpanded
    productBasicDescription
    productExpandedDescription
    productPublicationFormatType
    keywords
    themes
    siteCodes {
      siteCode
      availableMonths
    }
  }
}
`;
const defaultVariables = `
{
  "productCode": "DP1.00001.001"
}
`;

const graphQLFetcher: Fetcher = createGraphiQLFetcher({ url: `${Env.getApiHost()}/graphql` });

const AppGraphiQL = () => ((
  <GraphiQL
    fetcher={graphQLFetcher}
    defaultTheme={"light"}
    defaultQuery={defaultQuery}
    initialVariables={defaultVariables}
  />
));

export default AppGraphiQL;

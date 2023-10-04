/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable no-use-before-define */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

import React, { useEffect } from 'react';
import GraphiQL from 'graphiql';
import fetch from 'isomorphic-fetch';
import { useTheme } from '@graphiql/react';

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

const graphQLFetcher = (graphQLParams) => {
  const init = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(graphQLParams),
  };
  return fetch(`${Env.getApiHost()}/graphql`, init)
    .then((response) => response.json());
};

const AppGraphiQL = () => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { setTheme } = useTheme();
  useEffect(() => {
    setTheme('light');
  }, []);
  return (
    <GraphiQL
      defaultVariableEditorOpen
      fetcher={graphQLFetcher}
      defaultQuery={defaultQuery}
      variables={defaultVariables}
    />
  );
};

export default AppGraphiQL;

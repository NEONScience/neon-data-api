/* eslint-disable no-use-before-define */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

import React from 'react';
import SwaggerUI from 'swagger-ui-react';

import SwaggerService from './SwaggerService';

const getSwaggerUI = (spec) => (
  <SwaggerUI
    spec={spec}
    docExpansion="list"
    requestInterceptor={SwaggerService.requestInterceptor}
    responseInterceptor={SwaggerService.responseInterceptor}
  />
);

export default getSwaggerUI;

import React from 'react';
import SwaggerUI from "swagger-ui-react"

import Env from "./env";

export const getSwaggerUI = (spec) => (
  <SwaggerUI spec={spec}
    docExpansion="list"
    requestInterceptor={(req) => {
      const url = new URL(req.url);
      url.protocol = Env.getApiProtocol();
      url.host = Env.getApiHostName();
      url.port = "";
      return {
        ...req,
        url: url.href,
      };
    }}
  />
);

import React from "react";
import SwaggerUI from "swagger-ui-react"

import Env from "./env";

const TRUNCATE_ENDPOINTS = {
  [`${Env.getApiRootPath()}/products`]: "products",
  [`${Env.getApiRootPath()}/sites`]: "sites",
  [`${Env.getApiRootPath()}/locations/sites`]: "locationSites",
  [`${Env.getApiRootPath()}/taxonomy`]: "taxonomy",
};

const exists = (o) => (typeof o !== "undefined") && (o !== null);

const requestInterceptor = (req) => {
  const url = new URL(req.url);
  url.protocol = Env.getApiProtocol();
  url.host = Env.getApiHostName();
  url.port = "";
  return {
    ...req,
    url: url.href,
  };
};

/**
 * Applying a custom response interceptor for the Swagger UI component
 * as it becomes unresponsive when handling a large response body.
 * This will truncate responses from endpoints that are known to return a
 * large response body.
 * @param {Object} res The response object
 * @return The applied response
 */
const responseInterceptor = (res) => {
  const url = new URL(res.url);
  if (!TRUNCATE_ENDPOINTS[url.pathname]) {
    return res;
  }
  if (exists(res.body) && Array.isArray(res.body.data) && (res.body.data.length > 3)) {
    const body = {
      ...res.body,
      data: res.body.data.slice(0, 3),
    };
    delete res.body;
    delete res.obj;
    delete res.text;
    delete res.data;
    switch (TRUNCATE_ENDPOINTS[url.pathname]) {
      case "products":
        body.data = body.data.map(p => {
          if (Array.isArray(p.changeLogs) && (p.changeLogs.length > 3)) {
            p.changeLogs = p.changeLogs.slice(0, 3);
          }
          if (Array.isArray(p.siteCodes) && (p.siteCodes.length > 3)) {
            p.siteCodes = p.siteCodes.slice(0, 3);
          }
          return p;
        });
        break;
      case "sites":
        body.data = body.data.map(s => {
          if (Array.isArray(s.dataProducts) && (s.dataProducts.length > 3)) {
            s.dataProducts = s.dataProducts.slice(0, 3);
          }
          return s;
        });
        break;
      default:
        break;
    }
    res.body = body;
    res.obj = body;
    res.text = JSON.stringify(body);
    res.data = JSON.stringify(body);
  }
  return res;
};

export const getSwaggerUI = (spec) => (
  <SwaggerUI
    spec={spec}
    docExpansion="list"
    requestInterceptor={requestInterceptor}
    responseInterceptor={responseInterceptor}
  />
);

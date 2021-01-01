import React from "react";
import SwaggerUI from "swagger-ui-react";

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
  const shouldTruncate = Object.keys(TRUNCATE_ENDPOINTS)
    .some(value => url.pathname.startsWith(value));
  if (!shouldTruncate) {
    return res;
  }
  if (exists(res.body) && exists(res.body.data)) {
    const shouldSliceData = Array.isArray(res.body.data)
      && (res.body.data.length > 3);
    const body = {
      ...res.body,
      data: shouldSliceData ? res.body.data.slice(0, 3) : res.body.data,
    };
    delete res.body;
    delete res.obj;
    delete res.text;
    delete res.data;
    const appliedPathKey = Object.keys(TRUNCATE_ENDPOINTS)
      .find(value => url.pathname.startsWith(value));
    switch (TRUNCATE_ENDPOINTS[appliedPathKey]) {
      case "products":
        if (shouldSliceData) {
          body.data = body.data.map(p => {
            if (Array.isArray(p.changeLogs) && (p.changeLogs.length > 3)) {
              p.changeLogs = p.changeLogs.slice(0, 3);
            }
            if (Array.isArray(p.siteCodes) && (p.siteCodes.length > 3)) {
              p.siteCodes = p.siteCodes.slice(0, 3);
            }
            return p;
          });
        } else {
          const trimChangeLogs = (Array.isArray(body.data.changeLogs)
            && (body.data.changeLogs.length > 3));
          const trimSiteCodes = (Array.isArray(body.data.siteCodes)
            && (body.data.siteCodes.length > 3));
          body.data = {
            ...body.data,
            changeLogs: trimChangeLogs
              ? body.data.changeLogs.slice(0, 3)
              : body.data.changeLogs,
            siteCodes: trimSiteCodes
              ? body.data.siteCodes.slice(0, 3)
              : body.data.siteCodes,
          };
        }
        break;
      case "sites":
        if (shouldSliceData) {
          body.data = body.data.map(s => {
            if (Array.isArray(s.dataProducts) && (s.dataProducts.length > 3)) {
              s.dataProducts = s.dataProducts.slice(0, 3);
            }
            return s;
          });
        } else {
          const trimProducts = (Array.isArray(body.data.dataProducts)
            && (body.data.dataProducts.length > 3));
          body.data = {
            ...body.data,
            dataProducts: trimProducts
              ? body.data.dataProducts.slice(0, 3)
              : body.data.dataProducts,
          };
        }
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

import Env from './env';

const TRUNCATE_ENDPOINTS = {
  [`${Env.getApiRootPath()}/products`]: 'products',
  [`${Env.getApiRootPath()}/sites`]: 'sites',
  [`${Env.getApiRootPath()}/releases`]: 'releases',
  [`${Env.getApiRootPath()}/locations/sites`]: 'locationSites',
  [`${Env.getApiRootPath()}/taxonomy`]: 'taxonomy',
};

const exists = (o: unknown) => (typeof o !== 'undefined') && (o !== null);

const SwaggerService = {
  requestInterceptor: (req: Record<string, unknown>): Record<string, unknown> => {
    const url = new URL(req.url as string);
    url.protocol = Env.getApiProtocol();
    url.host = Env.getApiHostName();
    url.port = '';
    return {
      ...req,
      url: url.href,
    };
  },
  /**
   * Applying a custom response interceptor for the Swagger UI component
   * as it becomes unresponsive when handling a large response body.
   * This will truncate responses from endpoints that are known to return a
   * large response body.
   * @param {Object} res The response object
   * @return The applied response
   */
  responseInterceptor: (res: Record<string, unknown>): Record<string, unknown> => {
    const url = new URL(res.url as string);
    const shouldTruncate = Object.keys(TRUNCATE_ENDPOINTS)
      .some((value: string): boolean => url.pathname.startsWith(value));
    if (!shouldTruncate) {
      return res;
    }
    if (exists(res.body) && exists((res.body as Record<string, unknown>).data)) {
      const { data } = (res.body as Record<string, unknown>);
      const shouldSliceData = Array.isArray(data)
        && (data.length > 3);
      const body = {
        ...res.body as Record<string, unknown>,
        data: shouldSliceData
          ? (data as []).slice(0, 3)
          : data,
      };
      delete res.body;
      delete res.obj;
      delete res.text;
      delete res.data;
      const findPathKey: string | undefined = Object.keys(TRUNCATE_ENDPOINTS)
        .find((value: string): boolean => url.pathname.startsWith(value));
      const appliedPathKey: string = exists(findPathKey)
        ? findPathKey
        : '';
      let appliedPath: string = TRUNCATE_ENDPOINTS[appliedPathKey];
      if (appliedPath === 'releases') {
        if (url.pathname.includes('products')) {
          appliedPath = 'products';
        } else if (url.pathname.includes('sites')) {
          appliedPath = 'sites';
        }
      }
      switch (appliedPath) {
        case 'products':
          if (shouldSliceData) {
            body.data = (body.data as [])
              .map((p: Record<string, unknown>): Record<string, unknown> => {
                const np = p;
                if (Array.isArray(p.changeLogs) && (p.changeLogs.length > 3)) {
                  np.changeLogs = p.changeLogs.slice(0, 3);
                }
                if (Array.isArray(p.siteCodes) && (p.siteCodes.length > 3)) {
                  np.siteCodes = p.siteCodes.slice(0, 3);
                }
                return p;
              });
          } else {
            const bodyData = body.data as Record<string, unknown>;
            const trimChangeLogs = (Array.isArray(bodyData.changeLogs)
              && (bodyData.changeLogs.length > 3));
            const trimSiteCodes = (Array.isArray(bodyData.siteCodes)
              && (bodyData.siteCodes.length > 3));
            body.data = {
              ...bodyData,
              changeLogs: trimChangeLogs
                ? (bodyData.changeLogs as []).slice(0, 3)
                : bodyData.changeLogs,
              siteCodes: trimSiteCodes
                ? (bodyData.siteCodes as []).slice(0, 3)
                : bodyData.siteCodes,
            };
          }
          break;
        case 'sites':
          if (shouldSliceData) {
            body.data = (body.data as [])
              .map((s: Record<string, unknown>): Record<string, unknown> => {
                const ns = s;
                if (Array.isArray(s.dataProducts) && (s.dataProducts.length > 3)) {
                  ns.dataProducts = s.dataProducts.slice(0, 3);
                }
                return ns;
              });
          } else {
            const bodyData = body.data as Record<string, unknown>;
            const trimProducts = (Array.isArray(bodyData.dataProducts)
              && (bodyData.dataProducts.length > 3));
            body.data = {
              ...bodyData,
              dataProducts: trimProducts
                ? (bodyData.dataProducts as []).slice(0, 3)
                : bodyData.dataProducts,
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
  },
};

export default SwaggerService;

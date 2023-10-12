import React from 'react';
import SwaggerUI from 'swagger-ui-react';

import SwaggerService from './SwaggerService';

interface AppSwaggerUIProps {
  spec: object | string | undefined;
}

const AppSwaggerUI: React.FC<AppSwaggerUIProps> = (props: AppSwaggerUIProps): React.ReactNode => {
  const { spec } = props;
  return (
    <SwaggerUI
      spec={spec}
      docExpansion="list"
      requestInterceptor={SwaggerService.requestInterceptor}
      responseInterceptor={SwaggerService.responseInterceptor}
    />
  );
};

export default AppSwaggerUI;

import React, { useLayoutEffect } from "react";
import { getSwaggerUI } from "./Swagger";

import "swagger-ui-react/swagger-ui.css"
import "./App.css";
import "./swagger-theme-material.min.css";

import swaggerJSON from "./swagger.json";

const App: React.FC = () => {
  useLayoutEffect(() => {
    if (!window.frameElement) {
      return;
    }
    // @ts-ignore
    if (typeof ResizeObserver !== "function") {
      (window.frameElement as HTMLElement).style.height = "100vh";
      (window.frameElement as HTMLElement).setAttribute("scrolling", "yes");
      window.document.body.style.overflow = "scroll";
      return;
    }
    // @ts-ignore
    const resizeObserver = new ResizeObserver((entries: any[]) => {
      for (let entry of entries) {
        const cr = entry.contentRect;
        (window.frameElement as HTMLElement).style.height = `${cr.height + 60}px`;
      }
    });
    resizeObserver.observe(window.document.body);
    return () => {
      resizeObserver.disconnect();
    };
  });
  return (
    <div className="neon-data-api-docs-swagger">
      {getSwaggerUI(swaggerJSON)}
    </div>
  )
};

export default App;

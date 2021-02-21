import React from "react";
import ReactDOM from "react-dom";
// import { ThemeProvider } from "styled-components";
import { ApolloProvider } from "@apollo/client";
import { QueryParamProvider } from "use-query-params";
import { BrowserRouter, Route } from "react-router-dom";
import { client } from "apollo";
import App from "containers/App";
import reportWebVitals from "./reportWebVitals";
import "antd/dist/antd.css"; // or 'antd/dist/antd.less'
import "react-vis/dist/style.css";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <QueryParamProvider ReactRouterRoute={Route}>
        <ApolloProvider client={client}>
          <App />
        </ApolloProvider>
      </QueryParamProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

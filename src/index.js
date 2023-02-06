import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

import "i18n";

import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import store from "./redux/configStore";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import * as signalR from "@microsoft/signalr";

export const connection = new signalR.HubConnectionBuilder()
  .withUrl(`${process.env.REACT_APP_API_URL}/DatVeHub`)
  .configureLogging(signalR.LogLevel.Information)
  .build();

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

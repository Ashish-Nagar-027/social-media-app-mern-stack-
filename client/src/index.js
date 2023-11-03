import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import store from "./app/store";
import { Provider } from "react-redux";
import { SkeletonTheme } from "react-loading-skeleton";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <SkeletonTheme baseColor="#DDDBDD" highlightColor="rgba(130, 130, 130, 0.5)">
        <App />
      </SkeletonTheme>
    </Provider>
   </React.StrictMode>
);

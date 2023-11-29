import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import { StoreProvider } from "./Store";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";

const initialOptions = {
  "client-id":
    "AeMWld4f-4Y_oJkNMByG_QDGB50aCNeF8kEjuQotsGPDChbBMdJe-B_kAnPHSnQN1GKnfbFOU1BVd39a",
  currency: "USD",
  intent: "capture",
};
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <StoreProvider>
    <BrowserRouter>
      <PayPalScriptProvider options={initialOptions}>
        <App />
      </PayPalScriptProvider>
    </BrowserRouter>
  </StoreProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

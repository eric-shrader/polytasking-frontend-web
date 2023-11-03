import React from "react";
import ReactDOM from "react-dom/client";
import { Auth0Provider } from "@auth0/auth0-react";
import "./index.css";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Auth0Provider
      domain="polytasking.us.auth0.com"
      clientId="5L0z8i2BKpwuX6taWgEEBnLGP7EnF0HP"
      authorizationParams={{
        redirect_uri: window.location.origin,
        audience: "https://polytasking.com",
        scope: "openid profile email",
      }}
    >
      <App />
    </Auth0Provider>
  </React.StrictMode>
);

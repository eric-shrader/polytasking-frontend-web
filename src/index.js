import React from "react";
import ReactDOM from "react-dom/client";
import { Auth0Provider } from "@auth0/auth0-react";
import "./index.css";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Auth0Provider
      domain="dev-h1wdtqiuos5sex8g.us.auth0.com"
      clientId="NO3hAUVJFrgwC4SCnhIX6DTQjzsBkxNg"
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

import { Outlet } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import logo from "./../../../assets/logo.svg";
import "./Layout.css";

const Layout = () => {
  const { loginWithRedirect, logout, isAuthenticated, isLoading } = useAuth0();

  return (
    <div className="layout">
      <div className="navigation-bar">
        <div className="logo-box">
          <img alt="logo" src={logo} width="80" height="80" />
          Polytasking
        </div>
        <div></div>
        <div className="links">
          {isAuthenticated ? (
            <button
              onClick={() => {
                logout({
                  logoutParams: {
                    returnTo: window.location.origin,
                  },
                });
              }}
            >
              Log Out
            </button>
          ) : (
            <button onClick={loginWithRedirect}>Log In</button>
          )}
        </div>
      </div>
      {isLoading ? <></> : <Outlet />}
    </div>
  );
};

export default Layout;

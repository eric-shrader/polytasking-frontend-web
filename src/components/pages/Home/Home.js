import "./Home.css";

import { Outlet } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import Welcome from "../Welcome/Welcome";
import { faListCheck, faPlus } from "@fortawesome/free-solid-svg-icons";
import CircleButton from "../../CircleButton/CircleButton";

const Home = () => {
  const { isAuthenticated } = useAuth0();

  return (
    <>
      {isAuthenticated ? (
        <div className="body-box">
          <div className="circleButton-box">
            <CircleButton
              endpoint="/tasks/table"
              icon={faListCheck}
            ></CircleButton>
            <CircleButton endpoint="/tasks/new" icon={faPlus}></CircleButton>
          </div>
          <Outlet />
        </div>
      ) : (
        <Welcome />
      )}
    </>
  );
};

export default Home;

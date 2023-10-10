import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./CircleButton.css";

import { NavLink } from "react-router-dom";

const CircleButton = ({ endpoint, icon }) => {
  return (
    <NavLink to={endpoint}>
      <FontAwesomeIcon icon={icon} />
    </NavLink>
  );
};

export default CircleButton;

import "./StatusIcon.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faExclamation,
  faHourglass,
  faTriangleExclamation,
} from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";

const StatusIcon = ({ status }) => {
  const [icon, setIcon] = useState(faTriangleExclamation);
  const [backgroundColor, setBackgroundColor] = useState(null);
  const [iconColor, setIconColor] = useState(null);

  useEffect(() => {
    if (status === "Due Soon") {
      setIcon(faTriangleExclamation);
      setIconColor("#ffd43b");
      setBackgroundColor("#854c18");
    } else if (status === "Upcoming") {
      setIcon(faHourglass);
      setIconColor("#ecd2a0");
      setBackgroundColor("gray");
    } else if (status === "Overdue") {
      setIcon(faExclamation);
      setIconColor("#000");
      setBackgroundColor("#f70000");
    }
  }, [status]);
  return (
    <div className="status_icon" style={{ backgroundColor: backgroundColor }}>
      <FontAwesomeIcon icon={icon} style={{ color: iconColor }} />
    </div>
  );
};

export default StatusIcon;

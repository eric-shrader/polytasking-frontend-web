import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./TableRow.css";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import StatusIcon from "../StatusIcon/StatusIcon";

const TableRow = ({
  id,
  name,
  status,
  frequency,
  dueDate,
  type,
  index,
  onDelete,
  onCheck,
}) => {
  return (
    <div className="row">
      <div className="item item-1">
        <input
          type="checkbox"
          id={`checkBox${id}`}
          onClick={() => onCheck(id, index)}
        />
      </div>
      <div className="item item-2">{name}</div>
      <div className="item item-3">{type}</div>
      <div className="item item 4">{frequency}</div>
      <div className="item item-5">{dueDate}</div>
      <div className="item item-6">
        <StatusIcon status={status} />
      </div>
      <div className="item item-7">
        <div className="deleteButton" onClick={() => onDelete(id)}>
          <FontAwesomeIcon icon={faTrash} />
        </div>
      </div>
    </div>
  );
};

export default TableRow;

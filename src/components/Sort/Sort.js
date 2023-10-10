import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./Sort.css";
import {
  faArrowUpShortWide,
  faArrowUpWideShort,
  faSort,
} from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";

const Sort = ({ type, onSort, currentSort }) => {
  const [state, setState] = useState(faSort);

  function handleState() {
    if (state === faSort) {
      onSort(type, "ascending");
      setState(faArrowUpShortWide);
    } else if (state === faArrowUpShortWide) {
      onSort(type, "descending");
      setState(faArrowUpWideShort);
    } else if (state === faArrowUpWideShort) {
      onSort("none", "none");
      setState(faSort);
    }
  }

  useEffect(() => {
    if (currentSort[0] !== type) {
      setState(faSort);
    }
  }, [currentSort, type]);

  return (
    <div onClick={() => handleState()}>
      <FontAwesomeIcon icon={state} />
    </div>
  );
};

export default Sort;

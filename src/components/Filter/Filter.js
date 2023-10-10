import { faFilter } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import "./Filter.css";
import { useEffect } from "react";

const Filter = ({ type, options, addFilter }) => {
  // function to bring up the filtering option when clicking on the filter icon
  function bringUpFilters() {
    const filter = document.getElementById(`${type}Filter`);
    filter.classList.remove("hidden");
  }

  // function to remove the dropdown of filters when clicking on option or screen
  function hideFilters(e) {
    const filterIcon = document.getElementById(`${type}FilterIcon`);
    //sometimes click registers as svg and sometimes as path
    const filterIconChild = document.getElementById(
      `${type}FilterIcon`
    ).firstChild;
    if (e.target === filterIcon || e.target === filterIconChild) {
      return;
    }
    const filter = document.getElementById(`${type}Filter`);
    filter.classList.add("hidden");
  }

  // add hideFilters to document when component mounts and remove it when it unmounts
  useEffect(() => {
    document.addEventListener("click", hideFilters);
    return () => document.removeEventListener("click", hideFilters);
  });

  function handleFiltering(e) {
    const option = e.target.innerHTML;
    addFilter(type, option);
    hideFilters(e);
  }

  return (
    <div className="filterBox" id="filterBox">
      <FontAwesomeIcon
        id={`${type}FilterIcon`}
        onClick={() => bringUpFilters()}
        icon={faFilter}
      />
      <div
        className="filter hidden"
        id={`${type}Filter`}
        onClick={(e) => handleFiltering(e)}
      >
        {options.map((option) => {
          //add all the filter options
          return (
            <option id={`option_${option}`} key={`option_${option}`}>
              {option}
            </option>
          );
        })}
      </div>
    </div>
  );
};

export default Filter;

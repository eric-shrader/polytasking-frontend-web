import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./Table.css";
import TableRow from "../TableRow/TableRow";
import { useAuth0 } from "@auth0/auth0-react";
import Filter from "../Filter/Filter";
import "animate.css";
import Sort from "../Sort/Sort";

const Table = () => {
  const [tasks, setTasks] = useState(null);
  const [taskCounter, setTaskCounter] = useState(0);
  const [filterMap, setFilterMap] = useState(new Map());
  const [sort, setSort] = useState(["none", "none"]);
  const { getAccessTokenSilently } = useAuth0();
  let { filter } = useParams();
  const checkedTasks = new Map();

  // query for tasks on mount, change in filters, or task sign off
  useEffect(() => {
    const loader = document.getElementById("loader");
    const tableBox = document.getElementById("table_box");
    // construct url with query parameters
    const baseUrl = "https://polytasking.com:443/api/tasks";
    const queryParameters = [];
    filterMap.forEach((value, key) => {
      queryParameters.push(`${key}=${encodeURIComponent(value)}`);
    });
    queryParameters.push(`sortType=${sort[0]}`);
    queryParameters.push(`sortOrder=${sort[1]}`);
    const queryString = queryParameters.join("&");
    let apiUrl = baseUrl;
    if (queryString.length !== 0) {
      apiUrl += `?${queryString}`;
    }
    // the function that gets tasks from the endpoint
    async function getTasks() {
      try {
        const token = await getAccessTokenSilently();
        const response = await fetch(apiUrl, {
          headers: {
            authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();
        setTasks(data);
        // handle loaders and transitions
        setTimeout(() => {
          loader.classList.add("hidden");
          tableBox.classList.remove("hidden");
        }, 1500);
      } catch (error) {
        console.log(error);
      }
    }
    getTasks();
  }, [getAccessTokenSilently, filter, filterMap, taskCounter, sort]);

  // uncheck header checkbox on component mount or rerender
  useEffect(() => {
    return () => {
      const checkbox = document.getElementById("headerCheckbox");
      if (checkbox) {
        checkbox.checked = false;
      }
    };
  });

  async function onDelete(id) {
    const token = await getAccessTokenSilently();
    await fetch(`https://polytasking.com:443/api/tasks/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setTaskCounter(taskCounter + 1);
  }

  // handles sending completed tasks to api endpoint for signoff
  async function onComplete() {
    // get completed tasks
    let completedTasks = checkedTasks.values();
    // need them in array form
    completedTasks = Array.from(completedTasks);
    const token = await getAccessTokenSilently();
    await fetch(`https://polytasking.com:443/api/tasks`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(completedTasks),
    });
    // task checkbox will be unselected
    completedTasks.forEach((task) => {
      const checkBox = document.getElementById(`checkBox${task.id}`);
      checkBox.checked = false;
      checkBox.parentElement.parentElement.classList.remove("selected");
    });
    // to tell component to query for tasks again
    setTaskCounter(taskCounter + 1);
  }

  // handles logic for when task is checked
  function onCheck(id, index) {
    const task = tasks[index];
    const checkBox = document.getElementById(`checkBox${id}`);
    if (checkBox.checked) {
      checkedTasks.set(task.id, task); // adds to the checked task map
      checkBox.parentElement.parentElement.classList.add("selected"); // gives the selected styling
    } else {
      checkedTasks.delete(task.id); // remove the task from the completed map
      checkBox.parentElement.parentElement.classList.remove("selected"); // removes the selected styling
    }
  }

  // used to check all tasks
  function onCheckAll() {
    const checkbox = document.getElementById("headerCheckbox");
    if (checkbox.checked) {
      tasks.forEach((task, index) => {
        document.getElementById(`checkBox${task.id}`).checked = true;
        onCheck(task.id, index);
      });
    } else {
      tasks.forEach((task, index) => {
        document.getElementById(`checkBox${task.id}`).checked = false;
        onCheck(task.id, index);
      });
    }
  }

  // add/remove/change filter and update state
  function addFilter(type, filter) {
    const updatedFilterMap = new Map(filterMap);
    if (updatedFilterMap.has(type) && filter === "All") {
      // remove filter if exists and option is all
      updatedFilterMap.delete(type);
      setFilterMap(updatedFilterMap);
    } else if (filter !== "All") {
      // else if option isnt All then we should/update add filter
      updatedFilterMap.set(type, filter);
      setFilterMap(updatedFilterMap);
    }
  }

  // set new sort when user clicks on sort button
  function onSort(type, order) {
    setSort([type, order]);
  }

  return (
    <>
      <span id="loader" className="loader"></span>
      <div id="table_box" className="hidden animate__animated animate__fadeIn">
        <div id="task_table" className="table">
          <div className="header-row">
            <div className="item item-1">
              <input
                type="checkbox"
                id="headerCheckbox"
                onClick={() => onCheckAll()}
              />
            </div>
            <div className="item item-2">Name</div>
            <div className="item item-3">
              Type
              <Sort type="type" onSort={onSort} currentSort={sort}></Sort>
              <Filter
                type="type"
                options={["All", "House", "Car", "Work", "Pet", "Health"]}
                addFilter={addFilter}
              />
            </div>
            <div className="item item-4">
              Frequency
              <Sort type="frequency" onSort={onSort} currentSort={sort}></Sort>
              <Filter
                type="frequency"
                options={["All", "Once", "Daily", "Weekly", "Monthly"]}
                addFilter={addFilter}
              />
            </div>
            <div className="item item-5">
              Due date
              <Sort type="dueDate" onSort={onSort} currentSort={sort}></Sort>
              <Filter
                type="dueDate"
                options={["All", "Today", "Week", "Month"]}
                addFilter={addFilter}
              />
            </div>
            <div className="item item-6">Status</div>
            <div className="item item-7"></div>
          </div>
          {tasks &&
            tasks.map((task, i) => {
              task.dueTimeStamp = new Date(task.dueTimeStamp);
              return (
                <TableRow
                  id={task.id}
                  name={task.name}
                  status={task.status}
                  frequency={task.frequency}
                  dueDate={task.dueTimeStamp.toLocaleDateString()}
                  type={task.type}
                  key={`task_${task.id}`}
                  index={i}
                  onDelete={onDelete}
                  onCheck={onCheck}
                />
              );
            })}
          {tasks && tasks.length === 0 && (
            <div className="no_tasks">
              No tasks! <br /> Create new one? <br /> Click the plus sign!
            </div>
          )}
        </div>
        <button onClick={() => onComplete()} className="save">
          Save
        </button>
      </div>
    </>
  );
};

export default Table;

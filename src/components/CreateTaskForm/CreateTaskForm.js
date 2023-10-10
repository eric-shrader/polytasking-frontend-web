import { useAuth0 } from "@auth0/auth0-react";
import "./CreateTaskForm.css";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "animate.css";

const CreateTaskForm = () => {
  const { getAccessTokenSilently, user } = useAuth0();
  const navigate = useNavigate();

  let task;

  async function postTaskToBackend(task) {
    const token = await getAccessTokenSilently();
    const response = await fetch("http://localhost:8080/api/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(task),
    });
    if (response.status === 201) {
      navigate("./../table");
    }
    // this handles form invalid logic
    if (response.status === 400) {
      const errors = await response.json();
      // this will remove fix issues message if it already exists
      const formName = document.getElementById("formName");
      formName.innerHTML = formName.innerHTML.slice(
        0,
        formName.innerHTML.search("k") + 1
      );
      // this will add fix issues message
      formName.innerHTML +=
        "<br /><span class='errorMessage'>Fix issues</span>";
      // this will remove error messages from form fields if they already exist
      const fields = document.getElementsByClassName("taskField");
      for (let i = 0; i < fields.length; i++) {
        const field = fields[i];
        const fieldInput = field.firstChild;
        fieldInput.innerHTML = fieldInput.innerHTML.slice(
          0,
          fieldInput.innerHTML.search(":") + 2
        );
      }
      // this will add error messages to form fields with errors
      for (const field in errors) {
        const message = errors[field];
        const label = document.getElementById(`task_${field}_label`);
        label.innerHTML += `<span class="errorMessage">${message}</span>`;
      }
    }
  }

  // add default date and minimum to be todays date when form loads in
  useEffect(() => {
    const dateField = document.getElementById("taskDueDate");
    const date = new Date(); // get todays date

    // Format the date as a string in the 'yyyy-mm-dd' format
    const dateString = date.toISOString().split("T")[0];

    // Set the min attribute to be todays date
    dateField.setAttribute("min", dateString);
    // set the default value to be todays date
    dateField.value = dateString;
  });

  return (
    <>
      <form
        className="createTaskForm animate__animated animate__fadeIn"
        onSubmit={(e) => {
          e.preventDefault(); // override defualt form behavior
          const formData = new FormData(e.target); // get the form data
          let date = new Date(formData.get("taskDueDate"));
          const offset = date.getTimezoneOffset() * 60 * 1000; // make sure date is correct in UTC
          date.setTime(date.getTime() + offset);
          task = {
            name: formData.get("taskName"),
            type: formData.get("taskType"),
            dueDate: date,
            frequency: formData.get("taskFrequency"),
            email: user.email,
          };
          postTaskToBackend(task);
        }}
      >
        <h1 id="formName">New Task</h1>
        <div className="taskField">
          <label id="task_name_label" htmlFor="taskName">
            Name:{" "}
          </label>
          <input type="text" name="taskName" id="taskName"></input>
        </div>
        <div className="taskField">
          <label id="task_type_label" htmlFor="taskType">
            Type:{" "}
          </label>
          <select name="taskType" id="taskType">
            <option value="House">House</option>
            <option value="Car">Car</option>
            <option value="Work">Work</option>
            <option value="Pet">Pet</option>
            <option value="Health">Health</option>
          </select>
        </div>
        <div className="taskField">
          <label id="task_dueDate_label" htmlFor="taskDueDate">
            Due Date:{" "}
          </label>
          <input type="date" name="taskDueDate" id="taskDueDate"></input>
        </div>
        <div className="taskField">
          <label id="task_frequency_label" htmlFor="taskFrequency">
            Frequency:{" "}
          </label>
          <select name="taskFrequency" id="taskFrequency">
            <option value="Once">Once</option>
            <option value="Daily">Daily</option>
            <option value="Weekly">Weekly</option>
            <option value="Monthly">Monthly</option>
          </select>
        </div>
        <button>Submit</button>
      </form>
    </>
  );
};

export default CreateTaskForm;

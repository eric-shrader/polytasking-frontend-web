import "./App.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

//components
import Layout from "./components/pages/Layout/Layout";
import Home from "./components/pages/Home/Home";
import Table from "./components/Table/Table";
import CreateTaskForm from "./components/CreateTaskForm/CreateTaskForm";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
        children: [
          {
            path: "/tasks/table",
            element: <Table />,
          },
          {
            path: "/tasks/new",
            element: <CreateTaskForm />,
          },
        ],
      },
    ],
  },
]);

function App() {
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;

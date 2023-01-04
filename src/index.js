import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./style.css";
import { Provider } from "react-redux";
import TaskStore from "./components/forms-lists/TaskFolder/taskReducer/taskStore";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={TaskStore}>
      <App />
    </Provider>
  </React.StrictMode>
);

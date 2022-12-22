import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./style.css";
import { Provider } from "react-redux";
import taskStore from "./reducers/taskReducer/taskStore";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={taskStore}>
      <App />
    </Provider>
  </React.StrictMode>
);

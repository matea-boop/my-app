import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./style.css";
import { AddBtnProvider } from "./context/indexContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AddBtnProvider>
      <App />
    </AddBtnProvider>
  </React.StrictMode>
);

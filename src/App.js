import React from "react";
import { Navbar } from "./components/Navbar";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./style.css";
import AddButton from "./components/AddBtn";
import { AddBtnProvider } from "./context/indexContext";
import {
  Overview,
  Calendar,
  Notebook,
  Tasks,
  Statistics,
  Settings,
} from "./Pages";

export const App = () => {
  return (
    <AddBtnProvider>
      <div className="app">
        <div className="main-container">
          <Router>
            <Navbar />

            <AddButton />

            <Routes>
              <Route exact path="/*" element={<Overview />}></Route>
              <Route exact path="/Calendar" element={<Calendar />}></Route>
              <Route exact path="/Notebook" element={<Notebook />}></Route>
              <Route exact path="/Tasks" element={<Tasks />}></Route>
              <Route exact path="/Statistics" element={<Statistics />}></Route>
              <Route exact path="/Settings" element={<Settings />}></Route>
            </Routes>
          </Router>
        </div>
      </div>
    </AddBtnProvider>
  );
};

export default App;

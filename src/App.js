import React from "react";
import { Navbar } from "./components/Navbar";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./style.css";
import AddButton from "./components/AddBtn";
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
    <div className="app">
      <div className="main-container">
        <Router>
          <AddButton />
          <Navbar />

          <Routes>
            <Route exact path="/Overview" element={<Overview />}></Route>
            <Route exact path="/Calendar" element={<Calendar />}></Route>
            <Route exact path="/Notebook" element={<Notebook />}></Route>
            <Route exact path="/Tasks" element={<Tasks />}></Route>
            <Route exact path="/Statistics" element={<Statistics />}></Route>
            <Route exact path="/Settings" element={<Settings />}></Route>
          </Routes>
        </Router>
      </div>
    </div>
  );
};

export default App;

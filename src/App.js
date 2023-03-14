import React from "react";
import { useState, useEffect } from "react";
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
              <Route path="/Calendar" element={<Calendar />}></Route>
              <Route path="/Notebook" element={<Notebook />}></Route>
              <Route path="/Tasks" element={<Tasks />}></Route>
              <Route path="/Statistics" element={<Statistics />}></Route>
              <Route path="/Settings" element={<Settings />}></Route>
            </Routes>
          </Router>
        </div>
      </div>
    </AddBtnProvider>
  );
};

export default App;

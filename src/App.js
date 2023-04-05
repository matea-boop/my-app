import React from "react";
import { useState } from "react";
import { Navbar } from "./components/Navbar";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./style.css";
import AddButton from "./components/AddBtn";
import { AddBtnProvider } from "./context/indexContext";
import { Overview, Calendar, Notebook } from "./Pages";

export const App = () => {
  const [theme, setTheme] = useState("light");

  const getToggleTheme = (value) => {
    setTheme(value);
  };
  return (
    <AddBtnProvider>
      <div className="app" id={theme}>
        <div className="main-container">
          <Router>
            <Navbar getToggleTheme={getToggleTheme} />
            <AddButton />

            <Routes>
              <Route exact path="/*" element={<Overview />}></Route>
              <Route path="/Calendar" element={<Calendar />}></Route>
              <Route path="/Notebook" element={<Notebook />}></Route>
            </Routes>
          </Router>
        </div>
      </div>
    </AddBtnProvider>
  );
};

export default App;

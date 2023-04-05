import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { IconContext } from "react-icons";
import { useState, useEffect } from "react";
import { BiMoon } from "react-icons/bi";
import { BiSun } from "react-icons/bi";
import { menuItems } from "../constants/constants.js";

export const Navbar = ({ getToggleTheme }) => {
  const [theme, setTheme] = useState("dark");

  const toggleTheme = () => {
    setTheme((curr) => (curr === "light" ? "dark" : "light"));
  };

  useEffect(() => {
    getToggleTheme(theme);
  }, [theme]);

  return (
    <IconContext.Provider
      value={{ color: "var(--text-color)", size: "1.3rem" }}
    >
      <SidebarMenu>
        <div className="sidebar">
          <div className="sidebar-header">
            <h1>
              <span className="blue-header">Mind</span>
              <span>Me</span>
              <span className="orange-header">.</span>
            </h1>
          </div>
          <ul>
            {menuItems.map(({ id, text, url, icon }) => {
              return (
                <NavLink key={id} to={url}>
                  <li>
                    {icon}
                    <span className="text">{text}</span>
                  </li>
                </NavLink>
              );
            })}
            <li className="theme-switch">
              <label className="switch">
                <input type="checkbox" onClick={() => toggleTheme()} />
                <div className="slider">
                  <div
                    className="icon dark"
                    style={
                      theme === "light" ? { opacity: "0" } : { opacity: "1" }
                    }
                  >
                    <BiMoon />
                  </div>
                  <div
                    className="icon light"
                    style={
                      theme === "dark" ? { opacity: "0" } : { opacity: "1" }
                    }
                  >
                    <BiSun />
                  </div>
                </div>
              </label>
            </li>
          </ul>
        </div>
      </SidebarMenu>
    </IconContext.Provider>
  );
};

const SidebarMenu = styled.div`
  .sidebar {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    z-index: 1;

    width: 100%;
    height: 100%;

    background-color: var(--sidebar-color);
    overflow-x: hidden;
    border-radius: 7px;

    top: 0;
  }

  .theme-switch {
    position: absolute;

    bottom: 3.2rem;
    left: 0;
    right: 0;
    width: 3.4rem;

    margin-left: auto;
    margin-right: auto;

    &:hover {
      transform: none;
    }

    input {
      display: none;
    }

    input: checked + .slider::before {
      transform: translateX(1.8rem);
    }

    .icon {
      position: absolute;
      top: 0.1rem;
      width: 1.4rem;
    }

    .light {
      cursor: pointer;

      right: 0.1rem;

      bottom: 0;

      transition: all 0.4s;
    }

    .dark {
      position: absolute;
      left: 0.1rem;
      transition: all 0.4s;
    }

    .switch {
      position: relative;
      display: inline-block;
      width: 3.4rem;
      height: 1.6rem;
    }

    .slider {
      position: absolute;
      cursor: pointer;

      top: 0;
      left: 0;
      right: 0;
      bottom: 0;

      transition: all 0.4s;
      border-radius: 34px;
      background-color: var(--toggle-color);
    }

    .slider::before {
      content: "";
      position: absolute;

      height: 1.4rem;
      width: 1.4rem;
      top: 0.1rem;
      left: 0.1rem;
      border-radius: 50%;
      transition: all 0.4s;
      background-color: var(--slide-color);
    }
  }

  .sidebar-header {
    display: flex;
    align-items: center;
    justify-content: space-between;

    padding: 2rem 0 2.5rem 0;

    .blue-header {
      color: var(--mainblue-color);
    }

    .orange-header {
      color: var(--mainorange-color);
    }
  }

  li {
    display: flex;
    align-items: center;

    transition: transform 0.3s ease-in-out;

    margin-bottom: 1rem;

    &:hover {
      transform: translateX(0.3rem);
    }

    .text {
      margin: 0.12rem 0 0 0.5rem;
    }
  }

  .active {
    pointer-events: none;
    color: var(--text-color);
    opacity: 1;
  }

  @media screen and (max-width: 1024px) {
    .sidebar {
      width: 5rem;
    }
    .blue-header {
      display: none;
    }
    .text {
      display: none;
    }
  }
`;
export default Navbar;

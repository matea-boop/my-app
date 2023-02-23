import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { IconContext } from "react-icons";

import { menuItems } from "../constants/constants.js";

export const Navbar = () => {
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

  a:last-child {
    position: absolute;

    bottom: 3.2rem;
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

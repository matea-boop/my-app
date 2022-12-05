import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { linksAddBtn } from "../constants/constants";
import { HiPlusCircle } from "react-icons/hi";
import { IconContext } from "react-icons";
import { useAllContext } from "../context/indexContext";

const AddButton = () => {
  const { isBtnOpen, addBtnClose, addBtnOpen } = useAllContext();
  return (
    <IconContext.Provider
      value={{
        color: "var(--mainorange-color)",
        size: "7rem",
        bottom: "3.2rem",
      }}
    >
      <Wrapper>
        {!isBtnOpen ? (
          <HiPlusCircle className="btn" onClick={addBtnOpen} />
        ) : (
          <HiPlusCircle className="btn btn-rotate" onClick={addBtnClose} />
        )}

        {isBtnOpen ? (
          <ul className="btn-menu-active">
            {linksAddBtn.map(({ id, text }) => {
              return (
                <NavLink onClick={addBtnClose}>
                  <li key={id}>
                    <span>{text}</span>
                  </li>
                </NavLink>
              );
            })}
          </ul>
        ) : null}
      </Wrapper>
    </IconContext.Provider>
  );
};

const Wrapper = styled.div`
  z-index: 200;
  position: absolute;
  bottom: 4.5rem;
  right: 10.2rem;
  width: fit-content;

  .btn-menu-active {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    bottom: 0;
    right: 0;
    overflow: hidden;
    border-radius: var(--border-radius);
    a {
      position: relative;
      background-color: var(--mainorange-color);
      color: var(--textdark-color);
      animation: fadeIn 1.5s;
      opacity: 1;
      padding: 1rem;

      &:hover {
        color: black;
        background-color: rgb(245, 182, 93);
      }

      &:first-child {
        border-radius: var(--border-radius) 0 0 var(--border-radius);
      }
    }
  }

  .btn {
    position: fixed;
    bottom: 3.2rem;
    right: 3.2rem;
    transition: all 0.4s;
  }

  .btn-rotate {
    transform: rotate(-45deg);
  }

  @keyframes fadeIn {
    from {
      left: 100%;
    }
    to {
      left: 0;
    }
  }
`;

export default AddButton;

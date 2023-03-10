import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { useAllContext } from "../../../context/indexContext";
import axios from "axios";
import { FiSquare } from "react-icons/fi";
import { HiEllipsisVertical } from "react-icons/hi2";
import { FiCheckSquare } from "react-icons/fi";
import DeadlineForm from "./DeadlineForm";

async function getDeadlineDataFromDB() {
  const url = "http://localhost:3001/api/deadlines";
  try {
    const {
      data: { deadlines },
    } = await axios.get(url);

    return deadlines;
  } catch (error) {
    console.log("error", error);
    return error;
  }
}

function DeadlineItem({ deadline }) {
  const { isDeadlineModalOpen } = useAllContext();

  const [deadlineList, setDeadlineList] = useState([]);
  const [openMenu, setOpenMenu] = useState(false);
  const [editDeadlineModalOpen, setEditDeadlineModalOpen] = useState(false);

  var curr = new Date();
  const today = curr.getDay();
  const choiceRef = useRef();

  //   useEffect(() => {
  //     let handler = (event) => {
  //       if (!choiceRef.current.contains(event.target)) {
  //         setOpenMenu(false);
  //       }
  //     };

  //     document.addEventListener("mousedown", handler);
  //     return () => {
  //       document.removeEventListener("mousedown", handler);
  //     };
  //   }, []);

  useEffect(() => {
    getDeadlineDataFromDB().then((res) => setDeadlineList(res));
  }, [isDeadlineModalOpen]);

  //   const deleteFromDB = async (idToDelete) => {

  //     try {

  //       await axios.delete(`http://localhost:3001/api/habits/${idToDelete}`);
  //     } catch (error) {
  //       console.log(error);
  //     }

  //   };

  return (
    <Wrapper
    // style={habit.status ? { opacity: "0.5" } : { opacity: "1" }}
    >
      <div
        className="type-line"
        style={{ border: `2px solid var(--mainblue-color)` }}
      ></div>
      <div className="top-row">
        <p className="title">{deadline.title}</p>
      </div>

      {editDeadlineModalOpen ? (
        <DeadlineForm
          type="edit"
          deadline={deadline}
          isHabitModalOpen={editDeadlineModalOpen}
          habitModalClose={setEditDeadlineModalOpen}
        />
      ) : null}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  background-color: var(--box-color);
  border-radius: var(--border-radius);

  margin-bottom: 3%;

  height: 13%;
  width: 100%;

  .type-line {
    position: absolute;
    border-radius: 10px;
    height: 70%;
    left: 4%;
  }

  .top-row {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    width: 90%;

    padding: 0 0.5rem 0.5rem 1rem;
  }

  .title {
    font-size: var(--text-size);
    font-weight: lighter;
    color: var(--text-color);
  }

  .icon {
    display: flex;
    align-items: center;
    justify-content: center;

    font-size: 1.2rem;
    cursor: pointer;
    opacity: 0.5;

    &:hover {
      opacity: 1;
    }
  }

  .icon-choice-container {
    position: absolute;
    display: flex;
    flex-direction: column;
    align-items: center;
    z-index: 200;

    top: -1.4rem;
    right: 1.4rem;
    min-width: 5.5rem;

    opacity: 0;
    transition: opacity 0.2s;
    animation: fade-out 0.2s forwards;
    background-color: var(--mainorange-color);
    border-radius: var(--border-radius);
  }

  .icon-choice-container[open] {
    animation: fade-in 0.2s forwards;
    opacity: 1;
    transition: opacity 0.2s;
  }

  .choice {
    color: var(--box-color);
    font-size: 0.8rem;

    cursor: pointer;
    opacity: 0.5;

    margin-right: auto;
    padding: 0.5rem;

    &:hover {
      opacity: 1;
    }

    &:last-child {
      padding-top: 0;
    }
  }

  @keyframes fade-in {
    0% {
      clip-path: polygon(100% 50%, 100% 50%, 100% 50%, 100% 50%);
      transform: scale(0);
    }
    50% {
      clip-path: polygon(0 0, 100% 40%, 100% 60%, 0% 100%);
      transform: scale(0.5);
    }
    75% {
      clip-path: polygon(0 0, 100% 20%, 100% 80%, 0% 100%);
      transform: scale(0.7);
    }
    100% {
      clip-path: polygon(0 0, 100% 0, 100% 100%, 0% 100%);
      transform: scale(1);
    }
  }
  @keyframes fade-out {
    100% {
      clip-path: polygon(100% 50%, 100% 50%, 100% 50%, 100% 50%);
      transform: scale(0);
      transform-origin: 100% 50%;
    }
    75% {
      clip-path: polygon(0 0, 100% 40%, 100% 60%, 0% 100%);
    }
    50% {
      clip-path: polygon(0 0, 100% 20%, 100% 80%, 0% 100%);
    }
    0% {
      clip-path: polygon(0 0, 100% 0, 100% 100%, 0% 100%);
      transform: scale(1);
      transform-origin: 100% 50%;
    }
  }
`;

export default DeadlineItem;

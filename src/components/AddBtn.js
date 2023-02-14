import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import { HiPlusCircle } from "react-icons/hi";
import { IconContext } from "react-icons";
import { useAllContext } from "../context/indexContext";
import TaskForm from "../components/forms-lists/TaskFolder/taskReducer/taskForm";
import EventForm from "./forms-lists/EventFolder/EventForm";
import HabitForm from "./forms-lists/HabitFolder/HabitForm";
import DeadlineForm from "./forms-lists/DeadlineFolder/DeadlineForm";

function AddButton() {
  const {
    isBtnOpen,
    addBtnOpen,
    addBtnClose,
    isModalOpen,
    modalOpen,
    modalClose,
    isEventModalOpen,
    eventModalOpen,
    eventModalClose,
  } = useAllContext();
  // const [modalOpen, setModalOpen] = useState(false);
  const [getId, setGetId] = useState("");

  const linksAddBtn = [
    {
      id: 1,
      text: "Task",
      url: "/AddTask",
      element: (
        <TaskForm
          type="add"
          isModalOpen={isModalOpen}
          modalOpen={modalOpen}
          modalClose={modalClose}
        />
      ),
    },
    {
      id: 2,
      text: "Event",
      url: "/AddEvent",
      element: (
        <EventForm
          type="add"
          isEventModalOpen={isEventModalOpen}
          eventModalOpen={eventModalOpen}
          eventModalClose={eventModalClose}
        />
      ),
    },
    {
      id: 3,
      text: "Habit",
      url: "/AddHabit",
      element: <HabitForm />,
    },
    {
      id: 4,
      text: "Deadline",
      url: "AddDeadline",
      element: <DeadlineForm />,
    },
    {
      id: 5,
      text: "Notebook",
      url: "/Notebook",
      element: null,
    },
  ];

  let toggleRef = useRef();

  useEffect(() => {
    let handler = (event) => {
      if (!toggleRef.current.contains(event.target)) {
        addBtnClose();
      }
    };

    document.addEventListener("mousedown", handler);

    return () => {
      document.removeEventListener("mousedown", handler);
    };
  });

  const btnClickOpen = () => {
    setGetId("");
    addBtnOpen();
    modalClose();
  };

  const btnClickClose = () => {
    setGetId("");
    addBtnClose();
    modalClose();
  };

  return (
    <IconContext.Provider
      value={{
        color: "var(--mainorange-color)",
        size: "7rem",
        bottom: "3.2rem",
      }}
    >
      <Wrapper ref={toggleRef}>
        {!isBtnOpen ? (
          <HiPlusCircle className="btn" onClick={btnClickOpen} />
        ) : (
          <HiPlusCircle className="btn act" onClick={btnClickClose} />
        )}

        <ul className={!isBtnOpen ? "menu" : "menu m-active"}>
          {linksAddBtn.map(({ id, text }) => {
            return (
              <li
                key={id}
                onClick={() => {
                  setGetId(id);
                  addBtnClose();
                  modalOpen();
                  eventModalOpen();
                }}
                style={
                  getId !== "" ? { opacity: "0", transition: " 0s" } : null
                }
              >
                <span className="text">{text}</span>
              </li>
            );
          })}
        </ul>

        {isModalOpen || isEventModalOpen ? (
          <div>
            {linksAddBtn.map(({ id, element }) => {
              if (getId === id) {
                return (
                  <div key={id} className="element">
                    {element}
                  </div>
                );
              }
            })}
          </div>
        ) : null}
      </Wrapper>
    </IconContext.Provider>
  );
}

const Wrapper = styled.div`
  z-index: 200;
  position: absolute;
  bottom: 4.5rem;
  right: 10.2rem;
  width: fit-content;

  .edit {
    pointer-events: none;
  }
  .menu {
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    bottom: 0;
    right: 0;
    overflow: hidden;
    cursor: pointer;
    border-radius: var(--border-radius);
  }
  .menu li {
    position: relative;
    background-color: var(--mainorange-color);
    color: var(--textdark-color);
    left: 100%;
    transition: 1s;
    opacity: 1;
    padding: 1rem;

    &:first-child {
      border-radius: var(--border-radius) 0 0 var(--border-radius);
    }
  }
  .text {
    opacity: 0.5;
    &:hover {
      opacity: 1;
    }
  }

  .element {
    z-index: 10;
    border-radius: var(--border-radius);
  }

  .btn {
    cursor: pointer;
    z-index: 300;
    position: fixed;
    bottom: 3.2rem;
    right: 3.2rem;
    transition: all 1s;
  }

  .act {
    transform: rotate(-45deg);
  }

  .m-active li {
    left: 0;
  }
`;

export default AddButton;

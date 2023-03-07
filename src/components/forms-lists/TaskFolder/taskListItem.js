import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { HiEllipsisVertical } from "react-icons/hi2";
import TaskForm from "./taskReducer/taskForm";
import Checkbox from "./taskCheckbox";
import { toast } from "react-hot-toast";
import { TfiArrowCircleDown } from "react-icons/tfi";
import SubtaskListContent from "./subtasks/subtaskListContent";
import { useAllContext } from "../../../context/indexContext";
import SubtaskBar from "./subtasks/subtaskBar";
import axios from "axios";

async function getDataFromDB() {
  const url = "http://localhost:3001/api/tasks";
  try {
    const {
      data: { tasks },
    } = await axios.get(url);

    return tasks;
  } catch (error) {
    console.log("error", error);
    return error;
  }
}

function TaskItem({ task, type }) {
  const {
    isDeleted,
    isSubtaskStatusChanged,
    taskDeleted,
    taskNotd,
    isTaskChecked,
    taskChecked,
    taskUnchecked,
  } = useAllContext();
  const [subtasks, setSubtasks] = useState(task ? task.subtasks : []);
  const [taskList, setTaskList] = useState([]);
  const [openMenu, setOpenMenu] = useState(false);
  const [checked, setChecked] = useState(false);
  const [clicked, setClicked] = useState("");
  const [subtaskArrow, setSubtaskArrow] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);

  let choiceRef = useRef();
  let divRef = useRef();
  let subtaskRef = useRef();
  let arrowRef = useRef();
  let list = [];
  task.subtasks.forEach((sub) => list.push(sub.subtaskStatus));
  const [listBooleanSubtasks, setListBooleanSubtasks] = useState([...list]);

  const itemHeight = type === "mainTask" ? 8.5 : 17;
  const itemOpacity = checked ? 0.5 : 1;

  useEffect(() => {
    getDataFromDB().then((res) => setTaskList(res));
  }, [openMenu, isTaskChecked, clicked, subtaskArrow]);

  useEffect(() => {
    let handler = (event) => {
      if (!choiceRef.current.contains(event.target)) {
        setOpenMenu(false);
      }
    };
    let handler1 = (event) => {
      if (
        !arrowRef.current.contains(event.target) &&
        !subtaskRef.current.contains(event.target)
      ) {
        setSubtaskArrow(false);
      }
    };
    document.addEventListener("mousedown", handler);
    document.addEventListener("mousedown", handler1);
    return () => {
      document.removeEventListener("mousedown", handler);
      document.removeEventListener("mousedown", handler1);
    };
  }, []);

  useEffect(() => {
    let handler = (event) => {
      if (divRef.current.contains(event.target)) {
        setClicked(task._id);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => {
      setClicked("");
      document.removeEventListener("mousedown", handler);
    };
  }, []);

  useEffect(() => {
    if (task.status === true) {
      setChecked(true);
      taskChecked();
    } else {
      setChecked(false);
      taskUnchecked();
    }
  }, [task.status]);

  const handleCheck = async () => {
    setChecked(!checked);
    if (isTaskChecked) {
      taskUnchecked();
    } else {
      taskChecked();
    }
    await axios.patch(`http://localhost:3001/api/tasks/${task._id}`, {
      status: !checked,
    });
  };

  const deleteFromDB = async (idToDelete) => {
    taskDeleted();
    try {
      await axios.delete(`http://localhost:3001/api/tasks/${idToDelete}`);
      taskNotd();
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = () => {
    deleteFromDB(task._id);
    setOpenMenu(false);

    toast.success("Task Deleted");
  };

  const handleEdit = () => {
    setOpenMenu(false);
    setEditModalOpen(true);
  };

  const onClick = () => {
    setOpenMenu(!openMenu);
  };

  const arrowClick = () => {
    setSubtaskArrow(!subtaskArrow);
  };

  return (
    <Wrapper
      id={type === "mainTask" ? "main" : "task"}
      style={{ height: `${itemHeight}%`, opacity: `${itemOpacity}` }}
      ref={divRef}
    >
      <div className="task-details">
        {/* CHECKBOX */}

        <Checkbox
          className="checkbox"
          checked={checked}
          handleCheck={handleCheck}
        />
        <p className="task-title">{task.title}</p>

        <div
          className="icon-container"
          style={
            checked ? { pointerEvents: "none" } : { pointerEvents: "auto" }
          }
        >
          {/* SUBTASK ARROW */}
          <div ref={arrowRef}>
            <TfiArrowCircleDown
              style={
                listBooleanSubtasks && listBooleanSubtasks.length > 0
                  ? { display: "flex" }
                  : { display: "none" }
              }
              className={
                subtaskArrow && !checked
                  ? "subtask-arrow activ"
                  : "subtask-arrow"
              }
              onClick={arrowClick}
            />
          </div>

          {/* MENU EDIT / DELETE */}
          <div ref={choiceRef} className="relat">
            <div className="icon">
              {" "}
              <HiEllipsisVertical onClick={onClick} />
            </div>

            <div
              className="icon-choice-container"
              {...(openMenu ? { open: openMenu } : null)}
            >
              <div
                className="choice"
                onClick={handleDelete}
                onKeyDown={handleDelete}
                role="button"
              >
                Delete task
              </div>
              <div
                className="choice"
                onClick={handleEdit}
                onKeyDown={handleEdit}
                role="button"
              >
                Edit task
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* SUBTASK BAR */}

      <div
        className="subtask-bar-container"
        style={
          listBooleanSubtasks.length > 0
            ? { display: "block" }
            : { display: "none" }
        }
      >
        <SubtaskBar listBoolean={listBooleanSubtasks} checked={checked} />
      </div>

      {/* SUBTASK LIST */}

      <div className="links-menu" ref={subtaskRef}>
        {subtaskArrow ? (
          <SubtaskListContent
            taskList={taskList}
            taskCheck={checked}
            listBoolean={listBooleanSubtasks}
            setListBoolean={setListBooleanSubtasks}
            setTaskChecked={setChecked}
            dropdownOpen={subtaskArrow}
            task={task}
            clicked={clicked}
            setClicked={setClicked}
          />
        ) : null}
      </div>

      {editModalOpen ? (
        <TaskForm
          type="edit"
          task={task}
          isModalOpen={editModalOpen}
          modalClose={setEditModalOpen}
        />
      ) : null}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;

  background-color: var(--box-color);
  border-radius: var(--border-radius);

  margin-bottom: 3%;

  .task-details {
    display: flex;
    align-items: center;
    justify-content: center;

    gap: 0.7rem;
    padding: 0.6rem 1rem 0.6rem 1rem;
  }

  .task-title {
    font-weight: lighter;
    font-size: var(--text-size);

    max-width: 8rem;
  }

  .icon-container {
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;

    right: 1rem;

    gap: 0.3rem;
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

  .relat {
    position: relative;
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

  .checkbox {
    cursor: pointer;
  }

  .subtask-arrow {
    color: var(--text-color);
    font-size: 0.9rem;

    cursor: pointer;
    transition: rotate 0.2s;
    rotate: 0deg;
    opacity: 0.5;

    &:hover {
      opacity: 1;
    }
  }

  .activ {
    rotate: 180deg;
    transition: rotate 0.2s;
  }

  .subtask-bar-container {
    position: absolute;

    bottom: 0.2rem;
    width: 100%;
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

export default TaskItem;

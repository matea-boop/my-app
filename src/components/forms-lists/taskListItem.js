import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { HiEllipsisVertical } from "react-icons/hi2";
import { useDispatch } from "react-redux";
import { deleteTask, editTask } from "../../reducers/taskReducer/TaskStorage";
import TaskForm from "../../reducers/taskReducer/TaskForm";
import Checkbox from "./taskCheckbox";
import SubtaskCheckbox from "./subtaskCheckbox";
import { toast } from "react-hot-toast";
import { HiOutlineArrowCircleDown } from "react-icons/hi";
import { useSelector } from "react-redux";
import SubtaskListContent from "./subtaskContent";

function TaskItem({ task }) {
  const [openMenu, setOpenMenu] = useState(false);
  const [checked, setChecked] = useState(false);
  const [subtaskArrow, setSubtaskArrow] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const dispatch = useDispatch();
  let choiceRef = useRef();

  useEffect(() => {
    let handler = (event) => {
      if (!choiceRef.current.contains(event.target)) {
        setOpenMenu(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => {
      document.removeEventListener("mousedown", handler);
    };
  });

  useEffect(() => {
    if (task.status === "complete") {
      setChecked(true);
    } else {
      setChecked(false);
    }
  }, [task.status]);

  const handleCheck = () => {
    setChecked(!checked);
    dispatch(
      editTask({
        ...task,
        status: checked ? "incomplete" : "complete",
      })
    );
  };

  const handleDelete = () => {
    dispatch(deleteTask(task.id));
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
    <Wrapper style={checked ? { opacity: "0.5" } : { opacity: "1" }}>
      <div className="task-details">
        <Checkbox
          className="checkbox"
          checked={checked}
          handleCheck={handleCheck}
        />
        <p className="task-title">{task.title}</p>
        <HiOutlineArrowCircleDown
          className={subtaskArrow ? "subtask-arrow activ" : "subtask-arrow"}
          onClick={arrowClick}
        />
        <div
          ref={choiceRef}
          className="icon-container"
          style={
            checked ? { pointerEvents: "none" } : { pointerEvents: "auto" }
          }
        >
          <HiEllipsisVertical className="icon" onClick={onClick} />
          {openMenu ? (
            <div className="icon-choice-container">
              <div
                className="choice"
                onClick={handleDelete}
                onKeyDown={handleDelete}
                role="button"
                tabIndex={0}
              >
                Delete task
              </div>
              <div
                className="choice"
                onClick={handleEdit}
                onKeyDown={handleEdit}
                role="button"
                tabIndex={0}
              >
                Edit task
              </div>
            </div>
          ) : null}
        </div>
      </div>

      {subtaskArrow ? (
        <div className="links-menu">
          <SubtaskListContent task={task} />
        </div>
      ) : null}

      {editModalOpen ? (
        <TaskForm
          type="edit"
          task={task}
          modalOpen={editModalOpen}
          setModalOpen={setEditModalOpen}
        />
      ) : null}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  background-color: var(--box-color);
  tranisition: all 1s;
  margin-bottom: 0.7rem;
  border-radius: var(--border-radius);
  &:last-child {
    margin-bottom: 0;
  }

  .links-menu {
    background-color: var(--body-color);
    border-radius: var(--border-radius);
    width: 100%;
  }

  .task-details {
    padding: 0.7rem 1rem 0.7rem 1rem;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;
  }
  .task-title {
    word-break: break-all;
    font-weight: regular;
    font-size: 0.9rem;
  }
  .icon-container {
    position: absolute;
    right: 1rem;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.3rem;
  }
  .icon {
    font-size: 1.2rem;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    opacity: 0.5;
    &:hover {
      opacity: 1;
    }
  }
  .icon-choice-container {
    position: fixed;
    display: flex;
    margin-right: 8rem;
    z-index: 200;
    min-width: 5.5rem;
    flex-direction: column;
    align-items: center;
    background-color: var(--mainorange-color);
    border-radius: var(--border-radius);
  }
  .choice {
    color: var(--box-color);
    font-size: 0.8rem;
    margin-right: auto;
    padding: 0.5rem;
    cursor: pointer;
    opacity: 0.5;
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
    cursor: pointer;
    transition: rotate 1s;
    rotate: 0deg;
  }
  .activ {
    rotate: 180deg;
    transition: rotate 1s;
  }
`;

export default TaskItem;

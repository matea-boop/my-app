import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { addTask, editTask, addSubtask } from "./taskStorage";
import { v4 as uuid } from "uuid";
import { toast } from "react-hot-toast";
import { HiOutlineXMark } from "react-icons/hi2";
import { IconContext } from "react-icons";
import axios from "axios";
import { useReducer } from "react";
import TaskListContent from "../taskListContent";

function TaskForm({ type, task, modalOpen, setModalOpen }) {
  const [title, setTitle] = useState("");
  const [subtasks, setSubtasks] = useState(task ? task.subtasks : []);
  const [currentSubtask, setCurrentSubtask] = useState("");
  const [status, setStatus] = useState(false);
  const [subtaskStatus, setSubtaskStatus] = useState(false);
  const [date, setDate] = useState(new Date().toLocaleDateString());
  const [valid, setValid] = useState(false);
  const dispatch = useDispatch();
  const [taskList, setTaskList] = useState([]);
  const url = "http://localhost:3001/api/tasks";

  const putDataToDB = async () => {
    const newData = {
      id: uuid(),
      title: title,
      subtasks: subtasks,
      status: status,
      date: date,
    };

    try {
      await axios.post(url, newData, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET,HEAD,OPTIONS,POST,PUT",
        },
      });
    } catch (error) {
      console.log("error", error);
    }
  };

  const onClick = (e) => {
    e.preventDefault();
    setModalOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    putDataToDB();
    setModalOpen(false);
  };

  const addSubtask = () => {
    setSubtasks((subtask) => [
      ...subtask,
      {
        id: uuid(),
        subtaskTitle: currentSubtask,
        subtaskStatus: subtaskStatus,
      },
    ]);

    setCurrentSubtask("");
  };

  const deleteSubtask = (id) => {
    setSubtasks(subtasks.filter((subtask) => subtask.id !== id));
  };

  useEffect(() => {
    const ddmmyyyy = /^(0[1-9]|[12][0-9]|3[01])[- /.](0[1-9]|1[012])[- /.](19|20)\d\d$/;

    if (ddmmyyyy.test(date)) {
      setValid(true);
    } else {
      setValid(false);
    }
  }, [date]);

  return (
    <IconContext.Provider
      value={{
        color: "var(--box-color)",
        size: "1rem",
      }}
    >
      <div style={{ borderRadius: "var(--border-radius)" }}>
        {modalOpen ? (
          <Wrapper>
            <div className="form-container">
              <form
                className="task-form"
                onSubmit={(e) => {
                  handleSubmit(e);
                }}
              >
                <h1 className="header">
                  {type === "edit" ? "Edit task" : "Add task"}
                </h1>
                <label htmlFor="title">Title</label>

                <input
                  type="text"
                  maxLength="13"
                  placeholder="Task title"
                  value={title}
                  id="title"
                  name="title"
                  onChange={(e) => setTitle(e.target.value)}
                />

                <label htmlFor="time">Date and Time</label>

                <input
                  id={valid ? "valid" : "notValid"}
                  type="text"
                  placeholder="dd/mm/yyyy"
                  name="time"
                  className="task-input-date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                />

                <label htmlFor="subtasks">Subtasks</label>
                <div className="add-subtask-container">
                  <input
                    type="text"
                    maxLength="15"
                    placeholder="Add Subtask"
                    value={currentSubtask}
                    name="subtasks"
                    onChange={(e) => setCurrentSubtask(e.target.value)}
                  />
                  <button
                    type="button"
                    onClick={() => {
                      addSubtask();
                    }}
                    className="btn-subtask-add"
                  >
                    Add
                  </button>
                </div>

                <div className="subtask">
                  {subtasks.length > 0 ? (
                    <ul>
                      {subtasks.map(({ id, subtaskTitle }) => {
                        return (
                          <li className="links" key={id}>
                            <div>{subtaskTitle}</div>

                            <HiOutlineXMark
                              onClick={() => {
                                deleteSubtask(id);
                              }}
                              className="delete-subtask"
                            />
                          </li>
                        );
                      })}
                    </ul>
                  ) : null}
                </div>

                <div className="button-container">
                  <button type="submit" className="task-btn">
                    {type === "edit" ? "Edit task" : "Add task"}
                  </button>
                  <button
                    type="button"
                    className="task-btn cancel"
                    onClick={(e) => onClick(e)}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </Wrapper>
        ) : null}
      </div>
    </IconContext.Provider>
  );
}

const Wrapper = styled.div`
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 0;
  left: 0;
  z-index: 10;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(5px);
  color: var(--body-color);
  border-radius: inherit;

  .header {
    font-size: 1.1rem;
    font-weight: bold;
    margin-bottom: 1.5rem;
  }
  .form-container {
    background-color: var(--mainorange-color);
    max-width: 500px;
    height: fit-content;
    border-radius: inherit;
    margin: 0 auto;
    padding: 2rem;
    width: 40%;
    min-width: 300px;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .task-form {
    width: 100%;
    label {
      font-size: 1rem;
    }
    input {
      height: 3rem;
      margin-top: 0.5rem;
      margin-bottom: 2rem;
      width: 100%;
      padding: 1rem;
      border: none;
      outline: none;
      border-radius: var(--border-radius);
      background-color: var(--text-color);
      font-size: 1rem;
    }

    .button-container {
      width: fit-content;
      margin: 0 auto;
      z-index: 1000;
    }
    .task-btn {
      padding: 1rem 1.5rem 1rem 1.5rem;
      font-size: 1rem;
      margin: 0.3rem;
      z-index: 1000;
      font-family: "Nunito", sans-serif;
      font-weight: bold;
      background-color: var(--body-color);
      color: var(--text-color);
      border: none;
      border-radius: var(--border-radius);
      cursor: pointer;
    }
    .cancel {
      z-index: 1000;
      opacity: 0.75;
    }
  }
  input[id="notValid"] {
    outline: 2px solid red;
  }
  .add-subtask-container {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
  }
  .btn-subtask-add {
    height: 3rem;
    background: var(--body-color);
    border-radius: var(--border-radius);
    border: none;
    font-family: "Nunito", sans-serif;
    font-weight: bold;
    cursor: pointer;
    color: var(--text-color);
    margin-top: 0.5rem;
    margin-bottom: 2rem;
    margin-left: 0.5rem;
    padding: 0 1rem 0 1rem;
  }
  .icons-subtask {
    gap: 0.5rem;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .links {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    background-color: var(--text-color);
    border-radius: var(--border-radius);
    margin-bottom: 0.5rem;
    padding: 0.5rem 1rem 0.5rem 1rem;
  }
  .delete-subtask {
    cursor: pointer;
  }
`;

export default TaskForm;

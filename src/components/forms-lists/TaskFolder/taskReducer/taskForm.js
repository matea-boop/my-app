import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { v4 as uuid } from "uuid";
import { toast } from "react-hot-toast";
import { HiOutlineXMark } from "react-icons/hi2";
import { IconContext } from "react-icons";
import axios from "axios";

function TaskForm({ type, task, modalOpen, modalClose, isModalOpen }) {
  const [title, setTitle] = useState("");
  const [subtasks, setSubtasks] = useState(task ? task.subtasks : []);
  const [currentSubtask, setCurrentSubtask] = useState("");
  const [status, setStatus] = useState(false);
  const [subtaskStatus, setSubtaskStatus] = useState(false);
  const [date, setDate] = useState(new Date().toLocaleDateString());
  const [valid, setValid] = useState(true);
  const [taskList, setTaskList] = useState([]);
  const url = "http://localhost:3001/api/tasks";
  const formRef = useRef();

  useEffect(() => {
    const handler = (event) => {
      if (formRef.current === null) {
        return;
      }
      if (formRef.current.contains(event.target)) {
        return;
      }
      modalClose();
    };
    document.body.addEventListener("mousedown", handler, true);
    return () => {
      document.body.removeEventListener("mousedown", handler, true);
    };
  }, []);

  useEffect(() => {
    if (type === "edit" && task) {
      setTitle(task.title);
      setSubtasks(task.subtasks);
      setDate(task.date);
    } else {
      setTitle("");
      setSubtasks([]);
    }
  }, [type, modalOpen]);

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
          "Access-Control-Allow-Methods": "GET,HEAD,OPTIONS,POST,PUT,PATCH",
        },
      });
    } catch (error) {
      console.log("error", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (title === "") {
      toast.error("Task title cannot be empty!");
      return;
    }
    if (!valid) {
      toast.error("Invalid date input!");
      return;
    }
    if (title && valid && type === "add") {
      putDataToDB();
      toast.success("Task added successfully!");
      modalClose();
    }
    if (type === "edit") {
      if (task.title !== title) {
        await axios.patch(`http://localhost:3001/api/tasks/${task._id}`, {
          title: title,
        });
        modalClose();
        toast.success("Task Edited Successfully!");
      } else if (task.subtasks !== subtasks) {
        await axios.patch(`http://localhost:3001/api/tasks/${task._id}`, {
          subtasks: subtasks,
        });
        modalClose();
        toast.success("Task Edited Successfully!");
      } else if (task.date !== date && valid) {
        await axios.patch(`http://localhost:3001/api/tasks/${task._id}`, {
          date: date,
        });
        modalClose();
        toast.success("Task edited successfully!");
      } else {
        toast.error("No changes made...");
      }
    }

    modalClose();
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
    let todaysDate = new Date().toLocaleDateString();

    if (ddmmyyyy.test(date) && date >= todaysDate) {
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
        {isModalOpen ? (
          <Wrapper>
            <div ref={formRef} className="form-container">
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
                  onChange={(e) =>
                    setTitle(
                      e.target.value.charAt(0).toUpperCase() +
                        e.target.value.slice(1)
                    )
                  }
                />

                <label htmlFor="time">Date</label>

                <input
                  id={valid ? "valid" : "notValid"}
                  type="text"
                  placeholder="dd/mm/yyyy"
                  name="date"
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
                    onChange={(e) =>
                      setCurrentSubtask(
                        e.target.value.charAt(0).toUpperCase() +
                          e.target.value.slice(1)
                      )
                    }
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
                    onClick={() => {
                      modalClose();
                    }}
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
  z-index: 10;

  top: 0;
  left: 0;
  width: 100%;
  height: 100%;

  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(5px);
  color: var(--text-color);
  border-radius: inherit;

  .header {
    font-size: 1.1rem;
    font-weight: bold;

    margin-bottom: 1.5rem;
  }

  .form-container {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;

    width: 40%;
    min-width: 300px;
    max-width: 500px;
    height: fit-content;

    background-color: var(--sidebar-color);
    border-radius: inherit;

    margin: 0 auto;
    padding: 2rem;
  }

  .task-form {
    width: 100%;

    label {
      font-size: 1rem;
    }

    input {
      font-size: 0.8rem;

      height: 2.7rem;
      width: 100%;

      border: none;
      outline: none;
      border-radius: var(--border-radius);
      background-color: var(--text-color);

      padding: 1rem;
      margin-top: 0.5rem;
      margin-bottom: 2rem;
    }

    .button-container {
      width: fit-content;
      z-index: 1000;

      margin: 0 auto;
    }

    .task-btn {
      z-index: 1000;

      font-size: 1rem;
      font-family: "Nunito", sans-serif;
      font-weight: bold;
      color: var(--body-color);

      background-color: var(--mainorange-color);
      border: none;
      border-radius: var(--border-radius);
      cursor: pointer;

      padding: 1rem 1.5rem 1rem 1.5rem;
      margin: 0.3rem;
    }

    .cancel {
      z-index: 1000;
      opacity: 0.75;
    }
  }

  .subtask {
    color: var(--body-color);
    font-family: "Nunito", sans-serif;
    font-size: 0.8rem;
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
    height: 2.7rem;

    font-family: "Nunito", sans-serif;
    font-weight: bold;
    color: var(--body-color);
    cursor: pointer;

    background: var(--mainorange-color);
    border-radius: var(--border-radius);
    border: none;

    margin-top: 0.5rem;
    margin-bottom: 2rem;
    margin-left: 0.5rem;
    padding: 0 1rem 0 1rem;
  }

  .icons-subtask {
    display: flex;
    justify-content: center;
    align-items: center;

    gap: 0.5rem;
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

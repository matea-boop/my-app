import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { v4 as uuid } from "uuid";
import { toast } from "react-hot-toast";
import { IconContext } from "react-icons";
import axios from "axios";

const weekDays = [
  { day: "MON", clicked: false },
  { day: "TUE", clicked: false },
  { day: "WED", clicked: false },
  { day: "THU", clicked: false },
  { day: "FRI", clicked: false },
  { day: "SAT", clicked: false },
  { day: "SUN", clicked: false },
];

function HabitForm({
  type,
  task,
  habitModalOpen,
  habitModalClose,
  isHabitModalOpen,
}) {
  const [title, setTitle] = useState("");
  const [target, setTarget] = useState("");
  const [date, setDate] = useState(new Date().toLocaleDateString());
  const url = "http://localhost:3001/api/habits";
  const formRef = useRef();

  useEffect(() => {
    const handler = (event) => {
      if (formRef.current === null) {
        return;
      }
      if (formRef.current.contains(event.target)) {
        return;
      }
      habitModalClose();
    };
    document.body.addEventListener("mousedown", handler, true);
    return () => {
      document.body.removeEventListener("mousedown", handler, true);
    };
  }, []);

  // useEffect(() => {
  //   if (type === "edit" && task) {
  //     setTitle(task.title);
  //     setSubtasks(task.subtasks);
  //     setDate(task.date);
  //   } else {
  //     setTitle("");
  //     setSubtasks([]);
  //   }
  // }, [type, modalOpen]);

  const putDataToDB = async () => {
    const newData = {
      id: uuid(),
      title: title,
      target: target,
      checkboxes: weekDays,
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
      toast.error("Habit title cannot be empty!");
      return;
    }
    if (target === "") {
      toast.error("Habit title cannot be empty!");
      return;
    }

    if (title && type === "add") {
      putDataToDB();
      toast.success("Habit added successfully!");
      habitModalClose();
    }
    // if (type === "edit") {
    //   if (task.title !== title) {
    //     await axios.patch(`http://localhost:3001/api/tasks/${task._id}`, {
    //       title: title,
    //     });
    //     habitModalClose()
    //     toast.success("Task Edited Successfully!");
    //   } else if (habit.date !== date && valid) {
    //     await axios.patch(`http://localhost:3001/api/tasks/${task._id}`, {
    //       date: date,
    //     });
    //     modalClose();
    //     toast.success("Task edited successfully!");
    //   } else {
    //     toast.error("No changes made...");
    //   }
    // }

    habitModalClose();
  };

  return (
    <IconContext.Provider
      value={{
        color: "var(--box-color)",
        size: "1rem",
      }}
    >
      <div style={{ borderRadius: "var(--border-radius)" }}>
        {isHabitModalOpen ? (
          <Wrapper>
            <div ref={formRef} className="form-container">
              <form
                className="habit-form"
                onSubmit={(e) => {
                  handleSubmit(e);
                }}
              >
                <h1 className="header">
                  {type === "edit" ? "Edit habit" : "Add habit"}
                </h1>
                <label htmlFor="title">Title</label>

                <input
                  type="text"
                  maxLength="13"
                  placeholder="Habit title"
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

                <label htmlFor="time">Target</label>

                <input
                  type="text"
                  placeholder="1-7"
                  name="target"
                  className="target"
                  value={target}
                  onChange={(e) => setTarget(e.target.value)}
                />

                <div className="button-container">
                  <button type="submit" className="habit-btn">
                    {type === "edit" ? "Edit habit" : "Add habit"}
                  </button>
                  <button
                    type="button"
                    className="habit-btn cancel"
                    onClick={() => {
                      habitModalClose();
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

  .habit-form {
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

    .habit-btn {
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
`;

export default HabitForm;

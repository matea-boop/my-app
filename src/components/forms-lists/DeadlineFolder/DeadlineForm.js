import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { IconContext } from "react-icons";
import { toast } from "react-hot-toast";
import axios from "axios";
import { v4 as uuid } from "uuid";
import moment from "moment/moment";
import { useAllContext } from "../../../context/indexContext";

function DeadlineForm({
  type,
  deadline,
  isDeadlineModalOpen,
  deadlineModalOpen,
  deadlineModalClose,
}) {
  const { deadlineChanged, deadlineNotChanged } = useAllContext();
  const [title, setTitle] = useState("");
  const [valid, setValid] = useState(true);
  const [timeValid, setTimeValid] = useState(true);
  const [date, setDate] = useState(new Date().toLocaleDateString());
  const [time, setTime] = useState("");
  const [status, setStatus] = useState(false);
  const [description, setDescription] = useState("");

  const url = "http://localhost:3001/api/deadlines";
  const formRef = useRef();

  useEffect(() => {
    if (type === "edit" && deadline) {
      setTitle(deadline.title);
      setDate(deadline.deadlineDate);
      setTime(deadline.deadlineTime);
      setDescription(deadline.description);
    } else {
      setTitle("");
      setDate("");
      setTime("");
      setDescription("");
    }
  }, [type, isDeadlineModalOpen]);

  const putDataToDB = async () => {
    const newData = {
      id: uuid(),
      title: title,
      deadlineTime: time,
      deadlineDate: date,
      status: status,
      description: description,
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

  useEffect(() => {
    const handler = (event) => {
      if (formRef.current === null) {
        return;
      }
      if (formRef.current.contains(event.target)) {
        return;
      }
      deadlineModalClose();
    };
    document.body.addEventListener("mousedown", handler, true);
    return () => {
      document.body.removeEventListener("mousedown", handler, true);
    };
  }, []);

  useEffect(() => {
    const ddmmyyyy = /^(0[1-9]|[12][0-9]|3[01])[- /.](0[1-9]|1[012])[- /.](19|20)\d\d$/;
    let todaysDate = moment(new Date()).format("DD/MM/YYYY");

    if (ddmmyyyy.test(date) && date >= todaysDate) {
      setValid(true);
    } else {
      setValid(false);
    }
  }, [date]);

  useEffect(() => {
    const hhmm = /^([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/;

    if (hhmm.test(time) || time === "") {
      setTimeValid(true);
    } else {
      setTimeValid(false);
    }
  }, [time]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let todaysDate = new Date().toLocaleDateString();
    let todaysTime = moment().format("HH:mm");
    if (title === "") {
      toast.error("Deadline title cannot be empty!");
      return;
    }
    if (!valid) {
      toast.error("Invalid deadline date input!");
      return;
    }
    if (!timeValid) {
      toast.error("Invalid deadline time input!");
      return;
    }
    if (date === todaysDate && time <= todaysTime) {
      toast.error("Invalid deadline date and time input!");
    }
    if (title && valid && type === "add") {
      putDataToDB();
      toast.success("Deadline added successfully!");
      deadlineModalClose();
    }

    if (type === "edit") {
      deadlineChanged();
      if (deadline.title !== title) {
        await axios.patch(
          `http://localhost:3001/api/deadlines/${deadline._id}`,
          {
            title: title,
          }
        );
        deadlineModalClose();
        toast.success("Deadline Edited Successfully!");
      } else if (deadline.description !== description) {
        await axios.patch(
          `http://localhost:3001/api/deadlines/${deadline._id}`,
          {
            description: description,
          }
        );
        deadlineModalClose();
        toast.success("Deadline Edited Successfully!");
      } else if (deadline.deadlineDate !== date && valid) {
        await axios.patch(
          `http://localhost:3001/api/deadlines/${deadline._id}`,
          {
            deadlineDate: date,
          }
        );
        deadlineModalClose();
        toast.success("Deadline Edited Successfully!");
      } else if (deadline.deadlineTime !== date && timeValid) {
        await axios.patch(
          `http://localhost:3001/api/deadlines/${deadline._id}`,
          {
            deadlineTime: time,
          }
        );
        deadlineModalClose();
        toast.success("Deadline Edited Successfully!");
      } else {
        toast.error("No changes made...");
      }
      deadlineNotChanged();
    }
  };

  return (
    <IconContext.Provider
      value={{
        color: "var(--box-color)",
        size: "1rem",
      }}
    >
      <div style={{ borderRadius: "var(--border-radius)" }}>
        {isDeadlineModalOpen ? (
          <Wrapper>
            <div ref={formRef} className="form-container">
              <form
                className="deadline-form"
                onSubmit={(e) => {
                  handleSubmit(e);
                }}
              >
                <h1 className="header">
                  {type === "edit" ? "Edit deadline" : "Add deadline"}
                </h1>
                <label htmlFor="title">Title</label>

                <input
                  type="text"
                  maxLength="13"
                  placeholder="Deadline title"
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

                <label htmlFor="time">Date and Time</label>

                <input
                  id={valid ? "valid" : "notValid"}
                  type="text"
                  placeholder="dd/mm/yyyy"
                  name="date"
                  className="deadline-input-date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                />

                <input
                  id={timeValid ? "valid" : "notValid"}
                  type="text"
                  placeholder="--:--"
                  name="time-start"
                  className="time-start"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                />

                <label htmlFor="description">Description</label>

                <input
                  type="text"
                  placeholder="None"
                  name="description"
                  className="description"
                  value={description}
                  onChange={(e) =>
                    setDescription(
                      e.target.value.charAt(0).toUpperCase() +
                        e.target.value.slice(1)
                    )
                  }
                />

                <div className="button-container">
                  <button type="submit" className="task-btn">
                    {type === "edit" ? "Edit deadline" : "Add deadline"}
                  </button>
                  <button
                    type="button"
                    className="task-btn cancel"
                    onClick={() => {
                      deadlineModalClose();
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

    height: fit-content;
    width: 40%;
    max-width: 500px;
    min-width: 300px;

    background-color: var(--inputback-color);
    border-radius: inherit;

    margin: 0 auto;
    padding: 2rem;
  }
  .deadline-form {
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
      background-color: var(--inputbox-color);
      color: var(--inputtext-color);

      margin-top: 0.5rem;
      margin-bottom: 1.8rem;
      padding: 1rem;
    }

    .deadline-input-date {
      margin-bottom: 0;
    }

    .button-container {
      width: fit-content;
      z-index: 1000;

      margin: 0 auto;
    }

    .task-btn {
      font-size: 1rem;
      font-family: "Nunito", sans-serif;
      font-weight: bold;
      color: var(--body-color);
      z-index: 1000;

      color: var(--text-color);

      box-shadow: 0px 0px 7px -4px rgba(0, 0, 0, 1);
      background-color: var(--small-btn-color);
      border: none;
      border-radius: var(--border-radius);
      cursor: pointer;

      margin: 0.3rem;
      padding: 1rem 1.5rem 1rem 1.5rem;
    }

    .task-btn:active {
      transform: scale(0.9);
      box-shadow: 0px 0px 2px -4px rgba(0, 0, 0, 1);
    }

    .cancel {
      z-index: 1000;
      opacity: 0.75;
    }
  }

  input[id="notValid"] {
    outline: 2px solid red;
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

export default DeadlineForm;

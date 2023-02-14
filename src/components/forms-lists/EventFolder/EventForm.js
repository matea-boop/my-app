import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { IconContext } from "react-icons";
import { toast } from "react-hot-toast";
import axios from "axios";
import { v4 as uuid } from "uuid";
import moment from "moment/moment";

function EventForm({
  type,
  isEventModalOpen,
  eventModalOpen,
  eventModalClose,
}) {
  const [typeChosen, setTypeChosen] = useState("");
  const [title, setTitle] = useState("");
  const [valid, setValid] = useState(true);
  const [startTimeValid, setStartTimeValid] = useState(true);
  const [endTimeValid, setEndTimeValid] = useState(true);
  const [date, setDate] = useState(new Date().toLocaleDateString());
  const [startTime, setStartTime] = useState("");
  const [status, setStatus] = useState(false);
  const [endTime, setEndTime] = useState("");
  const [description, setDescription] = useState("");
  const todaysDate = new Date().toLocaleDateString();
  const url = "http://localhost:3001/api/events";
  const formRef = useRef();

  const putDataToDB = async () => {
    const newData = {
      id: uuid(),
      title: title,
      actType: typeChosen,
      date: date,
      startTime: startTime,
      endTime: endTime,
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
      eventModalClose();
    };
    document.body.addEventListener("mousedown", handler, true);
    return () => {
      document.body.removeEventListener("mousedown", handler, true);
    };
  }, []);

  useEffect(() => {
    const ddmmyyyy = /^(0[1-9]|[12][0-9]|3[01])[- /.](0[1-9]|1[012])[- /.](19|20)\d\d$/;
    let todaysDate = new Date().toLocaleDateString();

    if (ddmmyyyy.test(date) && date >= todaysDate) {
      setValid(true);
    } else {
      setValid(false);
    }
  }, [date]);

  useEffect(() => {
    const hhmm = /^([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/;

    let todaysDate = new Date().toLocaleDateString();
    let todaysTime = moment().format("HH:mm");

    if (hhmm.test(startTime) || startTime === "") {
      setStartTimeValid(true);
    } else {
      setStartTimeValid(false);
    }
    // if (todaysDate === date && startTime <= todaysTime) {
    //   setStartTimeValid(false);
    // } u submit handle

    if (hhmm.test(endTime) || endTime === "") {
      setEndTimeValid(true);
    } else {
      setEndTimeValid(false);
    }
    // if (todaysDate === date && endTime < startTime) {
    //   setEndTimeValid(false);
    // } ovo stavi u submit handle
  }, [startTime, endTime, date]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (title === "") {
      toast.error("TaskTitle cannot be empty!");
      return;
    }
    if (!valid) {
      toast.error("Invalid date input!");
      return;
    }
    if (typeChosen === "") {
      toast.error("Choose event type!");
      return;
    }
    if (title && valid && typeChosen !== "" && type === "add") {
      putDataToDB();
      toast.success("Task Added Successfully!");
      eventModalClose();
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
        {isEventModalOpen ? (
          <Wrapper>
            <div ref={formRef} className="form-container">
              <form
                className="task-form"
                onSubmit={(e) => {
                  handleSubmit(e);
                }}
              >
                <h1 className="header">
                  {type === "edit" ? "Edit event" : "Add event"}
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

                <label htmlFor="EventType">Event type</label>

                <div className="btn-eventtype-container">
                  <button
                    style={
                      typeChosen === "personal"
                        ? { opacity: "1" }
                        : { opacity: "0.5" }
                    }
                    type="button"
                    className="personal"
                    onClick={() => {
                      setTypeChosen("personal");
                    }}
                  >
                    Personal
                  </button>
                  <button
                    style={
                      typeChosen === "work/study"
                        ? { opacity: "1" }
                        : { opacity: "0.5" }
                    }
                    type="button"
                    className="work"
                    onClick={() => {
                      setTypeChosen("work/study");
                    }}
                  >
                    Work/Study
                  </button>
                  <button
                    style={
                      typeChosen === "meeting"
                        ? { opacity: "1" }
                        : { opacity: "0.5" }
                    }
                    type="button"
                    className="meeting"
                    onClick={() => {
                      setTypeChosen("meeting");
                    }}
                  >
                    Meeting
                  </button>
                  <button
                    style={
                      typeChosen === "appointment"
                        ? { opacity: "1" }
                        : { opacity: "0.5" }
                    }
                    type="button"
                    className="appointment"
                    onClick={() => {
                      setTypeChosen("appointment");
                    }}
                  >
                    Appointment
                  </button>
                </div>

                <label htmlFor="time">Date and Time</label>

                <input
                  id={valid ? "valid" : "notValid"}
                  type="text"
                  placeholder="dd/mm/yyyy"
                  name="date"
                  className="task-input-date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                />
                <div className="time-start-end">
                  <input
                    id={startTimeValid ? "valid" : "notValid"}
                    type="text"
                    placeholder="--:--"
                    name="time-start"
                    className="time-start"
                    value={startTime}
                    onChange={(e) => setStartTime(e.target.value)}
                  />
                  <input
                    id={endTimeValid ? "valid" : "notValid"}
                    type="text"
                    placeholder="--:--"
                    name="time-end"
                    className="time-end"
                    value={endTime}
                    onChange={(e) => setEndTime(e.target.value)}
                  />
                </div>

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
                    {type === "edit" ? "Edit event" : "Add event"}
                  </button>
                  <button
                    type="button"
                    className="task-btn cancel"
                    onClick={() => {
                      eventModalClose();
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
  top: 0;
  left: 0;
  z-index: 10;
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
    background-color: var(--sidebar-color);
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
      height: 2.7rem;
      font-size: 0.8rem;
      margin-top: 0.5rem;
      margin-bottom: 1.8rem;
      width: 100%;
      padding: 1rem;
      border: none;
      outline: none;
      border-radius: var(--border-radius);
      background-color: var(--text-color);
    }
    .task-input-date {
      margin-bottom: 0;
    }
    .time-start-end {
      display: flex;
      flex-direction: row;
      align-items: center;
      gap: 0.5rem;
      justify-content: space-between;
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
      background-color: var(--mainorange-color);
      color: var(--body-color);
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
  .btn-eventtype-container {
    margin-top: 0.5rem;
    margin-bottom: 2rem;

    display: flex;
    flex-wrap: wrap;

    .personal {
      flex: 1;
      border: none;
      font-family: "Nunito", sans-serif;
      border-radius: var(--border-radius);
      cursor: pointer;
      color: var(--text-color);
      padding: 0.3rem 1rem 0.3rem 1rem;
      margin: 0.5rem 0.5rem 0.5rem 0rem;
      background-color: var(--mainorange-color);
    }

    .work {
      flex: 1;
      border: none;
      font-family: "Nunito", sans-serif;
      border-radius: var(--border-radius);
      cursor: pointer;
      color: var(--text-color);
      padding: 0.3rem 1rem 0.3rem 1rem;
      margin: 0.5rem 0.5rem 0.5rem 0rem;
      background-color: var(--mainred-color);
    }

    .meeting {
      flex: 1;
      border: none;
      font-family: "Nunito", sans-serif;
      border-radius: var(--border-radius);
      cursor: pointer;
      color: var(--text-color);
      padding: 0.3rem 1rem 0.3rem 1rem;
      margin: 0.5rem 0rem 0.5rem 0rem;
      background-color: var(--maingreen-color);
    }
    .appointment {
      border: none;
      font-family: "Nunito", sans-serif;
      border-radius: var(--border-radius);
      cursor: pointer;
      color: var(--text-color);
      padding: 0.3rem 1rem 0.3rem 1rem;
      background-color: var(--mainblue-color);
    }
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
//   return (
//     <Wrapper>
//       {/* <form className="task-form">
//         <input
//           type="text"
//           placeholder="Add Task"
//           value={input}
//           name="text"
//           className="task-input"
//         />
//         <button className="task-btn">Add Task</button>
//       </form> */}
//       <h1>EVENT</h1>
//     </Wrapper>
//   );
// }

// const Wrapper = styled.div`
//   background-color: var(--mainorange-color);
//   position: fixed;
//   z-index: 100;
//   top: calc(50% - 100px);
//   left: calc(50% - (var(--right-btn-move) / 2));
//   width: 200px;
//   height: 200px;
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   border-radius: inherit;
//   .task-form {
//     position: relative;
//   }
// `;
export default EventForm;

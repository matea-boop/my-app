import moment from "moment/moment";
import React from "react";
import { useState, useEffect } from "react";
import { HiEllipsisVertical } from "react-icons/hi2";
import styled from "styled-components";
import { useAllContext } from "../../../context/indexContext";
import axios from "axios";
import EventForm from "./EventForm";
import { useRef } from "react";

const activityType = [
  { id: 0, color: "var(--mainorange-color)", actName: "personal" },
  { id: 1, color: "var(--mainred-color)", actName: "work/study" },
  { id: 2, color: "var(--maingreen-color)", actName: "meeting" },
  { id: 2, color: "var(--mainblue-color)", actName: "appointment" },
];

export const EventItem = ({
  title,
  date,
  event,
  startTime,
  endTime,
  actType,
  description,
  timeLine,
}) => {
  const {
    eventModalClose,
    isEventDeleted,
    eventDeleted,
    eventNotDeleted,
    isEventChanged,
    eventChanged,
    eventNotChanged,
  } = useAllContext();
  const [openMenu, setOpenMenu] = useState(false);
  const [editEventModalOpen, setEditEventModalOpen] = useState(false);
  const [color, setColor] = useState("");
  const [hover, setHover] = useState(false);
  const [pixel, setPixel] = useState(0);
  const timeDifference = moment
    .utc(moment(endTime, "HH:mm").diff(moment(startTime, "HH:mm")))
    .format("HH:mm");
  const timeInPixels = moment.duration(timeDifference).asMinutes();

  const choiceRef = useRef();

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
  }, []);

  useEffect(() => {
    activityType.map((type) =>
      type.actName === actType ? setColor(type.color) : null
    );
    if (timeLine && timeLine.length > 0) {
      timeLine.map((time, index) => {
        if (time === startTime) {
          setPixel(index);
        }
      });
    }
  }, [timeInPixels]);

  const deleteFromDB = async (idToDelete) => {
    eventDeleted();
    try {
      eventNotDeleted();
      await axios.delete(`http://localhost:3001/api/events/${idToDelete}`);
      console.log("deletd");
    } catch (error) {
      console.log(error);
    }
    setOpenMenu(false);
  };

  return (
    <Wrapper
      onMouseOver={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={
        hover && description !== "" && timeInPixels < 80
          ? {
              minHeight: "40px",
              height: `${timeInPixels + 30}px`,
              marginTop: `${pixel}px`,
              transition: "all 0.2s",
            }
          : {
              minHeight: "40px",
              height: `${timeInPixels}px`,
              marginTop: `${pixel}px`,
            }
      }
    >
      <div className="type-line" style={{ border: `2px solid ${color}` }}></div>
      <div className="event-content">
        <div
          className="shorter"
          style={
            timeInPixels < 40
              ? { flexDirection: "row" }
              : { flexDirection: "column" }
          }
        >
          <div className="event-time">
            {startTime} - {endTime}
          </div>
          <div className="event-title">{title}</div>
        </div>
        <div className={description !== "" ? "event-desc" : ""}>
          {description}
        </div>
      </div>
      <div className="icon-box" ref={choiceRef}>
        <div className="icon">
          {" "}
          <HiEllipsisVertical
            onClick={() => {
              setOpenMenu(!openMenu);
            }}
          />
        </div>
        <div
          className="icon-choice-container"
          {...(openMenu ? { open: openMenu } : null)}
        >
          <div
            className="choice"
            role="button"
            onClick={() => {
              deleteFromDB(event._id);
              setOpenMenu(false);
            }}
          >
            Delete event
          </div>
          <div
            className="choice"
            onClick={() => {
              setOpenMenu(false);
              setEditEventModalOpen(true);
            }}
            role="button"
          >
            Edit event
          </div>
        </div>
      </div>

      {editEventModalOpen ? (
        <EventForm
          type="edit"
          event={event}
          isEventModalOpen={editEventModalOpen}
          eventModalClose={setEditEventModalOpen}
        />
      ) : null}
    </Wrapper>
  );
};

export default EventItem;

const Wrapper = styled.div`
  position: absolute;
  display: flex;
  flex-direction: row;
  align-items: center;

  width: 100%;

  background: var(--body-color);
  border-radius: var(--border-radius);
  box-shadow: 0px 0px 7px -4px rgba(0, 0, 0, 1);

  .event-desc {
    display: none;
  }

  &:hover {
    z-index: 100;
    cursor: pointer;

    .event-desc {
      display: flex;
    }
  }

  .shorter {
    display: flex;
    flex-direction: column;
    align-items: left;
    justify-content: center;
  }

  .type-line {
    position: relative;
    border-radius: 10px;

    height: 80%;

    margin: 0.5rem 0.8rem 0.5rem 0.5rem;
  }

  .event-content {
    display: flex;
    flex-direction: column;
    align-items: left;
    justify-content: center;

    margin: 0.8rem 0.8rem 0.8rem 0;
  }

  .event-time {
    font-size: var(--text-size);
    font-weight: lighter;
    opacity: 0.5;
  }

  .event-title {
    font-size: var(--text-size);

    padding-left: 0.6rem;
  }

  .event-desc {
    font-size: var(--text-size);
    font-weight: lighter;

    padding-left: 0.5rem;
  }

  .icon-box {
    z-index: 8;
    position: absolute;
    display: flex;

    align-items: center;
    justify-content: center;

    height: 1rem;
    font-size: 1rem;

    right: 1rem;

    opacity: 1;

    margin-left: 0.5rem;
    cursor: pointer;
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

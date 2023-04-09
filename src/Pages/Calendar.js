import React, { useState } from "react";
import styled from "styled-components";
import MonthCalendar from "../components/calendar/monthCalendar";
import TodayDay from "../components/calendar/todayDay";
import WeekCalendar from "../components/calendar/weekCalendar";
import moment from "moment/moment";
import { useAllContext } from "../context/indexContext";
import { useEffect } from "react";
import getTaskDataFromDB from "../constants/dataFunctions/taskData";
import getEventDataFromDB from "../constants/dataFunctions/eventData";

export const Calendar = () => {
  const {
    isModalOpen,
    isDeleted,
    isTaskChecked,
    isEventModalOpen,
  } = useAllContext();
  const [type, setType] = useState("month");
  const [date, setDate] = useState(moment().format("DD/MM/YYYY"));
  const [eventList, setEventList] = useState([]);
  const [taskList, setTaskList] = useState([]);

  useEffect(() => {
    getTaskDataFromDB().then((res) => setTaskList(res));

    getEventDataFromDB().then((res) => {
      setEventList(res);
    });
  }, [isModalOpen, isDeleted, isTaskChecked, isEventModalOpen]);

  const selectedEventList =
    eventList && eventList.length > 0
      ? eventList
          .filter((event) => event.date === date)
          .sort((a, b) => {
            return (
              new Date(...a.startTime.split(":").reverse()) -
              new Date(...b.startTime.split(":").reverse())
            );
          })
      : null;

  const mainList =
    taskList && taskList.length > 0
      ? taskList.filter((task) => task.date === date)
      : [];

  const incompletedTasksList =
    mainList && mainList.length > 0
      ? mainList.filter((task) => task.status === false)
      : [];

  const getType = (value) => {
    setType(value);
  };
  const getDate = (value) => {
    setDate(value);
  };

  return (
    <Wrapper>
      <div
        style={
          type === "month"
            ? { display: "flex", height: "100%", width: "100%" }
            : { display: "none" }
        }
      >
        <MonthCalendar
          getType={getType}
          type={type}
          getDate={getDate}
          date={date}
          incompletedTasks={incompletedTasksList}
          selectedEventList={selectedEventList}
        />
      </div>
      <div
        style={
          type === "week"
            ? { display: "flex", height: "100%", width: "100%" }
            : { display: "none" }
        }
      >
        <WeekCalendar getType={getType} type={type} eventList={eventList} />
      </div>
    </Wrapper>
  );
};
export default Calendar;

const Wrapper = styled.div`
  height: auto;
  display: flex;
  flex-direction: row;

  border-radius: var(--border-radius);
  background-color: var(--sidebar-color);
  color: var(--text-color);

  margin: var(--margin-size);
`;

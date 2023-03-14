import React, { useEffect } from "react";
import styled from "styled-components";
import { TfiAngleLeft } from "react-icons/tfi";
import { TfiAngleRight } from "react-icons/tfi";
import { MdCalendarViewWeek } from "react-icons/md";
import { MdCalendarViewMonth } from "react-icons/md";
import { useState } from "react";
import axios from "axios";
import moment from "moment/moment";
import { useAllContext } from "../../context/indexContext";

const daysOfWeek = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const monthsOfYear = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

function getNumberOfDaysInMonth(year, month) {
  return new Date(year, month + 1, 0).getDate();
}

function getSortedDays(year, month) {
  const numberOfDaysInMonth = getNumberOfDaysInMonth(year, month);
  const firstHalf = daysOfWeek.slice(numberOfDaysInMonth);
  return [...firstHalf, ...daysOfWeek.slice(0, numberOfDaysInMonth)];
}

function range(start, end) {
  const length = Math.abs((end - start) / 1);

  const { result } = Array.from({ length }).reduce(
    ({ result, current }) => ({
      result: [...result, current],
      current: current + 1,
    }),
    { result: [], current: start }
  );
  return result;
}

async function getEventDataFromDB() {
  const url = "http://localhost:3001/api/events";
  try {
    const {
      data: { events },
    } = await axios.get(url);

    return events;
  } catch (error) {
    console.log("error", error);
    return error;
  }
}

export const MonthCalendar = ({ getType, type }) => {
  const { isEventModalOpen } = useAllContext();
  const [eventList, setEventList] = useState([]);
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [currentDay, setCurrentDay] = useState(new Date().getDate());
  const currDate = new Date(currentYear, currentMonth, currentDay);
  const [selectedDate, setSelectedDate] = useState(
    new Date(currDate).getTime()
  );
  const [dateClicked, setDateClicked] = useState(
    moment(currDate).format("DD/MM/YYYY")
  );

  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
  const lastDateOfMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const lastDayOfMonth = new Date(
    currentYear,
    currentMonth,
    lastDateOfMonth
  ).getDay();

  const lastDateOfLastMonth = new Date(currentYear, currentMonth, 0).getDate();

  const prevMonthDates = [];
  const nextMonthDates = [];
  const strecthArray = [];

  for (let i = firstDayOfMonth; i > 0; i--) {
    prevMonthDates.push(lastDateOfLastMonth - i + 1);
  }
  for (let i = lastDayOfMonth; i < 6; i++) {
    nextMonthDates.push(i - lastDayOfMonth + 1);
  }
  for (let i = lastDayOfMonth; i < 13; i++) {
    strecthArray.push(i - lastDayOfMonth + 1);
  }
  const lengthSum =
    prevMonthDates.length + getNumberOfDaysInMonth(currentYear, currentMonth);

  const nextMonth = () => {
    if (currentMonth < 11) {
      setCurrentMonth((prev) => prev + 1);
    } else {
      setCurrentMonth(0);
      setCurrentYear((prev) => prev + 1);
    }
  };

  const prevMonth = () => {
    if (currentMonth > 0) {
      setCurrentMonth((prev) => prev - 1);
    } else {
      setCurrentMonth(11);
      setCurrentYear((prev) => prev - 1);
    }
  };

  useEffect(() => {
    getEventDataFromDB().then((res) => setEventList(res));
  }, [dateClicked, isEventModalOpen]);

  const handleSelect = (e) => {
    if (e.target.id === "day") {
      setSelectedDate(
        new Date(currentYear, currentMonth, e.target.getAttribute("data-day"))
      );
    }
  };

  return (
    <Wrapper>
      <div className="top-container">
        <div className="header-date-arrows">
          <TfiAngleLeft className="arrow" onClick={prevMonth} />
          <div className="title">
            {monthsOfYear[currentMonth]} {currentYear}
          </div>
          <TfiAngleRight className="arrow" onClick={nextMonth} />
        </div>
        <div className="week-month-view">
          <MdCalendarViewWeek
            style={
              type === "week"
                ? { color: "var(--mainblue-color)", cursor: "pointer" }
                : { color: "var(--text-color)", cursor: "pointer" }
            }
            onClick={() => getType("week")}
          />
          <MdCalendarViewMonth
            style={
              type === "month"
                ? { color: "var(--mainblue-color)", cursor: "pointer" }
                : { color: "var(--text-color)", cursor: "pointer" }
            }
            onClick={() => getType("month")}
          />
        </div>
      </div>
      <div className="top-line"></div>
      <div className="main-container">
        <div className="days">
          {getSortedDays().map((day, i) => (
            <p
              className="day"
              id={i === new Date().getDay() ? "week-today-day" : ""}
            >
              {day}
            </p>
          ))}
        </div>

        <div
          className="days-month"
          onClick={(e) => {
            handleSelect(e);
          }}
        >
          {prevMonthDates.map((day) => (
            <div className="day-dot" id="inactive-line" onClick={prevMonth}>
              <div className="day-line"></div>
              <div className="day-month inactive">{day}</div>
              {/* <div className="dots"></div> */}
            </div>
          ))}
          {range(1, getNumberOfDaysInMonth(currentYear, currentMonth) + 1).map(
            (day) => (
              <div
                id="day"
                data-day={day}
                x={
                  currentMonth === new Date().getMonth() &&
                  currentYear === new Date().getFullYear() &&
                  day === new Date().getDate() &&
                  dateClicked !==
                    moment(new Date(currentYear, currentMonth, day)).format(
                      "DD/MM/YYYY"
                    )
                    ? "today-day"
                    : ""
                }
                className={
                  selectedDate !== null
                    ? currentMonth === new Date().getMonth() &&
                      currentYear === new Date().getFullYear() &&
                      day === new Date().getDate()
                      ? "day-dot active-day"
                      : new Date(selectedDate).getTime() ===
                        new Date(
                          new Date(currentYear, currentMonth, day)
                        ).getTime()
                      ? "day-dot active"
                      : "day-dot"
                    : null
                }
                onClick={() => {
                  const date = new Date(currentYear, currentMonth, day);
                  setDateClicked(moment(date).format("DD/MM/YYYY"));
                }}
              >
                <div
                  style={
                    currentMonth === new Date().getMonth() &&
                    currentYear === new Date().getFullYear() &&
                    day === new Date().getDate()
                      ? { borderTop: "1px solid var(--mainorange-color)" }
                      : new Date(selectedDate).getTime() ===
                        new Date(
                          new Date(currentYear, currentMonth, day)
                        ).getTime()
                      ? { borderTop: "1px solid var(--mainblue-color)" }
                      : { borderTop: "1px solid var(--text-color)" }
                  }
                  className={
                    selectedDate !== null
                      ? new Date(selectedDate).getTime() ===
                        new Date(
                          new Date(currentYear, currentMonth, day)
                        ).getTime()
                        ? "day-line active-line"
                        : "day-line "
                      : null
                  }
                ></div>
                <div className="day-month">{day}</div>
                <div className="event-list">
                  {eventList && eventList.length > 0
                    ? eventList
                        .filter(
                          (event) =>
                            event.date ===
                            moment(
                              new Date(currentYear, currentMonth, day)
                            ).format("DD/MM/YYYY")
                        )
                        .slice(0, 3)
                        .map((event) => {
                          const todaysEventList = eventList.filter(
                            (event) =>
                              event.date ===
                              moment(
                                new Date(currentYear, currentMonth, day)
                              ).format("DD/MM/YYYY")
                          );

                          return (
                            <div className="event-title">{event.title}</div>
                          );
                        })
                    : null}
                </div>
                <div>
                  {eventList && eventList.length > 0
                    ? eventList
                        .filter(
                          (event) =>
                            event.date ===
                            moment(
                              new Date(currentYear, currentMonth, day)
                            ).format("DD/MM/YYYY")
                        )
                        .slice(0, 1)
                        .map(() => {
                          const todaysEventList = eventList.filter(
                            (event) =>
                              event.date ===
                              moment(
                                new Date(currentYear, currentMonth, day)
                              ).format("DD/MM/YYYY")
                          );

                          return (
                            <div
                              style={
                                todaysEventList.length > 3
                                  ? { display: "flex" }
                                  : { display: "none" }
                              }
                              className="event-number"
                            >
                              +{todaysEventList.length - 3}
                            </div>
                          );
                        })
                    : null}
                </div>
              </div>
            )
          )}

          {lengthSum > 35
            ? nextMonthDates.map((day) => (
                <div className="day-dot" id="inactive-line" onClick={nextMonth}>
                  <div className="day-line"></div>
                  <div className="day-month inactive">{day}</div>
                  {/* <div className="dots"></div> */}
                </div>
              ))
            : strecthArray.map((day) => (
                <div className="day-dot" id="inactive-line" onClick={nextMonth}>
                  <div className="day-line"></div>
                  <div className="day-month inactive">{day}</div>
                  <div className="dots"></div>
                </div>
              ))}
        </div>
      </div>
    </Wrapper>
  );
};
export default MonthCalendar;

const Wrapper = styled.div`
  position: relative;
  height: 100%;
  width: 100%;

  border-radius: 0.3rem;
  background-color: var(--sidebar-color);

  #inactive-line {
    opacity: 0.3;
  }

  // [x="today-day"] {
  //   position: absolute;
  //   // z-index: -1;

  //   // height: 100%;
  //   // width: 100%;

  //   // content: "";

  //   border-top: 1px solid var(--mainblue-color);
  // }

  .event-list {
    position: absolute;
    display: flex;
    flex-direction: column;

    justify-content: center;

    left: 5%;
    top: 30%;
  }

  .event-number {
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;

    font-size: 0.6rem;
    color: var(--text-color);
    font-weight: lighter;

    right: 10%;
    bottom: 10%;

    height: 1.2rem;
    width: 1.2rem;

    border-radius: 50%;
    background-color: rgba(232, 244, 250, 0);
  }

  .event-title {
    font-size: var(--text-size);
    color: var(--text-color);
    font-weight: lighter;
  }

  #week-today-day {
    color: var(--mainblue-color);
    font-weight: bold;
    opacity: 1;
  }

  .top-container {
    position: aboslute;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;

    width: 100%;
    height: 15%;

    padding-left: 2rem;
    padding-right: 2rem;
  }

  .header-date-arrows {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;

    width: 40%;
  }

  .arrow {
    cursor: pointer;
  }

  .top-line {
    border: 1px solid var(--text-color);
    width: 100%;
    opacity: 0.5;
    position: absolute;
  }

  .week-month-view {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    color: var(--text-color);

    width: 8%;
    font-size: 2rem;

    margin-bottom: 1rem;
    margin-top: 0.5rem;
    margin-right: 1rem;
  }

  .main-container {
    position: aboslute;
    display: flex;
    flex-direction: column;
    align-items: space-between;

    width: 90%;
    height: 80%;
    left: 5%;
    top: 18%;

    background-color: var(--sidebar-color);

    margin-bottom: 1rem;
  }

  .days {
    display: grid;
    grid-template-columns: repeat(7, 1fr);

    height: 5%;

    // background: red;
  }

  .day {
    display: flex;
    justify-content: column;
    align-items: center;
    justify-content: center;

    opacity: 1;

    font-size: 0.8rem;
    text-transform: uppercase;
  }
  .days-month {
    position: relative;
    display: grid;
    grid-template-columns: repeat(7, 1fr);

    height: 95%;

    // background: blue;

    margin-top: 1rem;
  }

  .day-month {
    position: absolute;
    z-index: 1;

    font-weight: lighter;
    font-size: var(--text-size);

    right: 3%;
    top: 5%;
    // background: purple;

    opacity: 0.7;
    cursor: pointer;
  }

  .active::before {
    position: relative;

    height: 100%;
    width: 100%;

    background: linear-gradient(
      rgba(64, 94, 255, 0.4) 10%,
      rgba(255, 255, 255, 0) 100%
    );

    content: "";
  }

  .active-day::before {
    position: relative;

    height: 100%;
    width: 100%;

    background: linear-gradient(
      rgba(236, 165, 66, 0.4) 10%,
      rgba(255, 255, 255, 0) 100%
    );

    content: "";
  }

  .day-month::before {
    position: absolute;
    z-index: -1;

    height: 1.5rem;
    width: 1.5rem;
    top: 50%;
    left: 50%;

    border-radius: 50%;
    content: "";
    transform: translate(-50%, -50%);
  }

  .day-dot {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    height: 95%;
    width: 90%;

    cursor: pointer;
  }

  .day-line {
    z-index: 1;
    position: absolute;

    border-top: 1px solid var(--text-color);
    opacity: 0.5;

    width: 100%;
    top: 0;
  }

  .active-line {
    border-top: 1px solid var(--mainorange-color);
  }
`;

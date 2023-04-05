import React from "react";
import styled from "styled-components";
import { TfiAngleLeft } from "react-icons/tfi";
import { TfiAngleRight } from "react-icons/tfi";
import { useEffect, useState } from "react";
import moment from "moment/moment";
import { useAllContext } from "../../../context/indexContext";
import getEventDataFromDB from "../../../constants/dataFunctions/eventData";
import { activityType } from "../../../constants/constants";
import { daysOfWeek } from "../../../constants/constants";
import { monthsOfYear } from "../../../constants/constants";

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

export const SmallCalendar = ({ getDate }) => {
  const { isEventModalOpen } = useAllContext();
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const currentDay = new Date().getDate();
  const currDate = new Date(currentYear, currentMonth, currentDay);
  const [selectedDate, setSelectedDate] = useState(
    new Date(currDate).getTime()
  );
  const [dateClicked, setDateClicked] = useState(
    moment(currDate).format("DD/MM/YYYY")
  );
  const [eventList, setEventList] = useState([]);

  useEffect(() => {
    getEventDataFromDB().then((res) => setEventList(res));
  }, [dateClicked, isEventModalOpen]);

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

  const handleSelect = (e) => {
    if (e.target.id === "day") {
      setSelectedDate(
        new Date(currentYear, currentMonth, e.target.getAttribute("data-day"))
      );
    }
  };

  useEffect(() => {
    getDate(dateClicked);
  }, [dateClicked]);

  return (
    <Wrapper>
      <div className="header-date-arrows">
        <TfiAngleLeft className="arrow" onClick={prevMonth} />
        <div className="title">
          {monthsOfYear[currentMonth]} {currentYear}
        </div>
        <TfiAngleRight className="arrow" onClick={nextMonth} />
      </div>
      <div className="container">
        <div className="days">
          {getSortedDays().map((day, i) => (
            <div className="day-dot">
              <p
                className="day"
                id={i === new Date().getDay() ? "week-today-day" : ""}
              >
                {day}
              </p>
              <div className="dots"></div>
            </div>
          ))}
        </div>
        <div
          className="days-month"
          onClick={(e) => {
            handleSelect(e);
          }}
        >
          {prevMonthDates.map((day) => (
            <div className="day-dot" onClick={prevMonth}>
              <div className="day-month inactive">{day}</div>
              <div className="dots"></div>
            </div>
          ))}
          {range(1, getNumberOfDaysInMonth(currentYear, currentMonth) + 1).map(
            (day) => (
              <div className="day-dot">
                <div
                  id="day"
                  data-day={day}
                  x={
                    currentMonth === new Date().getMonth() &&
                    currentYear === new Date().getFullYear() &&
                    day === new Date().getDate()
                      ? "today-day"
                      : ""
                  }
                  onClick={() => {
                    const date = new Date(currentYear, currentMonth, day);
                    setDateClicked(moment(date).format("DD/MM/YYYY"));
                  }}
                  className={
                    selectedDate !== null
                      ? new Date(selectedDate).getTime() ===
                        new Date(
                          new Date(currentYear, currentMonth, day)
                        ).getTime()
                        ? "day-month active"
                        : "day-month"
                      : null
                  }
                >
                  {day}
                </div>
                <div className="dots">
                  {activityType.map((item) => {
                    const date = new Date(currentYear, currentMonth, day);
                    const selectedList = [];
                    const x =
                      eventList && eventList.length > 0
                        ? eventList.map((event) =>
                            moment(event.date, "DD/MM/YYYY").format(
                              "DD/MM/YYYY"
                            ) === moment(date).format("DD/MM/YYYY")
                              ? selectedList.push(event)
                              : null
                          )
                        : null;

                    const categories = selectedList.reduce(
                      (itemsSoFar, { actType, title, date }) => {
                        if (!itemsSoFar[date]) itemsSoFar[date] = [];
                        itemsSoFar[date].push({ actType });
                        return itemsSoFar;
                      },
                      {}
                    );

                    const array =
                      categories &&
                      categories[moment(date).format("DD/MM/YYYY")]
                        ? [
                            ...new Map(
                              categories[
                                moment(date).format("DD/MM/YYYY")
                              ].map((m) => [m.actType, m])
                            ).values(),
                          ]
                        : null;

                    if (array) {
                      return array.map((i) => {
                        if (i.actType === item.actName) {
                          return (
                            <div
                              className="dot"
                              style={
                                dateClicked ===
                                  moment(date).format("DD/MM/YYYY") ||
                                moment(date).format("DD/MM/YYYY") ===
                                  moment().format("DD/MM/YYYY")
                                  ? {
                                      display: "none",
                                    }
                                  : {
                                      display: "flex",
                                      backgroundColor: `${item.color}`,
                                    }
                              }
                            ></div>
                          );
                        }
                      });
                    }
                  })}
                </div>
              </div>
            )
          )}
          {lengthSum > 35
            ? nextMonthDates.map((day) => (
                <div className="day-dot" onClick={nextMonth}>
                  <div className="day-month inactive">{day}</div>
                  <div className="dots"></div>
                </div>
              ))
            : strecthArray.map((day) => (
                <div className="day-dot" onClick={nextMonth}>
                  <div className="day-month inactive">{day}</div>
                  <div className="dots"></div>
                </div>
              ))}
        </div>
      </div>
    </Wrapper>
  );
};
export default SmallCalendar;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;

  color: var(--calendar-text-color);

  .container {
    display: flex;
    flex-direction: column;
    align-items: stretch;
  }

  .header-date-arrows {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;

    margin-bottom: 1rem;
    margin-top: 0.5rem;
  }

  .arrow {
    cursor: pointer;
  }

  .days {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
  }

  .day {
    text-align: center;

    width: 2.2rem;

    font-weight: lighter;
    font-size: var(--text-size);
    text-transform: uppercase;
  }

  .days-month {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
  }

  .day-month {
    position: relative;
    z-index: 1;
    text-align: center;

    font-weight: lighter;
    font-size: var(--text-size);

    width: 2.2rem;

    cursor: pointer;
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

  .days-month div:hover::before {
    background: var(--mainblue-color);
  }

  .active::before {
    position: aboslute;

    height: 1.5rem;
    width: 1.5rem;
    top: 50%;
    left: 50%;

    background: var(--mainblue-color);
    content: "";
    border-radius: 50%;
    transform: translate(-50%, -50%);
  }

  .inactive {
    opacity: 0.3;
  }

  [x="today-day"]::before {
    position: absolute;
    z-index: -1;

    height: 1.5rem;
    width: 1.5rem;
    top: 50%;
    left: 50%;

    content: "";
    border-radius: 50%;
    transform: translate(-50%, -50%);
    border: 1px solid var(--mainblue-color);
  }

  #week-today-day {
    color: var(--mainblue-color);
    font-weight: bold;
    opacity: 1;
  }

  .day-dot {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    padding: 0.2rem 0 0.2rem 0;

    &:hover {
      .dots {
        visibility: hidden;
      }
    }
  }

  .dots {
    position: relative;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;

    width: 10px;
    height: 10px;
  }

  .dot {
    display: flex;
    flex-direction: column;

    height: 4px;
    width: 4px;

    border-radius: 50%;
  }
`;

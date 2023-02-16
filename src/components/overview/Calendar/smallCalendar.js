import React from "react";
import styled from "styled-components";
import { TfiAngleLeft } from "react-icons/tfi";
import { TfiAngleRight } from "react-icons/tfi";
import { useEffect } from "react";
import { useState } from "react";

const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
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

export const SmallCalendar = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [currentDay, setCurrentDay] = useState(new Date().getDate());
  const [selectedDate, setSelectedDate] = useState(currentDay);

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
      setSelectedDate(e.target.getAttribute("data-day"));
      console.log("clicked");
    }
  };
  return (
    <Wrapper>
      <div className="header-date-arrows">
        <TfiAngleLeft className="arrow" onClick={prevMonth} />
        <div className="title">
          {monthsOfYear[currentMonth]} {currentYear}
        </div>
        <TfiAngleRight className="arrow" onClick={nextMonth} />
      </div>
      <div className="days">
        {getSortedDays().map((day) => (
          <p className="day">{day}</p>
        ))}
      </div>
      <div className="days-month" onClick={handleSelect}>
        {prevMonthDates.map((day) => (
          <p className="day-month inactive">{day}</p>
        ))}
        {range(1, getNumberOfDaysInMonth(currentYear, currentMonth) + 1).map(
          (day) => (
            <p
              id="day"
              data-day={day}
              className={
                selectedDate === day &&
                currentMonth === new Date().getMonth() &&
                currentYear === new Date().getFullYear()
                  ? "day-month active"
                  : "day-month"
              }
            >
              {day}
            </p>
          )
        )}
        {lengthSum > 35
          ? nextMonthDates.map((day) => (
              <p className="day-month inactive">{day}</p>
            ))
          : strecthArray.map((day) => (
              <p className="day-month inactive">{day}</p>
            ))}
      </div>
    </Wrapper>
  );
};
export default SmallCalendar;

const Wrapper = styled.div`
  margin: 1.5rem;
  display: flex;
  flex-direction: column;

  .header-date-arrows {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 1rem;
    margin-top: 2.2rem;
  }
  .arrow {
    cursor: pointer;
  }
  .days {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    margin-bottom: 0.5rem;
  }
  .day {
    text-align: center;
    width: 2.2rem;
    opacity: 0.5;
    font-weight: lighter;
    font-size: 0.8rem;
    text-transform: uppercase;
  }
  .days-month {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
  }
  .day-month {
    z-index: 1;
    position: relative;
    cursor: pointer;
    width: 2.2rem;
    text-align: center;
    padding: 0.5rem 0 0.5rem 0;
    opacity: 0.7;
    font-weight: lighter;
    font-size: 0.8rem;
  }
  .day-month::before {
    position: absolute;
    content: "";
    height: 1.5rem;
    width: 1.5rem;
    top: 50%;
    z-index: -1;
    left: 50%;
    border-radius: 50%;
    transform: translate(-50%, -50%);
  }
  .days-month p:hover::before {
    background: var(--mainblue-color);
  }
  .active::before {
    position: aboslute;
    background: var(--mainblue-color);
    height: 1.5rem;
    content: "";
    width: 1.5rem;
    top: 50%;
    left: 50%;
    border-radius: 50%;
    transform: translate(-50%, -50%);
  }
  .inactive {
    opacity: 0.3;
  }
`;

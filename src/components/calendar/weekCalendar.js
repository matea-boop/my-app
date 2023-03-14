import React from "react";
import styled from "styled-components";
import { TfiAngleLeft } from "react-icons/tfi";
import { TfiAngleRight } from "react-icons/tfi";
import { MdCalendarViewWeek } from "react-icons/md";
import { MdCalendarViewMonth } from "react-icons/md";
import { useState } from "react";
import moment from "moment";

export const WeekCalendar = ({ getType, type }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const curr = new Date();
  const firstD = new Date(curr.setDate(curr.getDate() - curr.getDay()));
  const lastD = new Date(curr.setDate(curr.getDate() - curr.getDay() + 6));
  const [firstDayOfWeek, setFirstDayOfWeek] = useState(firstD.getTime());
  const week = [];

  for (let i = 0; i < 7; i++) {
    const curr = new Date();
    const first = curr.getDate() - curr.getDay();
    const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();

    if (firstD.getMonth() !== lastD.getMonth()) {
      if (i < firstDayOfMonth) {
        week.push({
          date: firstD.getDate() + i,
          time: new Date(firstDayOfWeek).getTime() + i * 24 * 60 * 60 * 1000,
        });
      } else {
        week.push({
          date: first + i,
          time: new Date(firstDayOfWeek).getTime() + i * 24 * 60 * 60 * 1000,
        });
      }
    } else {
      week.push({
        date: first + i,
        time: new Date(firstDayOfWeek).getTime() + i * 24 * 60 * 60 * 1000,
      });
    }
  }

  const [currentWeek, setCurrentWeek] = useState(week);

  const nextWeek = () => {
    const currWeek = [];
    const nextFirstTime =
      new Date(firstDayOfWeek).getTime() + 7 * 24 * 60 * 60 * 1000;

    for (let i = 0; i < 7; i++) {
      currWeek.push({
        date: new Date(
          new Date(nextFirstTime).getTime() + i * 24 * 60 * 60 * 1000
        ).getDate(),
        time: new Date(nextFirstTime).getTime() + i * 24 * 60 * 60 * 1000,
      });
    }

    setFirstDayOfWeek(nextFirstTime);
    setCurrentWeek(currWeek);
  };

  const prevWeek = () => {
    const currWeek = [];
    const prevFirstTime =
      new Date(firstDayOfWeek).getTime() - 7 * 24 * 60 * 60 * 1000;

    for (let i = 0; i < 7; i++) {
      currWeek.push({
        date: new Date(
          new Date(prevFirstTime).getTime() + i * 24 * 60 * 60 * 1000
        ).getDate(),
        time: new Date(prevFirstTime).getTime() + i * 24 * 60 * 60 * 1000,
      });
    }

    setFirstDayOfWeek(prevFirstTime);
    setCurrentWeek(currWeek);
  };

  console.log(currentWeek);
  return (
    <Wrapper>
      <div className="top-container">
        <div className="header-date-arrows">
          <TfiAngleLeft className="arrow" onClick={prevWeek} />
          <div className="title">
            {currentWeek && currentWeek.length > 0 ? currentWeek[0].date : null}
            . -&nbsp;
            {currentWeek && currentWeek.length > 0 ? currentWeek[6].date : null}
            . &nbsp;of {moment(new Date(curr)).format("MMMM")}
          </div>
          <TfiAngleRight className="arrow" onClick={nextWeek} />
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
    </Wrapper>
  );
};
export default WeekCalendar;
const Wrapper = styled.div`
  position: relative;
  height: 100%;
  width: 100%;

  border-radius: 0.3rem;
  background-color: var(--sidebar-color);

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

    width: 8%;
    font-size: 2rem;

    margin-bottom: 1rem;
    margin-top: 0.5rem;
    margin-right: 1rem;
  }
`;

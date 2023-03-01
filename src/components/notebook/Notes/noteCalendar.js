import moment from "moment/moment";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { TfiAngleLeft } from "react-icons/tfi";
import { TfiAngleRight } from "react-icons/tfi";

export const NoteCalendar = ({ getDate }) => {
  const today = moment(new Date()).format("DD/MM/YYYY");
  const today1 = moment(new Date()).format("MM/DD/YYYY");
  const [dateClicked, setDateClicked] = useState(today);
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [currentDate, setCurrentDate] = useState(new Date().getDate());
  const curr = new Date();
  // const first = curr.getDate() - curr.getDay();
  const firstD = new Date(curr.setDate(curr.getDate() - curr.getDay()));
  const lastD = new Date(curr.setDate(curr.getDate() - curr.getDay() + 6));
  const [firstDayOfWeek, setFirstDayOfWeek] = useState(firstD.getTime());
  const week = [];

  for (let i = 0; i < 7; i++) {
    const curr = new Date();
    const first = curr.getDate() - curr.getDay();
    const dayOfWeek = new Date().getDay();
    const x = new Date(firstD).getTime();

    if (firstD.getMonth() !== lastD.getMonth()) {
      if (i < dayOfWeek) {
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

  useEffect(() => {
    getDate(dateClicked);
    console.log(dateClicked);
  }, [dateClicked]);

  return (
    <Wrapper>
      <TfiAngleLeft className="arrow" onClick={prevWeek} />
      <div className="dates">
        {currentWeek.map((day) => {
          return (
            <div
              className={
                moment(new Date(day.time).getTime()).format("DD/MM/YYYY") ===
                today
                  ? "date active"
                  : "date"
              }
              onClick={() =>
                setDateClicked(
                  moment(new Date(day.time).getTime()).format("DD/MM/YYYY")
                )
              }
              id={
                moment(new Date(day.time).getTime()).format("DD/MM/YYYY") ===
                dateClicked
                  ? "act"
                  : ""
              }
              upperDate={
                day.time >
                new Date(currentYear, currentMonth, currentDate + 1).getTime()
                  ? "upper"
                  : ""
              }
            >
              <div>{moment(new Date(day.time).getTime()).format("ddd")}</div>
              <div>{day.date}</div>
            </div>
          );
        })}
      </div>
      <TfiAngleRight className="arrow" onClick={nextWeek} />
    </Wrapper>
  );
};
export default NoteCalendar;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  height: 8%;
  width: 90%;

  .dates {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;

    width: 90%;

    padding: 0 1rem 0 1rem;
  }

  .date {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;

    font-size: var(--text-size);
    text-transform: uppercase;
    font-weight: lighter;
    color: var(--text-color);
    cursor: pointer;
    opacity: 0.5;
  }

  .arrow {
    cursor: pointer;
    width: 5%;
  }

  .active {
    color: var(--mainorange-color);
    font-weight: bold;
    opacity: 1;
  }

  #act {
    opacity: 1;
    color: var(--mainorange-color);
  }

  [upperDate="upper"] {
    opacity: 0.3;
    pointer-events: none;
  }
`;

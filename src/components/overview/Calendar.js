import React from "react";
import { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import SmallCalendar from "./Calendar/smallCalendar";
import VerticalTimeline from "./Calendar/verticalTimeline";
import moment from "moment/moment";

export const Calendar = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [currentDay, setCurrentDay] = useState(new Date().getDate());
  const currDate = new Date(currentYear, currentMonth, currentDay);

  const [list, setList] = useState([]);
  const [date, setDate] = useState(moment(currDate).format("DD/MM/YYYY"));
  const chosenDate = moment(date, "DD/MM/YYYY").format("dddd Do MMMM");

  const getDate = (value) => {
    setDate(value);
  };

  return (
    <Wrapper>
      <div className="items">
        <SmallCalendar
          className="small-calendar"
          getDate={getDate}
          list={list}
        />
        <div className="middle">
          <Link to="/Calendar">View Calendar</Link>
          <div className="header-date">{chosenDate}</div>
        </div>

        <VerticalTimeline className="item" date={date} />
      </div>
    </Wrapper>
  );
};
export default Calendar;

const Wrapper = styled.div`
  position: absolute;
  display: grid;
  grid-area: calendar;

  height: 100%;
  width: 100%;
  min-height: 40rem;
  min-width: 20rem;

  border-radius: 0.3rem;
  background-color: var(--sidebar-color);

  .middle {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;

    margin-top: 1.5rem;
  }

  .header-date {
    font-weight: lighter;
  }

  .items {
    display: flex;
    flex-direction: column;
    align-items: stretch;
    justify-content: start;

    overflow: hidden;

    margin: 1.5rem 1.5rem 1.5rem 1.5rem;
  }

  a {
    position: absolute;

    right: 1.5rem;

    font-size: var(--text-size);
    float: right;
    opacity: 0.5;
    font-weight: lighter;

    margin-bottom: 1.2rem;
    margin-top: 1.5rem;

    &:hover {
      opacity: 1;
    }
  }
`;

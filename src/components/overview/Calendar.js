import React from "react";
import { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import SmallCalendar from "./Calendar/smallCalendar";
import VerticalTimeline from "./Calendar/verticalTimeline";
import moment from "moment/moment";

export const Calendar = () => {
  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();
  const currentDay = new Date().getDate();
  const currDate = new Date(currentYear, currentMonth, currentDay);
  const [date, setDate] = useState(moment(currDate).format("DD/MM/YYYY"));
  const chosenDate = moment(date, "DD/MM/YYYY").format("dddd Do MMMM");

  const getDate = (value) => {
    setDate(value);
  };

  return (
    <Wrapper>
      <div className="items">
        <SmallCalendar getDate={getDate} />
        <div className="middle">
          <Link to="/Calendar">View Calendar</Link>
          <div className="header-date">{chosenDate}</div>
        </div>
        <VerticalTimeline date={date} />
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

  color: var(--text-color);

  border-radius: var(--border-radius);
  background-color: var(--sidebar-color);
  box-shadow: 0px 0px 26px -20px rgba(0, 0, 0, 1);

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

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

  const getList = (value) => {
    setList(value);
  };

  return (
    <Wrapper>
      <div className="items">
        <SmallCalendar
          className="small-calendar"
          getDate={getDate}
          categoryList={list}
        />
        <div className="middle">
          <Link to="/Calendar">View Calendar</Link>
          <div className="header-date">{chosenDate}</div>
        </div>

        <VerticalTimeline className="item" date={date} getList={getList} />
      </div>
    </Wrapper>
  );
};
export default Calendar;

const Wrapper = styled.div`
  position: absolute;
  height: 100%;
  width: 100%;
  display: grid;
  grid-area: calendar;

  border-radius: 0.3rem;
  background-color: var(--sidebar-color);

  .middle {
    margin-top: 1.5rem;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
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
    margin-top: 1.5rem;
    font-size: 0.8rem;
    float: right;
    margin-bottom: 1.2rem;
    opacity: 0.5;
    font-weight: lighter;
    &:hover {
      opacity: 1;
    }
  }
  @media screen and (max-width: 1024px) {
    a {
      font-size: 0.7rem;
    }
  }
  @media screen and (max-width: 1200px) {
    a {
      font-size: 0.7rem;
    }
  }
`;

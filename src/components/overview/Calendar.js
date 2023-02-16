import React from "react";
import { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import SmallCalendar from "./Calendar/smallCalendar";

export const Calendar = () => {
  return (
    <Wrapper>
      <Link to="/Calendar">View Calendar</Link>
      <SmallCalendar />
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
`;

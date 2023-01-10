import React from "react";
import styled from "styled-components";

export const Calendar = () => {
  return (
    <Wrapper>
      <h1>Calendar</h1>
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
`;

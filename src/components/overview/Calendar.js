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
  display: grid;
  height: auto;
  grid-area: calendar;
  border-radius: 0.3rem;
  background-color: var(--sidebar-color);
`;

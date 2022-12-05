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
  margin: var(--margin-size);
  border-radius: 0.3rem;
  height: auto;
  background-color: blue;
`;

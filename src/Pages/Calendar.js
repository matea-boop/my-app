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
  height: auto;

  border-radius: 0.3rem;
  background-color: blue;

  margin: var(--margin-size);
`;

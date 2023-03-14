import React, { useState } from "react";
import styled from "styled-components";
import MonthCalendar from "../components/calendar/monthCalendar";
import WeekCalendar from "../components/calendar/weekCalendar";

export const Calendar = () => {
  const [type, setType] = useState("month");

  const getType = (value) => {
    setType(value);
  };
  console.log(type);
  return (
    <Wrapper>
      <div
        style={
          type === "month"
            ? { display: "flex", height: "100%", width: "100%" }
            : { display: "none" }
        }
      >
        <MonthCalendar getType={getType} type={type} />
      </div>
      <div
        style={
          type === "week"
            ? { display: "flex", height: "100%", width: "100%" }
            : { display: "none" }
        }
      >
        <WeekCalendar getType={getType} type={type} />
      </div>
    </Wrapper>
  );
};
export default Calendar;

const Wrapper = styled.div`
  height: auto;

  border-radius: 0.3rem;
  background-color: var(--sidebar-color);

  margin: var(--margin-size);
`;

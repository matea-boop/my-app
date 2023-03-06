import React from "react";
import styled from "styled-components";
import MainHabits from "../components/tasks/habits/mainHabits";
import MainTasks from "../components/tasks/tasks/mainTasks";
import MainDeadlines from "../components/tasks/deadlines/mainDeadlines";

export const Tasks = () => {
  return (
    <Wrapper>
      <MainHabits />
      <MainTasks />
      <MainDeadlines />
    </Wrapper>
  );
};
export default Tasks;
const Wrapper = styled.div`
  position: relative;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rowss: 1fr 1fr;
  height: auto;

  gap: var(--margin-size);
  margin: var(--margin-size);
`;

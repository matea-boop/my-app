import React from "react";
import styled from "styled-components";

export const Tasks = () => {
  return (
    <Wrapper>
      <h1>Tasks</h1>
    </Wrapper>
  );
};
export default Tasks;

const Wrapper = styled.div`
  display: grid;
  height: auto;
  grid-area: tasks;
  border-radius: 0.3rem;
  background-color: var(--sidebar-color);
`;

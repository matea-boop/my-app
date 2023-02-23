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
  height: auto;

  border-radius: 0.3rem;
  background-color: blue;

  margin: var(--margin-size);
`;

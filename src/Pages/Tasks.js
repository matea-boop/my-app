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
  margin: var(--margin-size);
  border-radius: 0.3rem;
  height: auto;
  background-color: blue;
`;

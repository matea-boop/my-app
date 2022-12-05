import React from "react";
import styled from "styled-components";

export const Progress = () => {
  return (
    <Wrapper>
      <h1>Progress</h1>
    </Wrapper>
  );
};
export default Progress;

const Wrapper = styled.div`
  display: grid;
  height: auto;
  grid-area: progress;
  border-radius: 0.3rem;
  background-color: var(--sidebar-color);
`;

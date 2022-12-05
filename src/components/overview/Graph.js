import React from "react";
import styled from "styled-components";

export const Graph = () => {
  return (
    <Wrapper>
      <h1>Graph</h1>
    </Wrapper>
  );
};
export default Graph;

const Wrapper = styled.div`
  display: grid;
  height: auto;
  grid-area: graph;
  border-radius: 0.3rem;
  background-color: var(--sidebar-color);
`;

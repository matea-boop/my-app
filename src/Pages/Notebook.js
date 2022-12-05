import React from "react";
import styled from "styled-components";
export const Notebook = () => {
  return (
    <Wrapper>
      <h1>Notebook</h1>
    </Wrapper>
  );
};
export default Notebook;
const Wrapper = styled.div`
  margin: var(--margin-size);
  border-radius: 0.3rem;
  height: auto;
  background-color: blue;
`;

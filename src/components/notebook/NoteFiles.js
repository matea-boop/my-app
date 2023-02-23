import React from "react";
import styled from "styled-components";
export const NoteFiles = () => {
  return (
    <Wrapper>
      <h1>Note files</h1>
    </Wrapper>
  );
};
export default NoteFiles;
const Wrapper = styled.div`
  height: 100%;

  border-radius: var(--border-radius);
  background-color: var(--sidebar-color);
`;

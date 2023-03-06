import React from "react";
import styled from "styled-components";
import Notes from "../components/notebook/Notes";
import NotesFiles from "../components/notebook/NotesFiles";
export const Notebook = () => {
  return (
    <Wrapper>
      <Notes />
      <NotesFiles />
    </Wrapper>
  );
};
export default Notebook;
const Wrapper = styled.div`
  position: relative;
  display: grid;
  grid-template-columns: 1fr 1fr;

  min-height: 40rem;
  height: auto;

  border-radius: 0.3rem;

  margin: var(--margin-size);
  gap: var(--margin-size);
`;

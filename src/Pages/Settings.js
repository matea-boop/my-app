import React from "react";
import styled from "styled-components";
export const Settings = () => {
  return (
    <Wrapper>
      <h1>Settings</h1>
    </Wrapper>
  );
};
export default Settings;
const Wrapper = styled.div`
  height: auto;

  border-radius: 0.3rem;
  background-color: blue;

  margin: var(--margin-size);
`;

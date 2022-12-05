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
  margin: var(--margin-size);
  border-radius: 0.3rem;
  height: auto;
  background-color: blue;
`;

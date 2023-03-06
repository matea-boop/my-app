import React from "react";
import styled from "styled-components";
export const MainHabits = () => {
  return (
    <Wrapper>
      <h1>habits</h1>
    </Wrapper>
  );
};
export default MainHabits;
const Wrapper = styled.div`
  background: var(--sidebar-color);
  border-radius: var(--border-radius);
`;

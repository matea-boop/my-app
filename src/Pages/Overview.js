import React from "react";
import styled from "styled-components";
import { Calendar, Progress, Tasks, Graph } from "../components/overview";

export const Overview = () => {
  return (
    <Wrapper>
      <Graph />
      <Tasks />
      <Calendar />
      <Progress />
    </Wrapper>
  );
};
export default Overview;

const Wrapper = styled.div`
  display: grid;
  gap: var(--margin-size);
  grid-template-columns: auto auto 25rem;
  position: relative;
  grid-template-areas:
    "graph tasks calendar"
    "progress progress calendar";
  margin: var(--margin-size);
  border-radius: 0.3rem;
  height: auto;
`;

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
  grid-template-columns: 1fr 18rem 1fr;
  position: relative;
  grid-template-rows: 50%;
  grid-template-areas:
    "graph tasks calendar"
    "progress progress calendar";
  margin: var(--margin-size);
  border-radius: 0.3rem;
  height: auto;

  @media screen and (max-width: 1024px) {
    grid-template-columns: 18rem 14rem 1fr;
  }
  @media screen and (max-width: 1200px) {
    grid-template-columns: 14rem 15rem 1fr;
  }
`;

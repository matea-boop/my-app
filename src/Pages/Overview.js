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
  position: relative;
  display: grid;
  grid-template-columns: 1fr 18rem 1fr;
  grid-template-rows: 50%;
  grid-template-areas:
    "graph tasks calendar"
    "progress progress calendar";

  height: auto;
  min-height: 40rem;

  border-radius: 0.3rem;

  margin: var(--margin-size);
  gap: var(--margin-size);

  @media screen and (max-width: 1024px) {
    grid-template-columns: 18rem 14rem 1fr;
  }
  @media screen and (max-width: 1200px) {
    grid-template-columns: 14rem 15rem 1fr;
  }
`;

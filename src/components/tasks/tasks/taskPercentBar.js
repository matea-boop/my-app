import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import styled from "styled-components";

export const TaskPercentBar = () => {
  const percentage = 10;
  return (
    <Wrapper>
      <div className="text">Task progress today</div>
      <div className="percentage-and-bar">
        <div className="bar">
          <div className="orange-bar" style={{ width: `${percentage}%` }}></div>
          <div className="grey-bar"></div>
        </div>
        <div className="percentage">{percentage.toFixed()}%</div>
      </div>
    </Wrapper>
  );
};
export default TaskPercentBar;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  height: 6%;
  width: 100%;

  // background-color: var(--mainorange-color);
  // border-radius: var(--border-radius);

  .percentage-and-bar {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;

    width: 100%;
  }

  .text {
    font-size: var(--text-size);
    color: var(--text-color);
    opacity: 0.5;
    font-weight: lighter;

    margin-bottom: 0.4rem;
  }

  .bar {
    position: relative;
    align-items: center;
    display: flex;

    width: 100%;

    margin-right: 0.7rem;
  }

  .grey-bar {
    position: absolute;
    width: 100%;
    z-index: 1;

    border-radius: 1rem;
    border-bottom: 0.3rem solid var(--box-color);
  }

  .orange-bar {
    position: absolute;
    z-index: 10;

    transition: all 0.8s;

    border-radius: 1rem;
    border-bottom: 0.3rem solid var(--mainorange-color);
  }

  .percentage {
    font-size: var(--text-size);
    color: var(--text-color);
    opacity: 0.5;
    font-weight: lighter;
  }
`;

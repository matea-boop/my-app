import React from "react";
import styled from "styled-components";

export const NotebookBar = ({ circleWidth }) => {
  const radius = circleWidth / 2.2;
  const dashArray = 0;
  const dashOffset = 0;

  return (
    <Wrapper>
      <div className="svg">
        <svg
          width={circleWidth}
          height={circleWidth}
          viewBox={`0 0 ${circleWidth} ${circleWidth}`}
        >
          <circle
            cx={circleWidth / 2}
            cy={circleWidth / 2}
            strokeWidth="0.01rem"
            r={radius}
            className="circle"
          />
          <circle
            cx={circleWidth / 2}
            cy={circleWidth / 2}
            strokeWidth="0.11rem"
            r={radius}
            className="circle-notebook"
            style={{ strokeDasharray: dashArray, strokeDashoffset: dashOffset }}
            transform={`rotate(-90 ${circleWidth / 2} ${circleWidth / 2})`}
          />
        </svg>
      </div>
      <h1>Notebook</h1>
    </Wrapper>
  );
};
export default NotebookBar;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: start;
  gap: 1rem;
  background-color: var(--box-color);
  border-radius: var(--border-radius);
  width: 100%;

  .svg {
    display: flex;
    align-items: center;

    justify-content: center;
    padding: 0.3rem 0 0.3rem 0.7rem;
  }
  h1 {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.8rem;
    font-weight: normal;
  }
  .circle {
    fill: none;
    stroke: var(--text-color);
    opacity: 0.2;
  }
  .circle-notebook {
    display: none;
    fill: none;
    stroke: var(--mainorange-color);
    stroke-linecap: round;
    transition: all 0.4s;
  }
`;

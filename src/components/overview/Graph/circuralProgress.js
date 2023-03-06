import React from "react";
import styled from "styled-components";

export const CircuralProgress = ({ percentage, circleWidth }) => {
  const radius = circleWidth / 2.2;
  const dashArray = radius * Math.PI * 2;
  const dashOffset = dashArray - (dashArray * percentage) / 100;
  const roundNumber = percentage === 0 ? 0 : Math.round(percentage);

  return (
    <Wrapper>
      <svg
        width={circleWidth}
        height={circleWidth}
        viewBox={`0 0 ${circleWidth} ${circleWidth}`}
      >
        <circle
          cx={circleWidth / 2}
          cy={circleWidth / 2}
          strokeWidth="0.2rem"
          r={radius}
          className="circle"
        />
        <circle
          cx={circleWidth / 2}
          cy={circleWidth / 2}
          strokeWidth="0.5rem"
          r={radius}
          className="circle-task"
          style={{ strokeDasharray: dashArray, strokeDashoffset: dashOffset }}
          transform={`rotate(-90 ${circleWidth / 2} ${circleWidth / 2})`}
        />
        <text
          className="circle-text"
          x="50%"
          y="50%"
          dy="0.3em"
          textAnchor="middle"
        >
          {roundNumber}%
        </text>
      </svg>
    </Wrapper>
  );
};
export default CircuralProgress;

const Wrapper = styled.div`
  .circle {
    fill: none;
    stroke: var(--text-color);
    opacity: 0.1;
  }

  .circle-task {
    fill: none;
    stroke: var(--mainorange-color);
    stroke-linecap: round;
    transition: all 0.8s;
  }

  .circle-text {
    fill: var(--mainorange-color);
    font-weight: bold;
    font-size: 1rem;
  }
`;

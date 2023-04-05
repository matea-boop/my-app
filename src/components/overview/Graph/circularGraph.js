import React from "react";
import styled from "styled-components";

export const CircuralGraph = ({
  allPercentage,
  taskPercentage,
  notebookPercentage,
  circleWidth,
}) => {
  const taskRadius = circleWidth / 2.2;
  const taskDashArray = taskRadius * Math.PI * 2;
  const taskDashOffset = taskDashArray - (taskDashArray * taskPercentage) / 100;

  const allRadius = (circleWidth - 100) / 2.2;
  const allDashArray = allRadius * Math.PI * 2;
  const allDashOffset = allDashArray - (allDashArray * allPercentage) / 100;

  const notebookRadius = (circleWidth - 50) / 2.2;
  const notebookDashArray = notebookRadius * Math.PI * 2;
  const notebookDashOffset =
    notebookDashArray - (notebookDashArray * notebookPercentage) / 100;

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
          strokeWidth="0.1rem"
          r={taskRadius}
          className="circle"
        />
        <circle
          cx={circleWidth / 2}
          cy={circleWidth / 2}
          strokeWidth="0.7rem"
          r={taskRadius}
          className="circle-task"
          style={{
            strokeDasharray: taskDashArray,
            strokeDashoffset: taskDashOffset,
          }}
          transform={`rotate(-90 ${circleWidth / 2} ${circleWidth / 2})`}
        />

        <circle
          cx={circleWidth / 2}
          cy={circleWidth / 2}
          strokeWidth="0.1rem"
          r={allRadius}
          className="circle"
        />
        <circle
          cx={circleWidth / 2}
          cy={circleWidth / 2}
          strokeWidth="0.7rem"
          r={allRadius}
          className="circle-all"
          style={{
            strokeDasharray: allDashArray,
            strokeDashoffset: allDashOffset,
          }}
          transform={`rotate(0 ${circleWidth / 2} ${circleWidth / 2})`}
        />

        <circle
          cx={circleWidth / 2}
          cy={circleWidth / 2}
          strokeWidth="0.1rem"
          r={notebookRadius}
          className="circle"
        />
        <circle
          cx={circleWidth / 2}
          cy={circleWidth / 2}
          strokeWidth="0.7rem"
          r={notebookRadius}
          className="circle-notebook"
          style={{
            strokeDasharray: notebookDashArray,
            strokeDashoffset: notebookDashOffset,
          }}
          transform={`rotate(90 ${circleWidth / 2} ${circleWidth / 2})`}
        />
      </svg>
    </Wrapper>
  );
};
export default CircuralGraph;

const Wrapper = styled.div`
  .circle {
    fill: none;
    stroke: var(--text-color);
    opacity: 0.1;
  }

  .circle-task {
    fill: none;
    stroke: var(--tasks-color);
    stroke-linecap: round;
    transition: all 0.8s;
  }

  .circle-all {
    fill: none;
    stroke: var(--all-color);
    stroke-linecap: round;
    transition: all 0.8s;
  }

  .circle-notebook {
    fill: none;
    stroke: var(--notes-color);
    stroke-linecap: round;
    transition: all 0.8s;
  }
`;

import React, { useState } from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import CircuralProgress from "./Graph/circuralProgress";
import TaskBar from "./Graph/taskBar";
import NotebookBar from "./Graph/notebookBar";

export const Graph = () => {
  const taskLength = useSelector((state) => state.task.taskList.length);
  const listOfcompletedTasks = useSelector((state) =>
    state.task.taskList.filter((task) => task.status === "complete")
  );
  const completedTasks = listOfcompletedTasks.length;
  const tasksDone = (completedTasks / taskLength) * 100;

  return (
    <Wrapper>
      <div className="items">
        <div className="headers">
          <h1 className="header">Friday 18th October</h1>
          <h2 className="motivational">Great Job!</h2>
        </div>
        <div className="circle">
          <CircuralProgress percentage={tasksDone} circleWidth="140" />
        </div>
        <div className="bars">
          <div className="task-bar">
            <TaskBar completedTasks={tasksDone} circleWidth="27" />
          </div>
          <div className="notebook-bar">
            <NotebookBar circleWidth="27" />
          </div>
        </div>
      </div>
    </Wrapper>
  );
};
export default Graph;

const Wrapper = styled.div`
  display: grid;
  height: auto;
  grid-area: graph;
  border-radius: 0.3rem;
  background-color: var(--sidebar-color);
  .items {
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: space-between;
  }
  .headers {
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: space-between;
  }
  .header {
    padding-top: 1rem;
    font-size: 1.2rem;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .motivational {
    padding-top: 0.8rem;
    font-size: 1rem;
    font-weight: normal;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .circle {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .bars {
    margin-bottom: 1rem;
    gap: 0.3rem;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: space-between;
    width: 90%;
  }
  .task-bar {
    width: 100%;
  }
  .notebook-bar {
    width: 100%;
  }
`;

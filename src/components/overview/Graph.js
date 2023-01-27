import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import CircuralProgress from "./Graph/circuralProgress";
import TaskBar from "./Graph/taskBar";
import NotebookBar from "./Graph/notebookBar";
import { motivationalText } from "../../constants/constants";

export const Graph = () => {
  let todaysDate = new Date().toLocaleDateString();
  const mainList = [];
  const listOfTasksToday = useSelector((state) =>
    state.task.taskList.forEach((task) => {
      if (task.date === todaysDate) {
        mainList.push({ status: task.status, date: task.date });
      }
    })
  );
  const listOfcompletedTasks = useSelector(() =>
    mainList.filter((task) => task.status === "complete")
  );
  const listOfUncompletedTasks = useSelector(() =>
    mainList.filter((task) => task.status === "incomplete")
  );
  const mainListLength = mainList.length;
  const uncompletedTasks = listOfUncompletedTasks.length;
  const completedTasks = listOfcompletedTasks.length;
  const tasksDone =
    completedTasks === 0 ? 0 : (completedTasks / mainListLength) * 100;
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (completedTasks === 0 && uncompletedTasks === 0) {
      setIndex(0);
    } else if (tasksDone >= 0 && tasksDone <= 10) {
      setIndex(1);
    } else if (tasksDone > 10 && tasksDone <= 30) {
      setIndex(2);
    } else if (tasksDone > 30 && tasksDone < 50) {
      setIndex(3);
    } else if (tasksDone === 50) {
      setIndex(4);
    } else if (tasksDone > 50 && tasksDone <= 70) {
      setIndex(5);
    } else if (tasksDone > 70 && tasksDone <= 90) {
      setIndex(6);
    } else if (tasksDone > 90 && tasksDone <= 99) {
      setIndex(7);
    } else if (tasksDone === 100) {
      setIndex(8);
    }
  }, [uncompletedTasks]);

  return (
    <Wrapper>
      <div className="items">
        <div className="headers">
          <h1 className="header">Friday 18th October</h1>
          <div className="motivational">
            {motivationalText.map(({ id, text }) => {
              return index === id ? <span key={id}>{text}</span> : null;
            })}
          </div>
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
    padding-top: 0.7rem;
    font-size: 0.9rem;
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

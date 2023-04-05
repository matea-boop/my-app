import React, { useEffect, useState } from "react";
import styled from "styled-components";
import CircuralGraph from "./Graph/circularGraph";
import { motivationalText } from "../../constants/constants";
import { useAllContext } from "../../context/indexContext";
import { BsFillCircleFill } from "react-icons/bs";
import moment from "moment/moment";
import getNotesDataFromDB from "../../constants/dataFunctions/noteData";
import getTaskDataFromDB from "../../constants/dataFunctions/taskData";

export const Graph = () => {
  let todaysDate = new Date().toLocaleDateString();
  const { isModalOpen, isDeleted, isTaskChecked } = useAllContext();
  const [taskList, setTaskList] = useState([]);
  const [notesList, setNotesList] = useState([]);
  const [index, setIndex] = useState(0);
  const currentDate = moment().format("dddd Do MMMM");

  const taskToday =
    taskList.length > 0
      ? taskList.filter((task) => task.date === todaysDate)
      : [];

  useEffect(() => {
    getTaskDataFromDB().then((res) => setTaskList(res));
    getNotesDataFromDB().then((res) => setNotesList(res));
  }, [isModalOpen, isDeleted, isTaskChecked]);

  const noteToday =
    notesList.length > 0
      ? notesList.filter((note) => note.date === todaysDate)
      : null;

  const notesDoneToday = noteToday
    ? noteToday.map((x) => x.numberOfWords)
    : null;

  const notesDone = notesDoneToday ? notesDoneToday[0] : 0;
  const notes = notesDone > 69 ? 100 : ((notesDone / 70) * 100).toFixed();

  const listOfcompletedTasks = taskToday.filter((task) => task.status === true);

  const listOfUncompletedTasks = taskToday.filter(
    (task) => task.status === false
  );

  const mainListLength = taskToday.length;
  const uncompletedTasks = listOfUncompletedTasks.length;
  const completedTasks = listOfcompletedTasks.length;
  const tasksDone =
    completedTasks === 0 ? 0 : (completedTasks / mainListLength) * 100;

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
  }, [tasksDone]);

  const all =
    notesDone && notesDone !== undefined
      ? (parseInt(notes) + parseInt(tasksDone)) / 2
      : tasksDone / 2;

  return (
    <Wrapper>
      <div className="items">
        <div className="headers">
          <h1 className="header">{currentDate}</h1>
          <div className="motivational">
            {motivationalText.map(({ id, text }) => {
              return index === id ? <span key={id}>{text}</span> : null;
            })}
          </div>
        </div>

        <div className="circle">
          <CircuralGraph
            taskPercentage={tasksDone}
            notebookPercentage={notesDone}
            allPercentage={all}
            circleWidth="160"
          />
        </div>

        <div className="circle-labels">
          <div className="item">
            <BsFillCircleFill className="task-circle" />
            <p>Tasks</p>
          </div>
          <div className="item">
            <BsFillCircleFill className="notebook-circle" />
            <p>Notebook</p>
          </div>
          <div className="item">
            <BsFillCircleFill className="all-circle" />
            <p>All</p>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};
export default Graph;

const Wrapper = styled.div`
  display: grid;
  grid-area: graph;
  position: relative;

  height: auto;
  min-height: 20rem;

  border-radius: var(--border-radius);
  background-color: var(--sidebar-color);
  box-shadow: 0px 0px 26px -20px rgba(0, 0, 0, 1);

  .circle {
    position: absolute;

    top: 25%;
    height: 55%;
  }

  .circle-labels {
    position: absolute;
    display: flex;
    justify-content: space-between;

    font-size: var(--text-size);
    font-weight: lighter;
    color: var(--text-color);

    top: 85%;
    height: 15%;

    margin-left: 1.5rem;
  }

  .item {
    display: flex;
    align-items: center;
    justify-content: space-between;

    cursor: pointer;

    padding-right: 1rem;
    gap: 0.5rem;
  }

  .task-circle {
    color: var(--mainorange-color);
    font-size: 0.5rem;
  }

  .notebook-circle {
    color: var(--mainblue-color);
    font-size: 0.5rem;
  }

  .all-circle {
    color: var(--text-color);
    font-size: 0.5rem;
  }

  .items {
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: space-between;
  }

  .headers {
    position: absolute;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: space-between;

    height: 20%;
  }

  .header {
    display: flex;
    font-weight: normal;
    align-items: center;
    justify-content: center;

    font-size: 1.2rem;
    color: var(--text-color);

    padding-top: 1rem;
  }

  .motivational {
    display: flex;
    align-items: center;
    justify-content: center;

    font-size: 0.9rem;
    font-weight: lighter;
    color: var(--text-color);

    padding-top: 0.4rem;
  }

  .circle {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .bars {
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: space-between;

    width: 90%;

    margin-bottom: 1rem;
    gap: 0.2rem;
  }

  .task-bar {
    width: 100%;
  }

  .notebook-bar {
    width: 100%;
  }
`;

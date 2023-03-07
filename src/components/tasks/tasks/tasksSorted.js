import React from "react";
import styled from "styled-components";
import axios from "axios";
import { useAllContext } from "../../../context/indexContext";
import { useState, useEffect } from "react";

async function getDataFromDB() {
  const url = "http://localhost:3001/api/tasks";
  try {
    const {
      data: { tasks },
    } = await axios.get(url);

    return tasks;
  } catch (error) {
    console.log("error", error);
    return error;
  }
}

export const TasksSorted = ({ type }) => {
  let todaysDate = new Date().toLocaleDateString();
  const { isModalOpen, isDeleted, isTaskChecked } = useAllContext();
  const [taskList, setTaskList] = useState([]);

  const mainList = [];

  const check =
    taskList.length > 0
      ? taskList.forEach((task) => {
          if (task.date === todaysDate) {
            mainList.push(task);
          }
        })
      : null;

  useEffect(() => {
    getDataFromDB().then((res) => setTaskList(res));
  }, [isModalOpen, isDeleted, isTaskChecked]);

  const incompletedTasks = mainList.filter((task) => task.status !== true)
    .length;
  const completedTasks = mainList.filter((task) => task.status !== false)
    .length;
  const allTasks = mainList.length;

  return (
    <Wrapper>
      {type === "all"
        ? allTasks
        : type === "left"
        ? incompletedTasks
        : type === "done"
        ? completedTasks
        : null}
    </Wrapper>
  );
};

export default TasksSorted;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  font-size: var(--text-size);
  font-weight: lighter;
  opacity: 0.5;

  background-color: var(--box-color);
  border-radius: var(--border-radius);

  padding: 0.2rem 0.5rem 0.2rem 0.5rem;
`;

import React from "react";
import styled from "styled-components";
import { useAllContext } from "../../../context/indexContext";
import { useState, useEffect } from "react";
import getDataFromDB from "../../../constants/dataFunctions/taskData";

export const TasksDone = () => {
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

  const incTasks = mainList.filter((task) => task.status !== true).length;

  return <Wrapper>{incTasks}</Wrapper>;
};

export default TasksDone;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  font-size: var(--text-size);
  font-weight: lighter;
  opacity: 0.5;
`;

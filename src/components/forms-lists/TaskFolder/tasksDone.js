import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import axios from "axios";
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

export const TasksDone = () => {
  let todaysDate = new Date().toLocaleDateString();
  const [taskList, setTaskList] = useState([]);

  useEffect(() => {
    getDataFromDB().then((res) => setTaskList(res));
  }, [mainList]);

  const mainList = [];
  const listOfTasksToday = useSelector((state) =>
    state.task.taskList.forEach((task) => {
      if (task.date === todaysDate) {
        mainList.push(task);
      }
    })
  );

  const incTasks = mainList.filter((task) => task.status === false).length;

  return <Wrapper>{incTasks}</Wrapper>;
};

export default TasksDone;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.8rem;
  opacity: 0.5;
`;

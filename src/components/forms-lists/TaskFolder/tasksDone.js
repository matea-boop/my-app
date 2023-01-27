import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";

export const TasksDone = () => {
  let todaysDate = new Date().toLocaleDateString();
  const mainList = [];
  const listOfTasksToday = useSelector((state) =>
    state.task.taskList.forEach((task) => {
      if (task.date === todaysDate) {
        mainList.push({ status: task.status, date: task.date });
      }
    })
  );

  const incompletedTasks = useSelector(() =>
    mainList.filter((task) => task.status === "incomplete")
  );

  const incTasks = incompletedTasks.length;

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

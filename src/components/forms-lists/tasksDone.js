import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";

export const TasksDone = () => {
  const incompletedTasks = useSelector((state) =>
    state.task.taskList.filter((task) => task.status === "incomplete")
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

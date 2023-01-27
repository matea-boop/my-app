import React from "react";
import { useSelector } from "react-redux";

export const taskListData = () => {
  const taskList = useSelector((state) => state.task.taskList);
  const taskListData = JSON.stringify(taskList);

  return taskListData;
};

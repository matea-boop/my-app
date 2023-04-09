import React from "react";
import TaskItem from "./taskListItem";
import { useEffect, useState } from "react";
import { useAllContext } from "../../../context/indexContext";
import getTaskDataFromDB from "../../../constants/dataFunctions/taskData";

function TaskListContent({ page, setTotalPages }) {
  const { isModalOpen, isDeleted, isTaskChecked } = useAllContext();
  const [taskList, setTaskList] = useState([]);
  const tasksPerPage = 5;
  const startIndex = (page - 1) * tasksPerPage;
  let todaysDate = new Date().toLocaleDateString();
  const listHeight = 70;

  useEffect(() => {
    getTaskDataFromDB().then((res) => {
      setTaskList(res);
    });
  }, [isModalOpen, isDeleted, isTaskChecked]);

  const mainList =
    taskList.length > 0
      ? taskList.filter((task) => task.date === todaysDate)
      : [];

  const selectedTasks =
    mainList.length > 0
      ? mainList.slice(startIndex, startIndex + tasksPerPage)
      : [];

  useEffect(() => {
    setTotalPages(Math.ceil(mainList.length / tasksPerPage));
  }, [mainList]);

  return (
    <div>
      <div
        style={{
          position: "absolute",
          width: "80%",
          height: `${listHeight}%`,
        }}
      >
        {" "}
        {selectedTasks && selectedTasks.length > 0 ? (
          selectedTasks.map((task) => {
            return task.date === todaysDate ? (
              <TaskItem key={task.id} task={task} />
            ) : null;
          })
        ) : (
          <div
            style={{
              fontSize: " 0.9rem",
              fontWeight: "normal",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginTop: "1rem",
              color: "var(--text-color)",
            }}
          >
            No tasks assigned for today
          </div>
        )}
      </div>
    </div>
  );
}

export default TaskListContent;

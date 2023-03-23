import React from "react";
import TaskItem from "./taskListItem";
import { useEffect, useState } from "react";
import axios from "axios";
import { useAllContext } from "../../../context/indexContext";

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

function TaskListContent({
  page,
  setTotalPages,
  type,
  ovType,
  formOpen,
  doneType,
  completedTasksList,
  incompletedTasksList,
}) {
  const { isModalOpen, isDeleted, isTaskChecked } = useAllContext();
  const [taskList, setTaskList] = useState([]);
  const tasksPerPage = type === "mainTask" ? 10 : 5;
  const startIndex = (page - 1) * tasksPerPage;
  let todaysDate = new Date().toLocaleDateString();
  const mainList = [];

  const listHeight = type === "mainTask" ? 100 : 70;

  useEffect(() => {
    getDataFromDB().then((res) => {
      setTaskList(res);
    });
  }, [isModalOpen, isDeleted, isTaskChecked, formOpen]);

  const check =
    taskList.length > 0
      ? taskList.forEach((task) => {
          if (task.date === todaysDate) {
            mainList.push(task);
          }
        })
      : null;

  const selectedTasks =
    mainList.length > 0
      ? mainList.slice(startIndex, startIndex + tasksPerPage)
      : [];

  const list =
    (doneType === "all" || ovType === "overviewTasks") &&
    selectedTasks.length > 0
      ? selectedTasks
      : doneType === "left" &&
        incompletedTasksList &&
        incompletedTasksList.length > 0
      ? incompletedTasksList
      : doneType === "done" &&
        completedTasksList &&
        completedTasksList.length > 0
      ? completedTasksList
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
        {list && list.length > 0 ? (
          list.map((task) => {
            return task.date === todaysDate ? (
              <TaskItem
                type={type}
                key={task.id}
                task={task}
                status={task.status}
                subtasks={task.subtasks}
              />
            ) : null;
          })
        ) : (
          <div
            style={
              ovType === "overviewTasks"
                ? {
                    fontSize: " 0.9rem",
                    fontWeight: "normal",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginTop: "1rem",
                    color: "var(--text-color)",
                  }
                : { display: "none" }
            }
          >
            No tasks assigned for today
          </div>
        )}
      </div>
      <div
        style={
          doneType === "left" && incompletedTasksList.length === 0
            ? {
                fontSize: " 0.9rem",
                position: "absolute",
                fontWeight: "normal",
                width: "fit-content",
                left: "0",
                right: "20%",
                marginRight: "auto",
                marginLeft: "auto",
                marginTop: "1rem",
                color: "var(--text-color)",
              }
            : { display: "none" }
        }
      >
        No tasks left to do
      </div>
      <div
        style={
          doneType === "done" && completedTasksList.length === 0
            ? {
                fontSize: " 0.9rem",
                position: "absolute",
                fontWeight: "normal",
                width: "fit-content",
                left: "0",
                right: "20%",
                marginRight: "auto",
                marginLeft: "auto",
                marginTop: "1rem",
                color: "var(--text-color)",
              }
            : { display: "none" }
        }
      >
        No tasks done
      </div>
    </div>
  );
}

export default TaskListContent;

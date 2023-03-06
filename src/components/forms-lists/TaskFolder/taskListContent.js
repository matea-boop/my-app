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

function TaskListContent({ page, setTotalPages, type }) {
  const { isModalOpen, isDeleted, isTaskChecked } = useAllContext();
  const [taskList, setTaskList] = useState([]);
  const tasksPerPage = type === "mainTask" ? 12 : 5;
  const startIndex = (page - 1) * tasksPerPage;
  let todaysDate = new Date().toLocaleDateString();
  const mainList = [];

  useEffect(() => {
    getDataFromDB().then((res) => {
      setTaskList(res);
    });
  }, [isModalOpen, isDeleted, isTaskChecked]);

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

  useEffect(() => {
    setTotalPages(Math.ceil(mainList.length / tasksPerPage));
  }, [mainList]);

  return (
    <div>
      <div style={{ position: "absolute", width: "80%" }}>
        {" "}
        {selectedTasks && selectedTasks.length > 0 ? (
          selectedTasks.map((task) => {
            return task.date === todaysDate ? (
              <TaskItem
                key={task.id}
                task={task}
                status={task.status}
                subtasks={task.subtasks}
              />
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

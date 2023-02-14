import React from "react";
import TaskItem from "./taskListItem";
import { useEffect, useState } from "react";
import axios from "axios";
import { useAllContext } from "../../../context/indexContext";
import Loading from "../../Loading";

function TaskListContent({ page, setTotalPages }) {
  const { isModalOpen, isDeleted, isTaskChecked } = useAllContext();
  const [taskList, setTaskList] = useState([]);
  const [loading, setLoading] = useState(false);
  const tasksPerPage = 4;
  const startIndex = (page - 1) * tasksPerPage;
  let todaysDate = new Date().toLocaleDateString();
  const mainList = [];

  async function getDataFromDB() {
    const url = "http://localhost:3001/api/tasks";

    try {
      setLoading(true);
      const {
        data: { tasks },
      } = await axios.get(url);
      setLoading(false);
      return tasks;
    } catch (error) {
      setLoading(false);
      console.log("error", error);
      return error;
    }
  }

  useEffect(() => {
    getDataFromDB().then((res) => setTaskList(res));
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
      {/* {loading ? (
        <Loading />
      ) : ( */}
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
      {/* )} */}
    </div>
  );
}

export default TaskListContent;

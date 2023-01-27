import React from "react";
import { useSelector } from "react-redux";
import TaskItem from "./taskListItem";
import { useEffect, useState } from "react";
import axios from "axios";

function TaskListContent({ page, setTotalPages }) {
  const taskList = useSelector((state) => state.task.taskList);
  const tasksPerPage = 4;
  const startIndex = (page - 1) * tasksPerPage;
  let todaysDate = new Date().toLocaleDateString();
  const mainList = [];
  taskList.forEach((task) => {
    if (task.date === todaysDate) {
      mainList.push(task);
    }
  });

  const [taskData, setTaskData] = useState({
    data: [],
    id: 0,
    message: null,
    intervalIsSet: false,
    idToDelete: null,
    idToUpdate: null,
    objectToUpdate: null,
  });

  useEffect(() => {
    const url = "http://localhost:3035/api/getData";

    const componentDidMount = () => {
      fetchData();
      if (!taskData.intervalIsSet) {
        let interval = setInterval(fetchData(), 1000);
        setTaskData({ intervalIsSet: interval });
      }
    };

    const componentWillUnmount = () => {
      if (taskData.intervalIsSet) {
        clearInterval(taskData.intervalIsSet);
        setTaskData({ intervalIsSet: null });
      }
    };

    const fetchData = async () => {
      try {
        const response = await fetch(url);
        const json = await response.json();
        setTaskData({ data: json.data });
        console.log(json);
      } catch (error) {
        console.log("error", error);
      }
    };

    fetchData();
  }, []);

  console.log(taskData.data);
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
        {taskData.data && taskData.data.length > 0 ? (
          taskData.data.map((task) => {
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
              paddingLeft: "1.5rem",
            }}
          >
            No tasks left for today
          </div>
        )}
      </div>
    </div>
  );
}

export default TaskListContent;

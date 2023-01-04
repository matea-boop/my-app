import React from "react";
import { useSelector } from "react-redux";
import TaskItem from "./taskListItem";
import { useEffect } from "react";

function TaskListContent({ page, setTotalPages }) {
  const taskList = useSelector((state) => state.task.taskList);
  const tasksPerPage = 4;
  const startIndex = (page - 1) * tasksPerPage;
  const selectedTasks = taskList.slice(startIndex, startIndex + tasksPerPage);

  useEffect(() => {
    setTotalPages(Math.ceil(taskList.length / tasksPerPage));
  }, [taskList]);
  return (
    <div>
      <div style={{ position: "absolute", width: "80%" }}>
        {" "}
        {taskList && taskList.length > 0
          ? selectedTasks.map((task) => (
              <TaskItem
                key={task.id}
                task={task}
                status={task.status}
                subtasks={task.subtasks}
              />
            ))
          : "No tasks left for today"}
      </div>
    </div>
  );
}

export default TaskListContent;

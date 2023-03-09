import React from "react";
import styled from "styled-components";
import { useState } from "react";
import TaskListContent from "../../forms-lists/TaskFolder/taskListContent";
import TaskPagination from "../../forms-lists/TaskFolder/taskPagination";
import TaskPercentBar from "./taskPercentBar";
import TaskForm from "../../forms-lists/TaskFolder/taskReducer/taskForm";
import TasksSorted from "./tasksSorted";
import { useAllContext } from "../../../context/indexContext";
import axios from "axios";
import { useEffect } from "react";

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

export const MainTasks = () => {
  const { isModalOpen, isDeleted, isTaskChecked } = useAllContext();
  const [doneType, setDoneType] = useState("all");
  const [formOpen, setFormOpen] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  let todaysDate = new Date().toLocaleDateString();
  const [page, setPage] = useState(1);
  const [pageActive, setPageActive] = useState(page);
  const [taskList, setTaskList] = useState([]);

  const handleClick = (num) => {
    setPage(num);
    setPageActive(num);
  };

  const mainList =
    taskList && taskList.length > 0
      ? taskList.filter((task) => task.date === todaysDate)
      : [];

  const completedTasks =
    mainList && mainList.length > 0
      ? mainList.filter((task) => task.status !== false).length
      : 0;

  const completedTasksList =
    mainList && mainList.length > 0
      ? mainList.filter((task) => task.status === true)
      : [];

  const incompletedTasks =
    mainList && mainList.length > 0
      ? mainList.filter((task) => task.status !== true).length
      : 0;

  const incompletedTasksList =
    mainList && mainList.length > 0
      ? mainList.filter((task) => task.status === false)
      : [];
  const allTasks = mainList.length;

  useEffect(() => {
    getDataFromDB().then((res) => setTaskList(res));
  }, [isModalOpen, isDeleted, isTaskChecked]);

  return (
    <Wrapper>
      <div className="title-row">
        <div className="title">Tasks</div>
      </div>
      <div className="progress">
        <TaskPercentBar completedTasks={completedTasks} allTasks={allTasks} />
      </div>
      <div className="finished-left-list">
        <div
          className="tasks"
          onClick={() => setDoneType("all")}
          style={doneType === "all" ? { opacity: "1" } : { opacity: "0.5" }}
        >
          <p>All</p>
          <TasksSorted
            type="all"
            completedTasks={completedTasks}
            allTasks={allTasks}
            incompletedTasks={incompletedTasks}
          />
        </div>
        <div
          className="tasks"
          onClick={() => setDoneType("left")}
          style={doneType === "left" ? { opacity: "1" } : { opacity: "0.5" }}
        >
          <p>Left to do</p>
          <TasksSorted
            type="left"
            completedTasks={completedTasks}
            allTasks={allTasks}
            incompletedTasks={incompletedTasks}
          />
        </div>
        <div
          className="tasks"
          onClick={() => setDoneType("done")}
          style={doneType === "done" ? { opacity: "1" } : { opacity: "0.5" }}
        >
          <p>Done</p>
          <TasksSorted
            type="done"
            completedTasks={completedTasks}
            allTasks={allTasks}
            incompletedTasks={incompletedTasks}
          />
        </div>
      </div>
      <div className="task-list">
        <TaskListContent
          completedTasksList={completedTasksList}
          incompletedTasksList={incompletedTasksList}
          doneType={doneType}
          type="mainTask"
          page={page}
          totalPages={totalPages}
          setTotalPages={setTotalPages}
          formOpen={formOpen}
        />
      </div>
      <div className="pagination">
        <TaskPagination
          totalPages={totalPages}
          handleClick={handleClick}
          pageActive={pageActive}
        />
      </div>

      <div
        className="btn-add"
        onClick={() => {
          setFormOpen(true);
        }}
      >
        Add new
      </div>
      {formOpen ? (
        <TaskForm type="add" isModalOpen={formOpen} modalClose={setFormOpen} />
      ) : null}
    </Wrapper>
  );
};
export default MainTasks;
const Wrapper = styled.div`
  position: relative;
  background: var(--sidebar-color);
  border-radius: var(--border-radius);

  width: 100%;

  .btn-add {
    position: absolute;

    height: 4%;
    width: fit-content;

    font-size: var(--text-size);
    opacity: 0.5;
    font-weight: lighter;
    cursor: pointer;

    right: 10%;

    bottom: 3%;

    &:hover {
      opacity: 1;
    }
  }

  .finished-left-list {
    position: absolute;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;

    height: 6%;
    width: 80%;
    left: 10%;
    top: 14%;
  }

  .progress {
    position: absolute;
    display: flex;
    align-items: center;

    height: 6%;
    width: 90%;
    left: 5%;
    top: 8%;
  }

  .title-row {
    position: absolute;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;

    height: 6%;
    width: 80%;
    left: 10%;
    top: 2%;

    color: var(--text-color);

    .title {
      text-align: left;

      font-size: 0.9rem;
      font-weight: normal;

      margin-right: 0.5rem;
    }
  }

  .task-list {
    position: absolute;
    width: 100%;
    height: 70%;

    top: 20%;
    left: 10%;
  }

  .tasks {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;

    cursor: pointer;

    p {
      font-size: var(--text-size);

      font-weight: lighter;

      padding-right: 0.5rem;
    }
  }

  .pagination {
    position: absolute;

    height: 4%;
    width: fit-content;
    left: 0;
    right: 0;

    bottom: 3%;
    margin-left: auto;
    margin-right: auto;
  }
`;

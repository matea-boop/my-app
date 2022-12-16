import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import TaskPagination from "../forms-lists/taskPagination";
import TaskListContent from "../forms-lists/taskListContent";
import { Toaster } from "react-hot-toast";
import TasksDone from "../forms-lists/tasksDone";

export const Tasks = () => {
  const [totalPages, setTotalPages] = useState(0);
  const [page, setPage] = useState(1);
  const [pageActive, setPageActive] = useState(page);

  const handleClick = (num) => {
    setPage(num);
    setPageActive(num);
  };

  return (
    <Wrapper>
      <div className="title">
        <div className="title-tasks">
          <h1>Tasks</h1>
          <div className="tasks-done">
            <TasksDone />
          </div>
        </div>
        <Link to="/Tasks">View Tasks</Link>
      </div>
      <div className="task-list">
        <TaskListContent
          page={page}
          totalPages={totalPages}
          setTotalPages={setTotalPages}
        />
      </div>
      <div className="pagination">
        <TaskPagination
          totalPages={totalPages}
          handleClick={handleClick}
          pageActive={pageActive}
        />
      </div>
      <Toaster toastOptions={{ style: { fontSize: "1rem" } }} />
    </Wrapper>
  );
};
export default Tasks;

const Wrapper = styled.div`
  position: absolute;
  height: 100%;
  width: 100%;
  grid-area: tasks;
  border-radius: 0.3rem;
  background-color: var(--sidebar-color);

  .title {
    color: var(--text-color);
    display: flex;
    flex-direction: row;
    justify-content: space-between;

    .title-tasks {
      display: flex;
      align-items: center;
      flex-direction: row;
      justify-content: space-between;
    }

    h1 {
      font-size: 1rem;
      text-align: left;
      margin: 1.5rem 0.5rem 1.5rem 1.5rem;
      font-weight: normal;
    }
    .tasks-done {
      padding: 0.2rem 0.5rem 0.2rem 0.5rem;
      background-color: var(--box-color);
      border-radius: var(--border-radius);
    }
    a {
      font-size: 0.9rem;
      float: right;
      margin: 1.5rem;
      opacity: 0.5;
      font-weight: lighter;
    }
  }
  .task-list {
    width: 80%;
    margin: 0 auto;
  }
  .pagination {
    position: absolute;
    bottom: 1rem;
    left: 0;
    right: 0;
    margin-left: auto;
    margin-right: auto;
    width: fit-content;
  }
`;

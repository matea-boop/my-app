import React, { useState } from "react";
import styled from "styled-components";
import TaskPagination from "../forms-lists/TaskFolder/taskPagination";
import TaskListContent from "../forms-lists/TaskFolder/taskListContent";
import { Toaster } from "react-hot-toast";
import TasksDone from "../forms-lists/TaskFolder/tasksDone";

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
        <h1>Tasks</h1>
        <div className="tasks-done">
          <TasksDone />
        </div>
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
  grid-area: tasks;

  min-height: 20rem;
  height: 100%;
  width: 100%;
  min-width: 14rem;

  border-radius: var(--border-radius);
  background-color: var(--sidebar-color);
  box-shadow: 0px 0px 26px -20px rgba(0, 0, 0, 1);

  .title {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;

    height: 20%;
    color: var(--text-color);

    h1 {
      display: flex;
      align-items: center;

      font-size: 0.9rem;
      font-weight: normal;

      padding-right: 0.5rem;
    }

    .tasks-done {
      background-color: var(--box-color);
      border-radius: var(--border-radius);

      padding: 0.2rem 0.5rem 0.2rem 0.5rem;
    }

    a {
      font-size: var(--text-size);
      float: right;
      opacity: 0.5;
      font-weight: lighter;

      margin: 1.7rem 1.7rem 1.3rem 1.7rem;

      &:hover {
        opacity: 1;
      }
    }
  }

  .task-list {
    width: 80%;
    height: 70%;
    margin: 0 auto;
  }

  .pagination {
    position: absolute;

    width: fit-content;
    height: 9%;
    left: 0;
    right: 0;

    bottom: 1%;
    margin-left: auto;
    margin-right: auto;
  }

  @media screen and (max-width: 1024px) {
    .title {
      h1 {
        font-size: 0.9rem;
      }
      .tasks-done {
        padding: 0.15rem 0.45rem 0.15rem 0.45rem;
        font-size: 0.9rem;
      }
    }
  }
`;

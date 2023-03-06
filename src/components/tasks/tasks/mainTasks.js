import React from "react";
import styled from "styled-components";
import { useState } from "react";
import TaskListContent from "../../forms-lists/TaskFolder/taskListContent";
import TaskPagination from "../../forms-lists/TaskFolder/taskPagination";
import TasksDone from "../../forms-lists/TaskFolder/tasksDone";
import { Link } from "react-router-dom";
import { useAllContext } from "../../../context/indexContext";
export const MainTasks = () => {
  const { modalOpen, modalClose } = useAllContext();

  const [totalPages, setTotalPages] = useState(0);
  const [page, setPage] = useState(1);
  const [pageActive, setPageActive] = useState(page);

  const handleClick = (num) => {
    setPage(num);
    setPageActive(num);
  };
  return (
    <Wrapper>
      <div className="title-row">
        <div className="title">Tasks</div>
        <div className="tasks-done">
          <TasksDone />
        </div>
      </div>
      <div className="progress">todays progres</div>
      <div className="finished-left-list">
        <div className="tasks-left">left</div>
        <div className="tasks-finished">done</div>
      </div>
      <div className="task-list">
        <TaskListContent
          type="mainTask"
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

      <div className="btn-add" to="/Tasks" onClick={() => modalOpen()}>
        Add new
      </div>
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

    right: 10%;

    bottom: 0.6rem;

    &:hover {
      opacity: 1;
    }
  }

  .finished-left-list {
    position: absolute;
    display: flex;
    flex-direction: row;
    justify-content: space-between;

    height: 6%;
    width: 80%;
    left: 10%;
    top: 14%;
  }

  .progress {
    position: absolute;

    height: 6%;
    width: 80%;
    left: 10%;
    top: 8%;
  }

  .title-row {
    position: absolute;
    display: flex;
    flex-direction: row;
    justify-content: center;

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

    .tasks-done {
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: var(--box-color);
      border-radius: var(--border-radius);

      height: 40%;

      padding: 0.2rem 0.5rem 0.2rem 0.5rem;
    }
  }

  .task-list {
    position: absolute;
    width: 100%;

    top: 18%;
    left: 10%;
  }

  .pagination {
    position: absolute;

    height: 4%;
    width: fit-content;
    left: 0;
    right: 0;

    bottom: 0.6rem;
    margin-left: auto;
    margin-right: auto;
  }
`;

import React from "react";
import { BsFillCircleFill } from "react-icons/bs";
import styled from "styled-components";
import { useState, useEffect } from "react";
import { useAllContext } from "../../../context/indexContext";
import getTaskDataFromDB from "../../../constants/dataFunctions/taskData";

export const TaskPagination = ({ totalPages, handleClick, pageActive }) => {
  const { isModalOpen, isDeleted, isTaskChecked } = useAllContext();
  const [taskList, setTaskList] = useState([]);
  const pages = [...Array(totalPages).keys()].map((num) => num + 1);

  useEffect(() => {
    getTaskDataFromDB().then((res) => setTaskList(res));
  }, [isModalOpen, isDeleted, isTaskChecked]);

  return (
    <Wrapper>
      <div
        className="container"
        style={taskList.length > 0 ? { display: "flex" } : { display: "none" }}
      >
        {pages.map((num) => (
          <button
            key={num}
            className="btn-pagination"
            onClick={() => {
              handleClick(num);
            }}
          >
            <BsFillCircleFill
              className={pageActive === num ? "btn active" : "btn"}
            />
          </button>
        ))}
      </div>
    </Wrapper>
  );
};

export default TaskPagination;

const Wrapper = styled.div`
  .container {
    &:last-child {
      padding-right: 0;
    }
  }

  .btn-pagination {
    background: none;
    border: none;

    padding-right: 0.5rem;
  }

  .btn {
    color: var(--text-color);
    transform: scale(0.8);
    opacity: 0.6;
    cursor: pointer;
  }

  .active {
    color: var(--text-color);
    cursor: pointer;
    opacity: 1;
    transform: scale(1);
  }
`;

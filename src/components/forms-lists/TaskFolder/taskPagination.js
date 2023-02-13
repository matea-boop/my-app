import React from "react";
import { BsFillCircleFill } from "react-icons/bs";
import styled from "styled-components";
import { useState, useEffect } from "react";
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

export const TaskPagination = ({ totalPages, handleClick, pageActive }) => {
  const { isModalOpen, isDeleted, isTaskChecked } = useAllContext();
  const [taskList, setTaskList] = useState([]);
  const pages = [...Array(totalPages).keys()].map((num) => num + 1);

  useEffect(() => {
    getDataFromDB().then((res) => setTaskList(res));
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
    color: var(--box-color);
    transform: scale(0.8);
    cursor: pointer;
  }
  .active {
    color: var(--body-color);
    cursor: pointer;
    transform: scale(1);
  }
`;

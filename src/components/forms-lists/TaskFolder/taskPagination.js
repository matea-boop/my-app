import React from "react";
import { BsFillCircleFill } from "react-icons/bs";
import styled from "styled-components";

export const TaskPagination = ({ totalPages, handleClick, pageActive }) => {
  const pages = [...Array(totalPages).keys()].map((num) => num + 1);

  return (
    <Wrapper>
      <div className="container">
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

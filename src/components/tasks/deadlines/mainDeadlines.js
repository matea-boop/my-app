import React from "react";
import styled from "styled-components";
import DeadlineForm from "../../forms-lists/DeadlineFolder/DeadlineForm";
import DeadlineList from "../../forms-lists/DeadlineFolder/deadlineList";
import { useAllContext } from "../../../context/indexContext";
import { useState } from "react";

export const MainDeadlines = () => {
  const { isDeadlineModalOpen, deadlineModalClose } = useAllContext();
  const [totalPages, setTotalPages] = useState(0);
  const [formOpen, setFormOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [pageActive, setPageActive] = useState(page);

  const handleClick = (num) => {
    setPage(num);
    setPageActive(num);
  };
  return (
    <Wrapper>
      <div className="title-row">
        <div className="title">Deadlines</div>
      </div>
      <div className="deadline-list">
        <DeadlineList
          page={page}
          totalPages={totalPages}
          setTotalPages={setTotalPages}
        />
      </div>
      <div className="pagination">
        {/* <HabitPagination
          totalPages={totalPages}
          handleClick={handleClick}
          pageActive={pageActive}
        /> */}
      </div>

      <div
        className="btn-add"
        onClick={() => {
          setFormOpen(true);
        }}
      >
        Add New
      </div>
      {formOpen ? (
        <DeadlineForm
          type="add"
          isDeadlineModalOpen={formOpen}
          deadlineModalClose={setFormOpen}
        />
      ) : null}
    </Wrapper>
  );
};

export default MainDeadlines;

const Wrapper = styled.div`
  position: relative;
  background: var(--sidebar-color);
  border-radius: var(--border-radius);

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

  .deadline-list {
    position: absolute;

    height: 80%;
    width: 100%;
    left: 10%;
    top: 10%;
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

  .btn-add {
    position: absolute;
    display: flex;
    align-items: center;

    height: 6%;
    width: fit-content;

    font-size: var(--text-size);
    opacity: 0.5;
    font-weight: lighter;
    cursor: pointer;

    right: 10%;

    top: 2%;

    &:hover {
      opacity: 1;
    }
  }
`;

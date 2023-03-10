import React from "react";
import { useState } from "react";
import styled from "styled-components";
import HabitForm from "../../forms-lists/HabitFolder/HabitForm";
import HabitList from "../../forms-lists/HabitFolder/habitList";
import HabitPercentBar from "./habitPercentBar";
import HabitPagination from "./habitPagination";
import { useAllContext } from "../../../context/indexContext";
import { useEffect } from "react";
import axios from "axios";

async function getHabitDataFromDB() {
  const url = "http://localhost:3001/api/habits";

  try {
    const {
      data: { habits },
    } = await axios.get(url);

    return habits;
  } catch (error) {
    console.log("error", error);
    return error;
  }
}

export const MainHabits = () => {
  const { isHabitModalOpen } = useAllContext();
  const [totalPages, setTotalPages] = useState(0);
  const [habitList, setHabitList] = useState([]);
  const [formOpen, setFormOpen] = useState(false);
  const [targetsDone, setTargetsDone] = useState(0);
  const [page, setPage] = useState(1);
  const [pageActive, setPageActive] = useState(page);

  useEffect(() => {
    getHabitDataFromDB().then((res) => {
      setHabitList(res);
    });
  }, [isHabitModalOpen]);

  const targetSumAll = habitList.reduce(
    (total, current) => (total = total + parseInt(current.target)),
    0
  );

  const handleClick = (num) => {
    setPage(num);
    setPageActive(num);
  };

  const getTargetsDone = (value) => {
    setTargetsDone(value);
  };

  return (
    <Wrapper>
      <div className="title-row">
        <div className="title">Habits</div>
      </div>
      <div className="progress">
        <HabitPercentBar
          targetSumAll={targetSumAll}
          targetsDone={targetsDone}
        />
      </div>
      <div className="habit-list">
        <HabitList
          formOpen={formOpen}
          page={page}
          totalPages={totalPages}
          setTotalPages={setTotalPages}
          getTargetsDone={getTargetsDone}
        />
      </div>
      <div className="pagination">
        <HabitPagination
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
        <HabitForm
          type="add"
          isHabitModalOpen={formOpen}
          habitModalClose={setFormOpen}
        />
      ) : null}
    </Wrapper>
  );
};
export default MainHabits;
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

  .progress {
    position: absolute;
    display: flex;
    align-items: center;

    height: 6%;
    width: 90%;
    left: 5%;
    top: 8%;
  }

  .habit-list {
    position: absolute;

    height: 75%;
    width: 100%;
    left: 10%;
    top: 17%;
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

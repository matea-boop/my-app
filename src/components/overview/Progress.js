import React, { useState } from "react";
import styled from "styled-components";
import AreaChartProgress from "./Progress/areaChart";
import { BsFillCircleFill } from "react-icons/bs";

export const Progress = () => {
  const [button1Clicked, setButton1Clicked] = useState(true);
  const [button2Clicked, setButton2Clicked] = useState(false);

  const [weekButton, setWeekButton] = useState(true);
  const [monthButton, setMonthButton] = useState(false);

  const handleClick1 = () => {
    setButton1Clicked(!button1Clicked);
  };
  const handleClick2 = () => {
    setButton2Clicked(!button2Clicked);
  };

  const weekClick = () => {
    if (!weekButton) {
      setMonthButton(false);
    }
    setWeekButton(true);
  };

  const monthClick = () => {
    if (!monthButton) {
      setWeekButton(false);
    }
    setMonthButton(true);
  };
  return (
    <Wrapper>
      <div className="title-p">
        <div className="title-progress">Progress</div>
      </div>
      <div className="buttons-area">
        <div className="buttons-area-1">
          <div
            className="item"
            onClick={handleClick1}
            style={button1Clicked ? { opacity: "1" } : { opacity: "0.5" }}
          >
            <BsFillCircleFill className="task-circle" />
            <p>Tasks</p>
          </div>
          <div
            className="item"
            onClick={handleClick2}
            style={button2Clicked ? { opacity: "1" } : { opacity: "0.5" }}
          >
            <BsFillCircleFill className="notebook-circle" />
            <p>Notebook</p>
          </div>
        </div>
        <div className="buttons-area-2">
          <div
            className="week"
            onClick={weekClick}
            style={weekButton ? { opacity: "1" } : { opacity: "0.5" }}
          >
            Week
          </div>
          <div
            className="month"
            onClick={monthClick}
            style={monthButton ? { opacity: "1" } : { opacity: "0.5" }}
          >
            Month
          </div>
        </div>
      </div>
      <AreaChartProgress
        className="areaChart"
        button1Clicked={button1Clicked}
        button2Clicked={button2Clicked}
        monthButton={monthButton}
        weekButton={weekButton}
      />
    </Wrapper>
  );
};
export default Progress;

const Wrapper = styled.div`
  position: absolute;
  display: grid;
  grid-area: progress;

  min-height: 20rem;
  height: 100%;
  width: 100%;

  border-radius: var(--border-radius);
  background-color: var(--sidebar-color);
  box-shadow: 0px 0px 26px -20px rgba(0, 0, 0, 1);

  .title-p {
    display: flex;
    flex-direction: row;
    justify-content: space-between;

    color: var(--text-color);

    .title-progress {
      text-align: left;

      font-size: 1rem;
      font-weight: normal;

      margin: 1.5rem 1.5rem 0rem 1.5rem;
    }

    a {
      font-size: var(--text-size);
      float: right;

      opacity: 0.5;
      font-weight: lighter;

      margin: 1.7rem 1.5rem 0rem 1.7rem;

      &:hover {
        opacity: 1;
      }
    }
  }

  .buttons-area {
    display: flex;
    justify-content: space-between;
    color: var(--text-color);
  }

  .buttons-area-1 {
    display: flex;
    justify-content: space-between;

    font-size: var(--text-size);
    font-weight: lighter;
    color: var(--text-color);

    margin-left: 1.5rem;
  }

  .item {
    display: flex;
    align-items: center;
    justify-content: space-between;

    cursor: pointer;

    padding-right: 1rem;
    gap: 0.5rem;
  }

  .buttons-area-2 {
    display: flex;
    justify-content: space-between;

    font-size: var(--text-size);
    font-weight: lighter;
    color: var(--text-color);

    gap: 1rem;
    margin-right: 1.5rem;
  }

  .task-circle {
    color: var(--mainblue-color);
    font-size: 0.5rem;
  }

  .notebook-circle {
    color: var(--mainorange-color);
    font-size: 0.5rem;
  }

  .all-circle {
    color: var(--text-color);
    font-size: 0.5rem;
  }

  .week {
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;

    width: 4.5rem;

    border-radius: var(--border-radius);
    box-shadow: 0px 0px 7px -4px rgba(0, 0, 0, 1);
    background: var(--small-btn-color);
    cursor: pointer;
  }

  .week:active {
    transform: scale(0.9);
    box-shadow: 0px 0px 2px -4px rgba(0, 0, 0, 1);
  }

  .month {
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;

    width: 4.5rem;

    border-radius: var(--border-radius);
    box-shadow: 0px 0px 7px -4px rgba(0, 0, 0, 1);
    cursor: pointer;
    background: var(--small-btn-color);
  }

  .month:active {
    transform: scale(0.9);
    box-shadow: 0px 0px 2px -4px rgba(0, 0, 0, 1);
  }
`;

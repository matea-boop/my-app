import React, { useState } from "react";
import styled from "styled-components";
import AreaChartProgress from "./Progress/areaChart";
import { Link } from "react-router-dom";
import { BsFillCircleFill } from "react-icons/bs";

export const Progress = () => {
  const [button1Clicked, setButton1Clicked] = useState(true);
  const [button2Clicked, setButton2Clicked] = useState(false);
  const [button3Clicked, setButton3Clicked] = useState(false);

  const [weekButton, setWeekButton] = useState(true);
  const [monthButton, setMonthButton] = useState(false);

  const handleClick1 = () => {
    setButton1Clicked(!button1Clicked);
  };
  const handleClick2 = () => {
    setButton2Clicked(!button2Clicked);
  };
  const handleClick3 = () => {
    setButton3Clicked(!button3Clicked);
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
        <Link to="/Statistics">View Statistics</Link>
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
          <div
            className="item"
            onClick={handleClick3}
            style={button3Clicked ? { opacity: "1" } : { opacity: "0.5" }}
          >
            <BsFillCircleFill className="all-circle" />
            <p>All</p>
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
        button3Clicked={button3Clicked}
        monthButton={monthButton}
        weekButton={weekButton}
      />
    </Wrapper>
  );
};
export default Progress;

const Wrapper = styled.div`
  position: absolute;
  height: 100%;
  width: 100%;
  display: grid;
  grid-area: progress;
  border-radius: 0.3rem;
  background-color: var(--sidebar-color);
  .title-p {
    color: var(--text-color);
    display: flex;
    flex-direction: row;
    justify-content: space-between;

    .title-progress {
      font-size: 1rem;
      text-align: left;
      margin: 1.5rem 1.5rem 0.1rem 1.5rem;
      font-weight: normal;
    }

    a {
      font-size: 0.8rem;
      float: right;
      margin: 1.7rem 1.5rem 0.1rem 1.7rem;
      opacity: 0.5;
      font-weight: lighter;
      &:hover {
        opacity: 1;
      }
    }
  }
  .buttons-area {
    display: flex;
    justify-content: space-between;
    margin-top: 0.8rem;
  }

  .buttons-area-1 {
    font-size: 0.8rem;
    font-weight: normal;

    margin-left: 1.5rem;
    display: flex;

    justify-content: space-between;
  }
  .item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-right: 1rem;
    gap: 0.5rem;
    cursor: pointer;
  }
  .buttons-area-2 {
    font-size: 0.8rem;
    gap: 1rem;
    margin-right: 1.5rem;
    display: flex;
    justify-content: space-between;
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
    width: 4.5rem;
    text-align: center;
    border-radius: var(--border-radius);
    padding: 0.5rem 0rem 0rem 0rem;
    background: var(--body-color);
    cursor: pointer;
  }
  .month {
    width: 4.5rem;
    text-align: center;
    border-radius: var(--border-radius);
    padding: 0.5rem 0rem 0rem 0rem;
    cursor: pointer;
    background: var(--body-color);
  }
`;

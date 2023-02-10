import React from "react";
import styled from "styled-components";
import AreaChartProgress from "./Progress/areaChart";
import { Link } from "react-router-dom";
import { BsFillCircleFill } from "react-icons/bs";

export const Progress = () => {
  return (
    <Wrapper>
      <div className="title-p">
        <div className="title-progress">Progress</div>
        <Link to="/Statistics">View Statistics</Link>
      </div>
      <div className="buttons-area">
        <div className="buttons-area-1">
          <div className="item">
            <BsFillCircleFill className="task-circle" />
            &nbsp;&nbsp;Tasks
          </div>
          <div className="item">
            <BsFillCircleFill className="notebook-circle" />
            &nbsp;&nbsp;Notebook
          </div>
          <div className="item">
            <BsFillCircleFill className="all-circle" />
            &nbsp;&nbsp;All
          </div>
        </div>
        <div className="buttons-area-2">
          <div>week</div>
          <div>month</div>
        </div>
      </div>
      <AreaChartProgress className="areaChart" />
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
    margin-top: 1.5rem;
  }

  .buttons-area-1 {
    font-size: 0.8rem;
    font-weight: normal;

    margin-left: 1.5rem;
    display: flex;

    justify-content: space-between;
  }
  .item {
    padding-right: 1rem;
  }
  .buttons-area-2 {
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
`;

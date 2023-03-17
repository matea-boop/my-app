import moment from "moment";
import React from "react";
import styled from "styled-components";
import EventItem from "./eventItem";
import TaskItem from "../forms-lists/TaskFolder/taskListItem";

export const TodayDay = ({ date, incompletedTasks, selectedEventList }) => {
  const today = moment(date, "DD/MM/YYYY").format("dddd Do MMMM");
  const currDate = moment().format("DD/MM/YYYY");

  return (
    <Wrapper>
      <div className="top-contain">
        <div className="title">{today}</div>
      </div>
      <div className="tasks">
        <div className="task-title">Tasks remaining</div>
        <div className="task-list">
          {incompletedTasks &&
          incompletedTasks.length > 0 &&
          date === currDate ? (
            incompletedTasks.map((task) => {
              return <TaskItem type="main-calendar" task={task} />;
            })
          ) : (
            <div className="no">No tasks on days that are not today</div>
          )}
        </div>
      </div>

      <div className="events">
        <div className="event-title">Events scheduled</div>
        <div className="event-list">
          {selectedEventList && selectedEventList.length > 0 ? (
            selectedEventList.map((event) => {
              return <EventItem event={event} />;
            })
          ) : (
            <div className="no">No events on this day</div>
          )}
        </div>
      </div>
    </Wrapper>
  );
};
export default TodayDay;
const Wrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  width: 100%;

  border-radius: var(--border-radius);
  background-color: var(--box-color);

  .top-contain {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;

    width: 100%;
    height: 15%;

    padding-left: 2rem;
    padding-right: 2rem;
  }

  .task-title {
    font-weight: lighter;
    margin-bottom: 0.5rem;
    height: 20%;
    font-size: var(--text-size);
  }

  .tasks {
    display: flex;
    flex-direction: column;
    height: 20%;
    width: 80%;
    overflow: hidden;
  }

  .title {
    font-weight: lighter;
  }

  .task-list {
    display: flex;
    flex-direction: column;
    font-size: var(--text-size);
    font-weight: lighter;
    overflow-y: auto;

    background-color: var(--box-color);
    border-radius: var(--border-radius);

    width: 100%;
    height: 80%;
    padding-right: 0.2rem;

    ::-webkit-scrollbar {
      width: 3px;
    }

    ::-webkit-scrollbar-track {
      background: var(--box-color);
      border-radius: 10px;
    }

    ::-webkit-scrollbar-thumb {
      background: rgba(232, 244, 250, 0.5);
      border-radius: 10px;
    }
  }

  .events {
    position: absolute;

    position: absolute;
    display: flex;
    flex-direction: column;

    height: 50%;
    width: 80%;
    overflow: hidden;

    top: 37%;
    left: 10%;
  }

  .event-title {
    font-weight: lighter;
    font-size: var(--text-size);
    margin-bottom: 0.5rem;
    height: 20%;
  }

  .no {
    font-weight: lighter;
    font-size: 0.6rem;
  }

  .event-list {
    display: flex;
    flex-direction: column;

    width: 100%;
    height: 80%;

    padding-right: 0.2rem;

    overflow-y: auto;

    ::-webkit-scrollbar {
      width: 3px;
    }

    ::-webkit-scrollbar-track {
      background: var(--box-color);
      border-radius: 10px;
    }

    ::-webkit-scrollbar-thumb {
      background: rgba(232, 244, 250, 0.5);
      border-radius: 10px;
    }
  }
`;

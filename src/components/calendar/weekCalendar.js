import React from "react";
import styled from "styled-components";
import { TfiAngleLeft } from "react-icons/tfi";
import { TfiAngleRight } from "react-icons/tfi";
import { MdCalendarViewWeek } from "react-icons/md";
import { MdCalendarViewMonth } from "react-icons/md";
import { HiEllipsisVertical } from "react-icons/hi2";
import { useState } from "react";
import moment from "moment";
import EventItem from "./eventItem";
import { useEffect } from "react";

export const WeekCalendar = ({ getType, type, eventList }) => {
  const today = moment(new Date()).format("DD/MM/YYYY");
  const [dateClicked, setDateClicked] = useState(today);
  const [currentDate, setCurrentDate] = useState(new Date().getDate());
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const curr = new Date();
  const dayOfWeek = curr.getDay();
  const firstD = new Date(curr.setDate(curr.getDate() - curr.getDay()));
  const lastD = new Date(curr.setDate(curr.getDate() - curr.getDay() + 6));
  const [firstDayOfWeek, setFirstDayOfWeek] = useState(firstD.getTime());
  const week = [];

  for (let i = 0; i < 7; i++) {
    const curr = new Date();
    const first = curr.getDate() - curr.getDay();
    const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();

    if (firstD.getMonth() !== lastD.getMonth()) {
      if (i < firstDayOfMonth) {
        week.push({
          date: firstD.getDate() + i,
          time: new Date(firstDayOfWeek).getTime() + i * 24 * 60 * 60 * 1000,
        });
      } else {
        week.push({
          date: first + i,
          time: new Date(firstDayOfWeek).getTime() + i * 24 * 60 * 60 * 1000,
        });
      }
    } else {
      week.push({
        date: first + i,
        time: new Date(firstDayOfWeek).getTime() + i * 24 * 60 * 60 * 1000,
      });
    }
  }

  const [currentWeek, setCurrentWeek] = useState(week);

  const nextWeek = () => {
    const currWeek = [];
    const nextFirstTime =
      new Date(firstDayOfWeek).getTime() + 7 * 24 * 60 * 60 * 1000;

    for (let i = 0; i < 7; i++) {
      currWeek.push({
        date: new Date(
          new Date(nextFirstTime).getTime() + i * 24 * 60 * 60 * 1000
        ).getDate(),
        time: new Date(nextFirstTime).getTime() + i * 24 * 60 * 60 * 1000,
      });
    }

    setFirstDayOfWeek(nextFirstTime);
    setCurrentWeek(currWeek);
  };

  const prevWeek = () => {
    const currWeek = [];
    const prevFirstTime =
      new Date(firstDayOfWeek).getTime() - 7 * 24 * 60 * 60 * 1000;

    for (let i = 0; i < 7; i++) {
      currWeek.push({
        date: new Date(
          new Date(prevFirstTime).getTime() + i * 24 * 60 * 60 * 1000
        ).getDate(),
        time: new Date(prevFirstTime).getTime() + i * 24 * 60 * 60 * 1000,
      });
    }

    setFirstDayOfWeek(prevFirstTime);
    setCurrentWeek(currWeek);
  };

  const firstWeekDayMonthCheck =
    currentWeek && currentWeek.length > 0
      ? new Date(currentWeek[0].time).getMonth()
      : null;
  const lastWeekDayMonthCheck =
    currentWeek && currentWeek.length > 0
      ? new Date(currentWeek[6].time).getMonth()
      : null;

  const check = lastWeekDayMonthCheck === firstWeekDayMonthCheck ? true : false;

  const timeLine = [];
  const selectedList = [[], [], [], [], [], [], []];
  const [timePixel, setTimePixel] = useState(0);
  const [timeLinePosition, setTimeLinePosition] = useState(6);

  for (var i = 0; i < 7; i++) {
    if (
      currentWeek &&
      currentWeek.length > 0 &&
      eventList &&
      eventList.length > 0
    ) {
      eventList.map((event) => {
        if (
          moment(new Date(currentWeek[i].time).getTime()).format(
            "DD/MM/YYYY"
          ) === event.date
        ) {
          selectedList[i].push(event);
        }
      });
    }
  }

  for (var i = 0; i < 7; i++) {
    if (selectedList[i] !== []) {
      selectedList[i].sort((a, b) => {
        return (
          new Date(...a.startTime.split(":").reverse()) -
          new Date(...b.startTime.split(":").reverse())
        );
      });
    }
  }

  for (var i = 0; i <= 23; i++) {
    for (var j = 0; j < 60; j++) {
      if (i < 10) {
        if (j < 10) {
          timeLine.push("0" + i + ":0" + j);
        } else {
          timeLine.push("0" + i + ":" + j);
        }
      } else {
        if (j < 10) {
          timeLine.push(i + ":0" + j);
        } else {
          timeLine.push(i + ":" + j);
        }
      }
    }
  }

  const firstTimeArray = [[], [], [], [], [], [], []];
  for (var i = 0; i < 7; i++) {
    if (selectedList[i].length !== 0) {
      firstTimeArray[i].push(selectedList[i][0].startTime);
    }
  }
  const firstTime = firstTimeArray[dayOfWeek][0];

  useEffect(() => {
    timeLine.map((time, index) => {
      if (time === firstTime) {
        const i = index + 6;
        setTimePixel(i);
      }
    });
  }, [firstTime]);

  useEffect(() => {
    const x = timePixel - 20;
    const y = timeLinePosition - 20;
    if (firstTime) {
      document.getElementById("scroll").scrollTop = x;
    } else {
      document.getElementById("scroll").scrollTop = y;
    }
  }, [timePixel, currentWeek, firstTime]);

  useEffect(() => {
    const intervalTime = setInterval(() => {
      const currentMinute = moment().format("HH:mm");
      timeLine.map((time, index) => {
        if (time === currentMinute) {
          const i = index + 6;
          setTimeLinePosition(i);
        }
      });
    }, 1000);
    return () => clearInterval(intervalTime);
  }, []);

  const [hover, setHover] = useState(false);
  const [event, setEvent] = useState();
  const [color, setColor] = useState();
  const [topMargin, setTopMargin] = useState(0);
  const [leftMargin, setLeftMargin] = useState(0);
  const [rightMargin, setRightMargin] = useState(0);

  const eventDay = event ? moment(event.date, "DD/MM/YYYY").format("d") : null;

  useEffect(() => {
    const left = eventDay ? ((parseInt(eventDay) + 1) * 100) / 7 : 0;
    const right = eventDay ? (parseInt(eventDay) * 100) / 7 : 0;

    if (eventDay < 3) {
      setLeftMargin(left + 1);
      setRightMargin(0);
    } else {
      setLeftMargin(0);
      setRightMargin(100 - right + 0.5);
    }
  }, [hover, eventDay]);

  const getHover = (value) => {
    setHover(value);
  };
  const getEvent = (value) => {
    setEvent(value);
  };
  const getTopMargin = (value) => {
    setTopMargin(value);
  };
  const getColor = (value) => {
    setColor(value);
  };

  return (
    <Wrapper>
      <div className="top-container">
        <div className="header-date-arrows">
          <TfiAngleLeft className="arrow" onClick={prevWeek} />
          <div className="title">
            {check && currentWeek && currentWeek.length > 0
              ? moment(new Date(currentWeek[0].time)).format("Do")
              : moment(new Date(currentWeek[0].time)).format("Do of MMMM")}
            &nbsp;-&nbsp;
            {currentWeek && currentWeek.length > 0
              ? moment(new Date(currentWeek[6].time)).format("Do")
              : null}
            &nbsp;of {moment(new Date(currentWeek[6].time)).format("MMMM")}
          </div>
          <TfiAngleRight className="arrow" onClick={nextWeek} />
        </div>
        <div className="week-month-view">
          <MdCalendarViewWeek
            className="icon"
            style={
              type === "week"
                ? {
                    color: "var(--mainblue-color)",
                    cursor: "pointer",
                  }
                : { color: "var(--text-color)", cursor: "pointer" }
            }
            onClick={() => getType("week")}
          />
          <MdCalendarViewMonth
            className="icon"
            style={
              type === "month"
                ? { color: "var(--mainblue-color)", cursor: "pointer" }
                : { color: "var(--text-color)", cursor: "pointer" }
            }
            onClick={() => getType("month")}
          />
        </div>
      </div>

      <div className="days">
        {currentWeek.map((day) => {
          return (
            <div
              className={
                moment(new Date(day.time).getTime()).format("DD/MM/YYYY") ===
                dateClicked
                  ? "day active"
                  : "day"
              }
              // id={
              //   moment(new Date(day.time).getTime()).format("DD/MM/YYYY") ===
              //   dateClicked
              //     ? "act"
              //     : ""
              // }
              // upperDate={
              //   day.time >
              //   new Date(currentYear, currentMonth, currentDate + 1).getTime()
              //     ? "upper"
              //     : ""
              // }
            >
              <div
                className="day-name"
                onClick={() =>
                  setDateClicked(
                    moment(new Date(day.time).getTime()).format("DD/MM/YYYY")
                  )
                }
              >
                {moment(new Date(day.time).getTime()).format("dddd")}
              </div>
              <div
                className="day-date"
                onClick={() =>
                  setDateClicked(
                    moment(new Date(day.time).getTime()).format("DD/MM/YYYY")
                  )
                }
              >
                {day.date}
              </div>
            </div>
          );
        })}
      </div>
      <div className="both" id="scroll">
        <span
          className="line"
          style={{ marginTop: `${timeLinePosition}px` }}
        ></span>
        <div className="timeline">
          <div className="timeblock">
            {timeLine.map((time, index) => {
              if (index % 60 === 0 || index === 0) {
                return (
                  <div className="time" key={index}>
                    {time}
                  </div>
                );
              }
            })}
          </div>
        </div>
        <div className="days-events">
          <div className="timeline-lines">
            {timeLine.map((time, index) => {
              if (index % 60 === 0 || index === 0) {
                return <div className="timeline-line" key={index}></div>;
              }
            })}
          </div>
          {currentWeek.map((day, index) => {
            return (
              <div
                className="event-column"
                onClick={() =>
                  setDateClicked(
                    moment(new Date(day.time).getTime()).format("DD/MM/YYYY")
                  )
                }
                style={
                  moment(new Date(day.time).getTime()).format("DD/MM/YYYY") ===
                  dateClicked
                    ? { opacity: "1", zIndex: "3" }
                    : { opacity: "0.5", zIndex: "2" }
                }
              >
                {selectedList && selectedList.length > 0
                  ? selectedList[index].map((event) => {
                      return (
                        <EventItem
                          getHover={getHover}
                          getColor={getColor}
                          getTopMargin={getTopMargin}
                          getEvent={getEvent}
                          type="week-calendar"
                          event={event}
                          timeLine={timeLine}
                        />
                      );
                    })
                  : null}
              </div>
            );
          })}
          <div
            className="hover"
            style={
              hover
                ? // && event && event.date === dateClicked
                  eventDay < 3
                  ? {
                      display: "flex",
                      top: `${topMargin}px`,
                      left: `${leftMargin}%`,
                      boxShadow: "0px 0px 12px 12px rgba(21, 21, 21, 0.8)",
                    }
                  : {
                      display: "flex",
                      top: `${topMargin}px`,
                      boxShadow: "0px 0px 12px 12px rgba(21, 21, 21, 0.8)",
                      right: `${rightMargin}%`,
                    }
                : { display: "none" }
            }
          >
            <div className="title-row">
              <div className="title">{event ? event.title : ""}</div>
              <div className="choice">{/* <HiEllipsisVertical /> */}</div>
            </div>

            <div className="date-row">
              <div className="date">
                {event
                  ? moment(event.date, "DD/MM/YYYY").format(
                      "dddd Do of MMMM YYYY"
                    )
                  : ""}
              </div>
              <div className="time">
                {event ? event.startTime : ""} - {event ? event.endTime : ""}
              </div>
            </div>

            <div className="type-row">
              <div
                className="little-circle"
                style={{ background: `${color}` }}
              ></div>
              <div className="type-name"> {event ? event.actType : ""}</div>
            </div>
            <div className="desc"> {event ? event.description : ""}</div>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};
export default WeekCalendar;
const Wrapper = styled.div`
  position: relative;
  height: 100%;
  width: 100%;

  border-radius: 0.3rem;
  background-color: var(--sidebar-color);

  .line {
    position: absolute;
    z-index: 1;

    width: 100%;

    border: 1px solid var(--text-color);
    border-radius: 30px;
  }

  .hover {
    position: absolute;
    display: flex;
    flex-direction: column;
    align-items: center;

    background: var(--box-color);
    border-radius: var(--border-radius);

    height: 200px;
    width: 200px;
    top: 50%;
    opacity: 1;
    z-index: 5;

    padding: 1rem;

    .title-row {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      width: 100%;

      .title {
        font-size: 0.8rem;
        font-weight: normal;
      }

      .choice {
        opacity: 0.5;
        font-size: 1rem;

        &:hover {
          opacity: 1;
        }
      }
    }

    .date-row {
      display: flex;
      flex-direction: column;
      align-items: left;

      width: 100%;
      height: 2rem;

      margin-top: 1rem;

      .date {
        font-size: var(--text-size);
        font-weight: lighter;
      }

      .time {
        font-size: var(--text-size);
        font-weight: lighter;
      }
    }

    .type-row {
      display: flex;
      flex-direction: row;
      align-items: left;
      width: 100%;

      height: 0.8rem;

      margin-top: 1rem;

      .little-circle {
        height: 100%;
        width: 0.8rem;

        border-radius: 50%;
      }

      .type-name {
        font-size: var(--text-size);
        font-weight: lighter;
        text-transform: capitalize;

        margin-left: 0.5rem;
      }
    }
    .desc {
      font-size: var(--text-size);
      font-weight: lighter;

      padding: 0.5rem;
      margin-top: 1rem;

      height: 50%;
      width: 100%;

      background: var(--sidebar-color);
      border-radius: var(--border-radius);

      overflow-y: auto;
      overflow-x: hidden;

      ::-webkit-scrollbar {
        width: 6px;
      }

      ::-webkit-scrollbar-track {
        background: var(--box-color);
        border-radius: 10px;
      }

      ::-webkit-scrollbar-thumb {
        background: var(--body-color);
        border-radius: 10px;
      }
    }
  }

  .timeline-lines {
    position: absolute;
    z-index: 1;
    opacity: 0.2;
    width: 100%;
    margin-top: 6px;
  }
  .timeline-line {
    opacity: 0.2;
    height: 60px;
    border-top: 1px solid var(--text-color);
  }

  .icon {
    stroke-width: 1;
    stroke: var(--sidebar-color);
  }
  .top-container {
    position: aboslute;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;

    width: 100%;
    height: 15%;

    padding-left: 2rem;
    padding-right: 2rem;

    border-bottom: 1px solid rgba(232, 244, 250, 0.5);
  }

  .header-date-arrows {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;

    width: 40%;
  }

  .arrow {
    cursor: pointer;
  }

  .week-month-view {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;

    width: 8%;
    font-size: 2rem;

    margin-bottom: 1rem;
    margin-top: 0.5rem;
    margin-right: 1rem;
  }

  .days {
    position: absolute;
    display: grid;
    grid-template-columns: repeat(7, minmax(0, 1fr));

    // background: red;

    height: 5%;
    width: 95%;
    top: 18%;
    left: 5%;
    margin-bottom: 1rem;
  }

  .days-events {
    position: relative;
    display: grid;
    grid-template-columns: repeat(7, minmax(0, 1fr));

    width: 95%;
  }

  .active {
    .day-name,
    .day-date {
      color: var(--mainorange-color);
      font-weight: bold;
      opacity: 1;
    }
  }

  .day {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    opacity: 1;

    font-size: 0.8rem;
    font-weight: lighter;
    text-transform: uppercase;
  }

  // .day-column {
  //   display: flex;
  //   flex-direction: column;
  //   align-items: center;

  //   height: 100%;
  // }

  .event-column {
    z-index: 2;
  }

  .day-name,
  .day-date {
    cursor: pointer;
  }

  .timeline {
    position: relative;
    text-align: center;

    width: 5%;
    height: 100%;
  }

  .timeblock {
    height: 100%;
  }

  .time {
    font-size: 12px;
    opacity: 0.5;
    height: 60px;
    font-weight: lighter;
  }

  .both {
    position: absolute;
    display: flex;
    flex-direction: row;

    top: 23%;
    width: 100%;
    height: 73%;

    margin-top: 1rem;
    margin-bottom: 1rem;

    overflow-y: auto;
    overflow-x: hidden;

    ::-webkit-scrollbar {
      width: 6px;
    }

    ::-webkit-scrollbar-track {
      background: var(--box-color);
      border-radius: 10px;
    }

    ::-webkit-scrollbar-thumb {
      background: var(--body-color);
      border-radius: 10px;
    }
  }
`;

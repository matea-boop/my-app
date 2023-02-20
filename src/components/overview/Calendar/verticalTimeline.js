import moment from "moment/moment";
import React from "react";
import { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import EventList from "../../forms-lists/EventFolder/eventList";

const activityType = [
  { id: 0, color: "var(--mainorange-color)", actName: "personal" },
  { id: 1, color: "var(--mainred-color)", actName: "work/study" },
  { id: 2, color: "var(--maingreen-color)", actName: "meeting" },
  { id: 2, color: "var(--mainblue-color)", actName: "appointment" },
];

async function getEventDataFromDB() {
  const url = "http://localhost:3001/api/events";
  try {
    const {
      data: { events },
    } = await axios.get(url);

    return events;
  } catch (error) {
    console.log("error", error);
    return error;
  }
}

export const VerticalTimeline = ({ date, getList }) => {
  const timeLine = [];
  const selectedList = [];
  const [eventList, setEventList] = useState([]);
  const [timePixel, setTimePixel] = useState(0);
  const [timeLinePosition, setTimeLinePosition] = useState(6);

  useEffect(() => {
    getEventDataFromDB().then((res) => setEventList(res));
  }, [date]);

  const x =
    eventList && eventList.length > 0
      ? eventList.map((event) =>
          event.date === date ? selectedList.push(event) : null
        )
      : null;
  const sortedTimeList =
    selectedList && selectedList.length > 0
      ? selectedList.slice(0).sort((a, b) => {
          a.startTime.localeCompare(b.time);
        })
      : null;
  const firstTime = selectedList.length > 0 ? selectedList[0].startTime : null;

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

  useEffect(() => {
    timeLine.map((time, index) => {
      if (time === firstTime) {
        const i = index + 6;
        setTimePixel(i);
      }
    });

    const x = timePixel - 20;
    if (selectedList.length > 0) {
      document.getElementById("scroll").scrollTop = x;
    } else {
      document.getElementById("scroll").scrollTop = 0;
    }
  });

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

  const categories = selectedList.reduce((itemsSoFar, { actType, title }) => {
    if (!itemsSoFar[actType]) itemsSoFar[actType] = [];
    itemsSoFar[actType].push(title);
    return itemsSoFar;
  }, {});

  useEffect(() => {
    getList(selectedList);
  }, [timePixel]);

  return (
    <Wrapper id="scroll">
      <div className="both">
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
        <div className="schedule">
          <div className="event-boxes">
            <EventList eventList={eventList} date={date} timeLine={timeLine} />
          </div>
          <span
            className="line"
            style={{ marginTop: `${timeLinePosition}px` }}
          ></span>
        </div>
      </div>
    </Wrapper>
  );
};
export default VerticalTimeline;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: left;
  margin-top: 1.5rem;
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
  .timeline {
    position: relative;
    width: 13%;
    height: 100%;
    text-align: center;
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
    display: flex;
    flex-direction: row;
  }
  .schedule {
    position: relative;
    display: flex;

    justify-content: center;
    width: 87%;
    margin-left: 0.2rem;
  }
  .event-boxes {
    position: absolute;
    z-index: 11;
    top: 6px;
    width: 90%;
  }
  .line {
    position: absolute;
    z-index: 10;
    width: 100%;
    border: 1px solid var(--text-color);
    border-radius: 30px;
  }
`;

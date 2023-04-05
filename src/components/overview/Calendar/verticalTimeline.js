import moment from "moment/moment";
import React from "react";
import { useState, useEffect } from "react";
import styled from "styled-components";
import EventList from "../../forms-lists/EventFolder/eventList";
import Loading from "../../Loading";
import { useAllContext } from "../../../context/indexContext";
import getEventDataFromDB from "../../../constants/dataFunctions/eventData";

export const VerticalTimeline = ({ date }) => {
  const { isEventModalOpen, isEventDeleted, isEventChanged } = useAllContext();
  const timeLine = [];

  const [loading, setLoading] = useState(true);
  const [eventList, setEventList] = useState([]);
  const [timeHeightInPixels, setTimeHeightInPixels] = useState(0);
  const [timeLinePosition, setTimeLinePosition] = useState(6);

  useEffect(() => {
    setLoading(true);
    getEventDataFromDB().then((res) => {
      setEventList(res);
      setLoading(false);
    });
  }, [date, isEventModalOpen, isEventDeleted, isEventChanged]);

  const selectedList =
    eventList.length > 0
      ? eventList
          .filter((event) => event.date === date)
          .sort((a, b) => {
            return (
              new Date(...a.startTime.split(":").reverse()) -
              new Date(...b.startTime.split(":").reverse())
            );
          })
      : [];

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
        setTimeHeightInPixels(i);
      }
    });
  }, [firstTime]);

  useEffect(() => {
    const x = timeHeightInPixels - 20;
    const y = timeLinePosition - 20;
    if (selectedList.length > 0) {
      document.getElementById("scroll").scrollTop = x;
    } else {
      document.getElementById("scroll").scrollTop = y;
    }
  }, [timeHeightInPixels, date, firstTime, timeLinePosition]);

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
        {loading ? (
          <Loading />
        ) : (
          <div className="schedule">
            <div className="event-boxes">
              <EventList
                eventList={eventList}
                date={date}
                timeLine={timeLine}
              />
            </div>
            <span
              className="line"
              style={{ marginTop: `${timeLinePosition}px` }}
            ></span>
          </div>
        )}
      </div>
    </Wrapper>
  );
};
export default VerticalTimeline;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: left;

  overflow-y: auto;
  overflow-x: hidden;

  margin-top: 1.5rem;

  ::-webkit-scrollbar {
    width: 6px;
  }

  ::-webkit-scrollbar-track {
    background: var(--body-color);
    border-radius: 10px;
  }

  ::-webkit-scrollbar-thumb {
    background: var(--box-color);
    border-radius: 10px;
  }

  .timeline {
    position: relative;
    text-align: center;

    width: 13%;
    height: 100%;
  }

  .timeblock {
    height: 100%;
  }

  .time {
    font-size: 12px;
    opacity: 0.7;
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
    z-index: 2;

    top: 6px;
    width: 90%;
  }

  .line {
    position: absolute;
    z-index: 1;

    width: 100%;

    border: 1px solid var(--text-color);
    opacity: 0.5;
    border-radius: 30px;
  }
`;

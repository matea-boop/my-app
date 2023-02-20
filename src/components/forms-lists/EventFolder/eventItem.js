import moment from "moment/moment";
import React from "react";
import { useState, useEffect } from "react";
import styled from "styled-components";

const activityType = [
  { id: 0, color: "var(--mainorange-color)", actName: "personal" },
  { id: 1, color: "var(--mainred-color)", actName: "work/study" },
  { id: 2, color: "var(--maingreen-color)", actName: "meeting" },
  { id: 2, color: "var(--mainblue-color)", actName: "appointment" },
];

export const EventItem = ({
  title,
  date,
  startTime,
  endTime,
  actType,
  description,
  timeLine,
}) => {
  const [color, setColor] = useState("");
  const [pixel, setPixel] = useState(0);
  const timeDifference = moment
    .utc(moment(endTime, "HH:mm").diff(moment(startTime, "HH:mm")))
    .format("HH:mm");
  const timeInPixels = moment.duration(timeDifference).asMinutes();

  useEffect(() => {
    activityType.map((type) =>
      type.actName === actType ? setColor(type.color) : null
    );
    timeLine.map((time, index) => {
      if (time === startTime) {
        setPixel(index);
      }
    });
  }, []);

  return (
    <Wrapper style={{ height: `${timeInPixels}px`, marginTop: `${pixel}px` }}>
      <div className="type-line" style={{ border: `2px solid ${color}` }}></div>
      <div className="event-content">
        <div className="event-time">
          {startTime} - {endTime}
        </div>
        <div className="event-title">{title}</div>
        {/* <div className="event-desc">{description}</div> */}
      </div>
    </Wrapper>
  );
};

export default EventItem;

const Wrapper = styled.div`
  position: absolute;
  background: var(--box-color);
  border-radius: var(--border-radius);
  width: 100%;
  min-height: 40px;
  display: flex;
  flex-direction: row;

  .type-line {
    position: relative;
    border-radius: 10px;
    margin: 0.8rem;
  }
  .event-content {
    display: flex;
    flex-direction: column;
    align-items: left;
    justify-content: center;
    margin: 0.8rem 0.8rem 0.8rem 0;
  }

  .event-time {
    font-size: 0.7rem;
    font-weight: lighter;
    opacity: 0.5;
  }
  .event-title {
    font-size: 0.7rem;
    padding-left: 0.6rem;
  }
  .event-desc {
    font-size: 0.7rem;
    font-weight: lighter;
    padding-left: 0.5rem;
  }
`;

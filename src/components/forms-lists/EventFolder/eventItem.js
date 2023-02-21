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
  const [hover, setHover] = useState(false);
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
  }, [timeInPixels]);

  return (
    <Wrapper
      onMouseOver={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={
        hover && description !== "" && timeInPixels < 80
          ? {
              minHeight: "40px",
              height: `${timeInPixels + 30}px`,
              marginTop: `${pixel}px`,
              transition: "all 0.2s",
            }
          : {
              minHeight: "40px",
              height: `${timeInPixels}px`,
              marginTop: `${pixel}px`,
            }
      }
    >
      <div className="type-line" style={{ border: `2px solid ${color}` }}></div>
      <div className="event-content">
        <div
          className="shorter"
          style={
            timeInPixels < 40
              ? { flexDirection: "row" }
              : { flexDirection: "column" }
          }
        >
          <div className="event-time">
            {startTime} - {endTime}
          </div>
          <div className="event-title">{title}</div>
        </div>
        <div className={description !== "" ? "event-desc" : ""}>
          {description}
        </div>
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
  display: flex;
  flex-direction: row;
  box-shadow: 0px 0px 12px 12px rgba(21, 21, 21, 0.7);

  .event-desc {
    display: none;
  }

  &:hover {
    z-index: 100;
    cursor: pointer;

    .event-desc {
      display: flex;
    }
  }
  .shorter {
    display: flex;
    flex-direction: column;
    align-items: left;
    justify-content: center;
  }
  .type-line {
    position: relative;
    border-radius: 10px;
    margin: 0.5rem 0.8rem 0.5rem 0.5rem;
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

import React from "react";
import styled from "styled-components";
import EventItem from "./eventItem";

export const EventList = ({ eventList, date, timeLine }) => {
  const selectedList = [];

  const x =
    eventList && eventList.length > 0
      ? eventList.map((event) =>
          event.date === date ? selectedList.push(event) : null
        )
      : null;

  return (
    <Wrapper>
      {selectedList.length > 0
        ? selectedList.map((event, index) => (
            <EventItem
              className="item"
              timeLine={timeLine}
              key={index}
              title={event.title}
              date={event.date}
              startTime={event.startTime}
              endTime={event.endTime}
              actType={event.actType}
              description={event.description}
            />
          ))
        : null}
    </Wrapper>
  );
};
export default EventList;
const Wrapper = styled.div``;

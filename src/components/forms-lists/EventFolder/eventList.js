import React from "react";
import styled from "styled-components";
import EventItem from "./eventItem";

export const EventList = ({ eventList, date, timeLine }) => {
  const selectedList =
    eventList.length > 0
      ? eventList.filter((event) => event.date === date)
      : [];

  return (
    <Wrapper>
      {selectedList.length > 0
        ? selectedList.map((event) => (
            <EventItem timeLine={timeLine} event={event} />
          ))
        : null}
    </Wrapper>
  );
};

export default EventList;

const Wrapper = styled.div``;

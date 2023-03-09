import React from "react";
import styled from "styled-components";
import axios from "axios";

export const TasksSorted = ({
  type,
  incompletedTasks,
  completedTasks,
  allTasks,
}) => {
  return (
    <Wrapper>
      {type === "all"
        ? allTasks
        : type === "left"
        ? incompletedTasks
        : type === "done"
        ? completedTasks
        : null}
    </Wrapper>
  );
};

export default TasksSorted;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  font-size: var(--text-size);
  font-weight: lighter;

  background-color: var(--box-color);
  border-radius: var(--border-radius);

  padding: 0.2rem 0.5rem 0.2rem 0.5rem;
`;

import React, { useState } from "react";
import styled from "styled-components";

function DeadlineForm() {
  const [input, setInput] = useState("");

  return (
    <Wrapper>
      {/* <form className="task-form">
        <input
          type="text"
          placeholder="Add Task"
          value={input}
          name="text"
          className="task-input"
        />
        <button className="task-btn">Add Task</button>
      </form> */}
      <h1>DEADLINE</h1>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  background-color: var(--mainorange-color);
  position: fixed;
  z-index: 100;
  top: calc(50% - 100px);
  left: calc(50% - (var(--right-btn-move) / 2));
  width: 200px;
  height: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: inherit;
  .task-form {
    position: relative;
  }
`;
export default DeadlineForm;

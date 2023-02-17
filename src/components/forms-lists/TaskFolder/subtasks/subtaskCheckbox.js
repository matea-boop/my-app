import React from "react";
import styled from "styled-components";
import { FiSquare } from "react-icons/fi";
import { FiCheckSquare } from "react-icons/fi";

function SubtaskCheckbox({ subtaskChecked, subtaskHandleCheck }) {
  return (
    <Wrapper>
      <FiSquare
        className="checkbox"
        style={subtaskChecked ? { display: "none" } : { diyplay: "flex" }}
        onClick={() => {
          subtaskHandleCheck();
        }}
      />
      <FiCheckSquare
        className="checkbox done"
        style={
          subtaskChecked
            ? { display: "flex", opacity: "0.5" }
            : { diyplay: "none" }
        }
        onClick={() => {
          subtaskHandleCheck();
        }}
      />
    </Wrapper>
  );
}

export default SubtaskCheckbox;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  .checkbox {
    font-size: 1rem;
    stroke-width: 1;
  }
  .done {
    display: none;
  }
`;

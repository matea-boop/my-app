import React from "react";
import styled from "styled-components";
import { FiCircle } from "react-icons/fi";
import { FiCheckCircle } from "react-icons/fi";

function Checkbox({ checked, handleCheck }) {
  return (
    <Wrapper>
      <FiCircle
        className="checkbox"
        style={checked ? { display: "none" } : { diyplay: "flex" }}
        onClick={() => {
          handleCheck();
        }}
      />
      <FiCheckCircle
        className="checkbox done"
        style={checked ? { display: "flex" } : { diyplay: "none" }}
        onClick={() => {
          handleCheck();
        }}
      />
    </Wrapper>
  );
}

export default Checkbox;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  .checkbox {
    font-size: 1.4rem;
    stroke-width: 1;
    color: var(--text-color);
  }
  .done {
    display: none;
  }
`;

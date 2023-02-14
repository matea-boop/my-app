import React from "react";
import styled from "styled-components";
import { FiSquare } from "react-icons/fi";
import { FiCheckSquare } from "react-icons/fi";
import { useAllContext } from "../../../context/indexContext";

function Checkbox({ handleCheck }) {
  const { isTaskChecked } = useAllContext();
  return (
    <Wrapper>
      <FiSquare
        className="checkbox"
        style={isTaskChecked ? { display: "none" } : { diyplay: "flex" }}
        onClick={() => {
          handleCheck();
        }}
      />
      <FiCheckSquare
        className="checkbox done"
        style={isTaskChecked ? { display: "flex" } : { diyplay: "none" }}
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
  }
  .done {
    display: none;
  }
`;

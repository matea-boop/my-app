import React from "react";
import styled from "styled-components";

function SubtaskBar({ checked, listBoolean }) {
  const listLength = listBoolean.length;
  const completedSubtasks = listBoolean.filter((i) => i === true).length;
  const barWidth = completedSubtasks / listLength;

  return (
    <Wrapper>
      <div className="full-bar"></div>
      <div
        className="done-bar"
        style={
          checked ? { width: "100%" } : { width: `calc(${barWidth} * 100%)` }
        }
      ></div>
    </Wrapper>
  );
}

export default SubtaskBar;

const Wrapper = styled.div`
  position: relative;
  display: block;

  .full-bar {
    position: absolute;
    width: 100%;

    border-bottom: 0.2rem solid var(--mainorange-color);
    border-radius: var(--border-radius);
    opacity: 0.3;
  }
  .done-bar {
    position: absolute;

    transition: all 0.5s;
    border-bottom: 0.2rem solid var(--mainorange-color);
    border-radius: var(--border-radius);
  }
`;

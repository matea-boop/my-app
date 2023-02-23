import React from "react";
import styled from "styled-components";

export const NotePercentBar = () => {
  return (
    <Wrapper>
      <div className="text">
        Writing goal for today {"("}70 words written{")"}
      </div>
      <div className="percentage-and-bar">
        <div className="bar">
          {/* <div className="orange-bar"></div> */}
          {/* <div className="orange-bar"></div> */}
        </div>
        <div className="percentage">52%</div>
      </div>
    </Wrapper>
  );
};
export default NotePercentBar;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  height: 6%;
  width: 80%;

  // background-color: var(--mainorange-color);
  // border-radius: var(--border-radius);

  .percentage-and-bar {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;

    width: 100%;
  }

  .text {
    font-size: var(--text-size);
    color: var(--text-color);
    opacity: 0.5;
    font-weight: lighter;

    margin-bottom: 0.4rem;
  }

  .bar {
    height: 0.3rem;
    width: 100%;

    background-color: var(--box-color);
    border-radius: 1rem;

    margin-right: 0.7rem;
  }

  .percentage {
    font-size: var(--text-size);
    color: var(--text-color);
    opacity: 0.5;
    font-weight: lighter;
  }
`;

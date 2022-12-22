import React from "react";
import { useState, useEffect } from "react";
import SubtaskCheckbox from "./subtaskCheckbox";
import styled from "styled-components";
import { editSubtask } from "../../reducers/taskReducer/TaskStorage";
import { useDispatch } from "react-redux";

function SubtaskItem({ taskList, subtaskTitle, subtaskStatus, subtask }) {
  const [taskLista, setTaskLista] = useState(taskList);
  const [clicked, setClicked] = useState("");
  const [subtaskChecked, setSubtaskChecked] = useState(false);
  const dispatch = useDispatch();
  const subtaskHandleCheck = () => {
    setSubtaskChecked(!subtaskChecked);

    dispatch(
      editSubtask({
        ...subtask,
        subtaskStatus: !subtaskChecked ? "done" : "notDone",
      })
    );
  };

  useEffect(() => {
    if (subtaskStatus === "done") {
      setSubtaskChecked(true);
      console.log(subtaskChecked);
    } else {
      setSubtaskChecked(false);
      console.log(subtaskChecked);
    }
  }, [subtaskStatus]);

  return (
    <Wrapper>
      <div
        className="links"
        style={subtaskChecked ? { opacity: "0.5" } : { opacity: "1" }}
      >
        <SubtaskCheckbox
          className="checkbox-subtasks"
          subtaskChecked={subtaskChecked}
          subtaskHandleCheck={subtaskHandleCheck}
        />
        <div className="subtask-title">{subtaskTitle}</div>
      </div>
    </Wrapper>
  );
}

export default SubtaskItem;

const Wrapper = styled.div`
  .links {
    padding: 0.2rem 0rem 0.2rem 2rem;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
  }
  .subtask-title {
    padding: 0.3rem 0.5rem 0.3rem 0.5rem;
    font-size: 0.7rem;
  }
  .checkbox-subtasks {
    font-size: 0.7rem;
  }
`;

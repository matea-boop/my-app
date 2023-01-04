import React from "react";
import { useState, useEffect } from "react";
import SubtaskCheckbox from "./subtaskCheckbox";
import styled from "styled-components";
import { editSubtask, editTask } from "../taskReducer/taskStorage";
import { useDispatch } from "react-redux";

function SubtaskItem({
  subtaskTitle,
  subtaskStatus,
  subtask,
  taskChecked,
  subtaskList,
}) {
  const [subtaskChecked, setSubtaskChecked] = useState(false);
  const dispatch = useDispatch();
  let listBoolean = [];
  subtaskList.forEach((sub) => listBoolean.push(sub.subtaskStatus));

  const subtaskHandleCheck = () => {
    setSubtaskChecked(!subtaskChecked);
    dispatch(
      editSubtask({
        ...subtask,
        subtaskStatus: subtaskChecked ? "notDone" : "done",
      })
    );
  };

  useEffect(() => {
    if (taskChecked) {
      setSubtaskChecked(true);
    } else {
      if (!listBoolean.includes("notDone")) {
        setSubtaskChecked(false);
        subtaskList.forEach((sub) =>
          dispatch(
            editSubtask({
              ...sub,
              subtaskStatus: !subtaskChecked ? "done" : "notDone",
            })
          )
        );
      } else {
        if (subtaskStatus === "done") {
          setSubtaskChecked(true);
        } else {
          setSubtaskChecked(false);
        }
      }
    }
  }, [taskChecked]);

  return (
    <Wrapper style={taskChecked ? { display: "none" } : { display: "flex" }}>
      <div className="links">
        <SubtaskCheckbox
          className="checkbox-subtasks"
          subtaskChecked={subtaskChecked}
          subtaskHandleCheck={subtaskHandleCheck}
        />
        <div
          style={subtaskChecked ? { opacity: "0.5" } : { opacity: "1" }}
          className="subtask-title"
        >
          {subtaskTitle}
        </div>
      </div>
    </Wrapper>
  );
}

export default SubtaskItem;

const Wrapper = styled.div`
  .links {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    padding: 0.2rem 0rem 0.2rem 2rem;
    background-color: var(--body-color);
  }
  .subtask-title {
    padding: 0.3rem 0.5rem 0.3rem 0.5rem;
    font-size: 0.7rem;
  }
  .checkbox-subtasks {
    font-size: 0.7rem;
  }
`;

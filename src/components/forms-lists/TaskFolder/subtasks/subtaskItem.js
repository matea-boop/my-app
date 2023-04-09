import React from "react";
import { useState, useEffect } from "react";
import SubtaskCheckbox from "./subtaskCheckbox";
import styled from "styled-components";
import axios from "axios";
import { useAllContext } from "../../../../context/indexContext";

function SubtaskItem({
  subtask,
  subtaskIndex,
  taskCheck,
  setTaskChecked,
  getListBoolean,
  task,
}) {
  const {
    isTaskChecked,
    taskChecked,
    taskUnchecked,
    isSubtaskStatusChanged,
    subtaskStatusChangedFalse,
    subtaskStatusChangedTrue,
  } = useAllContext();
  const subtasks = task ? task.subtasks : [];
  const [subtaskChecked, setSubtaskChecked] = useState(false);
  const listBool = subtasks.map((sub) => sub.subtaskStatus);

  useEffect(() => {
    getListBoolean([...listBool]);
  }, []);

  useEffect(() => {
    const changeSubtasks = async () => {
      for (let i = 0; i < subtasks.length; i++) {
        subtasks[i] = { ...subtasks[i], subtaskStatus: taskCheck };
      }
      await axios.patch(`http://localhost:3001/api/tasks/${task._id}`, {
        subtasks: subtasks,
      });
    };

    if (taskCheck) {
      changeSubtasks();
    } else {
      if (!listBool.includes(false)) {
        changeSubtasks();
      } else {
        if (subtask.subtaskStatus === true) {
          setSubtaskChecked(true);
        } else {
          setSubtaskChecked(false);
        }
      }
    }
    getListBoolean([...listBool]);
  }, [taskCheck, isTaskChecked]);

  const subtaskStatusUpdate = async () => {
    if (subtasks) {
      subtasks[subtaskIndex] = { ...subtask, subtaskStatus: !subtaskChecked };
    }
    await axios.patch(`http://localhost:3001/api/tasks/${task._id}`, {
      subtasks: subtasks,
    });
  };

  const subtaskHandleCheck = async () => {
    setSubtaskChecked(!subtaskChecked);
    subtaskStatusUpdate();
    if (isSubtaskStatusChanged) {
      subtaskStatusChangedFalse();
    } else {
      subtaskStatusChangedTrue();
    }
    getListBoolean([...listBool]);
  };
  console.log(listBool);
  useEffect(() => {
    getListBoolean([...listBool]);
    const taskCompleted = async () => {
      await axios.patch(`http://localhost:3001/api/tasks/${task._id}`, {
        status: !taskCheck,
      });
    };
    if (listBool.length > 0) {
      if (!listBool.includes(false)) {
        setTaskChecked(true);
        taskChecked();
        console.log(taskCheck);
        console.log("mjau");
        taskCompleted();
      } else {
        setTaskChecked(false);
        taskUnchecked();
        taskCompleted();
      }
    }
  }, [subtaskChecked]);

  return (
    <Wrapper style={taskCheck ? { display: "none" } : { display: "flex" }}>
      <div className="links" key={subtask.id}>
        <SubtaskCheckbox
          className="checkbox-subtasks"
          subtaskChecked={subtaskChecked}
          subtaskHandleCheck={subtaskHandleCheck}
        />
        <div
          style={subtaskChecked ? { opacity: "0.5" } : { opacity: "1" }}
          className="subtask-title"
        >
          {subtask.subtaskTitle}
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

    width: 100%;

    background-color: var(--subtaskbox-color);
    animation: close 0.1s forwards;

    padding: 0.2rem 0rem 0.2rem 2rem;
  }

  .subtask-title {
    font-size: var(--text-size);
    font-weight: lighter;

    padding: 0.3rem 0.5rem 0.3rem 0.5rem;
  }

  .checkbox-subtasks {
    font-size: var(--text-size);
  }
`;

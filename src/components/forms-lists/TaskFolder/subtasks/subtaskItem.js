import React from "react";
import { useState, useEffect } from "react";
import SubtaskCheckbox from "./subtaskCheckbox";
import styled from "styled-components";
import axios from "axios";
import { useAllContext } from "../../../../context/indexContext";

function SubtaskItem({
  subtaskTitle,
  subtaskStatus,
  subtask,
  subtaskIndex,
  taskCheck,
  setTaskChecked,
  subtaskList,
  setListBoolean,
  task,
}) {
  const { isTaskChecked, taskUnchecked, taskChecked } = useAllContext();
  const [subtasks, setSubtasks] = useState(task ? task.subtasks : []);
  const [subtaskChecked, setSubtaskChecked] = useState(false);
  let listBoolean = [];
  subtasks.forEach((sub) => listBoolean.push(sub.subtaskStatus));

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
    setListBoolean([...listBoolean]);
  };

  useEffect(() => {
    // subtaskStatusUpdate();
    if (listBoolean.length > 0 && !listBoolean.includes(false)) {
      setTaskChecked(true);
      taskChecked();
      const taskCompleted = async () => {
        await axios.patch(`http://localhost:3001/api/tasks/${task._id}`, {
          status: !taskCheck,
        });
      };
      taskCompleted();
    } else {
      setTaskChecked(false);
      const taskCompleted = async () => {
        await axios.patch(`http://localhost:3001/api/tasks/${task._id}`, {
          status: !taskCheck,
        });
      };
      taskCompleted();
      taskUnchecked();
    }
    setListBoolean([...listBoolean]);
  }, [subtaskChecked]);

  useEffect(() => {
    const changeSubtasks = async () => {
      subtasks.forEach(
        (sub, i) => (subtasks[i] = { ...sub, subtaskStatus: !taskCheck })
      );
      await axios.patch(`http://localhost:3001/api/tasks/${task._id}`, {
        subtasks: subtasks,
      });
    };

    if (taskCheck) {
      setSubtaskChecked(true);
      changeSubtasks();
      setListBoolean([...listBoolean]);
    } else {
      if (!listBoolean.includes(false)) {
        setSubtaskChecked(false);
        changeSubtasks();
        setListBoolean([...listBoolean]);
      } else {
        if (subtaskStatus === true) {
          setSubtaskChecked(true);
        } else {
          setSubtaskChecked(false);
        }
        setListBoolean([...listBoolean]);
      }
    }
  }, [taskCheck]);

  useEffect(() => {
    setListBoolean([...listBoolean]);
  }, [isTaskChecked, task.status]);

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
    animation: close 0.1s forwards;
  }
  .subtask-title {
    padding: 0.3rem 0.5rem 0.3rem 0.5rem;
    font-size: 0.7rem;
    font-weight: lighter;
  }
  .checkbox-subtasks {
    font-size: 0.7rem;
  }
`;

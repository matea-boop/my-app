import React from "react";
import { useState, useEffect } from "react";
import SubtaskCheckbox from "./subtaskCheckbox";
import styled from "styled-components";
import axios from "axios";

function SubtaskItem({
  subtaskTitle,
  subtaskStatus,
  subtask,
  taskChecked,
  subtaskList,
  task,
}) {
  const [subtasks, setSubtasks] = useState(task ? task.subtasks : []);
  const [subtaskChecked, setSubtaskChecked] = useState(false);
  let listBoolean = [];
  subtaskList.forEach((sub) => listBoolean.push(sub.subtaskStatus));

  const subtaskHandleCheck = async () => {
    setSubtaskChecked(!subtaskChecked);
    subtaskStatusUpdate();
  };

  const subtaskStatusUpdate = async () => {
    const newSubtasks = [];

    if (subtaskList) {
      subtaskList.forEach((sub) => {
        if (subtask.id === sub.id) {
          newSubtasks.push({ ...sub, subtaskStatus: !subtaskChecked });
        } else {
          newSubtasks.push({ ...sub });
        }
      });
      setSubtasks([]);
      setSubtasks([...newSubtasks]);

      console.log(subtasks);
    }

    await axios.patch(`http://localhost:3001/api/tasks/${task._id}`, {
      subtasks: subtasks,
    });
  };

  useEffect(() => {
    subtaskStatusUpdate();
  }, [subtaskChecked]);

  useEffect(() => {
    if (taskChecked) {
      setSubtaskChecked(true);
    } else {
      if (!listBoolean.includes(false)) {
        setSubtaskChecked(false);

        const changeSubtasks = async () => {
          const newSubtasks = [];
          subtaskList.forEach((sub) =>
            newSubtasks.push({ ...sub, subtaskStatus: subtaskChecked })
          );
          setSubtasks([]);
          setSubtasks([...newSubtasks]);

          await axios.patch(`http://localhost:3001/api/tasks/${task._id}`, {
            subtasks: subtasks,
          });
        };
        changeSubtasks();
      } else {
        if (subtaskStatus === true) {
          setSubtaskChecked(true);
        } else {
          setSubtaskChecked(false);
        }
      }
    }
  }, [taskChecked]);

  return (
    <Wrapper style={taskChecked ? { display: "none" } : { display: "flex" }}>
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
  }
  .checkbox-subtasks {
    font-size: 0.7rem;
  }
`;

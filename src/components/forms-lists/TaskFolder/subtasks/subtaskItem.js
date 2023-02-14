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
  // taskChecked,
  subtaskList,
  task,
}) {
  const { isTaskChecked, taskChecked, taskUnchecked } = useAllContext();
  const [subtasks, setSubtasks] = useState(task ? task.subtasks : []);
  const [subtaskChecked, setSubtaskChecked] = useState(false);
  let listBoolean = [];
  subtasks.forEach((sub) => listBoolean.push(sub.subtaskStatus));

  const subtaskHandleCheck = async () => {
    setSubtaskChecked(!subtaskChecked);
    subtaskStatusUpdate();
  };

  const subtaskStatusUpdate = async () => {
    const newSubtasks = [];

    if (subtasks) {
      subtasks.forEach((sub) => {
        if (subtask.id === sub.id) {
          newSubtasks.push({ ...sub, subtaskStatus: !subtaskChecked });
        } else {
          newSubtasks.push({ ...sub, subtaskStatus: sub.subtaskStatus });
        }
      });
      setSubtasks([]);
      setSubtasks([...newSubtasks]);
    }

    await axios.patch(`http://localhost:3001/api/tasks/${task._id}`, {
      subtasks: subtasks,
    });
  };

  useEffect(() => {
    // subtaskStatusUpdate();
    console.log(listBoolean);
    if (listBoolean.length > 0 && !listBoolean.includes(false)) {
      const taskCompleted = async () => {
        await axios.patch(`http://localhost:3001/api/tasks/${task._id}`, {
          status: !isTaskChecked,
        });
      };
      taskChecked();
      taskCompleted();
      console.log(isTaskChecked);
    }
  }, [subtaskChecked]);

  useEffect(() => {
    if (isTaskChecked) {
      setSubtaskChecked(true);
    } else {
      if (!listBoolean.includes(false)) {
        setSubtaskChecked(false);

        const changeSubtasks = async () => {
          const newSubtasks = [];
          subtaskList.forEach((sub) =>
            newSubtasks.push({ ...sub, subtaskStatus: !subtaskChecked })
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
  }, [isTaskChecked]);

  return (
    <Wrapper style={isTaskChecked ? { display: "none" } : { display: "flex" }}>
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

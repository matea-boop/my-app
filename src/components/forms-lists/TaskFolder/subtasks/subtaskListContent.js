import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import SubtaskItem from "./subtaskItem";
import styled from "styled-components";
import axios from "axios";

async function getDataFromDB() {
  const url = "http://localhost:3001/api/tasks";
  try {
    const {
      data: { tasks },
    } = await axios.get(url);

    return tasks;
  } catch (error) {
    console.log("error", error);
    return error;
  }
}

function SubtaskListContent({ clicked, taskChecked, setTaskChecked }) {
  const [taskList, setTaskList] = useState([]);
  let todaysDate = new Date().toLocaleDateString();
  const mainList = [];

  useEffect(() => {
    getDataFromDB().then((res) => setTaskList(res));
  }, [mainList]);

  taskList.forEach((task) => {
    if (task.date === todaysDate) {
      mainList.push(task.id);
    }
  });

  return (
    <Wrapper className="links">
      {taskList && taskList.length > 0
        ? taskList.map((task) => {
            {
              return (
                <div key={task.id}>
                  {task.subtasks && clicked === task.id
                    ? task.subtasks.map((subtask) => (
                        <SubtaskItem
                          task={task}
                          taskChecked={taskChecked}
                          setTaskChecked={setTaskChecked}
                          subtaskList={task.subtasks}
                          key={subtask.id}
                          subtask={subtask}
                          subtaskStatus={subtask.subtaskStatus}
                          subtaskTitle={subtask.subtaskTitle}
                        />
                      ))
                    : null}
                </div>
              );
            }
          })
        : null}
    </Wrapper>
  );
}

export default SubtaskListContent;

const Wrapper = styled.div`
  position: absolute;
  z-index: 100;
  width: 100%;
  overflow: hidden;

  .links {
    position: relative;
    width: 100%;
    animation: move 0.1s forwards;
  }
  &:last-child {
    border-radius: 0 0 var(--border-radius) var(--border-radius);
  }

  @keyframes move {
    0% {
      transform: translateY(-100%);
    }
    100% {
      transform: translateY(0);
    }
  }
`;

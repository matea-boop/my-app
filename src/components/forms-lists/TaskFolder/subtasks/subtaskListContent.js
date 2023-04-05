import React from "react";
import SubtaskItem from "./subtaskItem";
import styled from "styled-components";

function SubtaskListContent({
  clicked,
  taskCheck,
  setTaskChecked,
  taskList,
  getListBoolean,
}) {
  return (
    <Wrapper>
      {taskList && taskList.length > 0
        ? taskList.map((task) => {
            {
              return (
                <div key={task._id} className="container">
                  {task.subtasks && clicked === task._id
                    ? task.subtasks.map((subtask, index) => (
                        <SubtaskItem
                          task={task}
                          taskCheck={taskCheck}
                          subtaskIndex={index}
                          setTaskChecked={setTaskChecked}
                          subtaskList={task.subtasks}
                          getListBoolean={getListBoolean}
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
  border-radius: var(--border-radius);

  margin-top: 0.3rem;
  animation: move 0.1s forwards;

  .container {
    width: 100%;
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

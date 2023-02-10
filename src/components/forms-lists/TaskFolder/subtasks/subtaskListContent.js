import React from "react";
import SubtaskItem from "./subtaskItem";
import styled from "styled-components";

function SubtaskListContent({
  clicked,
  taskChecked,
  setTaskChecked,
  taskList,
}) {
  return (
    <Wrapper className="links">
      {taskList && taskList.length > 0
        ? taskList.map((task) => {
            {
              return (
                <div key={task._id}>
                  {task.subtasks && clicked === task._id
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

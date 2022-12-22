import React from "react";
import { useSelector } from "react-redux";
import SubtaskItem from "./subtaskItem";

function SubtaskListContent({ task }) {
  const taskList = useSelector((state) => state.task.taskList);
  console.log(taskList);

  return (
    <div>
      <div>
        {taskList && taskList.length > 0
          ? taskList.map((tasks) => {
              {
                return (
                  <div>
                    {tasks.subtasks
                      ? tasks.subtasks.map((subtask) => (
                          <SubtaskItem
                            key={subtask.id}
                            subtask={subtask}
                            taskList={taskList}
                            task={tasks}
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
      </div>
    </div>
  );
}

export default SubtaskListContent;

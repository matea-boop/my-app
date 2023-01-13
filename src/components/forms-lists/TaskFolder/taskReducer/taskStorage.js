import { createSlice } from "@reduxjs/toolkit";

const getInitialTask = () => {
  let localTaskList = window.localStorage.getItem("taskList");
  if (localTaskList) {
    return JSON.parse(localTaskList);
  }
  window.localStorage.setItem("taskList", JSON.stringify([]));
  return [];
};

const initialValue = {
  taskList: getInitialTask(),
};

export const taskSlice = createSlice({
  name: "task",
  initialState: initialValue,
  reducers: {
    addTask: (state, action) => {
      state.taskList.push(action.payload);
      let taskLista = window.localStorage.getItem("taskList");
      if (taskLista) {
        let taskListArr = JSON.parse(taskLista);
        taskListArr.push({
          ...action.payload,
        });
        window.localStorage.setItem("taskList", JSON.stringify(taskListArr));
      } else {
        window.localStorage.setItem(
          "taskList",
          JSON.stringify([{ ...action.payload }])
        );
      }
    },
    deleteTask: (state, action) => {
      let taskLista = window.localStorage.getItem("taskList");
      if (taskLista) {
        let taskListArr = JSON.parse(taskLista);
        taskListArr.forEach((task, index) => {
          if (task.id === action.payload) {
            taskListArr.splice(index, 1);
          }
        });
        window.localStorage.setItem("taskList", JSON.stringify(taskListArr));
        state.taskList = taskListArr;
      }
    },
    editTask: (state, action) => {
      let taskLista = window.localStorage.getItem("taskList");
      if (taskLista) {
        let taskListArr = JSON.parse(taskLista);
        taskListArr.forEach((task) => {
          if (task.id === action.payload.id) {
            task.status = action.payload.status;
            task.title = action.payload.title;
            task.subtasks = action.payload.subtasks;
          }
        });
        window.localStorage.setItem("taskList", JSON.stringify(taskListArr));
        state.taskList = taskListArr;
      }
    },
    editSubtask: (state, action) => {
      let taskLista = window.localStorage.getItem("taskList");
      if (taskLista) {
        let taskListArr = JSON.parse(taskLista);
        taskListArr.forEach((task) => {
          if (task.subtasks) {
            task.subtasks.forEach((subtask) => {
              if (subtask.id === action.payload.id) {
                subtask.subtaskStatus = action.payload.subtaskStatus;
              }
            });
          }
        });
        window.localStorage.setItem("taskList", JSON.stringify(taskListArr));
        state.taskList = taskListArr;
      }
    },
  },
});

export const { addTask, deleteTask, editTask, editSubtask } = taskSlice.actions;
export default taskSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

const getInitialTask = () => {
  //we are getting it from local storage
  let localTaskList = window.localStorage.getItem("taskList");
  //if we have local storage we will parse it
  //JSON.parse() takes a JSON string and transforms it into a js object
  //JSON.stringify() takes a js object and transforms it into a JSON string
  if (localTaskList) {
    return JSON.parse(localTaskList);
  }
  window.localStorage.setItem("taskList", JSON.stringify([]));
  return [];
};

const initialValue = {
  /*whenever our app will run we have to get 
    initial state from local storage*/
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
          }
        });
        window.localStorage.setItem("taskList", JSON.stringify(taskListArr));
        state.taskList = taskListArr;
      }
    },
  },
});

//exporting our actions
export const { addTask, deleteTask, editTask } = taskSlice.actions;
export default taskSlice.reducer;
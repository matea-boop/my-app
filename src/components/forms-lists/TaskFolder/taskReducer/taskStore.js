import { configureStore } from "@reduxjs/toolkit";
import taskReducer from "./taskStorage";
export const TaskStore = configureStore({
  reducer: {
    task: taskReducer,
  },
});

export default TaskStore;

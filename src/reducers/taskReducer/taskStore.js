import { configureStore } from "@reduxjs/toolkit";
import taskReducer from "./TaskStorage";
export const taskStore = configureStore({
  reducer: {
    task: taskReducer,
  },
});

export default taskStore;

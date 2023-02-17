import reducer from "../reducers/indexReducer";
import {
  ADDBTN_OPEN,
  ADDBTN_CLOSE,
  MODAL_OPEN,
  MODAL_CLOSE,
  TASK_DELETED,
  TASK_NOTD,
  TASK_CHECKED,
  TASK_UNCHECKED,
  EVENT_MODAL_OPEN,
  EVENT_MODAL_CLOSE,
  SUBTASK_STATUS_FALSE,
  SUBTASK_STATUS_TRUE,
} from "../constants/actions";
import React, { useContext, useReducer } from "react";

const initialState = {
  isBtnOpen: false,
  isModalOpen: false,
  isEventModalOpen: false,
  isDeleted: false,
  isTaskChecked: false,
  isSubtaskStatusChanged: false,
};

const AllContext = React.createContext();

export const AddBtnProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const addBtnOpen = () => {
    dispatch({ type: ADDBTN_OPEN });
  };
  const addBtnClose = () => {
    dispatch({ type: ADDBTN_CLOSE });
  };

  const modalOpen = () => {
    dispatch({ type: MODAL_OPEN });
  };
  const modalClose = () => {
    dispatch({ type: MODAL_CLOSE });
  };

  const taskDeleted = () => {
    dispatch({ type: TASK_DELETED });
  };
  const taskNotd = () => {
    dispatch({ type: TASK_NOTD });
  };

  const taskChecked = () => {
    dispatch({ type: TASK_CHECKED });
  };
  const taskUnchecked = () => {
    dispatch({ type: TASK_UNCHECKED });
  };

  const eventModalOpen = () => {
    dispatch({ type: EVENT_MODAL_OPEN });
  };
  const eventModalClose = () => {
    dispatch({ type: EVENT_MODAL_CLOSE });
  };

  const subtaskStatusChangedTrue = () => {
    dispatch({ type: TASK_CHECKED });
  };
  const subtaskStatusChangedFalse = () => {
    dispatch({ type: TASK_UNCHECKED });
  };

  return (
    <AllContext.Provider
      value={{
        ...state,
        addBtnOpen,
        addBtnClose,
        modalOpen,
        modalClose,
        taskDeleted,
        taskNotd,
        taskChecked,
        taskUnchecked,
        eventModalOpen,
        eventModalClose,
        subtaskStatusChangedFalse,
        subtaskStatusChangedTrue,
      }}
    >
      {children}
    </AllContext.Provider>
  );
};

export const useAllContext = () => {
  return useContext(AllContext);
};

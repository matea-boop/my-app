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
  TASK_DATA,
  TASK_DATA_EMPTY,
} from "../constants/actions";
import React, { useContext, useReducer } from "react";

const initialState = {
  isBtnOpen: false,
  isModalOpen: false,
  isDeleted: false,
  isTaskChecked: false,
  tasksData: [],
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

  const taskData = () => {
    dispatch({ type: TASK_DATA });
  };
  const taskDataEmpty = () => {
    dispatch({ type: TASK_DATA_EMPTY });
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
        taskData,
        taskDataEmpty,
      }}
    >
      {children}
    </AllContext.Provider>
  );
};

export const useAllContext = () => {
  return useContext(AllContext);
};

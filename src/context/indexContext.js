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
  FILE_DELETED,
  FILE_NOT_DELETED,
  FILE_MODAL_CLOSE,
  FILE_MODAL_OPEN,
  HABIT_MODAL_CLOSE,
  HABIT_MODAL_OPEN,
  HABIT_UNCLICKED,
  HABIT_CLICKED,
  HABIT_DELETED,
  HABIT_NOT_DELETED,
  DEADLINE_MODAL_OPEN,
  DEADLINE_MODAL_CLOSE,
  DEADLINE_DELETED,
  DEADLINE_NOT_DELETED,
  DEADLINE_EDITED,
  DEADLINE_NOT_EDITED,
  EVENT_EDITED,
  EVENT_NOT_EDITED,
  EVENT_DELETED,
} from "../constants/actions";
import React, { useContext, useReducer } from "react";

const initialState = {
  isBtnOpen: false,
  isModalOpen: false,

  isEventModalOpen: false,
  isEventChanged: false,
  isEventDeleted: false,

  isDeleted: false,
  isTaskChecked: false,
  isSubtaskStatusChanged: false,

  isFileDeleted: false,
  isFileModalOpen: false,

  isHabitModalOpen: false,
  isHabitClicked: false,
  isHabitDeleted: false,

  isDeadlineModalOpen: false,
  isDeadlineChanged: false,
  isDeadlineDeleted: false,
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

  const eventChanged = () => {
    dispatch({ type: EVENT_EDITED });
  };
  const eventNotChanged = () => {
    dispatch({ type: EVENT_NOT_EDITED });
  };

  const eventDeleted = () => {
    dispatch({ type: EVENT_DELETED });
  };
  const eventNotDeleted = () => {
    dispatch({ type: EVENT_NOT_EDITED });
  };

  const subtaskStatusChangedTrue = () => {
    dispatch({ type: TASK_CHECKED });
  };
  const subtaskStatusChangedFalse = () => {
    dispatch({ type: TASK_UNCHECKED });
  };

  const fileDeleted = () => {
    dispatch({ type: FILE_DELETED });
  };
  const fileNotDeleted = () => {
    dispatch({ type: FILE_NOT_DELETED });
  };

  const fileModalOpen = () => {
    dispatch({ type: FILE_MODAL_OPEN });
  };
  const fileModalClose = () => {
    dispatch({ type: FILE_MODAL_CLOSE });
  };

  const habitModalOpen = () => {
    dispatch({ type: HABIT_MODAL_OPEN });
  };
  const habitModalClose = () => {
    dispatch({ type: HABIT_MODAL_CLOSE });
  };

  const habitClicked = () => {
    dispatch({ type: HABIT_CLICKED });
  };
  const habitUnclicked = () => {
    dispatch({ type: HABIT_UNCLICKED });
  };

  const habitDeleted = () => {
    dispatch({ type: HABIT_DELETED });
  };
  const habitNotDeleted = () => {
    dispatch({ type: HABIT_NOT_DELETED });
  };

  const deadlineModalOpen = () => {
    dispatch({ type: DEADLINE_MODAL_OPEN });
  };
  const deadlineModalClose = () => {
    dispatch({ type: DEADLINE_MODAL_CLOSE });
  };
  const deadlineDeleted = () => {
    dispatch({ type: DEADLINE_DELETED });
  };
  const deadlineNotDeleted = () => {
    dispatch({ type: DEADLINE_NOT_DELETED });
  };
  const deadlineChanged = () => {
    dispatch({ type: DEADLINE_EDITED });
  };
  const deadlineNotChanged = () => {
    dispatch({ type: DEADLINE_NOT_EDITED });
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
        fileDeleted,
        fileNotDeleted,
        fileModalClose,
        fileModalOpen,
        habitModalClose,
        habitModalOpen,
        habitClicked,
        habitUnclicked,
        habitDeleted,
        habitNotDeleted,
        deadlineModalClose,
        deadlineModalOpen,
        deadlineDeleted,
        deadlineNotDeleted,
        deadlineChanged,
        deadlineNotChanged,
        eventChanged,
        eventNotChanged,
        eventDeleted,
        eventNotDeleted,
      }}
    >
      {children}
    </AllContext.Provider>
  );
};

export const useAllContext = () => {
  return useContext(AllContext);
};

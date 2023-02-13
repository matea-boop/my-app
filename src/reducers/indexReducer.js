import {
  ADDBTN_OPEN,
  ADDBTN_CLOSE,
  MODAL_CLOSE,
  MODAL_OPEN,
  TASK_DELETED,
  TASK_NOTD,
  TASK_UNCHECKED,
  TASK_CHECKED,
  TASK_DATA,
  TASK_DATA_EMPTY,
} from "../constants/actions";

const reducer = (state, action) => {
  if (action.type === ADDBTN_OPEN) {
    return { ...state, isBtnOpen: true };
  }
  if (action.type === ADDBTN_CLOSE) {
    return { ...state, isBtnOpen: false };
  }
  if (action.type === MODAL_CLOSE) {
    return { ...state, isModalOpen: false };
  }
  if (action.type === MODAL_OPEN) {
    return { ...state, isModalOpen: true };
  }
  if (action.type === TASK_DELETED) {
    return { ...state, isDeleted: true };
  }
  if (action.type === TASK_NOTD) {
    return { ...state, isDeleted: false };
  }
  if (action.type === TASK_CHECKED) {
    return { ...state, isTaskChecked: true };
  }
  if (action.type === TASK_UNCHECKED) {
    return { ...state, isTaskChecked: false };
  }
  if (action.type === TASK_DATA) {
    return { ...state, tasksData: action.payload };
  }
  if (action.type === TASK_DATA_EMPTY) {
    return { ...state, tasksData: [] };
  }
};

export default reducer;

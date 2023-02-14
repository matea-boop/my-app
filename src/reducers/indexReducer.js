import {
  ADDBTN_OPEN,
  ADDBTN_CLOSE,
  MODAL_CLOSE,
  MODAL_OPEN,
  TASK_DELETED,
  TASK_NOTD,
  TASK_UNCHECKED,
  TASK_CHECKED,
  EVENT_MODAL_CLOSE,
  EVENT_MODAL_OPEN,
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
  if (action.type === EVENT_MODAL_OPEN) {
    return { ...state, isEventModalOpen: true };
  }
  if (action.type === EVENT_MODAL_CLOSE) {
    return { ...state, isEventModalOpen: false };
  }
};

export default reducer;

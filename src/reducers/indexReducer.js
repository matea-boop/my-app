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
  SUBTASK_STATUS_FALSE,
  SUBTASK_STATUS_TRUE,
  FILE_DELETED,
  FILE_NOT_DELETED,
  FILE_MODAL_CLOSE,
  FILE_MODAL_OPEN,
  HABIT_MODAL_CLOSE,
  HABIT_MODAL_OPEN,
  HABIT_CLICKED,
  HABIT_UNCLICKED,
  HABIT_DELETED,
  HABIT_NOT_DELETED,
  DEADLINE_MODAL_OPEN,
  DEADLINE_MODAL_CLOSE,
  DEADLINE_DELETED,
  DEADLINE_NOT_DELETED,
  DEADLINE_EDITED,
  DEADLINE_NOT_EDITED,
  EVENT_DELETED,
  EVENT_NOT_DELETED,
  EVENT_EDITED,
  EVENT_NOT_EDITED,
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
  if (action.type === EVENT_DELETED) {
    return { ...state, isEventDeleted: true };
  }
  if (action.type === EVENT_NOT_DELETED) {
    return { ...state, isEventDeleted: false };
  }
  if (action.type === EVENT_EDITED) {
    return { ...state, isEventChanged: true };
  }
  if (action.type === EVENT_NOT_EDITED) {
    return { ...state, isEventChanged: false };
  }
  if (action.type === SUBTASK_STATUS_TRUE) {
    return { ...state, isSubtaskStatusChanged: true };
  }
  if (action.type === SUBTASK_STATUS_FALSE) {
    return { ...state, isSubtaskStatusChanged: false };
  }
  if (action.type === FILE_DELETED) {
    return { ...state, isFileDeleted: true };
  }
  if (action.type === FILE_NOT_DELETED) {
    return { ...state, isFileDeleted: false };
  }
  if (action.type === FILE_MODAL_CLOSE) {
    return { ...state, isFileModalOpen: false };
  }
  if (action.type === FILE_MODAL_OPEN) {
    return { ...state, isFileModalOpen: true };
  }
  if (action.type === HABIT_MODAL_CLOSE) {
    return { ...state, isHabitModalOpen: false };
  }
  if (action.type === HABIT_MODAL_OPEN) {
    return { ...state, isHabitModalOpen: true };
  }
  if (action.type === HABIT_CLICKED) {
    return { ...state, isHabitClicked: true };
  }
  if (action.type === HABIT_UNCLICKED) {
    return { ...state, isHabitClicked: false };
  }
  if (action.type === HABIT_DELETED) {
    return { ...state, isHabitDeleted: true };
  }
  if (action.type === HABIT_NOT_DELETED) {
    return { ...state, isHabitDeleted: false };
  }
  if (action.type === DEADLINE_MODAL_OPEN) {
    return { ...state, isDeadlineModalOpen: true };
  }
  if (action.type === DEADLINE_MODAL_CLOSE) {
    return { ...state, isDeadlineModalOpen: false };
  }
  if (action.type === DEADLINE_DELETED) {
    return { ...state, isDeadlineDeleted: true };
  }
  if (action.type === DEADLINE_NOT_DELETED) {
    return { ...state, isDeadlineDeleted: false };
  }
  if (action.type === DEADLINE_EDITED) {
    return { ...state, isDeadlineChanged: true };
  }
  if (action.type === DEADLINE_NOT_EDITED) {
    return { ...state, isDeadlineChanged: false };
  }
};

export default reducer;

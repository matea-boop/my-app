import { ADDBTN_OPEN, ADDBTN_CLOSE } from "../constants/actions";

const reducer = (state, action) => {
  if (action.type === ADDBTN_OPEN) {
    return { ...state, isBtnOpen: true };
  }
  if (action.type === ADDBTN_CLOSE) {
    return { ...state, isBtnOpen: false };
  }
};

export default reducer;

import reducer from "../reducers/indexReducer";
import { ADDBTN_OPEN, ADDBTN_CLOSE } from "../constants/actions";
import React, { useContext, useReducer } from "react";

const initialState = {
  isBtnOpen: false,
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

  return (
    <AllContext.Provider
      value={{
        ...state,
        addBtnOpen,
        addBtnClose,
      }}
    >
      {children}
    </AllContext.Provider>
  );
};

export const useAllContext = () => {
  return useContext(AllContext);
};

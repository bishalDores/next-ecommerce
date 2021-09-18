import { CHANGE_THEME_BG } from "../constants";

const initialState = {
  darkMode: false,
};

export const changeThemeBg = (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_THEME_BG:
      return {
        ...state,
        darkMode: action.payload,
      };
    default:
      return state;
  }
};

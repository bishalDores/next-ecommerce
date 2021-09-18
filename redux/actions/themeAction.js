import Cookies from "js-cookie";
import { CHANGE_THEME_BG } from "../constants";

export const changeThemeMode = (val) => (dispatch) => {
  dispatch({
    type: CHANGE_THEME_BG,
    payload: val,
  });
};

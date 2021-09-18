import { combineReducers } from "redux";
import { changeThemeBg } from "./themeReducer";
import { cartReducer } from "./cartReducer";

const reducers = combineReducers({
  theme: changeThemeBg,
  cartItems: cartReducer,
});

export default reducers;

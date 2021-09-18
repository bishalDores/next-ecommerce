import Cookies from "js-cookie";
import { ADD_TO_CART } from "../constants";

export const addToCart = (val) => async (dispatch, getState) => {
  dispatch({
    type: ADD_TO_CART,
    payload: val,
  });
  Cookies.set("cart", JSON.stringify(getState().cartItems.cart));
};

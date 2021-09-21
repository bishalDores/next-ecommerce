import Cookies from "js-cookie";
import { ADD_TO_CART, REMOVE_CART_ITEM } from "../constants";

export const addToCart = (val) => async (dispatch, getState) => {
  dispatch({
    type: ADD_TO_CART,
    payload: val,
  });
  Cookies.set("cart", JSON.stringify(getState().cartItems.cart));
};

export const removeFromCart = (id) => async (dispatch, getState) => {
  dispatch({
    type: REMOVE_CART_ITEM,
    payload: id,
  });
  Cookies.set("cart", JSON.stringify(getState().cartItems.cart));
};

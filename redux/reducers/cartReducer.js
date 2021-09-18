import { ADD_TO_CART } from "../constants";

const initialState = {
  cart: [],
};

export const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      const newItem = action.payload;
      const existItem = state.cart.find((item) => item._id === newItem._id);
      const cartItems = existItem
        ? state.cart.map((item) =>
            item._id === existItem._id ? newItem : item
          )
        : [...state.cart, newItem];

      return {
        ...state,
        cart: cartItems,
      };
    default:
      return state;
  }
};

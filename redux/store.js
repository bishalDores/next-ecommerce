import { createStore, applyMiddleware } from "redux";
import { HYDRATE, createWrapper } from "next-redux-wrapper";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import ThunkMiddleware from "redux-thunk";
import reducers from "./reducers/index";
import Cookies from "js-cookie";

const persistConfig = {
  key: "root",
  storage,
};
let initStore;

const cartItemsFromCookie = Cookies.get("cart")
  ? JSON.parse(Cookies.get("cart"))
  : [];

let initialState = {
  cartItems: {
    cart: cartItemsFromCookie,
  },
};

const bindMiddlware = (middlware) => {
  if (process.env.NODE_ENV !== "production") {
    const { composeWithDevTools } = require("redux-devtools-extension");
    return composeWithDevTools(applyMiddleware(...middlware));
  }

  return applyMiddleware(...middlware);
};
const isClient = typeof window !== "undefined";

const reducer = (state, action) => {
  if (action.type === HYDRATE) {
    const nextState = {
      ...state,
      ...action.payload,
    };
    return nextState;
  } else {
    return reducers(state, action);
  }
};

if (isClient) {
  initStore = () => {
    return createStore(
      persistReducer(persistConfig, reducer),
      initialState,
      bindMiddlware([ThunkMiddleware])
    );
  };
} else {
  initStore = () => {
    return createStore(reducer, bindMiddlware([ThunkMiddleware]));
  };
}

export const wrapper = createWrapper(initStore, { debug: true });

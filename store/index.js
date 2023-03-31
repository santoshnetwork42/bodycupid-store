import { combineReducers, createStore, applyMiddleware } from "redux";
import { createWrapper } from "next-redux-wrapper";
import createSagaMiddleWare from "redux-saga";
import { persistStore } from "redux-persist";

import rootSaga from "~/store/root-saga";

import cartReducer from "~/store/cart";
import modalReducer from "~/store/modal";
import wishlistReducer from "~/store/wishlist";
import userReducer from "~/store/user";
import systemReducer from "~/store/system";

const actionTypes = {
  DESTROY_SESSION: "DESTROY_SESSION",
};

const sagaMiddleware = createSagaMiddleWare();

const appReducer = combineReducers({
  cart: cartReducer,
  modal: modalReducer,
  wishlist: wishlistReducer,
  user: userReducer,
  system: systemReducer,
});

const preventedStore = ["modal", "system"];

const rootReducers = (state, action) => {
  // Clear all data in redux store to initial.
  if (action.type === actionTypes.DESTROY_SESSION) {
    const filteredStore = Object.keys(state)
      .filter((key) => preventedStore.includes(key))
      .reduce((obj, key) => {
        obj[key] = state[key];
        return obj;
      }, {});
    return appReducer(filteredStore, action);
  }
  return appReducer(state, action);
};

export const rootActions = {
  destroySession: () => ({ type: actionTypes.DESTROY_SESSION }),
};

export const makeStore = (context) => {
  const store = createStore(rootReducers, applyMiddleware(sagaMiddleware));

  store.sagaTask = sagaMiddleware.run(rootSaga);
  store.__persistor = persistStore(store);

  return store;
};

export const wrapper = createWrapper(makeStore);

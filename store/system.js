import { persistReducer } from "redux-persist";

import { STORE_PREFIX } from "~/config";
import storage from "~/utils/storage";

export const actionTypes = {
  SET_STORE: "SET_STORE",
  REFRESH_SYSTEM: "REFRESH_SYSTEM",
  SET_META: "SET_META",
};

const initialState = {
  store: null,
  meta: null,
};

function systemReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.SET_STORE:
      return { ...state, store: action.payload.store };

    case actionTypes.SET_META:
      return { ...state, meta: action.payload.meta };

    case actionTypes.REFRESH_SYSTEM:
      return initialState;

    default:
      return state;
  }
}

export const systemActions = {
  setStore: (store) => ({ type: actionTypes.SET_STORE, payload: { store } }),
  setMeta: (meta) => ({ type: actionTypes.SET_META, payload: { meta } }),
};

const persistConfig = {
  keyPrefix: `${STORE_PREFIX}-`,
  key: "system",
  storage,
  blacklist: ["store"],
};

export default persistReducer(persistConfig, systemReducer);

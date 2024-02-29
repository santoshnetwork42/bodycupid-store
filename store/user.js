import { persistReducer } from "redux-persist";

import { STORE_PREFIX } from "~/config";
import storage from "~/utils/storage";

export const actionTypes = {
  SET_USER: "SET_USER",
  REMOVE_USER: "REMOVE_USER",
  UPDATE_USER: "UPDATE_USER",
  REFRESH_USER: "REFRESH_USER",
  UPDATE_USER_FIELDS: "UPDATE_USER_FIELD",
};

const initialState = {
  data: null,
};

function userReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.SET_USER:
    case actionTypes.UPDATE_USER:
      return { ...state, data: action.payload.user };
    case actionTypes.UPDATE_USER_FIELDS:
      return {
        ...state,
        data: { ...state.data, ...action.payload.updatedFields },
      };
    case actionTypes.REMOVE_USER:
    case actionTypes.REFRESH_USER:
      return initialState;

    default:
      return state;
  }
}

export const userActions = {
  setUser: (user) => ({ type: actionTypes.SET_USER, payload: { user } }),
  updateUserFields: (updatedFields) => ({
    type: actionTypes.UPDATE_USER_FIELDS,
    payload: { updatedFields },
  }),
  removeUser: () => ({
    type: actionTypes.REFRESH_USER,
    payload: { user: null },
  }),
};

const persistConfig = {
  keyPrefix: `${STORE_PREFIX}-`,
  key: "user",
  storage,
};

export default persistReducer(persistConfig, userReducer);

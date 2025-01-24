import { persistReducer } from "redux-persist";

import { STORE_PREFIX } from "~/config";
import storage from "~/utils/storage";

export const actionTypes = {
  REFRESH_USER_STATE: "REFRESH_USER_STATE",
  SET_USER: "SET_USER",
  REMOVE_USER: "REMOVE_USER",
  UPDATE_USER: "UPDATE_USER",
  REFRESH_USER: "REFRESH_USER",
  UPDATE_USER_FIELDS: "UPDATE_USER_FIELD",
  SET_CUSTOM_USER: "SET_CUSTOM_USER",
  SET_USER_LOCAL_ADDRESS: "SET_USER_LOCAL_ADDRESS",
  SET_LOGGED_IN_VIA: "SET_LOGGED_IN_VIA",
};

const initialState = {
  data: null,
  custom: null,
  userAddress: null,
  isLoggedinViaGokwik: false,
};

function userReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.REFRESH_USER_STATE:
      return { ...initialState };
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

    case actionTypes.SET_CUSTOM_USER:
      return { ...state, custom: action.payload.user };
    case actionTypes.SET_USER_LOCAL_ADDRESS:
      return { ...state, userAddress: action.payload.userAddress };

    case actionTypes.SET_LOGGED_IN_VIA:
      return {
        ...state,
        isLoggedinViaGokwik: action.payload.isLoggedinViaGokwik,
      };

    default:
      return state;
  }
}

export const userActions = {
  refreshUserState: () => ({ type: actionTypes.REFRESH_USER_STATE }),
  setUser: (user) => ({ type: actionTypes.SET_USER, payload: { user } }),
  updateUserFields: (updatedFields) => ({
    type: actionTypes.UPDATE_USER_FIELDS,
    payload: { updatedFields },
  }),
  removeUser: () => ({
    type: actionTypes.REFRESH_USER,
    payload: { user: null },
  }),
  setCustomUser: (phone) => ({
    type: actionTypes.SET_CUSTOM_USER,
    payload: { user: { phone } },
  }),
  setUserLocalAddress: (address) => ({
    type: actionTypes.SET_USER_LOCAL_ADDRESS,
    payload: { userAddress: { ...address } },
  }),
  setIsLoggedinViaGokwik: (gk) => ({
    type: actionTypes.SET_LOGGED_IN_VIA,
    payload: { isLoggedinViaGokwik: gk },
  }),
};

const persistConfig = {
  keyPrefix: `${STORE_PREFIX}-`,
  key: "user",
  storage,
};

export default persistReducer(persistConfig, userReducer);

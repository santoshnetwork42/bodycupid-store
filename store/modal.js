import { persistReducer } from "redux-persist";

import { STORE_PREFIX } from "~/config";
import storage from "~/utils/storage";

const actionTypes = {
  OPEN_MODAL: "OPEN_MODAL",
  CLOSE_MODAL: "CLOSE_MODAL",
  OPEN_QUICKVIEW: "OPEN_QUICKVIEW",
  CLOSE_QUICKVIEW: "CLOSE_QUICKVIEW",
  OPEN_LOGIN: "OPEN_LOGIN",
  CLOSE_LOGIN: "CLOSE_LOGIN",
  OPEN_PASSWORDLESS: "OPEN_PASSWORDLESS",
  CLOSE_PASSWORDLESS: "CLOSE_PASSWORDLESS",
  REFRESH_MODAL: "REFRESH_MODAL",
  OPEN_ALL_ADDRESS_MODAL: "OPEN_ALL_ADDRESS_MODAL",
  CLOSE_ALL_ADDRESS_MODAL: "CLOSE_ALL_ADDRESS_MODAL",
  SET_CART_VISIBILITY: "SET_CART_VISIBILITY",
};

const initialState = {
  type: "video",
  openModal: false,
  openCart: false,
  quickview: false,
  login: false,
  singleSlug: "",
  loginRedirect: true,
  passwordless: false,
  allAddressModal: false,
};

function modalReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.OPEN_QUICKVIEW:
      return {
        ...state,
        quickview: true,
        singleSlug: action.payload.slug,
      };

    case actionTypes.CLOSE_QUICKVIEW:
      return {
        ...state,
        quickview: false,
      };

    case actionTypes.SET_CART_VISIBILITY:
      return {
        ...state,
        openCart: action.payload,
      };

    case actionTypes.OPEN_MODAL:
      return {
        ...state,
        singleSlug: action.payload.slug,
        openModal: true,
      };

    case actionTypes.CLOSE_MODAL:
      return {
        ...state,
        openModal: false,
      };

    case actionTypes.OPEN_LOGIN:
      return { ...state, login: true, loginRedirect: action.payload.redirect };

    case actionTypes.CLOSE_LOGIN:
      return { ...state, login: false, loginRedirect: true };

    case actionTypes.OPEN_PASSWORDLESS:
      return {
        ...state,
        passwordless: true,
        loginRedirect: action.payload.redirect,
      };

    case actionTypes.CLOSE_PASSWORDLESS:
      return { ...state, passwordless: false, loginRedirect: true };

    case actionTypes.OPEN_ALL_ADDRESS_MODAL:
      return {
        ...state,
        allAddressModal: true,
      };

    case actionTypes.CLOSE_ALL_ADDRESS_MODAL:
      return {
        ...state,
        allAddressModal: false,
      };

    case actionTypes.REFRESH_MODAL:
      return initialState;

    default:
      return state;
  }
}

export const modalActions = {
  openModal: (slug) => ({ type: actionTypes.OPEN_MODAL, payload: { slug } }),
  closeModal: (modalType) => ({
    type: actionTypes.CLOSE_MODAL,
    payload: { modalType },
  }),

  setCartVisibility: (payload) => ({ type: actionTypes.SET_CART_VISIBILITY, payload }),

  openQuickview: (slug) => ({
    type: actionTypes.OPEN_QUICKVIEW,
    payload: { slug },
  }),
  closeQuickview: () => ({ type: actionTypes.CLOSE_QUICKVIEW }),
  openLoginModal: (redirect = true) => ({
    type: actionTypes.OPEN_LOGIN,
    payload: { redirect },
  }),
  closeLoginModal: () => ({ type: actionTypes.CLOSE_LOGIN }),
  openPasswordlessModal: (redirect = false) => ({
    type: actionTypes.OPEN_PASSWORDLESS,
    payload: { redirect },
  }),
  closePasswordlessModal: () => ({ type: actionTypes.CLOSE_PASSWORDLESS }),
  openAllAddressModal: () => ({
    type: actionTypes.OPEN_ALL_ADDRESS_MODAL,
  }),
  closeAllAddressModal: () => ({
    type: actionTypes.CLOSE_ALL_ADDRESS_MODAL,
  }),
};

const persistConfig = {
  keyPrefix: `${STORE_PREFIX}-`,
  key: "modal",
  storage,
};

export default persistReducer(persistConfig, modalReducer);

import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { call, put, select, takeEvery } from "redux-saga/effects";
import { API } from "aws-amplify";
import { STORE_ID, STORE_PREFIX } from "~/config";
import { getFeaturedCoupon } from "~/graphql/api";

const actionTypes = {
  SET_STORE: "SET_STORE",
  SET_SHIPPING: "SET_SHIPPING",
  SET_FEATURED_COUPONS: "SET_FEATURED_COUPONS",
  GET_FEATURED_COUPONS: "GET_FEATURED_COUPONS",
};

const initialState = {
  store: null,
  shipping: null,
  featuredCoupon: null,
};

function systemReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.SET_STORE:
      return { ...state, store: action.payload.store };

    case actionTypes.SET_SHIPPING:
      return { ...state, shipping: action.payload.shipping };

    case actionTypes.SET_FEATURED_COUPONS:
      return { ...state, featuredCoupon: action.payload.coupons };

    case actionTypes.REFRESH_USER:
      return initialState;

    default:
      return state;
  }
}

export const systemActions = {
  setStore: (store) => ({ type: actionTypes.SET_STORE, payload: { store } }),
  setShipping: (shipping) => ({
    type: actionTypes.SET_SHIPPING,
    payload: { shipping },
  }),
  setFeaturedCoupons: (coupons) => ({
    type: actionTypes.SET_FEATURED_COUPONS,
    payload: { coupons },
  }),
  getFeaturedCoupon: () => ({
    type: actionTypes.GET_FEATURED_COUPONS,
  }),
};

const persistConfig = {
  keyPrefix: `${STORE_PREFIX}-`,
  key: "system",
  storage,
  blacklist: ["featuredCoupon"],
};

export function* systemSaga() {
  yield takeEvery(actionTypes.GET_FEATURED_COUPONS, function* saga(e) {
    const { system } = yield select();
    const { featuredCoupon } = system || {};
    if (!featuredCoupon) {
      const {
        data: {
          searchCouponCodes: { items },
        },
      } = yield call([API, API.graphql], {
        query: getFeaturedCoupon,
        variables: {
          filter: {
            isFeatured: { eq: true },
            isActive: { eq: true },
            storeId: { eq: STORE_ID },
          },
        },
      });
      yield put({
        type: actionTypes.SET_FEATURED_COUPONS,
        payload: { coupons: items },
      });
    }
  });
}

export default persistReducer(persistConfig, systemReducer);

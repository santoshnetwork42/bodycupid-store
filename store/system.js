import { persistReducer } from "redux-persist";
import { call, put, select, takeEvery } from "redux-saga/effects";
import { API } from "aws-amplify";

import { STORE_ID, STORE_PREFIX } from "~/config";
import { getFeaturedCoupon, searchShippingTiers } from "~/graphql/api";
import storage from "~/utils/storage";

const actionTypes = {
  SET_STORE: "SET_STORE",
  REFRESH_SYSTEM: "REFRESH_SYSTEM",

  SET_FEATURED_COUPONS: "SET_FEATURED_COUPONS",
  GET_FEATURED_COUPONS: "GET_FEATURED_COUPONS",

  SET_META: "SET_META",

  GET_SHIPPING_TIERS: "GET_SHIPPING_TIERS",
  SET_SHIPPING_TIERS: "SET_SHIPPING_TIERS",
};

const initialState = {
  store: null,
  featuredCoupon: null,
  meta: null,
  shippingTiers: null,
};

function systemReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.SET_STORE:
      return { ...state, store: action.payload.store };

    case actionTypes.SET_FEATURED_COUPONS:
      return { ...state, featuredCoupon: action.payload.coupons };

    case actionTypes.SET_META:
      return { ...state, meta: action.payload.meta };

    case actionTypes.SET_SHIPPING_TIERS:
      return { ...state, shippingTiers: action.payload.shippingTiers };

    case actionTypes.REFRESH_SYSTEM:
      return initialState;

    default:
      return state;
  }
}

export const systemActions = {
  setStore: (store) => ({ type: actionTypes.SET_STORE, payload: { store } }),
  setFeaturedCoupons: (coupons) => ({
    type: actionTypes.SET_FEATURED_COUPONS,
    payload: { coupons },
  }),
  getFeaturedCoupon: () => ({ type: actionTypes.GET_FEATURED_COUPONS }),
  getShippingTiers: () => ({ type: actionTypes.GET_SHIPPING_TIERS }),
  setShippingTiers: (shippingTiers) => ({
    type: actionTypes.SET_SHIPPING_TIERS,
    payload: { shippingTiers },
  }),
  setMeta: (meta) => ({ type: actionTypes.SET_META, payload: { meta } }),
};

const persistConfig = {
  keyPrefix: `${STORE_PREFIX}-`,
  key: "system",
  storage,
  blacklist: ["featuredCoupon", "store", "shippingTiers"],
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

  yield takeEvery(actionTypes.GET_SHIPPING_TIERS, function* saga(e) {
    const { system } = yield select();
    const { shippingTiers } = system || {};
    if (!shippingTiers) {
      const {
        data: {
          searchShippingTiers: { items },
        },
      } = yield call([API, API.graphql], {
        query: searchShippingTiers,
        variables: {
          filter: {
            storeId: { eq: STORE_ID },
          },
        },
      });
      yield put({
        type: actionTypes.SET_SHIPPING_TIERS,
        payload: { shippingTiers: items },
      });
    }
  });
}

export default persistReducer(persistConfig, systemReducer);

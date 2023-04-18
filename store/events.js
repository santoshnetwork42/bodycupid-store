import { takeEvery, select } from "redux-saga/effects";
import { Analytics } from "aws-amplify";
import { persistReducer } from "redux-persist";

import { actionTypes as cartActions } from "~/store/cart";
import { actionTypes as wishlistActions } from "~/store/wishlist";
import { itemMapper } from "~/utils/events";
import { STORE_PREFIX } from "~/config";
import storage from "~/utils/storage";

export const actionTypes = {
  VIEW_ITEM: "VIEW_ITEM",
};

const initialState = {
  data: [],
};

function eventReducer(state = initialState) {
  return state;
}

export const eventActions = {
  viewItem: (product) => ({ type: actionTypes.VIEW_ITEM, payload: { product }, }),
};

export function* eventsSaga() {
  yield takeEvery(cartActions.ADD_TO_CART, function* saga(e) {
    const { product } = e.payload;
    const { item, items, value } = itemMapper(product);

    window.dataLayer.push({ ecommerce: null });
    dataLayer.push({
      event: "add_to_cart",
      ecommerce: {
        currency: "INR",
        value,
        items
      }
    });
    Analytics.record({ name: "add_to_cart", attributes: item, metrics: { value } });
  });

  yield takeEvery(cartActions.REMOVE_FROM_CART, function* saga(e) {
    const { product } = e.payload;
    const { item, items, value } = itemMapper(product);
    window.dataLayer.push({ ecommerce: null });
    dataLayer.push({
      event: "remove_from_cart",
      ecommerce: {
        currency: "INR",
        value,
        items
      }
    });
    Analytics.record({ name: "remove_from_cart", attributes: item, metrics: { value } });
  });

  yield takeEvery(wishlistActions.TOGGLE_WISHLIST, function* saga(e) {
    const { product } = e.payload;
    const { item, items, value } = itemMapper(product);
    window.dataLayer.push({ ecommerce: null });
    dataLayer.push({
      event: "add_to_wishlist",
      ecommerce: {
        currency: "INR",
        value,
        items
      }
    });
    Analytics.record({ name: "add_to_wishlist", attributes: item, metrics: { value } });
  });

  yield takeEvery(wishlistActions.REMOVE_FROM_WISHLIST, function* saga(e) {
    const { product } = e.payload;
    const { item, items, value } = itemMapper(product);
    window.dataLayer.push({ ecommerce: null });
    dataLayer.push({
      event: "add_to_wishlist",
      ecommerce: {
        currency: "INR",
        value,
        items
      }
    });
    Analytics.record({ name: "add_to_wishlist", attributes: item, metrics: { value } });
  });

  yield takeEvery(actionTypes.VIEW_ITEM, function* saga(e) {
    const { product } = e.payload;
    const { item, items, value } = itemMapper(product);
    window.dataLayer.push({ ecommerce: null });
    dataLayer.push({
      event: "view_item",
      ecommerce: {
        currency: "INR",
        value,
        items
      }
    });
    Analytics.record({ name: "view_item", attributes: item, metrics: { value } });
  });
}

const persistConfig = {
  keyPrefix: `${STORE_PREFIX}-`,
  key: "events",
  storage,
};

export default persistReducer(persistConfig, eventReducer);
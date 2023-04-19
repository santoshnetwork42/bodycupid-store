import { takeEvery } from "redux-saga/effects";
import { Analytics } from "aws-amplify";
import { persistReducer } from "redux-persist";

import { actionTypes as cartActions } from "~/store/cart";
import { actionTypes as wishlistActions } from "~/store/wishlist";
import { itemMapper, orderMapper } from "~/utils/events";
import { STORE_PREFIX } from "~/config";
import storage from "~/utils/storage";

export const actionTypes = {
  VIEW_ITEM: "VIEW_ITEM",
  PLACE_ORDER: "PLACE_ORDER",
};

const initialState = {
  data: [],
};

function eventReducer(state = initialState) {
  return state;
}

export const eventActions = {
  viewItem: (product) => ({ type: actionTypes.VIEW_ITEM, payload: { product }, }),
  placeOrder: (order, products, coupon) => ({ type: actionTypes.PLACE_ORDER, payload: { order, products, coupon }, }),
};

export function* eventsSaga() {
  yield takeEvery(cartActions.ADD_TO_CART, function* saga(e) {
    const { product } = e.payload;
    const { attributes, items, value } = itemMapper(product);

    window.dataLayer.push({ ecommerce: null });
    dataLayer.push({
      event: "add_to_cart",
      ecommerce: {
        currency: "INR",
        value,
        items
      }
    });
    Analytics.record({ name: "add_to_cart", attributes, metrics: { value } });
  });

  yield takeEvery(cartActions.REMOVE_FROM_CART, function* saga(e) {
    const { product } = e.payload;
    const { attributes, items, value } = itemMapper(product);
    window.dataLayer.push({ ecommerce: null });
    dataLayer.push({
      event: "remove_from_cart",
      ecommerce: {
        currency: "INR",
        value,
        items
      }
    });
    Analytics.record({ name: "remove_from_cart", attributes, metrics: { value } });
  });

  yield takeEvery(wishlistActions.TOGGLE_WISHLIST, function* saga(e) {
    const { product } = e.payload;
    const { attributes, items, value } = itemMapper(product);
    window.dataLayer.push({ ecommerce: null });
    dataLayer.push({
      event: "add_to_wishlist",
      ecommerce: {
        currency: "INR",
        value,
        items
      }
    });
    Analytics.record({ name: "add_to_wishlist", attributes, metrics: { value } });
  });

  yield takeEvery(wishlistActions.REMOVE_FROM_WISHLIST, function* saga(e) {
    const { product } = e.payload;
    const { attributes, items, value } = itemMapper(product);
    window.dataLayer.push({ ecommerce: null });
    dataLayer.push({
      event: "add_to_wishlist",
      ecommerce: {
        currency: "INR",
        value,
        items
      }
    });
    Analytics.record({ name: "add_to_wishlist", attributes, metrics: { value } });
  });

  yield takeEvery(actionTypes.VIEW_ITEM, function* saga(e) {
    const { product } = e.payload;
    const { attributes, items, value } = itemMapper(product);
    window.dataLayer.push({ ecommerce: null });
    dataLayer.push({
      event: "view_item",
      ecommerce: {
        currency: "INR",
        value,
        items
      }
    });
    Analytics.record({ name: "view_item", attributes, metrics: { value } });
  });

  yield takeEvery(actionTypes.PLACE_ORDER, function* saga(e) {
    const { order, products, coupon } = e.payload;
    const { id, totalShippingCharges, totalAmount } = order;

    const { attributes, items } = orderMapper(products, coupon);
    window.dataLayer.push({ ecommerce: null });
    dataLayer.push({
      event: "purchase",
      ecommerce: {
        transaction_id: id,
        value: totalAmount,
        tax: 0,
        shipping: totalShippingCharges,
        currency: "INR",
        coupon: coupon?.code || "",
        items
      }
    });
    Analytics.record({
      name: "purchase",
      attributes: {
        transaction_id: id,
        value: totalAmount.toString(),
        tax: "0",
        shipping: totalShippingCharges.toString(),
        currency: "INR",
        coupon: coupon?.code || "",
      },
      metrics: { value: totalAmount }
    });
    attributes.forEach(attribute => Analytics.record({
      name: "purchase_item",
      attributes: {
        ...attribute,
        transaction_id: id,
        value: totalAmount.toString(),
        tax: "0",
        shipping: totalShippingCharges.toString(),
        currency: "INR",
        coupon: coupon?.code || "",
      },
    }));
  });
}

const persistConfig = {
  keyPrefix: `${STORE_PREFIX}-`,
  key: "events",
  storage,
};

export default persistReducer(persistConfig, eventReducer);
import { takeEvery, select } from "redux-saga/effects";
import { Analytics } from "aws-amplify";
import { persistReducer } from "redux-persist";

import storage from "~/utils/storage";
import { actionTypes as cartActions } from "~/store/cart";
import { actionTypes as wishlistActions } from "~/store/wishlist";
import { itemMapper, orderMapper } from "~/utils/events";
import { STORE_PREFIX } from "~/config";

export const actionTypes = {
  VIEW_ITEM: "VIEW_ITEM",
  PLACE_ORDER: "PLACE_ORDER",
  CHECKOUT_STARTED: "CHECKOUT_STARTED",
  VIEW_CART: "VIEW_CART",
  AUTH: "AUTH",
  SEARCH: "SEARCH",
  VIEW_LIST_ITEM: "VIEW_LIST_ITEM",
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
  startCheckout: () => ({ type: actionTypes.CHECKOUT_STARTED }),
  viewCart: () => ({ type: actionTypes.VIEW_CART }),
  auth: (action) => ({ type: actionTypes.AUTH, payload: { action } }),
  search: (term) => ({ type: actionTypes.SEARCH, payload: { term } }),
  viewList: (id, name, products) => ({ type: actionTypes.VIEW_LIST_ITEM, payload: { id, name, products } })
};

export function* eventsSaga() {
  yield takeEvery(actionTypes.SEARCH, function* saga(e) {
    const { term } = e.payload;
    dataLayer.push({ event: "search", search_term: term });
    Analytics.record({ name: "search", attributes: { search_term: term } });
  });

  yield takeEvery(actionTypes.AUTH, function* saga(e) {
    const { action } = e.payload;
    dataLayer.push({ event: action });
    Analytics.record({ name: action });
  });

  yield takeEvery(cartActions.ADD_TO_CART, function* saga(e) {
    const { product } = e.payload;
    const { qty } = product;
    const { attributes, items, value } = itemMapper(product);
    const eventName = qty > 0 ? "add_to_cart" : "remove_from_cart";

    dataLayer.push({ ecommerce: null });
    dataLayer.push({
      event: eventName,
      ecommerce: {
        currency: "INR",
        value,
        items
      }
    });
    Analytics.record({ name: eventName, attributes, metrics: { value } });

  });

  yield takeEvery(cartActions.REMOVE_FROM_CART, function* saga(e) {
    const { product } = e.payload;
    const { attributes, items, value } = itemMapper(product);
    dataLayer.push({ ecommerce: null });
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
    dataLayer.push({ ecommerce: null });
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
    dataLayer.push({ ecommerce: null });
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
    dataLayer.push({ ecommerce: null });
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
    dataLayer.push({ ecommerce: null });
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

  yield takeEvery(actionTypes.CHECKOUT_STARTED, function* saga(e) {
    const { cart: { data, coupon } } = yield select();
    const { attributes, items, value } = orderMapper(data, coupon);
    dataLayer.push({ ecommerce: null });
    dataLayer.push({
      event: "begin_checkout",
      ecommerce: {
        value,
        currency: "INR",
        coupon: coupon?.code || "",
        items
      }
    });
    Analytics.record({
      name: "begin_checkout",
      attributes: {
        currency: "INR",
        coupon: coupon?.code || "",
      },
      metrics: { value }
    });
    attributes.forEach(attribute => Analytics.record({
      name: "begin_chekout_item",
      attributes: {
        ...attribute,
        value: value.toString(),
        currency: "INR",
        coupon: coupon?.code || "",
      },
    }));
  });

  yield takeEvery(actionTypes.VIEW_CART, function* saga(e) {
    const { cart: { data, coupon } } = yield select();
    const { attributes, items, value } = orderMapper(data, coupon);
    dataLayer.push({ ecommerce: null });
    dataLayer.push({
      event: "view_cart",
      ecommerce: {
        value,
        currency: "INR",
        coupon: coupon?.code || "",
        items
      }
    });
    Analytics.record({
      name: "view_cart",
      attributes: {
        currency: "INR",
        coupon: coupon?.code || "",
      },
      metrics: { value }
    });
    attributes.forEach(attribute => Analytics.record({
      name: "view_cart_item",
      attributes: {
        ...attribute,
        value: value.toString(),
        currency: "INR",
        coupon: coupon?.code || "",
      },
    }));
  });

  yield takeEvery(actionTypes.VIEW_LIST_ITEM, function* saga(e) {
    const { id, name, products } = e.payload;
    const { attributes, items } = orderMapper(products);
    dataLayer.push({ ecommerce: null });
    dataLayer.push({
      event: "view_item_list",
      ecommerce: {
        item_list_id: id,
        item_list_name: name,
        items
      }
    });
    Analytics.record({
      name: "view_item_list",
      attributes: {
        item_list_id: id,
        item_list_name: name
      },
    });
    attributes.forEach(attribute => Analytics.record({
      name: "view_item_list_item",
      attributes: {
        ...attribute,
        item_list_id: id,
        item_list_name: name
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
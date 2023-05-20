import { takeEvery, select } from "redux-saga/effects";
import { Analytics } from "aws-amplify";
import { persistReducer } from "redux-persist";
import { v4 as uuid } from "uuid";
import vercelAnalytics from "@vercel/analytics";

import storage from "~/utils/storage";
import { actionTypes as cartActions } from "~/store/cart";
import { itemMapper, orderMapper } from "~/utils/events";
import { STORE_PREFIX } from "~/config";
import { getRecordKey } from "~/utils/helper";

export const actionTypes = {
  VIEW_ITEM: "VIEW_ITEM",
  PLACE_ORDER: "PLACE_ORDER",
  CHECKOUT_STARTED: "CHECKOUT_STARTED",
  VIEW_CART: "VIEW_CART",
  AUTH: "AUTH",
  SEARCH: "SEARCH",
  VIEW_LIST_ITEM: "VIEW_LIST_ITEM",
  OUT_OF_STOCK: "OUT_OF_STOCK",
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
  viewList: (id, name, products) => ({ type: actionTypes.VIEW_LIST_ITEM, payload: { id, name, products } }),
  outOfStock: (products, inventory) => ({ type: actionTypes.OUT_OF_STOCK, payload: { products, inventory } }),
};

export function* eventsSaga() {
  yield takeEvery(actionTypes.OUT_OF_STOCK, function* saga(e) {
    const { products, inventory } = e.payload;
    if (Array.isArray(products)) {
      products.forEach(product => {
        const recordKey = getRecordKey(product, product.variantId);
        const payload = {
          productId: product.id,
          variantId: product.variantId,
          cartQty: product.qty,
          inventoryQty: inventory[recordKey]
        };

        dataLayer.push({
          event: "out_of_stock",
          eventID: uuid(),
          ...payload,
        });
        Analytics.record({ name: "out_of_stock", attributes: payload });
        vercelAnalytics.track("out_of_stock", payload);
      });
    }
  });

  yield takeEvery(actionTypes.SEARCH, function* saga(e) {
    const { term } = e.payload;
    dataLayer.push({ event: "search", eventID: uuid(), search_term: term });
    Analytics.record({ name: "search", attributes: { search_term: term } });
    vercelAnalytics.track("search", { searchTerm: term });
  });

  yield takeEvery(actionTypes.AUTH, function* saga(e) {
    const { action } = e.payload;
    dataLayer.push({ event: action, eventID: uuid() });
    Analytics.record({ name: action });
    vercelAnalytics.track(action);
  });

  yield takeEvery(cartActions.ADD_TO_CART, function* saga(e) {
    const { product } = e.payload;
    const { qty } = product;
    const { attributes, items, value, attribute } = itemMapper(product);
    const eventName = qty > 0 ? "add_to_cart" : "remove_from_cart";

    dataLayer.push({ ecommerce: null, attribute: null });
    dataLayer.push({
      event: eventName,
      eventID: uuid(),
      attribute,
      ecommerce: {
        currency: "INR",
        value,
        items,
      }
    });
    Analytics.record({ name: eventName, attributes, metrics: { value } });
    vercelAnalytics.track(eventName, attribute);
  });

  yield takeEvery(cartActions.REMOVE_FROM_CART, function* saga(e) {
    const { product } = e.payload;
    const { attributes, items, value, attribute } = itemMapper(product);
    dataLayer.push({ ecommerce: null, attribute: null });
    dataLayer.push({
      event: "remove_from_cart",
      eventID: uuid(),
      attribute,
      ecommerce: {
        currency: "INR",
        value,
        items
      }
    });
    Analytics.record({ name: "remove_from_cart", attributes, metrics: { value } });
    vercelAnalytics.track("remove_from_cart", attribute);
  });

  yield takeEvery(actionTypes.VIEW_ITEM, function* saga(e) {
    const { product } = e.payload;
    const { attributes, items, value, attribute } = itemMapper(product);
    dataLayer.push({ ecommerce: null, attribute: null });
    dataLayer.push({
      event: "view_item",
      eventID: uuid(),
      attribute,
      ecommerce: {
        currency: "INR",
        value,
        items
      }
    });
    Analytics.record({ name: "view_item", attributes, metrics: { value } });
    vercelAnalytics.track("view_item", attribute);
  });

  yield takeEvery(actionTypes.PLACE_ORDER, function* saga(e) {
    const { order, products, coupon } = e.payload;
    const { id, totalShippingCharges, totalAmount, totalDiscount } = order;

    const { attributes, items, attribute } = orderMapper(products, coupon);
    const attributeData = {
      ...attribute,
      value: totalAmount,
    };

    dataLayer.push({ ecommerce: null, attribute: null });
    dataLayer.push({
      event: "purchase",
      eventID: uuid(),
      attribute: attributeData,
      ecommerce: {
        transaction_id: id,
        value: totalAmount,
        tax: 0,
        discount: totalDiscount,
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
        discount: totalDiscount.toString(),
        shipping: totalShippingCharges.toString(),
        currency: "INR",
        coupon: coupon?.code || "",
      },
      metrics: { value: totalAmount }
    });

    vercelAnalytics.track("purchase", {
      transaction_id: id,
      value: totalAmount,
      tax: 0,
      discount: totalDiscount,
      shipping: totalShippingCharges,
      currency: "INR",
      coupon: coupon?.code || "",
    });

    attributes.forEach(attr => {
      Analytics.record({
        name: "purchase_item",
        attributes: {
          ...attr,
          transaction_id: id,
          value: totalAmount.toString(),
          tax: "0",
          shipping: totalShippingCharges.toString(),
          currency: "INR",
          coupon: coupon?.code || "",
        },
      });

      vercelAnalytics.track("purchase_item", {
        ...attr,
        transaction_id: id,
        value: totalAmount,
        tax: 0,
        shipping: totalShippingCharges,
        currency: "INR",
        coupon: coupon?.code || "",
      });
    });
  });

  yield takeEvery(actionTypes.CHECKOUT_STARTED, function* saga(e) {
    const { cart: { data, coupon } } = yield select();
    const { attributes, items, value, attribute } = orderMapper(data, coupon);
    dataLayer.push({ ecommerce: null, attribute: null });
    dataLayer.push({
      event: "begin_checkout",
      eventID: uuid(),
      attribute,
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

    vercelAnalytics.track("begin_checkout", {
      currency: "INR",
      coupon: coupon?.code || "",
    });

    attributes.forEach(attr => {
      Analytics.record({
        name: "begin_chekout_item",
        attributes: {
          ...attr,
          value: value.toString(),
          currency: "INR",
          coupon: coupon?.code || "",
        },
      });

      vercelAnalytics.track("begin_chekout_item", {
        ...attr,
        value,
        currency: "INR",
        coupon: coupon?.code || "",
      });
    });
  });

  yield takeEvery(actionTypes.VIEW_CART, function* saga(e) {
    const { cart: { data, coupon } } = yield select();
    const { attributes, items, value, attribute } = orderMapper(data, coupon);
    dataLayer.push({ ecommerce: null, attribute: null });
    dataLayer.push({
      event: "view_cart",
      eventID: uuid(),
      attribute,
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

    vercelAnalytics.track("view_cart", {
      currency: "INR",
      coupon: coupon?.code || "",
    });

    attributes.forEach(attr => {
      Analytics.record({
        name: "view_cart_item",
        attributes: {
          ...attr,
          value: value.toString(),
          currency: "INR",
          coupon: coupon?.code || "",
        },
      });

      vercelAnalytics.track("view_cart_item", {
        ...attr,
        value,
        currency: "INR",
        coupon: coupon?.code || "",
      });
    });
  });

  yield takeEvery(actionTypes.VIEW_LIST_ITEM, function* saga(e) {
    const { id, name, products } = e.payload;
    const { attributes, items, attribute } = orderMapper(products);
    dataLayer.push({ ecommerce: null, attribute: null });
    dataLayer.push({
      event: "view_item_list",
      eventID: uuid(),
      attribute,
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

    vercelAnalytics.track("view_item_list", {
      item_list_id: id,
      item_list_name: name
    });

    attributes.forEach(attr => {
      Analytics.record({
        name: "view_item_list_item",
        attributes: {
          ...attr,
          item_list_id: id,
          item_list_name: name
        },
      });

      vercelAnalytics.track("view_item_list_item", {
        ...attr,
        item_list_id: id,
        item_list_name: name
      });
    });
  });
}

const persistConfig = {
  keyPrefix: `${STORE_PREFIX}-`,
  key: "events",
  storage,
};

export default persistReducer(persistConfig, eventReducer);
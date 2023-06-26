import { takeEvery, select, call } from "redux-saga/effects";
import { Analytics } from "aws-amplify";
import { persistReducer } from "redux-persist";
import { v4 as uuid } from "uuid";
import vercelAnalytics from "@vercel/analytics";

import storage from "~/utils/storage";
import { actionTypes as cartActions } from "~/store/cart";
import {
  addressMapper,
  itemMapper,
  moEngagedOrderMapper,
  orderMapper,
  userMapper,
} from "~/utils/events";
import { STORE_PREFIX } from "~/config";
import { getRecordKey } from "~/utils/helper";
import { BASE_URL } from "~/constant";

export const actionTypes = {
  VIEW_ITEM: "VIEW_ITEM",
  PLACE_ORDER: "PLACE_ORDER",
  CHECKOUT_STARTED: "CHECKOUT_STARTED",
  VIEW_CART: "VIEW_CART",
  AUTH: "AUTH",
  SEARCH: "SEARCH",
  VIEW_LIST_ITEM: "VIEW_LIST_ITEM",
  OUT_OF_STOCK: "OUT_OF_STOCK",
  PROCEED_TO_CHECKOUT: "PROCEED_TO_CHECKOUT",
  ADDRESS_ADDED: "ADDRESS_ADDED",
  ADDRESS_SELECTED: "ADDRESS_SELECTED",
  CATEGORY_VIEWED: "CATEGORY_VIEWED",
  LOGIN: "LOGIN",
  REGISTER: "REGISTER",
  HOME_VIEWED: "HOME_VIEWED",
  ADD_PAYMENT_INFO: "ADD_PAYMENT_INFO",
  BANNER_CLICKED: "BANNER_CLICKED",
  PRODUCT_SEARCHED: "PRODUCT_SEARCHED",
  TILE_CLICKED: "TILE_CLICKED",
  LOG_OUT: "LOG_OUT",
  TOP_NAVBAR_CLICKED: "TOP_NAVBAR_CLICKED",
  REMOVED_FROM_CART: "REMOVED_FROM_CART",
};

const initialState = {
  data: [],
};

function eventReducer(state = initialState) {
  return state;
}

export const eventActions = {
  viewItem: (product) => ({
    type: actionTypes.VIEW_ITEM,
    payload: { product },
  }),
  placeOrder: (order, products, coupon, address, paymentType) => ({
    type: actionTypes.PLACE_ORDER,
    payload: { order, products, coupon, address, paymentType },
  }),
  startCheckout: () => ({ type: actionTypes.CHECKOUT_STARTED }),
  viewCart: () => ({ type: actionTypes.VIEW_CART }),
  proceedToCheckout: () => ({ type: actionTypes.PROCEED_TO_CHECKOUT }),
  auth: (action) => ({ type: actionTypes.AUTH, payload: { action } }),
  search: (term) => ({ type: actionTypes.SEARCH, payload: { term } }),
  addressAdded: (address, totalPrice) => ({
    type: actionTypes.ADDRESS_ADDED,
    payload: { address, totalPrice },
  }),
  addressSelected: (address, totalPrice) => ({
    type: actionTypes.ADDRESS_SELECTED,
    payload: { address, totalPrice },
  }),
  categoryViewed: (payload) => ({
    type: actionTypes.CATEGORY_VIEWED,
    payload,
  }),
  logout: (payload) => ({
    type: actionTypes.LOG_OUT,
    payload,
  }),
  addPaymentInfo: (user) => ({
    type: actionTypes.ADD_PAYMENT_INFO,
  }),
  bannerClicked: (payload) => ({
    type: actionTypes.BANNER_CLICKED,
    payload,
  }),
  productSearched: (payload) => ({
    type: actionTypes.PRODUCT_SEARCHED,
    payload,
  }),
  tileClicked: (payload) => ({
    type: actionTypes.TILE_CLICKED,
    payload,
  }),
  topNavbarClicked: (payload) => ({
    type: actionTypes.TOP_NAVBAR_CLICKED,
    payload,
  }),
  homeViewed: () => ({
    type: actionTypes.HOME_VIEWED,
  }),
  viewList: (id, name, products) => ({
    type: actionTypes.VIEW_LIST_ITEM,
    payload: { id, name, products },
  }),
  outOfStock: (products, inventory) => ({
    type: actionTypes.OUT_OF_STOCK,
    payload: { products, inventory },
  }),
};

export function* eventsSaga() {
  yield takeEvery(actionTypes.OUT_OF_STOCK, function* saga(e) {
    const { products, inventory } = e.payload;
    if (Array.isArray(products)) {
      products.forEach((product) => {
        const recordKey = getRecordKey(product, product.variantId);
        const payload = {
          productId: product.id,
          variantId: product.variantId,
          cartQty: product.qty,
          inventoryQty: inventory[recordKey],
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
    dataLayer.push({ ecommerce: null, attribute: null, user: null });
    dataLayer.push({ event: "search", eventID: uuid(), search_term: term });
    Analytics.record({ name: "search", attributes: { search_term: term } });
    vercelAnalytics.track("search", { searchTerm: term });
  });

  yield takeEvery(actionTypes.AUTH, function* saga(e) {
    const { action } = e.payload;
    
    dataLayer.push({ ecommerce: null, attribute: null, user: null });
    dataLayer.push({ event: action, eventID: uuid() });
    Analytics.record({ name: action });
    vercelAnalytics.track(action);
  });

  yield takeEvery(actionTypes.PROCEED_TO_CHECKOUT, function* saga() {
    const userData = yield select((state) => state.user.data);
    dataLayer.push({ ecommerce: null, attribute: null, user: null });
    dataLayer.push({
      event: "proceed_to_checkout",
      eventID: uuid(),
      login: userData ? 1 : 0,
    });
    Analytics.record({
      name: "proceed_to_checkout",
      login: userData ? "1" : "0",
    });
    vercelAnalytics.track("proceed_to_checkout", { login: userData ? 1 : 0 });
  });

  yield takeEvery(cartActions.ADD_TO_CART, function* saga(e) {
    const { product } = e.payload;
    const { qty } = product;
    const { value, pixel, vercel, pinpoint, ga, moengage } =
      itemMapper(product);
    const eventName = qty > 0 ? "add_to_cart" : "remove_from_cart";

    const userData = yield select((state) => state.user.data);
    const user = userMapper(userData);

    window.Moengage.track_event("Add To Cart", moengage.addToCart);
    dataLayer.push({ ecommerce: null, attribute: null, user: null });
    dataLayer.push({
      event: eventName,
      eventID: uuid(),
      attribute: pixel,
      user,
      ecommerce: {
        currency: "INR",
        value,
        items: ga,
      },
    });
    Analytics.record({ name: eventName, pinpoint, metrics: { value } });
    vercelAnalytics.track(eventName, vercel);
  });

  yield takeEvery(cartActions.REMOVE_FROM_CART, function* saga(e) {
    const { product } = e.payload;
    const { value, pixel, vercel, pinpoint, ga, moengage } =
      itemMapper(product);

    window.Moengage.track_event("Removed From Cart", moengage.removedFromCart);
    dataLayer.push({ ecommerce: null, attribute: null, user: null });
    dataLayer.push({
      event: "remove_from_cart",
      eventID: uuid(),
      attribute: pixel,
      ecommerce: {
        currency: "INR",
        value,
        items: ga,
      },
    });
    Analytics.record({
      name: "remove_from_cart",
      pinpoint,
      metrics: { value },
    });
    vercelAnalytics.track("remove_from_cart", vercel);
  });

  yield takeEvery(actionTypes.VIEW_ITEM, function* saga(e) {
    const { product } = e.payload;
    const { value, pixel, vercel, pinpoint, ga, moengage } =
      itemMapper(product);
    window.Moengage.track_event("Product Viewed", moengage.productViewed);
    dataLayer.push({ ecommerce: null, attribute: null, user: null });
    dataLayer.push({
      event: "view_item",
      eventID: uuid(),
      attribute: pixel,
      ecommerce: {
        currency: "INR",
        value,
        items: ga,
      },
    });
    Analytics.record({ name: "view_item", pinpoint, metrics: { value } });
    vercelAnalytics.track("view_item", vercel);
  });

  yield takeEvery(actionTypes.PLACE_ORDER, function* saga(e) {
    const { order, products, coupon, address, paymentType } = e.payload;
    const { id, totalShippingCharges, totalAmount, totalDiscount } = order;

    const { pinpoint, ga, pixel, vercel } = orderMapper(products, coupon);
    const { orderCreated } = moEngagedOrderMapper(
      products,
      coupon,
      paymentType,
      order
    );

    const userData = yield select((state) => state.user.data);
    const user = userMapper(userData, address);

    window.Moengage.track_event("Order Created", orderCreated);
    window.Moengage.track_event("Item Purchased", orderCreated);

    dataLayer.push({ ecommerce: null, attribute: null, user: null });
    dataLayer.push({
      event: "purchase",
      eventID: uuid(),
      user,
      attribute: { ...pixel, order_id: id, value: totalAmount },
      ecommerce: {
        transaction_id: id,
        value: totalAmount,
        tax: 0,
        discount: totalDiscount,
        shipping: totalShippingCharges,
        currency: "INR",
        coupon: coupon?.code || "",
        items: ga,
      },
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
      metrics: { value: totalAmount },
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

    pinpoint.forEach((attr) => {
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
    });

    vercel.forEach((attr) => {
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
    const {
      cart: { data, coupon },
    } = yield select();
    const { pinpoint, ga, value, pixel, vercel } = orderMapper(data, coupon);
    const { checkoutStarted } = moEngagedOrderMapper(data, coupon);
    window.Moengage.track_event("Checkout Started", checkoutStarted);

    dataLayer.push({ ecommerce: null, attribute: null, user: null });
    dataLayer.push({
      event: "begin_checkout",
      event: "begin_checkout",
      eventID: uuid(),
      attribute: pixel,
      ecommerce: {
        value,
        currency: "INR",
        coupon: coupon?.code || "",
        items: ga,
      },
    });

    Analytics.record({
      name: "begin_checkout",
      attributes: {
        currency: "INR",
        coupon: coupon?.code || "",
      },
      metrics: { value },
    });

    vercelAnalytics.track("begin_checkout", {
      currency: "INR",
      coupon: coupon?.code || "",
    });

    pinpoint.forEach((attr) => {
      Analytics.record({
        name: "begin_chekout_item",
        attributes: {
          ...attr,
          value: value.toString(),
          currency: "INR",
          coupon: coupon?.code || "",
        },
      });
    });

    vercel.forEach((attr) => {
      vercelAnalytics.track("begin_chekout_item", {
        ...attr,
        value,
        currency: "INR",
        coupon: coupon?.code || "",
      });
    });
  });

  yield takeEvery(actionTypes.VIEW_CART, function* saga(e) {
    const {
      cart: { data, coupon },
    } = yield select();

    const { pinpoint, ga, value, pixel, vercel } = orderMapper(data, coupon);
    const { cartViewed } = moEngagedOrderMapper(data, coupon);
    window.Moengage.track_event("Cart Viewed", cartViewed);

    dataLayer.push({ ecommerce: null, attribute: null, user: null });
    dataLayer.push({
      event: "view_cart",
      eventID: uuid(),
      attribute: pixel,
      ecommerce: {
        value,
        currency: "INR",
        coupon: coupon?.code || "",
        items: ga,
      },
    });

    Analytics.record({
      name: "view_cart",
      attributes: {
        currency: "INR",
        coupon: coupon?.code || "",
      },
      metrics: { value },
    });

    vercelAnalytics.track("view_cart", {
      currency: "INR",
      coupon: coupon?.code || "",
    });

    pinpoint.forEach((attr) => {
      Analytics.record({
        name: "view_cart_item",
        attributes: {
          ...attr,
          value: value.toString(),
          currency: "INR",
          coupon: coupon?.code || "",
        },
      });
    });

    vercel.forEach((attr) => {
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
    const { pinpoint, ga, pixel, vercel } = orderMapper(products);
    dataLayer.push({ ecommerce: null, attribute: null, user: null });
    dataLayer.push({
      event: "view_item_list",
      eventID: uuid(),
      attribute: pixel,
      ecommerce: {
        item_list_id: id,
        item_list_name: name,
        items: ga,
      },
    });

    Analytics.record({
      name: "view_item_list",
      attributes: {
        item_list_id: id,
        item_list_name: name,
      },
    });

    vercelAnalytics.track("view_item_list", {
      item_list_id: id,
      item_list_name: name,
    });

    pinpoint.forEach((attr) => {
      Analytics.record({
        name: "view_item_list_item",
        attributes: {
          ...attr,
          item_list_id: id,
          item_list_name: name,
        },
      });
    });

    vercel.forEach((attr) => {
      vercelAnalytics.track("view_item_list_item", {
        ...attr,
        item_list_id: id,
        item_list_name: name,
      });
    });
  });
  yield takeEvery(actionTypes.ADDRESS_ADDED, function* saga(e) {
    const { address, totalPrice } = e.payload;
    const { addressAdded } = addressMapper(address, totalPrice);
    window.Moengage.track_event("Address added", addressAdded);
  });

  yield takeEvery(actionTypes.ADDRESS_SELECTED, function* saga(e) {
    const { address, totalPrice } = e.payload;
    const { addressSelected } = addressMapper(address, totalPrice);

    window.Moengage.track_event("Address added", addressAdded);
  });

  yield takeEvery(actionTypes.CATEGORY_VIEWED, function* saga(e) {
    window.Moengage.track_event("Category Viewed");
  });

  yield takeEvery(actionTypes.LOGIN, function* saga(e) {
    const { address, totalPrice } = e.payload;
    window.Moengage.track_event("Customer Logged In", addressAdded);
  });

  yield takeEvery(actionTypes.ADD_PAYMENT_INFO, function* saga(e) {
    window.Moengage.track_event("Add Payment Info", {
      URL: `${BASE_URL}/pages/checkout`,
    });
  });

  yield takeEvery(actionTypes.BANNER_CLICKED, function* saga(e) {
    window.Moengage.track_event("Banner Clicked", {
      ...e.payload,
    });
  });

  yield takeEvery(actionTypes.CATEGORY_VIEWED, function* saga(e) {
    window.Moengage.track_event("Category Viewed", {
      ...e.payload,
    });
  });

  yield takeEvery(actionTypes.TILE_CLICKED, function* saga(e) {
    window.Moengage.track_event("Tile Clicked", {
      ...e.payload,
    });
  });
  yield takeEvery(actionTypes.TOP_NAVBAR_CLICKED, function* saga(e) {
    window.Moengage.track_event("Top Navbar clicked", {
      ...e.payload,
    });
  });

  yield takeEvery(actionTypes.PRODUCT_SEARCHED, function* saga(e) {
    window.Moengage.track_event("Product Searched", {
      ...e.payload,
    });
  });

  yield takeEvery(actionTypes.TILE_CLICKED, function* saga(e) {
    window.Moengage.track_event("Tile Clicked", {
      ...e.payload,
    });
  });

  yield takeEvery(actionTypes.TILE_CLICKED, function* saga(e) {
    window.Moengage.track_event("Top Navbar clicked", {
      ...e.payload,
    });
  });

  yield takeEvery(actionTypes.HOME_VIEWED, function* saga(e) {

    yield call(waitForWindow);
    window?.Moengage?.track_event("Home Viewed", {
      URL: BASE_URL,
    });
  });
  yield takeEvery(actionTypes.LOG_OUT, function* saga(e) {
  
    window.Moengage.track_event("Customer Logged Out", {
     ...e.payload
    });
  });
}


const persistConfig = {
  keyPrefix: `${STORE_PREFIX}-`,
  key: "events",
  storage,
};

export default persistReducer(persistConfig, eventReducer);

function waitForWindow() {
  return new Promise((resolve) => {
    if (typeof  window !== 'undefined') {
      resolve();
    } else {
      window.addEventListener('load', resolve);
    }
  });
}
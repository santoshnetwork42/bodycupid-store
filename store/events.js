import { API } from "aws-amplify";
import { persistReducer } from "redux-persist";
import { call, select, takeEvery } from "redux-saga/effects";
import { v4 as uuid } from "uuid";

import { STORE_PREFIX } from "~/config";
import { getUser } from "~/graphql/api";
import { actionTypes as cartActions } from "~/store/cart";
import { errorHandler } from "~/utils/errorHandler";
import {
  addressMapper,
  getFormattedDate,
  itemMapper,
  moEngagedOrderMapper,
  moEngageItemPurchasedMapper,
  orderMapper,
  userMapper,
} from "~/utils/events";
import {
  dispatchKwikpassEvent,
  getRecordKey,
  getSource,
  initializeMoengageAndAddInfo,
  trackEvent,
} from "~/utils/helper";
import storage from "~/utils/storage";

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
  PRODUCT_VIEWED: "PRODUCT_VIEWED",
  COLLECTION_VIEWED: "COLLECTION_VIEWED",
  ADD_PAYMENT_INFO: "ADD_PAYMENT_INFO",
  BANNER_CLICKED: "BANNER_CLICKED",
  OTP_REQUESTED: "OTP_REQUESTED",
  PRODUCT_SEARCHED: "PRODUCT_SEARCHED",
  TILE_CLICKED: "TILE_CLICKED",
  BLOG_CLICK: "BLOG_CLICK",
  LOG_OUT: "LOG_OUT",
  TOP_NAVBAR_CLICKED: "TOP_NAVBAR_CLICKED",
  REMOVED_FROM_CART: "REMOVED_FROM_CART",
  PRICE_MISMATCH: "PRICE_MISMATCH",
  APPLY_COUPONS: "APPLY_COUPONS",
  CUSTOM_EVENT_VERCEL: "CUSTOM_EVENT_VERCEL",
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
  placeOrder: (
    order,
    products,
    coupon,
    address,
    paymentType,
    checkoutSource
  ) => ({
    type: actionTypes.PLACE_ORDER,
    payload: { order, products, coupon, address, paymentType, checkoutSource },
  }),
  startCheckout: (source) => ({
    type: actionTypes.CHECKOUT_STARTED,
    payload: {
      source: source || "BODYCUPID",
    },
  }),
  viewCart: () => ({ type: actionTypes.VIEW_CART }),
  proceedToCheckout: (source) => ({
    type: actionTypes.PROCEED_TO_CHECKOUT,
    payload: {
      source: source || "BODYCUPID",
    },
  }),
  auth: (action, moe) => ({
    type: actionTypes.AUTH,
    payload: {
      action,
      userId: moe?.userId,
      query: moe?.query,
      phone: moe?.phone,
    },
  }),
  search: (term) => ({ type: actionTypes.SEARCH, payload: { term } }),
  addressAdded: (address, totalPrice, checkoutSource = "BODYCUPID") => ({
    type: actionTypes.ADDRESS_ADDED,
    payload: { address, totalPrice, checkoutSource },
  }),
  addressSelected: (address, totalPrice, checkoutSource = "BODYCUPID") => ({
    type: actionTypes.ADDRESS_SELECTED,
    payload: { address, totalPrice, checkoutSource },
  }),
  categoryViewed: (payload) => ({
    type: actionTypes.CATEGORY_VIEWED,
    payload,
  }),
  logout: (payload) => ({
    type: actionTypes.LOG_OUT,
    payload,
  }),
  addPaymentInfo: (checkoutSource = "BODYCUPID") => ({
    type: actionTypes.ADD_PAYMENT_INFO,
    payload: { checkoutSource },
  }),
  bannerClicked: (payload) => ({
    type: actionTypes.BANNER_CLICKED,
    payload,
  }),
  OtpRequested: (payload) => ({
    type: actionTypes.OTP_REQUESTED,
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
  blogClicked: (payload) => ({
    type: actionTypes.BLOG_CLICK,
    payload,
  }),
  topNavbarClicked: (payload) => ({
    type: actionTypes.TOP_NAVBAR_CLICKED,
    payload,
  }),
  homeViewed: () => ({
    type: actionTypes.HOME_VIEWED,
  }),
  productViewed: (payload) => ({
    type: actionTypes.PRODUCT_VIEWED,
    payload,
  }),
  collectionViewed: (payload) => ({
    type: actionTypes.COLLECTION_VIEWED,
    payload,
  }),
  viewList: (id, name, products) => ({
    type: actionTypes.VIEW_LIST_ITEM,
    payload: { id, name, products },
  }),
  outOfStock: (products, inventory) => ({
    type: actionTypes.OUT_OF_STOCK,
    payload: { products, inventory },
  }),
  priceMismatch: (
    products,
    coupon,
    paymentType,
    mismatchedPrices,
    mismatchedProductDetails
  ) => ({
    type: actionTypes.PRICE_MISMATCH,
    payload: {
      products,
      coupon,
      paymentType,
      mismatchedPrices,
      mismatchedProductDetails,
    },
  }),
  customEventVercel: (title, data) => ({
    type: actionTypes.CUSTOM_EVENT_VERCEL,
    payload: { title, data },
  }),
};

export function* eventsSaga() {
  const eventSource = getSource();

  yield takeEvery(actionTypes.OUT_OF_STOCK, function* saga(e) {
    try {
      const { products, inventory } = e.payload;
      if (Array.isArray(products)) {
        products.forEach((product) => {
          if (product) {
            const recordKey = getRecordKey(product, product.variantId);
            const payload = {
              productId: product.id,
              variantId: product.variantId,
              cartQty: product.qty,
              inventoryQty: inventory[recordKey],
            };

            if (window && window.dataLayer) {
              window.dataLayer.push({
                event: "out_of_stock",
                eventID: uuid(),
                ...payload,
              });
            }
            // Analytics.record({ name: "out_of_stock", attributes: payload });
            // vercelAnalytics.track("out_of_stock", payload);
          }
        });
      }
    } catch (e) {
      errorHandler(e);
    }
  });

  yield takeEvery(actionTypes.SEARCH, function* saga(e) {
    try {
      const { term } = e.payload;
      if (window && window.dataLayer) {
        window.dataLayer.push({ ecommerce: null, attribute: null, user: null });
        window.dataLayer.push({
          event: "search",
          eventID: uuid(),
          attribute: { search_term: term },
        });
      }
      // Analytics.record({ name: "search", attributes: { search_term: term } });
      // vercelAnalytics.track("search", { searchTerm: term });
    } catch (e) {
      errorHandler(e);
    }
  });

  yield takeEvery(actionTypes.PRICE_MISMATCH, function* saga() {
    try {
      // vercelAnalytics.track("price_mismatch");
    } catch (e) {
      errorHandler(e);
    }
  });

  yield takeEvery(actionTypes.AUTH, function* saga(e) {
    try {
      const { action } = e.payload;
      const { userId } = e.payload;
      const utmData = yield select((state) => state.system.meta);
      const { utmMedium: medium, utmSource: source } = utmData;

      if (action === "signup") {
        const { phone } = e.payload;
        const mobile = phone?.split("+91")[1];
        initializeMoengageAndAddInfo({
          phone,
        });

        trackEvent("Customer Registered", {
          "Customer ID": userId,
          "Mobile Number": mobile,
          "Utm Source": source,
          "Utm Medium": medium,
          URL: window.location.href,
          Source: eventSource,
        });
      } else if (action === "login") {
        if (userId) {
          const {
            data: { getUser: getUserResponse },
          } = yield call([API, API.graphql], {
            query: getUser,
            authMode: "AMAZON_COGNITO_USER_POOLS",
          });

          if (getUserResponse) {
            const isFirstTime =
              Math.abs(
                new Date(getUserResponse?.createdAt) - new Date() / 1000
              ) < 300;
            const {
              firstName = null,
              lastName = null,
              email = null,
              phone = null,
            } = getUserResponse;
            initializeMoengageAndAddInfo({
              firstName,
              lastName,
              email,
              phone,
            });
            const mobile = phone?.split("+91")[1];

            trackEvent("Customer Logged In", {
              "Customer ID": userId,
              "Mobile Number": mobile,
              "Utm Source": source,
              "Utm Medium": medium,
              URL: window.location.href,
              "First Time User": false,
              Source: eventSource,
            });
          }
        }
      } else if (action == "logout") {
        const Moengage = window?.Moengage;
        if (Moengage) Moengage.destroy_session();
      }
      if (window && window.dataLayer) {
        window.dataLayer.push({ ecommerce: null, attribute: null, user: null });
        window.dataLayer.push({ event: action, eventID: uuid() });
      }
      // Analytics.record({ name: action });
      // vercelAnalytics.track(action);
    } catch (e) {
      errorHandler(e);
    }
  });

  yield takeEvery(actionTypes.PROCEED_TO_CHECKOUT, function* saga(e) {
    try {
      const { source } = e.payload || {};
      const userData = yield select((state) => state.user.data);
      if (window && window.dataLayer) {
        window.dataLayer.push({ ecommerce: null, attribute: null, user: null });
        window.dataLayer.push({
          event: "proceed_to_checkout",
          eventID: uuid(),
          login: userData ? 1 : 0,
        });
      }

      track("proceed_to_checkout_v2", {
        login: userData ? 1 : 0,
        source,
        date: getFormattedDate(),
      });

      // posthog.capture("Checkout Started", {
      //   source,
      // });

      // Analytics.record({
      //   name: "proceed_to_checkout",
      //   login: userData ? "1" : "0",
      // });
    } catch (e) {
      errorHandler(e);
    }
  });

  yield takeEvery(cartActions.ADD_TO_CART, function* saga(e) {
    try {
      const { product } = e.payload;
      const { qty } = product;

      const userData = yield select((state) => state.user.data);
      const user = userMapper(userData);

      const { value, pixel, vercel, ga, moengage } = itemMapper(
        product,
        null,
        user
      );

      const eventName = qty > 0 ? "add_to_cart" : "remove_from_cart";

      trackEvent("Add To Cart", moengage.addToCart);
      if (window && window.dataLayer) {
        window.dataLayer.push({ ecommerce: null, attribute: null, user: null });
        window.dataLayer.push({
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
      }
      // Analytics.record({ name: eventName, pinpoint, metrics: { value } });
      // vercelAnalytics.track(eventName, vercel);
    } catch (e) {
      errorHandler(e);
    }
  });

  yield takeEvery(cartActions.REMOVE_FROM_CART, function* saga(e) {
    try {
      const { product } = e.payload;
      const userData = yield select((state) => state.user.data);
      const user = userMapper(userData);
      const { value, pixel, vercel, ga, moengage } = itemMapper(
        product,
        null,
        user
      );

      trackEvent("Removed From Cart", moengage.removedFromCart);
      if (window && window.dataLayer) {
        window.dataLayer.push({ ecommerce: null, attribute: null, user: null });
        window.dataLayer.push({
          event: "remove_from_cart",
          eventID: uuid(),
          attribute: pixel,
          ecommerce: {
            currency: "INR",
            value,
            items: ga,
          },
        });
      }
      // Analytics.record({
      //   name: "remove_from_cart",
      //   pinpoint,
      //   metrics: { value },
      // });
      // vercelAnalytics.track("remove_from_cart", vercel);
    } catch (e) {
      errorHandler(e);
    }
  });

  yield takeEvery(actionTypes.VIEW_ITEM, function* saga(e) {
    try {
      const { product } = e.payload;
      const userData = yield select((state) => state.user.data);
      const user = userMapper(userData);
      const { value, pixel, vercel, ga, moengage } = itemMapper(
        product,
        null,
        user
      );

      trackEvent("Product Viewed", moengage.productViewed);

      if (window && window.dataLayer) {
        window.dataLayer.push({ ecommerce: null, attribute: null, user: null });
        window.dataLayer.push({
          event: "view_item",
          eventID: uuid(),
          attribute: pixel,
          ecommerce: {
            currency: "INR",
            value,
            items: ga,
          },
        });
      }
      // Analytics.record({ name: "view_item", pinpoint, metrics: { value } });
      // vercelAnalytics.track("view_item", vercel);
    } catch (e) {
      errorHandler(e);
    }
  });

  yield takeEvery(actionTypes.PLACE_ORDER, function* saga(e) {
    console.log("first", e);
    try {
      const {
        order,
        products,
        coupon,
        address,
        paymentType,
        checkoutSource = "BODYCUPID",
      } = e.payload;
      const {
        id,
        totalShippingCharges,
        totalAmount,
        totalDiscount,
        code,
        orderDate,
      } = order;

      const productsLocal = yield select((state) => state.cart.data);

      const productsData =
        checkoutSource === "BODYCUPID"
          ? [...products, ...productsLocal]
          : [...products];

      const userData = yield select((state) => state.user.data);
      const user = userMapper(userData, { ...address, userId: order?.userId });
      const isFirstTimeUser = user?.totalOrders > 0 ? false : true;
      const { ga, pixel, vercel } = orderMapper(
        productsData,
        coupon,
        user,
        checkoutSource
      );
      const { orderCreated } = moEngagedOrderMapper(
        productsData,
        coupon,
        order?.paymentType,
        order,
        isFirstTimeUser,
        checkoutSource
      );

      const itemPurchasedEvents = moEngageItemPurchasedMapper(
        productsData,
        coupon,
        order?.paymentType,
        order,
        isFirstTimeUser,
        checkoutSource
      );

      const {
        first_name,
        last_name,
        firstName,
        lastName,
        email,
        phone,
        city,
        pinCode,
      } = address;

      initializeMoengageAndAddInfo({
        firstName: first_name || firstName,
        lastName: last_name || lastName,
        email,
        phone,
      });

      trackEvent("Order Created", orderCreated);
      itemPurchasedEvents.forEach((itemPurchased) => {
        trackEvent("Item Purchased", itemPurchased);
      });

      if (window && window.dataLayer) {
        window.dataLayer.push({ ecommerce: null, attribute: null, user: null });
        window.dataLayer.push({
          event: "purchase",
          eventID: uuid(),
          user,
          attribute: {
            ...pixel,
            order_id: id,
            value: totalAmount,
            fn: firstName,
            ln: lastName,
            em: email,
            ph: phone,
            city,
            postal_code: pinCode,
          },
          ecommerce: {
            transaction_id: id,
            order_code: code,
            value: totalAmount,
            tax: 0,
            discount: totalDiscount,
            shipping: totalShippingCharges,
            currency: "INR",
            coupon: coupon?.code || "",
            items: ga,
          },
        });
      }

      track("purchase_final_v2", {
        transaction_id: id,
        value: totalAmount,
        tax: 0,
        code: code,
        discount: totalDiscount,
        shipping: totalShippingCharges,
        currency: "INR",
        coupon: coupon?.code || "",
        source: checkoutSource,
        orderDate: orderDate || getFormattedDate(),
        date: getFormattedDate(),
      });

      // posthog.capture("Order Created", {
      //   source: checkoutSource,
      //   paymentType,
      // });

      // Analytics.record({
      //   name: "purchase",
      //   attributes: {
      //     transaction_id: id,
      //     value: totalAmount.toString(),
      //     tax: "0",
      //     discount: totalDiscount.toString(),
      //     shipping: totalShippingCharges.toString(),
      //     currency: "INR",
      //     coupon: coupon?.code || "",
      //   },
      //   metrics: { value: totalAmount },
      // });

      // pinpoint.forEach((attr) => {
      //   Analytics.record({
      //     name: "purchase_item",
      //     attributes: {
      //       ...attr,
      //       transaction_id: id,
      //       value: totalAmount.toString(),
      //       tax: "0",
      //       shipping: totalShippingCharges.toString(),
      //       currency: "INR",
      //       coupon: coupon?.code || "",
      //     },
      //   });
      // });

      // vercel.forEach((attr) => {
      //   vercelAnalytics.track("purchase_item", {
      //     ...attr,
      //     transaction_id: id,
      //     value: totalAmount,
      //     tax: 0,
      //     shipping: totalShippingCharges,
      //     currency: "INR",
      //     coupon: coupon?.code || "",
      //   });
      // });
    } catch (e) {
      errorHandler(e);
    }
  });

  yield takeEvery(actionTypes.CHECKOUT_STARTED, function* saga(e) {
    try {
      const {
        cart: { data, coupon },
      } = yield select();
      const userData = yield select((state) => state.user.data);
      const user = userMapper(userData);
      const { pinpoint, ga, value, pixel, vercel } = orderMapper(
        data,
        coupon,
        user
      );
      const { checkoutStarted } = moEngagedOrderMapper(data, coupon);

      trackEvent("Checkout Started", checkoutStarted);
      if (window && window.dataLayer) {
        window.dataLayer.push({ ecommerce: null, attribute: null, user: null });
        window.dataLayer.push({
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
      }

      // Analytics.record({
      //   name: "begin_checkout",
      //   attributes: {
      //     currency: "INR",
      //     coupon: coupon?.code || "",
      //   },
      //   metrics: { value },
      // });

      // vercelAnalytics.track("begin_checkout", {
      //   currency: "INR",
      //   coupon: coupon?.code || "",
      // });

      // pinpoint.forEach((attr) => {
      //   Analytics.record({
      //     name: "begin_chekout_item",
      //     attributes: {
      //       ...attr,
      //       value: value.toString(),
      //       currency: "INR",
      //       coupon: coupon?.code || "",
      //     },
      //   });
      // });

      // vercel.forEach((attr) => {
      //   vercelAnalytics.track("begin_chekout_item", {
      //     ...attr,
      //     value,
      //     currency: "INR",
      //     coupon: coupon?.code || "",
      //   });
      // });
    } catch (e) {
      errorHandler(e);
    }
  });

  yield takeEvery(actionTypes.APPLY_COUPONS, function* saga(e) {
    const { coupon } = e.payload;
    const checkoutSource = coupon.checkoutSource || "BODYCUPID";
    try {
      const {
        cart: { data, coupon },
      } = yield select();
      const userData = yield select((state) => state.user.data);
      const user = userMapper(userData);
      const { pixel } = orderMapper(data, coupon, user, checkoutSource);

      if (window && window.dataLayer) {
        window.dataLayer.push({ ecommerce: null, attribute: null, user: null });
        window.dataLayer.push({
          event: "add_coupon_code",
          eventID: uuid(),
          attribute: pixel,
        });
      }
    } catch (e) {
      errorHandler(e);
    }
  });

  yield takeEvery(actionTypes.VIEW_CART, function* saga(e) {
    try {
      const {
        cart: { data, coupon, cartId },
      } = yield select();

      const userData = yield select((state) => state.user.data);
      const user = userMapper(userData);
      const { ga, value, pixel } = orderMapper(data, coupon, user);
      const { cartViewed } = moEngagedOrderMapper(data, coupon);

      trackEvent("Cart Viewed", cartViewed);

      if (window && window.dataLayer) {
        window.dataLayer.push({ ecommerce: null, attribute: null, user: null });
        window.dataLayer.push({
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
      }

      dispatchKwikpassEvent("page_view_kp", {
        type: "cart",
        data: !!cartId ? { cart_id: cartId } : {},
      });
      // Analytics.record({
      //   name: "view_cart",
      //   attributes: {
      //     currency: "INR",
      //     coupon: coupon?.code || "",
      //   },
      //   metrics: { value },
      // });

      // vercelAnalytics.track("view_cart", {
      //   currency: "INR",
      //   coupon: coupon?.code || "",
      // });

      // pinpoint.forEach((attr) => {
      //   Analytics.record({
      //     name: "view_cart_item",
      //     attributes: {
      //       ...attr,
      //       value: value.toString(),
      //       currency: "INR",
      //       coupon: coupon?.code || "",
      //     },
      //   });
      // });

      // vercel.forEach((attr) => {
      //   vercelAnalytics.track("view_cart_item", {
      //     ...attr,
      //     value,
      //     currency: "INR",
      //     coupon: coupon?.code || "",
      //   });
      // });
    } catch (e) {
      errorHandler(e);
    }
  });

  yield takeEvery(actionTypes.VIEW_LIST_ITEM, function* saga(e) {
    try {
      const { id, name, products } = e.payload;
      const userData = yield select((state) => state.user.data);
      const user = userMapper(userData);
      const { ga, pixel } = orderMapper(products, null, user);

      if (window && window.dataLayer) {
        window.dataLayer.push({ ecommerce: null, attribute: null, user: null });
        window.dataLayer.push({
          event: "view_item_list",
          eventID: uuid(),
          attribute: pixel,
          ecommerce: {
            item_list_id: id,
            item_list_name: name,
            items: ga,
          },
        });
      }

      // Analytics.record({
      //   name: "view_item_list",
      //   attributes: {
      //     item_list_id: id,
      //     item_list_name: name,
      //   },
      // });

      // vercelAnalytics.track("view_item_list", {
      //   item_list_id: id,
      //   item_list_name: name,
      // });

      // pinpoint.forEach((attr) => {
      //   Analytics.record({
      //     name: "view_item_list_item",
      //     attributes: {
      //       ...attr,
      //       item_list_id: id,
      //       item_list_name: name,
      //     },
      //   });
      // });

      // vercel.forEach((attr) => {
      //   vercelAnalytics.track("view_item_list_item", {
      //     ...attr,
      //     item_list_id: id,
      //     item_list_name: name,
      //   });
      // });
    } catch (e) {
      errorHandler(e);
    }
  });

  yield takeEvery(actionTypes.ADDRESS_ADDED, function* saga(e) {
    try {
      const { address, totalPrice, checkoutSource = "BODYCUPID" } = e.payload;

      const { name, email, phone } = address;
      initializeMoengageAndAddInfo({
        firstName: name.split(" ")[0],
        lastName: name.split(" ")[1],
        email,
        phone,
      });
      const { addressAdded } = addressMapper(
        address,
        totalPrice,
        checkoutSource
      );

      trackEvent("Address Added", addressAdded);
    } catch (e) {
      errorHandler(e);
    }
  });

  yield takeEvery(actionTypes.ADDRESS_SELECTED, function* saga(e) {
    try {
      const { address, totalPrice, checkoutSource = "BODYCUPID" } = e.payload;
      if (address) {
        const { addressSelected } = addressMapper(
          address,
          totalPrice,
          checkoutSource
        );

        const { name, email, phone } = address;
        initializeMoengageAndAddInfo({
          firstName: name.split(" ")[0],
          lastName: name.split(" ")[1],
          email,
          phone,
        });

        trackEvent("Address Selected", addressSelected);
      }
    } catch (e) {
      errorHandler(e);
    }
  });

  yield takeEvery(actionTypes.ADD_PAYMENT_INFO, function* saga(e) {
    try {
      const { checkoutSource = "BODYCUPID" } = e.payload;
      trackEvent("Add Payment Info", {
        URL: window.location.href,
        Source: checkoutSource === "GOKWIK" ? "Gokwik" : eventSource,
      });
    } catch (e) {
      errorHandler(e);
    }
  });

  yield takeEvery(actionTypes.BANNER_CLICKED, function* saga(e) {
    try {
      trackEvent("Banner Clicked", {
        ...e.payload,
      });
    } catch (e) {
      errorHandler(e);
    }
  });

  yield takeEvery(actionTypes.OTP_REQUESTED, function* saga(e) {
    try {
      trackEvent("OTP requested", {
        ...e.payload,
      });
    } catch (e) {
      errorHandler(e);
    }
  });

  yield takeEvery(actionTypes.CATEGORY_VIEWED, function* saga(e) {
    trackEvent("Category Viewed", {
      ...e.payload,
    });
  });

  yield takeEvery(actionTypes.TILE_CLICKED, function* saga(e) {
    trackEvent("Tile Clicked", {
      ...e.payload,
    });
  });

  yield takeEvery(actionTypes.BLOG_CLICK, function* saga(e) {
    // const userData = yield select((state) => state.user.data);
    // const user = userMapper(userData);
    // const analyticsMeta = analyticsMetaDataMapper();
    // trackClickStream({
    //   event: "blogs_clicked",
    //   eventID: uuid(),
    //   userId: user?.id || "",
    //   user: user || {},
    //   ...e.payload,
    //   source: eventSource,
    //   ...analyticsMeta,
    // });
  });

  yield takeEvery(actionTypes.TOP_NAVBAR_CLICKED, function* saga(e) {
    trackEvent("Top Navbar Clicked", {
      ...e.payload,
    });
  });

  yield takeEvery(actionTypes.PRODUCT_SEARCHED, function* saga(e) {
    try {
      if (window && window.dataLayer) {
        window.dataLayer.push({ ecommerce: null, attribute: null, user: null });
        window.dataLayer.push({
          event: "search",
          eventID: uuid(),
          attribute: {
            search_term: e.payload["search term"],
            item_count: e.payload["Item Count"],
          },
        });

        trackEvent("Product Searched", {
          ...e.payload,
        });
      }
    } catch (e) {
      errorHandler(e);
    }
  });

  yield takeEvery(actionTypes.HOME_VIEWED, function* () {
    try {
      const {
        cart: { cartId },
      } = yield select();

      trackEvent("Home Viewed", {
        URL: window.location.href,
        Source: eventSource,
      });
      dispatchKwikpassEvent("page_view_kp", {
        type: "home",
        data: !!cartId ? { cart_id: cartId } : {},
      });
    } catch (e) {
      errorHandler(e);
    }
  });

  yield takeEvery(actionTypes.PRODUCT_VIEWED, function* ({ payload = {} }) {
    try {
      const {
        cart: { cartId },
      } = yield select();
      const { productId, variantId, price, title, slug, imageUrl } = payload;
      let eventData = {
        product_id: productId,
        image_url: imageUrl,
        name: title,
        price: price,
        handle: slug,
      };
      if (!!variantId) {
        eventData.variant_id = variantId;
      }
      if (!!cartId) {
        eventData.cart_id = cartId;
      }
      dispatchKwikpassEvent("page_view_kp", {
        type: "product",
        data: eventData,
      });
    } catch (e) {
      errorHandler(e);
    }
  });

  yield takeEvery(actionTypes.COLLECTION_VIEWED, function* saga({ payload }) {
    try {
      const {
        cart: { cartId },
      } = yield select();
      const { collectionId, title, slug, imageUrl } = payload;

      let eventData = {
        name: title,
        image_url: imageUrl,
        handle: slug,
      };
      if (!!collectionId) {
        eventData.collection_id = collectionId;
      }
      if (!!cartId) {
        eventData.cart_id = cartId;
      }
      dispatchKwikpassEvent("page_view_kp", {
        type: "collection",
        data: eventData,
      });
    } catch (e) {
      errorHandler(e);
    }
  });

  yield takeEvery(actionTypes.LOG_OUT, function* saga(e) {
    trackEvent("Customer Logged Out", {
      ...e.payload,
      Source: eventSource,
    });
  });

  yield takeEvery(actionTypes.CUSTOM_EVENT_VERCEL, function* saga(e) {
    try {
      const { title, data } = e.payload;
      // track(title, {
      //   ...data,
      //   date: getFormattedDate(),
      // });
    } catch (e) {
      errorHandler(e);
    }
  });
}

const persistConfig = {
  keyPrefix: `${STORE_PREFIX}-`,
  key: "events",
  storage,
};

export default persistReducer(persistConfig, eventReducer);

import { persistReducer } from "redux-persist";
import { getFirstVariant } from "~/utils/products";
import { STORE_PREFIX } from "~/config";
import storage from "~/utils/storage";
import { getCouponDiscount } from "~/utils/coupons";

export const actionTypes = {
  ADD_TO_CART: "ADD_TO_CART",
  REMOVE_FROM_CART: "REMOVE_FROM_CART",
  UPDATE_CART: "UPDATE_CART",
  APPLY_COUPONS: "APPLY_COUPONS",
  REMOVE_COUPON: "REMOVE_COUPON",
  EMPTY_CART: "EMPTY_CART",
  CREATE_CART: "CREATE_CART",
  VALIDATE_CART: "VALIDATE_CART",
};
const initialState = {
  data: [],
  coupon: null,
};

function cartReducer(state = initialState, action) {
  let tmpProduct, recordKey;

  switch (action.type) {
    case actionTypes.ADD_TO_CART:
      tmpProduct = { ...action.payload.product };
      const variant = getFirstVariant(tmpProduct, tmpProduct.variantId);
      if (variant) {
        tmpProduct.variantId = variant.id;
        tmpProduct.price = variant.price;
        tmpProduct.listingPrice = variant.listingPrice;
      }
      recordKey = tmpProduct.id;
      if (tmpProduct.variantId) {
        recordKey = `${tmpProduct.id}-${tmpProduct.variantId}`;
      }

      if (tmpProduct.cartItemSource) {
        recordKey = `${recordKey}-${tmpProduct.cartItemSource}`;
        tmpProduct.listingPrice = tmpProduct.price;
      }

      // Always at last
      if (tmpProduct.cartItemSource === "LIMITED_TIME_DEAL") {
        tmpProduct.price = tmpProduct.recommendPrice;
      }

      if (state.data.some((item) => item.recordKey === recordKey)) {
        let tmpData = state.data.reduce((acc, cur) => {
          if (cur.recordKey === recordKey) {
            acc.push({
              ...cur,
              recordKey,
              qty: parseInt(cur.qty) + parseInt(tmpProduct.qty),
            });
          } else {
            acc.push({ ...cur });
          }

          return acc;
        }, []);

        return { ...state, data: tmpData };
      } else {
        const currentATC = {
          ...tmpProduct,
          recordKey,
          addedAt: new Date().toISOString(),
        };

        return {
          ...state,
          data: [...state.data, currentATC],
        };
      }

    case actionTypes.REMOVE_FROM_CART:
      tmpProduct = { ...action.payload.product };
      const cart = state.data.reduce((cartAcc, product) => {
        if (
          tmpProduct.recordKey !== product.recordKey &&
          product.parentRecordKey !== tmpProduct.recordKey
        ) {
          cartAcc.push(product);
        }
        return cartAcc;
      }, []);

      return { ...state, data: cart };

    case actionTypes.UPDATE_CART:
      let products = action.payload.products || [];
      const { allowed } = getCouponDiscount(state.coupon, products);
      if (!allowed) {
        products = (action.payload.products || []).filter(
          (p) => p.cartItemSource !== "COUPON"
        );
      }
      return {
        ...state,
        data: products,
        coupon: allowed ? state.coupon : null,
      };

    case actionTypes.EMPTY_CART:
      return { ...initialState };

    case actionTypes.APPLY_COUPONS:
      return { ...state, coupon: action.payload.coupon };

    case actionTypes.REMOVE_COUPON:
      return { ...state, coupon: null };

    case actionTypes.VALIDATE_CART:
      const { payload } = action;
      const data = state.data.map((item) => {
        if (typeof payload[item.recordKey] === "number") {
          return {
            ...item,
            price: payload[item.recordKey],
          };
        }
        return item;
      });

      return { ...state, data };

    default:
      return state;
  }
}

export const cartActions = {
  addToCart: (product) => ({
    type: actionTypes.ADD_TO_CART,
    payload: { product },
  }),
  removeFromCart: (product) => ({
    type: actionTypes.REMOVE_FROM_CART,
    payload: { product },
  }),
  updateCart: (products) => ({
    type: actionTypes.UPDATE_CART,
    payload: { products },
  }),
  applyCoupon: (coupon) => ({
    type: actionTypes.APPLY_COUPONS,
    payload: { coupon },
  }),
  validateCart: (payload) => ({
    type: actionTypes.VALIDATE_CART,
    payload,
  }),
  removeCoupon: () => ({ type: actionTypes.REMOVE_COUPON, payload: {} }),
  emptyCart: () => ({ type: actionTypes.EMPTY_CART }),
  createCart: (user) => ({ type: actionTypes.CREATE_CART, payload: { user } }),
};

const persistConfig = {
  keyPrefix: `${STORE_PREFIX}-`,
  key: "cart",
  storage,
};

export default persistReducer(persistConfig, cartReducer);

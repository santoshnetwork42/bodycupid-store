import { persistReducer } from "redux-persist";
import { getFirstVariant } from "~/utils/products";
import { STORE_PREFIX } from "~/config";
import storage from "~/utils/storage";

export const actionTypes = {
  ADD_TO_CART: "ADD_TO_CART",
  REMOVE_FROM_CART: "REMOVE_FROM_CART",
  UPDATE_CART: "UPDATE_CART",
  REFRESH_CART: "REFRESH_CART",
  APPLY_COUPONS: "APPLY_COUPONS",
  REMOVE_COUPON: "REMOVE_COUPON",
  SET_CART: "SET_CART",
  EMPTY_CART: "EMPTY_CART",
  CREATE_CART: "CREATE_CART",
};

const initialState = {
  cart: null,
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
        return {
          ...state,
          data: [...state.data, { ...tmpProduct, recordKey }],
        };
      }

    case actionTypes.REMOVE_FROM_CART:
      tmpProduct = { ...action.payload.product };
      let cart = state.data.reduce((cartAcc, product) => {
        if (tmpProduct.recordKey !== product.recordKey) {
          cartAcc.push(product);
        }
        return cartAcc;
      }, []);

      return { ...state, data: cart };

    case actionTypes.UPDATE_CART:
      return { ...state, data: action.payload.products || [] };

    case actionTypes.REFRESH_CART:
      return initialState;

    case actionTypes.SET_CART:
      return { ...state, cart: { ...state.cart, ...action.payload } };

    case actionTypes.APPLY_COUPONS:
      return { ...state, coupon: action.payload.coupon };

    case actionTypes.REMOVE_COUPON:
      return { ...state, coupon: null };

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
  removeCoupon: () => ({ type: actionTypes.REMOVE_COUPON, payload: {} }),
  emptyCart: () => ({ type: actionTypes.EMPTY_CART }),
  setCart: (cart) => ({ type: actionTypes.SET_CART, payload: { ...cart } }),
  createCart: (user) => ({ type: actionTypes.CREATE_CART, payload: { user } }),
};

const persistConfig = {
  keyPrefix: `${STORE_PREFIX}-`,
  key: "cart",
  storage,
};

export default persistReducer(persistConfig, cartReducer);

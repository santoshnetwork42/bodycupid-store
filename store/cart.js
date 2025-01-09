import { persistReducer } from "redux-persist";
import { getFirstVariant } from "~/utils/products";
import { STORE_PREFIX } from "~/config";
import storage from "~/utils/storage";
import { getCouponDiscount } from "@wow-star/utils";
import { isDiffArray } from "~/utils/helper";
import {
  errorComsOnPlaceOrder,
  errorTypeOnPlaceOrder,
} from "~/utils/errorComs";
import { alertToaster } from "~/utils/popupHelper";

export const actionTypes = {
  ADD_TO_CART: "ADD_TO_CART",
  REMOVE_FROM_CART: "REMOVE_FROM_CART",
  UPDATE_CART: "UPDATE_CART",
  APPLY_COUPONS: "APPLY_COUPONS",
  REMOVE_COUPON: "REMOVE_COUPON",
  EMPTY_CART: "EMPTY_CART",
  CREATE_CART: "CREATE_CART",
  VALIDATE_CART: "VALIDATE_CART",
  VALIDATE_CART_ON_ERROR: "VALIDATE_CART_ON_ERROR",
  UPDATE_CART_ID: "UPDATE_CART_ID",
  UPDATE_CART_ID_LOADING: "UPDATE_CART_ID_LOADING",
  STORE_COUPON: "STORE_COUPON",
  CLEAR_STORED_COUPON: "CLEAR_STORED_COUPON",
  APPLY_REWARD_POINT: "APPLY_REWARD_POINT",
};
const initialState = {
  data: [],
  coupon: null,
  cartId: null,
  isRewardApplied: true,
  isShoppingCartIdLoading: false,
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

      const { allowed: allowedCoupon } = getCouponDiscount(state.coupon, cart);

      return {
        ...state,
        data: cart,
        coupon: allowedCoupon ? state.coupon : null,
      };

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

    case actionTypes.APPLY_REWARD_POINT:
      return { ...state, isRewardApplied: action.payload.isRewardApplied };

    case actionTypes.STORE_COUPON:
      return {
        ...state,
        storedCouponCode: action.payload.couponCode,
        storedCouponExpiry: action.payload.couponExpiry,
      };

    case actionTypes.CLEAR_STORED_COUPON:
      return { ...state, storedCouponCode: null, storedCouponExpiry: null };

    case actionTypes.REMOVE_COUPON:
      return { ...state, coupon: null };

    case actionTypes.VALIDATE_CART:
      const { payload } = action;
      const data = state?.data.map((item) => {
        return {
          ...item,
          ...(payload[item.recordKey] || {}),
        };
      });

      const { allowed: _isCouponAllowed } = getCouponDiscount(
        state.coupon,
        data
      );

      return {
        ...state,
        data,
        coupon: _isCouponAllowed ? state.coupon : null,
      };

    case actionTypes.VALIDATE_CART_ON_ERROR:
      const { inventoryDetails, coupon } = action?.payload || {};
      const { data: cartData = [], coupon: appliedCoupon } = state;

      let error = "";

      if (!!appliedCoupon?.code && !coupon?.code) {
        error = errorComsOnPlaceOrder[errorTypeOnPlaceOrder.COUPON_ARCHIVED];
      }

      const updatedCart = cartData?.map((i) => {
        const updatedProduct = inventoryDetails?.find(
          (p) => p.recordKey === i.recordKey
        );

        if (i.price !== updatedProduct?.price) {
          error = errorComsOnPlaceOrder[errorTypeOnPlaceOrder.PRICE_CHANGE];
        }

        const isDiffer = isDiffArray(
          i?.collections || [],
          updatedProduct?.collections || []
        );

        if (isDiffer) {
          error = errorComsOnPlaceOrder[errorTypeOnPlaceOrder.COUPON_CHANGE];
        }

        return {
          ...i,
          price: updatedProduct?.price,
          inventory: updatedProduct?.inventory,
          collections: updatedProduct?.collections || [],
        };
      });

      const { allowed: isCouponAllowed } = getCouponDiscount(
        coupon,
        updatedCart
      );

      const updatedData = isCouponAllowed
        ? updatedCart
        : updatedCart.filter((item) => item?.cartItemSource !== "COUPON");

      if (error) {
        alertToaster(
          error,
          "info",
          "top-center", // textClassName
          1000
        );
      }

      return {
        ...state,
        data: updatedData,
        coupon: isCouponAllowed ? coupon : null,
      };

    case actionTypes.UPDATE_CART_ID:
      return {
        ...state,
        cartId: action.payload,
      };

    case actionTypes.UPDATE_CART_ID_LOADING:
      return {
        ...state,
        isShoppingCartIdLoading: action.payload,
      };

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
  storeCoupon: (payload) => ({
    type: actionTypes.STORE_COUPON,
    payload,
  }),
  clearStoredCoupon: () => ({
    type: actionTypes.CLEAR_STORED_COUPON,
  }),
  validateCart: (payload) => ({
    type: actionTypes.VALIDATE_CART,
    payload,
  }),
  validateCartOnError: (payload) => ({
    type: actionTypes.VALIDATE_CART_ON_ERROR,
    payload,
  }),
  removeCoupon: () => ({ type: actionTypes.REMOVE_COUPON, payload: {} }),
  emptyCart: () => ({ type: actionTypes.EMPTY_CART }),
  createCart: (user) => ({ type: actionTypes.CREATE_CART, payload: { user } }),
  updateCartId: (cartId) => ({
    type: actionTypes.UPDATE_CART_ID,
    payload: { cartId },
  }),
  applyRewardPoint: (isRewardApplied) => ({
    type: actionTypes.APPLY_REWARD_POINT,
    payload: { isRewardApplied },
  }),
};

const persistConfig = {
  keyPrefix: `${STORE_PREFIX}-`,
  key: "cart",
  storage,
};

export default persistReducer(persistConfig, cartReducer);

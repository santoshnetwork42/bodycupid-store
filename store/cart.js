import { persistReducer } from "redux-persist";
import { getFirstVariant } from "~/utils/products";
import { STORE_PREFIX } from "~/config";
import storage from "~/utils/storage";
import { alertToaster } from "~/utils/popupHelper";

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
  VALIDATE_CART: "VALIDATE_CART",
  INITIALIZE_LTO: "INITIALIZE_LTO",
};

const initialState = {
  cart: null,
  data: [],
  coupon: null,
  ltoProducts: [],
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
        const selfProductsLength =
          state.data?.filter((p) => !p.cartItemSource)?.length || 0;
        const ltoProductLength = state.ltoProducts?.length || 0;
        const ltoIndex =
          selfProductsLength > ltoProductLength ? -1 : selfProductsLength;

        const currentATC = {
          ...tmpProduct,
          recordKey,
          ltoProduct: null,
          addedAt: new Date().toISOString(),
        };

        if (!tmpProduct.cartItemSource && ltoIndex > -1) {
          currentATC.ltoProduct = state.ltoProducts[ltoIndex]?.id || null;
        }

        return {
          ...state,
          data: [
            ...state.data.map((p) => {
              if (p.recordKey === tmpProduct.parentRecordKey) {
                p.ltoProduct = null;
                p.ltoRecordKey = recordKey;
              }
              return p;
            }),
            currentATC,
          ],
        };
      }

    case actionTypes.REMOVE_FROM_CART:
      tmpProduct = { ...action.payload.product };
      let { cart, ltoRecordKey } = state.data.reduce(
        (cartAcc, product) => {
          if (tmpProduct.recordKey !== product.recordKey) {
            cartAcc.cart.push(product);
          } else {
            cartAcc.ltoRecordKey = product.ltoRecordKey;
          }
          return cartAcc;
        },
        { cart: [], ltoRecordKey: null }
      );

      if (ltoRecordKey) {
        cart = cart.filter((c) => c.recordKey !== ltoRecordKey);
      }

      return { ...state, data: cart };

    case actionTypes.UPDATE_CART:
      return { ...state, data: action.payload.products || [] };

    case actionTypes.REFRESH_CART:
      return { ...initialState, ltoProducts: state.ltoProducts };

    case actionTypes.SET_CART:
      return { ...state, cart: { ...state.cart, ...action.payload } };

    case actionTypes.APPLY_COUPONS:
      return { ...state, coupon: action.payload.coupon };

    case actionTypes.REMOVE_COUPON:
      return { ...state, coupon: null };

    case actionTypes.VALIDATE_CART:
      const { payload } = action;
      const data = state.data.map((item) => {
        if (payload[item.recordKey]) {
          return {
            ...item,
            price: payload[item.recordKey],
          };
        }
        return item;
      });

      alertToaster("Cart price is updated");
      return { ...state, data };

    case actionTypes.INITIALIZE_LTO:
      return { ...state, ltoProducts: action.payload.ltoProducts };

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
  setCart: (cart) => ({ type: actionTypes.SET_CART, payload: { ...cart } }),
  createCart: (user) => ({ type: actionTypes.CREATE_CART, payload: { user } }),
  initialLTO: (data) => ({
    type: actionTypes.INITIALIZE_LTO,
    payload: {
      ltoProducts: data,
    },
  }),
};

const persistConfig = {
  keyPrefix: `${STORE_PREFIX}-`,
  key: "cart",
  storage,
};

export default persistReducer(persistConfig, cartReducer);

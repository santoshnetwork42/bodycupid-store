import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { toast } from "react-toastify";
import { all, call, put, select, takeEvery } from "redux-saga/effects";
import { API } from "aws-amplify";

// import CartPopup from "~/components/features/product/common/cart-popup";
import CouponPopup from "~/components/features/product/common/coupon-popup";
import {
  createShoppingCart,
  updateShoppingCart,
  createShoppingCartProduct,
  updateShoppingCartProduct,
  deleteShoppingCartProduct,
} from "~/graphql/api";
import { getFirstVariantId } from "~/utils/products";
import { STORE_ID, STORE_PREFIX } from "~/config";

const actionTypes = {
  ADD_TO_CART: "ADD_TO_CART",
  REMOVE_FROM_CART: "REMOVE_FROM_CART",
  UPDATE_CART: "UPDATE_CART",
  REFRESH_STORE: "REFRESH_STORE",
  APPLY_COUPONS: "APPLY_COUPONS",
  REMOVE_COUPON: "REMOVE_COUPON",
  SET_CART: "SET_CART",
  EMPTY_CART: "EMPTY_CART",
};

const initialState = {
  cart: null,
  data: [],
  coupon: null,
};

function cartReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.ADD_TO_CART:
      let tmpProduct = { ...action.payload.product };
      if (!tmpProduct.variantId) {
        tmpProduct.variantId = getFirstVariantId(tmpProduct);
      }

      if (
        state.data.some(
          (item) =>
            item.id === tmpProduct.id &&
            ((!tmpProduct.variantId && !item.variantId) ||
              item.variantId === tmpProduct.variantId)
        )
      ) {
        let tmpData = state.data.reduce((acc, cur) => {
          if (
            cur.id === tmpProduct.id &&
            (!tmpProduct.variantId || cur.variantId === tmpProduct.variantId)
          ) {
            acc.push({
              ...cur,
              qty: parseInt(cur.qty) + parseInt(tmpProduct.qty),
            });
          } else {
            acc.push(cur);
          }

          return acc;
        }, []);

        return { ...state, data: tmpData };
      } else {
        return { ...state, data: [...state.data, tmpProduct] };
      }

    case actionTypes.REMOVE_FROM_CART:
      let cart = state.data.reduce((cartAcc, product) => {
        let tmpProduct = product;
        if (!tmpProduct.variantId) {
          tmpProduct.variantId = getFirstVariantId(tmpProduct);
        }
        if (tmpProduct.id !== action.payload.product.id) {
          cartAcc.push(tmpProduct);
        } else {
          if (
            tmpProduct.variantId &&
            tmpProduct.variantId !== action.payload.product.variantId
          ) {
            cartAcc.push(tmpProduct);
          }
        }

        return cartAcc;
      }, []);

      return { ...state, data: cart };

    case actionTypes.UPDATE_CART:
      return { ...state, data: action.payload.products || [] };

    case actionTypes.REFRESH_STORE:
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
};

export function* cartSaga() {
  yield takeEvery(actionTypes.APPLY_COUPONS, function* saga(e) {
    const { cart, user } = yield select();
    const { cart: cartResponse } = cart;
    const { data: userResponse } = user;
    if (cartResponse && userResponse) {
      const { id } = e.payload.coupon;
      yield call([API, API.graphql], {
        query: updateShoppingCart,
        variables: {
          input: { id: cartResponse.id, couponCodeId: id },
        },
        authMode: "AMAZON_COGNITO_USER_POOLS",
      });
      yield put({ type: actionTypes.SET_CART, payload: { couponCodeId: id } });
    }
  });

  yield takeEvery(actionTypes.REMOVE_COUPON, function* saga() {
    const { cart, user } = yield select();
    const { cart: cartResponse } = cart;
    const { data: userResponse } = user;
    if (cartResponse && userResponse) {
      yield call([API, API.graphql], {
        query: updateShoppingCart,
        variables: {
          input: { id: cartResponse.id, couponCodeId: null },
        },
        authMode: "AMAZON_COGNITO_USER_POOLS",
      });
      yield put({
        type: actionTypes.SET_CART,
        payload: { couponCodeId: null },
      });
    }
  });

  yield takeEvery(actionTypes.ADD_TO_CART, function* saga(e) {
    // toast(<CartPopup product={e.payload.product} />);

    const { user, cart } = yield select();
    let { cart: cartResponse } = cart;
    const { data } = user;
    if (data) {
      const { product: currProduct } = e.payload;
      if (!currProduct.variantId) {
        currProduct.variantId = getFirstVariantId(currProduct);
      }

      if (!cartResponse) {
        ({
          data: { createStoreShoppingCart: cartResponse },
        } = yield call([API, API.graphql], {
          query: createShoppingCart,
          variables: { storeId: STORE_ID },
          authMode: "AMAZON_COGNITO_USER_POOLS",
        }));
        cartResponse.products = [];
        yield put({ type: actionTypes.SET_CART, payload: { ...cartResponse } });
      }

      const { products = [], id } = cartResponse;

      let product = products.find(
        (p) =>
          p.productId === currProduct.id &&
          (!currProduct.variantId || currProduct.variantId === p.variantId) &&
          p.shoppingcartId === id
      );

      if (!product) {
        const {
          data: { createShoppingCartProduct: response },
        } = yield call([API, API.graphql], {
          query: createShoppingCartProduct,
          variables: {
            input: {
              shoppingcartId: id,
              productId: currProduct.id,
              variantId: currProduct.variantId,
              quantity: currProduct.qty,
            },
          },
          authMode: "AMAZON_COGNITO_USER_POOLS",
        });

        products.push({
          id: response.id,
          shoppingcartId: id,
          productId: response.productId,
          variantId: response.variantId,
          quantity: response.quantity,
        });

        yield put({ type: actionTypes.SET_CART, payload: { products } });
      } else {
        const {
          data: { updateShoppingCartProduct: response },
        } = yield call([API, API.graphql], {
          query: updateShoppingCartProduct,
          variables: {
            input: {
              id: product.id,
              quantity: product.quantity + parseInt(currProduct.qty),
            },
          },
          authMode: "AMAZON_COGNITO_USER_POOLS",
        });

        const updatedProducts = products.map((p) =>
          p.id === product.id
            ? {
                id: response.id,
                shoppingcartId: id,
                productId: response.productId,
                variantId: response.variantId,
                quantity: response.quantity,
              }
            : p
        );

        yield put({
          type: actionTypes.SET_CART,
          payload: { products: updatedProducts },
        });
      }
    }
  });

  yield takeEvery(actionTypes.REMOVE_FROM_CART, function* saga(e) {
    const { cart, user } = yield select();
    const { cart: cartResponse } = cart;
    const { data: userResponse } = user;
    if (cartResponse && userResponse) {
      const { products } = cartResponse;
      let curProduct = e.payload.product;
      if (!e.payload.product.variantId) {
        curProduct.variantId = getFirstVariantId(curProduct);
      }
      const { id, variantId } = curProduct;

      const product = products.find(
        (p) => p.productId === id && (!p.variantId || variantId === p.variantId)
      );

      yield call([API, API.graphql], {
        query: deleteShoppingCartProduct,
        variables: {
          input: { id: product.id },
        },
        authMode: "AMAZON_COGNITO_USER_POOLS",
      });

      const updatedProducts = products.reduce((cartAcc, product) => {
        if (product.productId !== id) {
          cartAcc.push(product);
        } else {
          if (product.variantId && product.variantId !== variantId) {
            cartAcc.push(product);
          }
        }
        return cartAcc;
      }, []);

      yield put({
        type: actionTypes.SET_CART,
        payload: { products: updatedProducts },
      });
    }
  });

  yield takeEvery(actionTypes.UPDATE_CART, function* saga(e) {
    const { cart, user } = yield select();
    const { cart: cartResponse } = cart;
    const { data: userResponse } = user;
    if (cartResponse && userResponse) {
      const { products = [] } = cartResponse || {};
      const { products: currProducts } = e.payload;

      if (Array.isArray(products) && products.length) {
        const promise = [];
        const updatedProducts = currProducts.map((p) => {
          const product = products.find(
            (prd) =>
              prd.productId === p.id &&
              (!prd.variantId || p.variantId === prd.variantId)
          );

          if (product && parseInt(product.quantity) !== parseInt(p.qty)) {
            product.quantity = parseInt(p.qty);
            promise.push(
              call([API, API.graphql], {
                query: updateShoppingCartProduct,
                variables: {
                  input: {
                    id: product.id,
                    quantity: parseInt(p.qty),
                  },
                },
                authMode: "AMAZON_COGNITO_USER_POOLS",
              })
            );
          }
          return product;
        });
        yield all(promise);
        yield put({
          type: actionTypes.SET_CART,
          payload: { products: updatedProducts },
        });
      }
    }
  });

  yield takeEvery(actionTypes.EMPTY_CART, function* saga() {
    const { cart, user } = yield select() || {};
    const { cart: cartResponse } = cart;
    const { data: userResponse } = user;

    if (cartResponse && userResponse) {
      const { products = [] } = cartResponse;

      const promise = [];
      if (Array.isArray(products)) {
        products.forEach((product) => {
          if (product && product.id) {
            promise.push(
              call([API, API.graphql], {
                query: deleteShoppingCartProduct,
                variables: {
                  input: { id: product.id },
                },
                authMode: "AMAZON_COGNITO_USER_POOLS",
              })
            );
          }
        });
      }
      if (promise.length > 0) yield all(promise);
    }
    yield put({ type: actionTypes.REFRESH_STORE });
  });
}

const persistConfig = {
  keyPrefix: `${STORE_PREFIX}-`,
  key: "cart",
  storage,
};

export default persistReducer(persistConfig, cartReducer);

import { persistReducer } from "redux-persist";
import { all, call, put, select, takeEvery } from "redux-saga/effects";
import { API } from "aws-amplify";

import {
  createShoppingCart,
  updateShoppingCart,
  deleteShoppingCart,
  createShoppingCartProduct,
  updateShoppingCartProduct,
  deleteShoppingCartProduct,
} from "~/graphql/api";
import { getFirstVariant } from "~/utils/products";
import { STORE_ID, STORE_PREFIX } from "~/config";
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
          input: { id: cartResponse.id, couponCodeId: "" },
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
    const { user, cart } = yield select();
    let { cart: cartResponse, coupon } = cart;
    const { data: userData } = user;

    if (userData) {
      const { id: userId } = userData;
      const { id: couponId } = coupon || {};

      const { product: currProduct } = e.payload;

      const variant = getFirstVariant(currProduct, currProduct.variantId);
      if (variant) {
        currProduct.variantId = variant.id;
      }

      let recordKey = currProduct.id;
      if (currProduct.variantId) {
        recordKey = `${currProduct.id}-${currProduct.variantId}`;
      }
      if (!cartResponse) {
        ({
          data: { createShoppingCart: cartResponse },
        } = yield call([API, API.graphql], {
          query: createShoppingCart,
          variables: {
            input: {
              storeId: STORE_ID,
              userId: !!userId ? userId : null,
              couponCodeId: !!couponId ? couponId : null,
            },
          },
        }));
        cartResponse.products = [];
        yield put({ type: actionTypes.SET_CART, payload: { ...cartResponse } });
      }

      if (!!cartResponse) {
        const { products = [], id } = cartResponse;
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
        });

        products.push({
          id: response.id,
          shoppingcartId: id,
          productId: response.productId,
          variantId: response.variantId,
          quantity: response.quantity,
        });

        yield put({ type: actionTypes.SET_CART, payload: { products } });
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
        const variant = getFirstVariant(curProduct);
        if (variant) {
          curProduct.variantId = variant.id;
        }
      }
      const { recordKey } = curProduct;

      const product = products.find((p) => {
        const pKey = p.variantId ? `${p.id}-${p.variantId}` : `${p.id}`;
        return pKey === recordKey;
      });

      if (product) {
        yield call([API, API.graphql], {
          query: deleteShoppingCartProduct,
          variables: {
            input: { id: product.id },
          },
          authMode: "AMAZON_COGNITO_USER_POOLS",
        });

        const updatedProducts = products.reduce((cartAcc, prd) => {
          if (prd.id !== product.id) {
            cartAcc.push(prd);
          }
          return cartAcc;
        }, []);

        if (!updatedProducts.length) {
          yield put({
            type: actionTypes.REMOVE_COUPON,
            payload: {},
          });
        }

        yield put({
          type: actionTypes.SET_CART,
          payload: { products: updatedProducts },
        });
      }
    }
  });

  yield takeEvery(actionTypes.UPDATE_CART, function* saga(e) {
    const { cart, user } = yield select();
    const { cart: cartResponse } = cart;
    const { data: userResponse } = user;

    if (cartResponse && userResponse) {
      const { products = [] } = cartResponse;
      const { products: currProducts } = e.payload;

      if (Array.isArray(products) && products.length) {
        const promise = [];
        const updatedProducts = currProducts.map((p) => {
          const product = products.find((cp) => {
            const pKey = cp.variantId
              ? `${cp.productId}-${cp.variantId}`
              : `${cp.productId}`;
            return pKey === p.recordKey;
          });

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
      yield call([API, API.graphql], {
        query: deleteShoppingCart,
        variables: {
          input: { id: cartResponse.id },
        },
        authMode: "AMAZON_COGNITO_USER_POOLS",
      });
    }

    yield put({ type: actionTypes.REFRESH_CART });
  });

  yield takeEvery(actionTypes.CREATE_CART, function* saga(e) {
    const { cart } = yield select() || {};
    let { cart: cartResponse, coupon, data: cartProducts } = cart;
    const { user } = e.payload;
    if (user) {
      const { id: userId } = user;
      if (!cartResponse) {
        const { id: couponId } = coupon || {};
        ({
          data: { createShoppingCart: cartResponse },
        } = yield call([API, API.graphql], {
          query: createShoppingCart,
          variables: {
            input: {
              storeId: STORE_ID,
              couponCodeId: !!couponId ? couponId : null,
              userId: !!userId ? userId : null,
            },
          },
        }));
        cartResponse.products = [];
        yield put({ type: actionTypes.SET_CART, payload: { ...cartResponse } });
      }

      if (!!cartResponse) {
        const { products = [], id } = cartResponse;
        if (Array.isArray(cartProducts) && !!cartProducts.length) {
          const promise = [];
          cartProducts.forEach((product) => {
            if (product.id) {
              promise.push(
                call([API, API.graphql], {
                  query: createShoppingCartProduct,
                  variables: {
                    input: {
                      shoppingcartId: id,
                      productId: product.id,
                      variantId: product.variantId,
                      quantity: product.qty,
                    },
                  },
                })
              );
            }
          });
          const [...response] = yield all(promise);
          if (response.length) {
            response.forEach((product) => {
              products.push({
                id: product.id,
                shoppingcartId: id,
                productId: product.productId,
                variantId: product.variantId,
                quantity: product.quantity,
              });
            });
            yield put({ type: actionTypes.SET_CART, payload: { products } });
          }
        }
      }
    }
  });
}

const persistConfig = {
  keyPrefix: `${STORE_PREFIX}-`,
  key: "cart",
  storage,
};

export default persistReducer(persistConfig, cartReducer);

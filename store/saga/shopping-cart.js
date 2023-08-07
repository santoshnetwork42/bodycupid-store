import {
  all,
  call,
  put,
  select,
  takeEvery,
  takeLatest,
} from "redux-saga/effects";
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
import { STORE_ID } from "~/config";
import { actionTypes } from "~/store/cart";
import { actionTypes as userActionTypes } from "~/store/user";
import { errorHandler } from "~/utils/errorHandler";

export function* cartSaga() {
  yield takeEvery(actionTypes.APPLY_COUPONS, function* saga(e) {
    try {
      const { cart, user } = yield select();
      const { cart: cartResponse } = cart;
      const { data: userResponse } = user;
      if (cartResponse && userResponse) {
        const { id } = e.payload.coupon;
        if (id) {
          yield call([API, API.graphql], {
            query: updateShoppingCart,
            variables: {
              input: { id: cartResponse.id, couponCodeId: id },
            },
            authMode: "AMAZON_COGNITO_USER_POOLS",
          });
          yield put({
            type: actionTypes.SET_CART,
            payload: { couponCodeId: id },
          });
        }
      }
    } catch (e) {
      errorHandler(e);
    }
  });

  yield takeEvery(actionTypes.REMOVE_COUPON, function* saga() {
    try {
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
    } catch (e) {
      errorHandler(e);
    }
  });

  yield takeEvery(actionTypes.ADD_TO_CART, function* saga(e) {
    try {
      const { user, cart, system } = yield select();
      const { meta } = system;
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

        if (!cartResponse) {
          ({
            data: { createShoppingCart: cartResponse },
          } = yield call([API, API.graphql], {
            query: createShoppingCart,
            authMode: "AMAZON_COGNITO_USER_POOLS",
            variables: {
              input: {
                storeId: STORE_ID,
                userId: userId || null,
                couponCodeId: couponId || null,
                ...meta,
              },
            },
          }));
          cartResponse.products = [];
          yield put({
            type: actionTypes.SET_CART,
            payload: { ...cartResponse },
          });
        }

        if (!!cartResponse) {
          const { products = [], id } = cartResponse;
          const {
            data: { createShoppingCartProduct: response },
          } = yield call([API, API.graphql], {
            query: createShoppingCartProduct,
            authMode: "AMAZON_COGNITO_USER_POOLS",
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
    } catch (e) {
      errorHandler(e);
    }
  });

  yield takeEvery(actionTypes.REMOVE_FROM_CART, function* saga(e) {
    try {
      const { cart, user } = yield select();
      const { cart: cartResponse, data: cartList } = cart;
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
          const pKey = p.variantId
            ? `${p.productId}-${p.variantId}`
            : `${p.productId}`;
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
            yield call([API, API.graphql], {
              query: deleteShoppingCart,
              variables: {
                input: { id: cartResponse.id },
              },
              authMode: "AMAZON_COGNITO_USER_POOLS",
            });

            yield put({ type: actionTypes.REFRESH_CART });
          } else {
            yield put({
              type: actionTypes.SET_CART,
              payload: { products: updatedProducts },
            });
          }
        }
      } else {
        if (!cartList || !cartList.length) {
          yield put({ type: actionTypes.REFRESH_CART });
        }
      }
    } catch (e) {
      errorHandler(e);
    }
  });

  yield takeEvery(actionTypes.UPDATE_CART, function* saga(e) {
    try {
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
              let pKey = cp.variantId
                ? `${cp.productId}-${cp.variantId}`
                : `${cp.productId}`;

              if (p.cartItemSource) {
                pKey = `${pKey}-${p.cartItemSource}`;
              }

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
            payload: { products: updatedProducts.filter(Boolean) },
          });
        }
      }
    } catch (e) {
      errorHandler(e);
    }
  });

  yield takeEvery(actionTypes.EMPTY_CART, function* saga() {
    try {
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
    } catch (e) {
      errorHandler(e);
    }
  });

  yield takeLatest(userActionTypes.SET_USER, function* saga(e) {
    try {
      const { cart, system } = yield select();
      const { meta } = system;
      let { cart: cartResponse, coupon, data: cartProducts } = cart;
      const { user } = e.payload;

      if (user && Array.isArray(cartProducts) && !!cartProducts.length) {
        const { id: userId } = user;

        if (!cartResponse) {
          const { id: couponId } = coupon || {};
          ({
            data: { createShoppingCart: cartResponse },
          } = yield call([API, API.graphql], {
            query: createShoppingCart,
            authMode: "AMAZON_COGNITO_USER_POOLS",
            variables: {
              input: {
                storeId: STORE_ID,
                couponCodeId: couponId || null,
                userId: userId || null,
                ...meta,
              },
            },
          }));
          cartResponse.products = [];
          yield put({
            type: actionTypes.SET_CART,
            payload: { ...cartResponse },
          });
        }

        if (!!cartResponse) {
          const { products = [], id } = cartResponse;
          const promise = [];
          cartProducts.forEach((product) => {
            if (product.id) {
              promise.push(
                call([API, API.graphql], {
                  query: createShoppingCartProduct,
                  authMode: "AMAZON_COGNITO_USER_POOLS",
                  variables: {
                    input: {
                      shoppingcartId: id,
                      productId: product.id,
                      variantId: product.variantId,
                      quantity: parseInt(product.qty, 10),
                    },
                  },
                })
              );
            }
          });

          const response = yield all(promise);
          if (response.length) {
            response.forEach(
              ({ data: { createShoppingCartProduct: product } }) => {
                products.push({
                  id: product.id,
                  shoppingcartId: id,
                  productId: product.productId,
                  variantId: product.variantId,
                  quantity: product.quantity,
                });
              }
            );
            yield put({ type: actionTypes.SET_CART, payload: { products } });
          }
        }
      }
    } catch (e) {
      errorHandler(e);
    }
  });
}

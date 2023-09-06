import {
  all,
  call,
  put,
  select,
  takeEvery,
  takeLatest,
} from "redux-saga/effects";
import { API } from "aws-amplify";

import { handleShoppingCart } from "~/graphql/api";
import { getFirstVariant } from "~/utils/products";
import { STORE_ID } from "~/config";
import { actionTypes } from "~/store/cart";
import { actionTypes as userActionTypes } from "~/store/user";
import { errorHandler } from "~/utils/errorHandler";

export function* cartSaga() {
  yield takeEvery(actionTypes.APPLY_COUPONS, function* saga(e) {
    try {
      const { cart, user } = yield select();
      const { data: userResponse } = user;
      if (userResponse) {
        const { id } = e.payload.coupon;
        if (id) {
          const {
            data: { handleShoppingCart: response },
          } = yield call([API, API.graphql], {
            query: handleShoppingCart,
            variables: {
              input: {
                actionType: actionTypes.APPLY_COUPONS,
                couponCodeId: id,
                storeId: STORE_ID,
              },
            },
            authMode: "AMAZON_COGNITO_USER_POOLS",
          });
          if (response) {
            yield put({
              type: actionTypes.SET_CART,
              payload: { response },
            });
          } else {
            yield put({ type: actionTypes.REFRESH_CART });
          }
        }
      }
    } catch (e) {
      errorHandler(e);
    }
  });

  yield takeEvery(actionTypes.REMOVE_COUPON, function* saga() {
    try {
      const { user } = yield select();
      const { data: userResponse } = user;
      if (userResponse) {
        const { id } = e.payload.coupon;
        if (id) {
          const {
            data: { handleShoppingCart: response },
          } = yield call([API, API.graphql], {
            query: handleShoppingCart,
            variables: {
              input: {
                actionType: actionTypes.REMOVE_COUPON,
                couponCodeId: null,
                storeId: STORE_ID,
              },
            },
            authMode: "AMAZON_COGNITO_USER_POOLS",
          });
          if (response) {
            yield put({
              type: actionTypes.SET_CART,
              payload: { response },
            });
          } else {
            yield put({ type: actionTypes.REFRESH_CART });
          }
        }
      }
    } catch (e) {
      errorHandler(e);
    }
  });

  yield takeEvery(actionTypes.ADD_TO_CART, function* saga(e) {
    try {
      const { user, cart, system } = yield select();
      const { meta } = system;
      let { coupon } = cart;
      const { data: userData } = user;

      console.log("=======cart", cart);

      if (userData) {
        const { id: couponId } = coupon || {};

        const { product: currProduct } = e.payload;

        const variant = getFirstVariant(currProduct, currProduct.variantId);
        if (variant) {
          currProduct.variantId = variant.id;
        }

        const {
          data: { handleShoppingCart: response },
        } = yield call([API, API.graphql], {
          query: handleShoppingCart,
          variables: {
            input: {
              actionType: actionTypes.ADD_TO_CART,
              couponCodeId: couponId || null,
              storeId: STORE_ID,
              productId: currProduct.id,
              variantId: currProduct.variantId,
              quantity: currProduct.qty,
            },
          },
          authMode: "AMAZON_COGNITO_USER_POOLS",
        });
        if (response) {
          yield put({
            type: actionTypes.SET_CART,
            payload: { response },
          });
        } else {
          yield put({ type: actionTypes.REFRESH_CART });
        }
      }
    } catch (e) {
      errorHandler(e);
    }
  });

  yield takeEvery(actionTypes.REMOVE_FROM_CART, function* saga(e) {
    try {
      const { cart, user } = yield select();
      const { cart: cartResponse } = cart;
      const { data: userResponse } = user;

      console.log("======e", e);

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

          const key = curProduct.cartItemSource
            ? `${pKey}-${curProduct.cartItemSource}`
            : pKey;

          return key === recordKey;
        });

        const {
          data: { handleShoppingCart: response },
        } = yield call([API, API.graphql], {
          query: handleShoppingCart,
          variables: {
            input: {
              actionType: actionTypes.REMOVE_FROM_CART,
              storeId: STORE_ID,
              shoppingCartProductId: product.id,
            },
          },
          authMode: "AMAZON_COGNITO_USER_POOLS",
        });
        if (response) {
          yield put({
            type: actionTypes.SET_CART,
            payload: { response },
          });
        } else {
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
                      actionType: actionTypes.UPDATE_CART,
                      storeId: STORE_ID,
                      shoppingCartProductId: product.id,
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
      const { user } = yield select() || {};
      const { data: userResponse } = user;

      if (userResponse) {
        yield call([API, API.graphql], {
          query: handleShoppingCart,
          variables: {
            input: {
              actionType: actionTypes.EMPTY_CART,
              storeId: STORE_ID,
            },
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
      const { cart } = yield select();
      let { coupon, data: cartProducts } = cart;
      const { user } = e.payload;

      if (user && Array.isArray(cartProducts) && !!cartProducts.length) {
        const promise = [];
        cartProducts.forEach((product) => {
          if (product.id) {
            promise.push(
              call([API, API.graphql], {
                query: handleShoppingCart,
                variables: {
                  input: {
                    actionType: actionTypes.ADD_TO_CART,
                    storeId: STORE_ID,
                    productId: product.id,
                    variantId: product.variantId,
                    quantity: parseInt(product.qty, 10),
                  },
                },
                authMode: "AMAZON_COGNITO_USER_POOLS",
              })
            );
          }
        });

        cartProducts.forEach((product) => {
          if (product.id) {
            promise.push(
              call([API, API.graphql], {
                query: handleShoppingCart,
                variables: {
                  input: {
                    actionType: actionTypes.ADD_TO_CART,
                    storeId: STORE_ID,
                    productId: product.id,
                    variantId: product.variantId,
                    quantity: parseInt(product.qty, 10),
                  },
                },
                authMode: "AMAZON_COGNITO_USER_POOLS",
              })
            );
          }
        });

        yield all(promise);

        const { id: couponId } = coupon || {};
        const {
          data: { handleShoppingCart: response },
        } = yield call([API, API.graphql], {
          query: handleShoppingCart,
          variables: {
            input: {
              actionType: actionTypes.APPLY_COUPONS,
              couponCodeId: couponId || null,
              storeId: STORE_ID,
            },
          },
          authMode: "AMAZON_COGNITO_USER_POOLS",
        });
        if (response) {
          yield put({
            type: actionTypes.SET_CART,
            payload: { response },
          });
        } else {
          yield put({ type: actionTypes.REFRESH_CART });
        }
      }
    } catch (e) {
      errorHandler(e);
    }
  });

  // yield takeEvery(Object.keys(actionTypes), function* saga(e) {
  //   try {
  //     const { cart, user } = yield select();
  //     const { cart: cartResponse } = cart;
  //     const { data: userResponse } = user;

  //     console.log("======cart", cart);

  //     // if (cartResponse && userResponse) {
  //     //   const { couponCodeId } = e.payload.coupon;
  //     //   let input = {
  //     //     cartId: cartResponse.id,
  //     //     userId: userResponse.id,
  //     //     storeId: STORE_ID,
  //     //     actionType: e.type,
  //     //   };
  //     //   if (couponCodeId) {
  //     //     input.couponCodeId = couponCodeId;
  //     //   }
  //     yield call([API, API.graphql], {
  //       query: handleShoppingCart,
  //       variables: {
  //         input,
  //       },
  //       authMode: "AMAZON_COGNITO_USER_POOLS",
  //     });
  //     yield put({
  //       type: actionTypes.SET_CART,
  //       payload: { couponCodeId: id },
  //     });
  //     // }
  //   } catch (e) {
  //     errorHandler(e);
  //   }
  // });
}

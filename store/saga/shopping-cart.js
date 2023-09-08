import { all, call, put, select, takeEvery } from "redux-saga/effects";
import { API } from "aws-amplify";

import { handleStoreShoppingCart } from "~/graphql/api";
import { STORE_ID } from "~/config";
import { actionTypes } from "~/store/cart";
import { actionTypes as userActionTypes } from "~/store/user";
import { errorHandler } from "~/utils/errorHandler";

export function* cartSaga() {
  yield takeEvery(Object.keys(actionTypes), function* saga(e) {
    if (
      [
        actionTypes.ADD_TO_CART,
        actionTypes.REMOVE_FROM_CART,
        actionTypes.APPLY_COUPONS,
        actionTypes.REMOVE_COUPON,
        actionTypes.UPDATE_CART,
        userActionTypes.SET_USER,
      ].includes(e.type)
    ) {
      try {
        const { user, cart } = yield select();
        let { coupon, data: cartResponse } = cart;
        const { data: userData } = user;

        if (userData) {
          const { id: couponId } = coupon || {};

          const data = cartResponse.map(
            ({
              id,
              variantId,
              qty,
              shoppingCartProductId,
              cartItemSource,
            }) => ({
              shoppingCartProductId,
              productId: id,
              variantId,
              quantity: qty,
              source: cartItemSource || null,
            })
          );

          const {
            data: { handleStoreShoppingCart: response },
          } = yield call([API, API.graphql], {
            query: handleStoreShoppingCart,
            variables: {
              input: {
                couponCodeId: couponId || null,
                storeId: STORE_ID,
                data,
              },
            },
            authMode: "AMAZON_COGNITO_USER_POOLS",
          });

          if (response) {
            const { shoppingcartProducts, ...cart } = response;
            const products = cartResponse.map((obj, index) => ({
              ...obj,
              shoppingCartProductId: shoppingcartProducts.items[index].id,
            }));
            yield put({
              type: actionTypes.SET_CART,
              payload: {
                products,
              },
            });
          } else {
            yield put({ type: actionTypes.REFRESH_CART });
          }
        }
      } 
      catch (e) {
        errorHandler(e);
      }
    }
  });

  yield takeEvery(actionTypes.EMPTY_CART, function* saga() {
    try {
      const { user } = yield select() || {};
      const { data: userResponse } = user;

      if (userResponse) {
        yield call([API, API.graphql], {
          query: handleStoreShoppingCart,
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
}

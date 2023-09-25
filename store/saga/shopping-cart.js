import { call, select, takeEvery } from "redux-saga/effects";
import { API } from "aws-amplify";

import { handleStoreShoppingCart } from "~/graphql/api";
import { STORE_ID } from "~/config";
import { actionTypes } from "~/store/cart";
import { actionTypes as userActionTypes } from "~/store/user";
import { errorHandler } from "~/utils/errorHandler";

export function* cartSaga() {
  yield takeEvery(
    [
      actionTypes.ADD_TO_CART,
      actionTypes.REMOVE_FROM_CART,
      actionTypes.APPLY_COUPONS,
      actionTypes.REMOVE_COUPON,
      actionTypes.UPDATE_CART,
      actionTypes.EMPTY_CART,
      userActionTypes.SET_USER,
    ],
    function* saga() {
      try {
        const { user, cart } = yield select();
        let { coupon, data: products } = cart;
        const { data: userData } = user;

        if (userData) {
          const { id: couponCode } = coupon || {};

          const data = products.map(
            ({ id, variantId, qty, cartItemSource }) => ({
              productId: id,
              variantId,
              quantity: qty,
              source: cartItemSource || null,
            })
          );

          yield call([API, API.graphql], {
            query: handleStoreShoppingCart,
            variables: {
              input: {
                couponCodeId: couponCode || null,
                storeId: STORE_ID,
                data,
              },
            },
            authMode: "AMAZON_COGNITO_USER_POOLS",
          });
        }
      } catch (e) {
        errorHandler(e);
      }
    }
  );
}

import { put, select, takeEvery } from "redux-saga/effects";

import { actionTypes } from "~/store/cart";
import { getCouponDiscount } from "~/utils/coupons";
import { errorHandler } from "~/utils/errorHandler";

export function* couponSaga() {
  try {
    yield takeEvery(
      [
        actionTypes.ADD_TO_CART,
        actionTypes.UPDATE_CART,
        actionTypes.REMOVE_FROM_CART,
      ],
      function* saga(e) {
        const { cart: state } = yield select();
        const { data, coupon } = state || {};

        if (coupon) {
          const { allowed } = getCouponDiscount(coupon, data);
          if (!allowed) {
            const product = data.find((p) => p.cartItemSource === "COUPON");

            if (product) {
              yield put({
                type: actionTypes.REMOVE_FROM_CART,
                payload: { product },
              });
            }

            yield put({ type: actionTypes.REMOVE_COUPON });
          }
        }
      }
    );
  } catch (e) {
    errorHandler(e);
  }
}

import { put, select, takeEvery } from "redux-saga/effects";

import { actionTypes } from "~/store/cart";
import { getCouponDiscount } from "~/utils/coupons";

export function* couponSaga() {
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
          yield put({ type: actionTypes.REMOVE_COUPON });
        }
      }
      
    }
  );
}

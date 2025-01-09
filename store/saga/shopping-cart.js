import { API } from "aws-amplify";
import { call, put, select, takeEvery } from "redux-saga/effects";

import { STORE_ID, STORE_PREFIX } from "~/config";
import { createShoppingCart, manageShoppingCart } from "~/graphql/api";
import { actionTypes } from "~/store/cart";
import { actionTypes as userActionTypes } from "~/store/user";
import { actionTypes as systemActionTypes } from "~/store/system";
import { errorHandler } from "~/utils/errorHandler";
import { checkAffiseValidity } from "~/utils/helper";

export function* cartSaga() {
  yield takeEvery(
    [
      actionTypes.ADD_TO_CART,
      actionTypes.REMOVE_FROM_CART,
      actionTypes.APPLY_COUPONS,
      actionTypes.REMOVE_COUPON,
      actionTypes.UPDATE_CART,
      actionTypes.VALIDATE_CART_ON_ERROR,
      actionTypes.EMPTY_CART,
      userActionTypes.SET_USER,
      actionTypes.APPLY_REWARD_POINT,
      userActionTypes.SET_LOGGED_IN_VIA,
    ],
    function* saga(action) {
      try {
        if (action.type === "EMPTY_CART") {
          const { system } = yield select();
          localStorage.removeItem(`${STORE_PREFIX}-cartId`);
          yield put({
            type: systemActionTypes.SET_META,
            payload: { ...system?.meta, fbclid: "" },
          });

          yield put({ type: actionTypes.UPDATE_CART_ID, payload: null });
          return;
        }
        yield put({ type: actionTypes.UPDATE_CART_ID_LOADING, payload: true });
        const { user, cart, system } = yield select();
        let { coupon, data: products, isRewardApplied } = cart;
        const { data: userData, isLoggedinViaGokwik } = user;

        const { id: couponCode, code } = coupon || {};

        const data = products.map(({ id, variantId, qty, cartItemSource }) => ({
          productId: id,
          variantId,
          quantity: qty,
          source: cartItemSource || null,
        }));

        const isAffiseTrackingValid = checkAffiseValidity();

        const cartInput = {
          couponCodeId: couponCode || null,
          couponCode: code || "",
          storeId: STORE_ID,
          isRewardApplied:
            userData && !isLoggedinViaGokwik ? isRewardApplied : false,
          data,
          metadata: { ...system.meta, isAffiseTrackingValid },
        };

        if (cart.cartId) {
          cartInput.shoppingCartId = cart.cartId;
        }

        const response = yield call([API, API.graphql], {
          query: userData ? manageShoppingCart : createShoppingCart,
          variables: {
            input: { ...cartInput },
          },
          authMode: userData ? "AMAZON_COGNITO_USER_POOLS" : "API_KEY",
        });

        const cartId = userData
          ? response?.data?.manageShoppingCart?.shoppingCartId
          : response?.data?.createShoppingCart?.shoppingCartId;

        if (cartId) localStorage.setItem(`${STORE_PREFIX}-cartId`, cartId);

        yield put({ type: actionTypes.UPDATE_CART_ID, payload: cartId });
        yield put({ type: actionTypes.UPDATE_CART_ID_LOADING, payload: false });
      } catch (e) {
        errorHandler(e);
      }
    }
  );
}

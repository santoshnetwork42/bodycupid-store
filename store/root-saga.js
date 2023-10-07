import { all } from "redux-saga/effects";

import { cartSaga } from "~/store/saga/shopping-cart";
import { wishlistSaga } from "~/store/wishlist";
import { eventsSaga } from "~/store/events";

export default function* rootSaga() {
  yield all([cartSaga(), wishlistSaga(), eventsSaga()]);
}

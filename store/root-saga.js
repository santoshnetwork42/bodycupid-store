import { all } from "redux-saga/effects";

import { cartSaga } from "~/store/cart";
import { wishlistSaga } from "~/store/wishlist";
import { systemSaga } from "~/store/system";

export default function* rootSaga() {
  yield all([cartSaga(), wishlistSaga(), systemSaga()]);
}

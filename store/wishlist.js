import { persistReducer } from "redux-persist";
import { toast } from "react-toastify";
import { takeEvery } from "redux-saga/effects";

import { STORE_PREFIX } from "~/config";
import storage from "~/utils/storage";
import WishListPopup from "~/components/features/product/common/wishlist-popup";

export const actionTypes = {
  TOGGLE_WISHLIST: "TOGGLE_WISHLIST",
  REMOVE_FROM_WISHLIST: "REMOVE_FROM_WISHLIST",
  REFRESH_WISHLIST: "REFRESH_WISHLIST",
};

const initialState = {
  data: [],
};

function wishlistReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.TOGGLE_WISHLIST:
      let index = state.data.findIndex(
        (item) => item.id === action.payload.product.id
      );
      let tmpData = [...state.data];

      if (index === -1) {
        tmpData.push(action.payload.product);
      } else {
        tmpData.splice(index);
      }

      return { ...state, data: tmpData };

    case actionTypes.REMOVE_FROM_WISHLIST:
      let wishlist = state.data.reduce((wishlistAcc, product) => {
        if (product.id !== action.payload.product.id) {
          wishlistAcc.push(product);
        }
        return wishlistAcc;
      }, []);

      return { ...state, data: wishlist };

    case actionTypes.REFRESH_WISHLIST:
      return initialState;

    default:
  }
  return state;
}
export function* wishlistSaga() {
  yield takeEvery(actionTypes.TOGGLE_WISHLIST, function* saga(e) {
    e.payload.product?.notWishlisted &&
      toast(<WishListPopup product={e.payload.product} />);
  });
}

export const wishlistActions = {
  toggleWishlist: (product) => ({
    type: actionTypes.TOGGLE_WISHLIST,
    payload: { product },
  }),
  refreshWishlist: () => ({
    type: actionTypes.REFRESH_WISHLIST,
  }),
  removeFromWishlist: (product) => ({
    type: actionTypes.REMOVE_FROM_WISHLIST,
    payload: { product },
  }),
};

const persistConfig = {
  keyPrefix: `${STORE_PREFIX}-`,
  key: "wishlist",
  storage,
};

export default persistReducer(persistConfig, wishlistReducer);

import { persistReducer } from "redux-persist";
import storage from 'redux-persist/lib/storage';
import { toast } from 'react-toastify';
import { takeEvery } from 'redux-saga/effects';

import CartPopup from '~/components/features/product/common/cart-popup';
import CouponPopup from '~/components/features/product/common/coupon-popup';

const actionTypes = {
    ADD_TO_CART: 'ADD_TO_CART',
    REMOVE_FROM_CART: 'REMOVE_FROM_CART',
    UPDATE_CART: 'UPDATE_CART',
    REFRESH_STORE: 'REFRESH_STORE',
    APPLY_COUPONS: 'APPLY_COUPONS',
    REMOVE_COUPON: 'REMOVE_COUPON',
}

const initialState = {
    data: [],
    coupons: [],
}

function cartReducer(state = initialState, action) {
    switch (action.type) {
        case actionTypes.ADD_TO_CART:
            let tmpProduct = { ...action.payload.product };
            if (state.data.findIndex(item => item.id === action.payload.product.id) > -1) {
                let tmpData = state.data.reduce((acc, cur) => {
                    if (cur.id === tmpProduct.id) {
                        acc.push({
                            ...cur,
                            qty: parseInt(cur.qty) + parseInt(tmpProduct.qty)
                        });
                    } else {
                        acc.push(cur);
                    }

                    return acc;
                }, [])

                return { ...state, data: tmpData };
            } else {
                return { ...state, data: [...state.data, tmpProduct] };
            }

        case actionTypes.REMOVE_FROM_CART:
            let cart = state.data.reduce((cartAcc, product) => {
                if (product.id !== action.payload.product.id) {
                    cartAcc.push(product);
                }
                return cartAcc;
            }, []);

            return { ...state, data: cart };

        case actionTypes.UPDATE_CART:
            return { ...state, data: action.payload.products || [] };

        case actionTypes.REFRESH_STORE:
            return initialState;

        case actionTypes.APPLY_COUPONS:
            if (action.payload.coupon) {
                return { ...state, coupons: [action.payload.coupon] };
            }
            return state;

        case actionTypes.REMOVE_COUPON:
            const coupons = state.coupons.filter(coupon => coupon.id !== action.payload.coupon);
            return { ...state, coupons };

        default:
            return state;
    }
}

export const cartActions = {
    addToCart: product => ({ type: actionTypes.ADD_TO_CART, payload: { product } }),
    removeFromCart: product => ({ type: actionTypes.REMOVE_FROM_CART, payload: { product } }),
    updateCart: products => ({ type: actionTypes.UPDATE_CART, payload: { products } }),
    applyCoupon: coupon => ({ type: actionTypes.APPLY_COUPONS, payload: { coupon } }),
    removeCoupon: couponId => ({ type: actionTypes.REMOVE_COUPON, payload: { coupon: couponId } }),
    emptyCart: () => ({ type: actionTypes.REFRESH_STORE })
};


export function* cartSaga() {
    yield takeEvery(actionTypes.ADD_TO_CART, function* saga(e) {
        toast(<CartPopup product={e.payload.product} />);
    })

    yield takeEvery(actionTypes.APPLY_COUPONS, function* saga(e) {
        toast(<CouponPopup coupon={e.payload.coupon} />);
    })
}

const persistConfig = {
    keyPrefix: "riode-",
    key: "cart",
    storage
}

export default persistReducer(persistConfig, cartReducer);
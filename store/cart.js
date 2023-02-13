import { persistReducer } from "redux-persist";
import storage from 'redux-persist/lib/storage';
import { toast } from 'react-toastify';
import { all, call, put, select, takeEvery } from 'redux-saga/effects';
import { API } from 'aws-amplify';

import CartPopup from '~/components/features/product/common/cart-popup';
import CouponPopup from '~/components/features/product/common/coupon-popup';
import { createOrder, updateOrder, createOrderProduct, updateOrderProduct, deleteOrderProduct } from '~/graphql/mutations';

const actionTypes = {
    ADD_TO_CART: 'ADD_TO_CART',
    REMOVE_FROM_CART: 'REMOVE_FROM_CART',
    UPDATE_CART: 'UPDATE_CART',
    REFRESH_STORE: 'REFRESH_STORE',
    APPLY_COUPONS: 'APPLY_COUPONS',
    REMOVE_COUPON: 'REMOVE_COUPON',
    SET_ORDER: 'SET_ORDER',
    UPDATE_ORDER: 'UPDATE_ORDER',
}

const initialState = {
    order: null,
    data: [],
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

        case actionTypes.SET_ORDER:
            return { ...state, order: action.payload.order };

        case actionTypes.UPDATE_ORDER:
            return { ...state, order: { ...state.order, ...action.payload } };

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
    yield takeEvery(actionTypes.APPLY_COUPONS, function* saga(e) {
        toast(<CouponPopup coupon={e.payload.coupon} />);
        const { cart } = yield select();
        const { order } = cart;
        const { id } = e.payload.coupon;
        yield call([API, API.graphql], {
            query: updateOrder,
            variables: {
                input: { id: order.id, CouponCodeId: id },
            },
        });
        yield put({ type: actionTypes.UPDATE_ORDER, payload: { CouponCodeId: id } });
    })

    yield takeEvery(actionTypes.ADD_TO_CART, function* saga(e) {
        toast(<CartPopup product={e.payload.product} />);
        const { user, cart } = yield select();
        let { order } = cart;
        const { data } = user;
        const { product: currProduct } = e.payload;

        if (!order || order.status !== 'PENDING') {
            const { data: { createOrder: response } } = yield call([API, API.graphql], {
                query: createOrder,
                variables: { input: { userId: data?.username, status: "PENDING" }, },
            });
            order = {
                userId: response.userId,
                id: response.id,
                CouponCodeId: null,
                code: response.code,
                products: [],
                shippingAddress: null,
                status: "PENDING",
                totalDiscount: 0,
            };
            yield put({ type: actionTypes.SET_ORDER, payload: { order: response } });
        }

        const { products = [], id } = order;
        let product = products.find(p => p.productId === currProduct.id && p.orderId === id);
        if (!product) {
            const { data: { createOrderProduct: response } } = yield call([API, API.graphql], {
                query: createOrderProduct,
                variables: {
                    input: {
                        orderId: id,
                        productId: currProduct.id,
                        quantity: currProduct.qty,
                        price: currProduct.price,
                    },
                },
            });
            products.push({
                id: response.id,
                orderId: response.orderId,
                productId: response.productId,
                quantity: response.quantity,
                price: response.price,
            });
            yield put({ type: actionTypes.UPDATE_ORDER, payload: { products } });
        } else {
            const { data: { updateOrderProduct: response } } = yield call([API, API.graphql], {
                query: updateOrderProduct,
                variables: {
                    input: {
                        id: product.id,
                        quantity: product.quantity + parseInt(currProduct.qty),
                        price: currProduct.price,
                    },
                },
            });
            const updatedProducts = products.map(p => p.id === product.id ? ({
                id: response.id,
                orderId: response.orderId,
                productId: response.productId,
                quantity: response.quantity,
                price: response.price,
            }) : p);
            yield put({ type: actionTypes.UPDATE_ORDER, payload: { products: updatedProducts } });
        }
    })

    yield takeEvery(actionTypes.REMOVE_FROM_CART, function* saga(e) {
        const { cart } = yield select();
        const { order } = cart;
        const { products } = order;
        const { id } = e.payload.product;
        const product = products.find(p => p.productId === id);
        yield call([API, API.graphql], {
            query: deleteOrderProduct,
            variables: {
                input: { id: product.id },
            },
        });
        const updatedProducts = products.filter(p => p.id !== product.id);
        yield put({ type: actionTypes.UPDATE_ORDER, payload: { products: updatedProducts } });
    })

    yield takeEvery(actionTypes.UPDATE_CART, function* saga(e) {
        const { cart } = yield select();
        const { order } = cart;
        const { products } = order;
        const { products: currProducts } = e.payload;

        const promise = [];
        const updatedProducts = currProducts.map((p) => {
            const product = products.find(prd => prd.productId === p.id);
            if (product && parseInt(product?.quantity) !== parseInt(p.qty)) {
                product.quantity = parseInt(p.qty);
                promise.push(
                    call([API, API.graphql], {
                        query: updateOrderProduct,
                        variables: {
                            input: {
                                id: product.id,
                                quantity: parseInt(p.qty),
                                price: p.price,
                            },
                        },
                    })
                );
            }
            return product;
        });
        yield all(promise);
        yield put({ type: actionTypes.UPDATE_ORDER, payload: { products: updatedProducts } });
    });

}

const persistConfig = {
    keyPrefix: "riode-",
    key: "cart",
    storage
}

export default persistReducer(persistConfig, cartReducer);
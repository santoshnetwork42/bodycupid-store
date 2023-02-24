import { combineReducers, createStore, applyMiddleware } from 'redux';
import { createWrapper } from 'next-redux-wrapper';
import createSagaMiddleWare from 'redux-saga';
import { persistStore } from 'redux-persist';

import rootSaga from '~/store/root-saga';

import cartReducer from '~/store/cart';
import modalReducer from '~/store/modal';
import wishlistReducer from '~/store/wishlist';
import userReducer from '~/store/user';

const actionTypes = {
    DESTROY_SESSION: 'DESTROY_SESSION'
};

const sagaMiddleware = createSagaMiddleWare();

const appReducer = combineReducers({
    cart: cartReducer,
    modal: modalReducer,
    wishlist: wishlistReducer,
    user: userReducer,
});

const rootReducers = (state, action) => {
    // Clear all data in redux store to initial.
    if (action.type === actionTypes.DESTROY_SESSION) {
        state = undefined;
    }
    return appReducer(state, action);
}

export const rootActions = {
    destroySession: () => ({ type: actionTypes.DESTROY_SESSION }),
};

export const makeStore = (context) => {
    const store = createStore(rootReducers, applyMiddleware(sagaMiddleware));

    store.sagaTask = sagaMiddleware.run(rootSaga);
    store.__persistor = persistStore(store);

    return store;
};

export const wrapper = createWrapper(makeStore);
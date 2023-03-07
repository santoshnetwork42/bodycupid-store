import { persistReducer } from "redux-persist";
import storage from 'redux-persist/lib/storage';

const actionTypes = {
    SET_STORE: 'SET_STORE',
    SET_SHIPPING: 'SET_SHIPPING',
}

const initialState = {
    store: null,
    shipping: null,
}

function systemReducer(state = initialState, action) {
    switch (action.type) {
        case actionTypes.SET_STORE:
            return { ...state, store: action.payload.store };

        case actionTypes.SET_SHIPPING:
            return { ...state, shipping: action.payload.shipping };

        case actionTypes.REFRESH_USER:
            return initialState;

        default:
            return state;
    }
}

export const systemActions = {
    setStore: store => ({ type: actionTypes.SET_STORE, payload: { store } }),
    setShipping: shipping => ({ type: actionTypes.SET_SHIPPING, payload: { shipping } }),
};

const persistConfig = {
    keyPrefix: "riode-",
    key: "system",
    storage
}

export default persistReducer(persistConfig, systemReducer);
import { persistReducer } from "redux-persist";

import { STORE_PREFIX } from "~/config";
import storage from "~/utils/storage";

export const actionTypes = {
    SET_USER: 'SET_USER',
    REMOVE_USER: 'REMOVE_USER',
    UPDATE_USER: 'UPDATE_USER',
    REFRESH_USER: 'REFRESH_USER'
}

const initialState = {
    data: null
}

function userReducer(state = initialState, action) {
    switch (action.type) {
        case actionTypes.SET_USER:
        case actionTypes.UPDATE_USER:
            return { ...state, data: action.payload.user };

        case actionTypes.REMOVE_USER:
        case actionTypes.REFRESH_USER:
            return initialState;

        default:
            return state;
    }
}

export const userActions = {
    setUser: user => ({ type: actionTypes.SET_USER, payload: { user } }),
    removeUser: () => ({ type: actionTypes.REFRESH_USER, payload: { user: null } }),
};

const persistConfig = {
    keyPrefix: `${STORE_PREFIX}-`,
    key: "user",
    storage
}

export default persistReducer(persistConfig, userReducer);
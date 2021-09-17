import {
    SET_WALLET_ADDRESS,
    SET_DATA
} from '../action/types';

const initialState = {
    wallet_add: "",
    data: []
};

export const  WalletReducer = (state = initialState, action) => {
    const {type, payload} = action;

    // eslint-disable-next-line default-case
    switch (type) {
        case SET_WALLET_ADDRESS: 
            console.log(payload)
            return {
                ...state,
                wallet_add: payload,
            };
        case SET_DATA:  
            console.log(payload)
            return {
                ...state,
                data: payload,
            };
        default:
            return state
    }
}
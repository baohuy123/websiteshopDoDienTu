import * as actionTypes from '../utils/type.utils.js';

const initState = {
    account: null
}

const accountReducer = (state = initState, action) => {
    switch (action.type) {
        case actionTypes.LOGIN_SUCCESS:
            return {
                ...state,
                account: action.payload
            };
        default:
            return state;
    }


}

export default accountReducer;
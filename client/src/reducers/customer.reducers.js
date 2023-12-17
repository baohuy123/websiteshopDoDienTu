import * as actionTypes from '../utils/type.utils.js';

const initState = {
    customer: null
}

const customerReducer = (state = initState, action) => {
    switch (action.type) {
        case actionTypes.LOGIN_SUCCESS:
            return {
                ...state,
                customer: action.payload
            };
        default:
            return state;
    }


}

export default customerReducer;
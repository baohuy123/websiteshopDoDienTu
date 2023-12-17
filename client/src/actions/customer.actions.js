import * as actionTypes from '../utils/type.utils.js';

export const loginSuccess = (customer) => {
    return {
        type: actionTypes.LOGIN_SUCCESS,
        payload: customer
    }
}

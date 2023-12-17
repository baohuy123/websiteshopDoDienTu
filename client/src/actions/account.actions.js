import * as actionTypes from '../utils/type.utils.js';

export const loginSuccess = (account) => {
    return {
        type: actionTypes.LOGIN_SUCCESS,
        payload: account
    }
}

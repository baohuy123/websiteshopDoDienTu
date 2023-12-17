import { legacy_createStore as createStore, combineReducers } from "redux";
import accountReducer from '../reducers/account.reducers.js';
import customerReducer from '../reducers/customer.reducers.js';

const rootReducer = combineReducers({
    accountReducer: accountReducer,
    customerReducer: customerReducer

});


const store = createStore(rootReducer);

export default store;

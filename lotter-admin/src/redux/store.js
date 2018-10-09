/*
 * @Author: antbrother 
 * @Date: 2018-09-29 16:51:32 
 * @Last Modified by:   antbrother 
 * @Last Modified time: 2018-09-29 16:51:32 
 */

import {createStore, applyMiddleware} from 'redux';
import combineReducers from './reducers.js';

import promiseMiddleware from './middleware/promiseMiddleware'

let store = createStore(combineReducers, applyMiddleware(promiseMiddleware));

if (module.hot) {
    module.hot.accept("./reducers", () => {
        const nextCombineReducers = require("./reducers").default;
        store.replaceReducer(nextCombineReducers);
    });
}

export default store;
/*
 * @Author: antbrother 
 * @Date: 2018-09-29 16:51:38 
 * @Last Modified by:   antbrother 
 * @Last Modified time: 2018-09-29 16:51:38 
 */
import {combineReducers} from "redux";

import test from 'reducers/test';
import getToken from 'reducers/getToken';
import upload from 'reducers/upload';


export default combineReducers({
  test,
  getToken,
  upload
});

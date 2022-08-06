import { combineReducers } from 'redux';
import userInfo from './userReducer';

const rootReducer = combineReducers({ userInfo });

export default rootReducer;

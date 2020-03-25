import { combineReducers } from 'redux'; 
import userReducer from './userReducer'; 
import dropDownReducer from './dropDownReducer'; 


export default combineReducers({
  user: userReducer, 
  dropDown: dropDownReducer
});   
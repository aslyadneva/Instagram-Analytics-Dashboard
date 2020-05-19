import {FETCH_USER, PROCESS_REQUEST, FETCH_CHART, REQUEST_ERROR} from '../actions/types'; 

const INITIAL_STATE = {
  isLoading: false, 
  data: null, 
  requestError: false
}

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case PROCESS_REQUEST:
      return {
        ...state, isLoading: true
      }
   
    case FETCH_USER: 
      const userData = action.payload; 
      console.log(userData); 
      return {
        ...state, isLoading: false, data: userData
      }

    case REQUEST_ERROR: 
      return {
        ...state, isLoading: false, requestError: action.payload
      }
   
    default: 
      return state; 
  }   
}
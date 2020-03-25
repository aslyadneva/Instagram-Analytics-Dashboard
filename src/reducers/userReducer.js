import {FETCH_USER, PROCESS_REQUEST, FETCH_CHART} from '../actions/types'; 

const INITIAL_STATE = {
  isLoading: false, 
  data: null
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
   
    default: 
      return state; 
  }   
}
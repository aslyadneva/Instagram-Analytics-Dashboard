import {FETCH_USER, PROCESS_REQUEST} from '../actions/types'; 

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
      const newData = action.payload
      return {
        isLoading: false, data: newData
      }
   
    default: 
      return state; 
  }   
}
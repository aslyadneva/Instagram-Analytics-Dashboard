import { TOGGLE_CHART } from '../actions/types'; 

export default function(state = 'Daily', action) {
  switch (action.type) { 
    case TOGGLE_CHART:
      if (action.payload === "Daily") {
        return "Monthly"
      } else if (action.payload === "Monthly") {
        return "Daily"
      }

    default: 
      return state; 
  }   
}